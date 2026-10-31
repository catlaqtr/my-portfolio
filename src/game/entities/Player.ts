import Phaser from "phaser";
import { Walker } from "./Walker";

/** Walking speed in pixels per second (about 5 tiles). */
const SPEED = 80;

type Keys = Record<"up" | "down" | "left" | "right" | "w" | "a" | "s" | "d", Phaser.Input.Keyboard.Key>;

export class Player extends Walker {
  private readonly keys: Keys;
  /** True while a panel or dialogue is open; the player stands still. */
  frozen = false;
  /** Direction from the touch joystick; its length (0–1) scales the speed. */
  touch = { x: 0, y: 0 };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "boy", "up");
    this.setCollideWorldBounds(true);
    const kb = scene.input.keyboard!;
    const { UP, DOWN, LEFT, RIGHT, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = kb.addKeys({ up: UP, down: DOWN, left: LEFT, right: RIGHT, w: W, a: A, s: S, d: D }) as Keys;
  }

  /** A point just in front of the player, used to decide what they can reach. */
  get reach() {
    const offset = { up: [0, -10], down: [0, 6], left: [-9, -3], right: [9, -3] }[this.facing];
    return { x: this.x + offset[0], y: this.y + offset[1] };
  }

  preUpdate(time: number, delta: number) {
    if (this.frozen) {
      this.setVelocity(0, 0);
      this.animate(0, 0);
      super.preUpdate(time, delta);
      return;
    }
    const k = this.keys;
    let x = Number(k.right.isDown || k.d.isDown) - Number(k.left.isDown || k.a.isDown);
    let y = Number(k.down.isDown || k.s.isDown) - Number(k.up.isDown || k.w.isDown);
    // Normalise so diagonal movement isn't faster.
    let speed = SPEED / (Math.hypot(x, y) || 1);
    if (x === 0 && y === 0 && (this.touch.x !== 0 || this.touch.y !== 0)) {
      // The joystick is already normalised; a light push walks slower.
      ({ x, y } = this.touch);
      speed = SPEED;
    }
    this.setVelocity(x * speed, y * speed);
    // Face along the main direction of travel (a gentle diagonal push still animates).
    this.animate(Math.abs(x) >= Math.abs(y) / 2 ? x : 0, Math.abs(y) >= Math.abs(x) / 2 ? y : 0);
    super.preUpdate(time, delta);
  }
}
