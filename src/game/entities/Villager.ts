import Phaser from "phaser";
import { TILE, type AnimalKey } from "../assets";
import type { NpcPlacement } from "../world/layout";
import { animalAnim } from "../scenes/BootScene";
import { Walker } from "./Walker";

const NPC_SPEED = 28;

/**
 * Wanders between random spots near home, pausing in between.
 * Shared by villagers and animals via `WanderState`.
 */
class WanderState {
  private target: Phaser.Math.Vector2 | null = null;
  private giveUpAt = 0;
  // Random first rest so villagers don't all set off in lockstep.
  private restUntil = Math.random() * 4000;

  constructor(private readonly home: Phaser.Math.Vector2, private readonly radius: number) {}

  /** Returns the velocity to move with this frame. */
  step(time: number, x: number, y: number, blocked: boolean): [number, number] {
    if (this.radius === 0) return [0, 0];
    if (!this.target) {
      if (time < this.restUntil) return [0, 0];
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * this.radius * TILE;
      this.target = new Phaser.Math.Vector2(
        this.home.x + Math.cos(angle) * dist,
        this.home.y + Math.sin(angle) * dist,
      );
      this.giveUpAt = time + 4000;
    }
    const dx = this.target.x - x;
    const dy = this.target.y - y;
    if (Math.hypot(dx, dy) < 2 || time > this.giveUpAt || blocked) {
      this.target = null;
      this.restUntil = time + 1500 + Math.random() * 3500;
      return [0, 0];
    }
    // Walk along one axis at a time, like classic RPG villagers.
    return Math.abs(dx) > Math.abs(dy)
      ? [Math.sign(dx) * NPC_SPEED, 0]
      : [0, Math.sign(dy) * NPC_SPEED];
  }
}

export class Villager extends Walker {
  private readonly wander: WanderState;
  /** Set while in conversation: stand still, facing the player. */
  talking = false;

  constructor(scene: Phaser.Scene, readonly npc: NpcPlacement) {
    super(scene, npc.x * TILE, npc.y * TILE, npc.sprite, npc.facing);
    this.body.setImmovable(true);
    this.wander = new WanderState(new Phaser.Math.Vector2(this.x, this.y), npc.wander);
  }

  /** Stop and turn towards someone. */
  faceTowards(x: number, y: number) {
    const dx = x - this.x;
    const dy = y - this.y;
    this.facing = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : dy < 0 ? "up" : "down";
    this.animate(0, 0);
  }

  preUpdate(time: number, delta: number) {
    if (this.talking) {
      this.setVelocity(0, 0);
      super.preUpdate(time, delta);
      return;
    }
    const blocked = !this.body.blocked.none || !this.body.touching.none;
    const [vx, vy] = this.wander.step(time, this.x, this.y, blocked);
    this.setVelocity(vx, vy);
    this.animate(vx, vy);
    super.preUpdate(time, delta);
  }
}

export class Animal extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  private readonly wander: WanderState;

  constructor(scene: Phaser.Scene, key: AnimalKey, x: number, y: number, radius: number) {
    super(scene, x * TILE, y * TILE, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0.5, 1);
    this.body.setSize(10, 5).setOffset(3, 11).setImmovable(true);
    this.anims.play({ key: animalAnim(key), startFrame: Math.round(Math.random()) });
    this.wander = new WanderState(new Phaser.Math.Vector2(this.x, this.y), radius);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    const [vx, vy] = this.wander.step(time, this.x, this.y, !this.body.blocked.none);
    this.setVelocity(vx * 0.6, vy * 0.6);
    if (vx !== 0) this.setFlipX(vx < 0);
    this.setDepth(this.y);
  }
}
