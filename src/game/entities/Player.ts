import Phaser from "phaser";
import { Walker } from "./Walker";

/** Walking speed in pixels per second (about 5 tiles). */
const SPEED = 80;

type Keys = Record<"up" | "down" | "left" | "right" | "w" | "a" | "s" | "d", Phaser.Input.Keyboard.Key>;

export class Player extends Walker {
  private readonly keys: Keys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "boy", "up");
    this.setCollideWorldBounds(true);
    const kb = scene.input.keyboard!;
    const { UP, DOWN, LEFT, RIGHT, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = kb.addKeys({ up: UP, down: DOWN, left: LEFT, right: RIGHT, w: W, a: A, s: S, d: D }) as Keys;
  }

  preUpdate(time: number, delta: number) {
    const k = this.keys;
    const x = Number(k.right.isDown || k.d.isDown) - Number(k.left.isDown || k.a.isDown);
    const y = Number(k.down.isDown || k.s.isDown) - Number(k.up.isDown || k.w.isDown);
    // Normalise so diagonal movement isn't faster.
    const len = Math.hypot(x, y) || 1;
    this.setVelocity((x / len) * SPEED, (y / len) * SPEED);
    this.animate(x, y);
    super.preUpdate(time, delta);
  }
}
