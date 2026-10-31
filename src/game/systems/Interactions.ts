import Phaser from "phaser";
import { TILE } from "../assets";
import { buildings } from "../world/layout";
import { findInteractable, sameInteractable, type LocationZone } from "../world/interaction";
import type { Bridge, Interactable, ModalState } from "../bridge";
import type { LocationId } from "../../content/locations";
import { reducedMotion } from "../motion";
import type { Player } from "../entities/Player";
import type { Villager } from "../entities/Villager";

/** Keeps the bobbing marker above everything in the world. */
const MARKER_DEPTH = 99_000;

/**
 * Works out what the player can interact with each frame, shows a marker
 * over it, and turns E / Space / Enter into `interact` events for React.
 * While React has a panel open, the player is frozen and the keyboard is
 * released so the panel's buttons and links work normally.
 */
export class Interactions {
  private focus: Interactable | null = null;
  private modal: ModalState = false;
  private readonly zones: LocationZone[];
  private readonly marker: Phaser.GameObjects.Image;
  private readonly bob: Phaser.Tweens.Tween;
  private talkingTo: Villager | null = null;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly player: Player,
    private readonly villagers: Villager[],
    private readonly bridge: Bridge,
  ) {
    // The area just in front of each door: the entrance tile and its neighbours.
    this.zones = buildings.map((b) => ({
      id: b.location,
      area: { x: (b.entrance.x - 1) * TILE, y: (b.entrance.y - 1) * TILE, w: 3 * TILE, h: 2 * TILE },
    }));

    // Listen for key events rather than polling JustDown(): a quick tap that
    // goes down and up within one frame would otherwise be missed.
    const kb = scene.input.keyboard!;
    const { E, SPACE, ENTER } = Phaser.Input.Keyboard.KeyCodes;
    for (const code of [E, SPACE, ENTER]) kb.addKey(code); // captures Space/Enter so the page doesn't scroll
    const onKey = (event: KeyboardEvent) => {
      if (!event.repeat) this.interact();
    };
    const keyEvents = ["keydown-E", "keydown-SPACE", "keydown-ENTER"];
    for (const name of keyEvents) kb.on(name, onKey);

    this.marker = scene.add.image(0, 0, "marker").setOrigin(0.5, 1).setDepth(MARKER_DEPTH).setVisible(false);
    this.bob = scene.tweens.add({
      targets: this.marker, y: "-=3", duration: 450, yoyo: true, repeat: -1, ease: "Sine.easeInOut", paused: true,
    });

    const offs = [
      bridge.on("modal", (state) => this.setModal(state)),
      bridge.on("action", () => this.interact()),
      bridge.on("move", (v) => (player.touch = v)),
      bridge.on("travel", (id) => this.travelTo(id)),
    ];
    scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      for (const off of offs) off();
      for (const name of keyEvents) kb.off(name, onKey);
      scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    });
  }

  private update() {
    if (this.modal) return;

    const next = findInteractable(
      { x: this.player.x, y: this.player.y },
      this.player.reach,
      this.zones,
      this.villagers.map((v) => ({ id: v.npc.id, at: { x: v.x, y: v.y } })),
    );
    if (!sameInteractable(next, this.focus)) {
      this.focus = next;
      this.bridge.emit("focus", next);
    }
    this.placeMarker();
  }

  /** Quick Travel: stand the player at a building's door, facing it. */
  private travelTo(id: LocationId) {
    const b = buildings.find((bb) => bb.location === id);
    if (!b) return;
    const cam = this.scene.cameras.main;
    const move = () => {
      this.player.body.reset((b.entrance.x + 0.5) * TILE, (b.entrance.y + 0.6) * TILE);
      this.player.facing = "up";
      cam.centerOn(this.player.x, this.player.y);
    };
    if (reducedMotion()) return move();
    cam.fadeOut(140, 20, 27, 27);
    cam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      move();
      cam.fadeIn(220, 20, 27, 27);
    });
  }

  private interact() {
    if (!this.modal && this.focus) this.bridge.emit("interact", this.focus);
  }

  private placeMarker() {
    const target = this.focus;
    if (!target) {
      this.marker.setVisible(false);
      this.bob.pause();
      return;
    }
    let x: number;
    let y: number;
    if (target.kind === "location") {
      const b = buildings.find((bb) => bb.location === target.id)!;
      x = (b.entrance.x + 0.5) * TILE;
      y = (b.entrance.y - 1) * TILE - 2;
    } else {
      const v = this.villagers.find((vv) => vv.npc.id === target.id)!;
      x = v.x;
      y = v.y - 17;
    }
    // Only reposition when the target changes or moves, so the bob tween keeps running smoothly.
    if (!this.marker.visible || Math.abs(this.marker.x - x) > 0.5 || Math.abs((this.marker.getData("baseY") ?? 0) - y) > 0.5) {
      this.marker.setPosition(x, y).setData("baseY", y).setVisible(true);
      this.bob.restart();
    }
  }

  private setModal(state: ModalState) {
    const was = this.modal;
    if (state === was) return;
    this.modal = state;
    const kb = this.scene.input.keyboard!;
    const loop = this.scene.game.loop;

    if (state) {
      // A full panel hides the village: stop rendering it to save battery.
      if (state === "panel") loop.sleep();
      else if (!loop.running) loop.wake(true);
      if (was) return; // switching between kinds of modal; input is already released
      this.player.frozen = true;
      this.player.touch = { x: 0, y: 0 };
      this.marker.setVisible(false);
      // Hand the keyboard to the page so Space/Enter/arrows work in the panel.
      kb.enabled = false;
      kb.disableGlobalCapture();
      if (this.focus?.kind === "npc") {
        const id = this.focus.id;
        this.talkingTo = this.villagers.find((v) => v.npc.id === id) ?? null;
        this.talkingTo?.faceTowards(this.player.x, this.player.y);
        if (this.talkingTo) this.talkingTo.talking = true;
      }
      return;
    }

    if (!loop.running) loop.wake(true); // seamless: no time jump after sleeping
    // Re-enable on the next tick, so the key that closed the panel
    // can't immediately re-open it.
    this.scene.time.delayedCall(120, () => {
      kb.enabled = true;
      kb.enableGlobalCapture();
      kb.resetKeys();
      this.player.frozen = false;
      if (this.talkingTo) this.talkingTo.talking = false;
      this.talkingTo = null;
      // Force the prompt to be re-sent for whatever is in reach now.
      this.focus = null;
    });
  }
}
