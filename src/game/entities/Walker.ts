import Phaser from "phaser";
import type { CharacterKey } from "../assets";
import type { Facing } from "../world/layout";
import { DIRECTIONS, walkAnim } from "../scenes/BootScene";

/**
 * A 16x16 four-direction character with a soft ground shadow. Its position
 * is the point between its feet, and it depth-sorts by that y so it walks
 * correctly in front of and behind buildings and trees.
 */
export class Walker extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  facing: Facing;
  private readonly shadow: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, readonly key: CharacterKey, facing: Facing) {
    super(scene, x, y, key, DIRECTIONS.indexOf(facing));
    this.facing = facing;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0.5, 1);
    // Feet-sized hitbox so characters can tuck in behind things.
    this.body.setSize(10, 6).setOffset(3, 10);
    this.shadow = scene.add.image(x, y, "shadow").setOrigin(0.5, 0.75).setAlpha(0.35);
    this.syncDepth();
  }

  /** Plays the walk cycle for a velocity, or stands still facing the last direction. */
  protected animate(vx: number, vy: number) {
    if (vx === 0 && vy === 0) {
      this.anims.stop();
      this.setFrame(DIRECTIONS.indexOf(this.facing));
      return;
    }
    const horizontal: Facing = vx < 0 ? "left" : "right";
    const vertical: Facing = vy < 0 ? "up" : "down";
    if (vx !== 0 && vy !== 0) {
      // Moving diagonally: keep the current facing if it's still one of the two.
      if (this.facing !== horizontal && this.facing !== vertical) this.facing = vertical;
    } else {
      this.facing = vx !== 0 ? horizontal : vertical;
    }
    this.anims.play(walkAnim(this.key, this.facing), true);
  }

  protected syncDepth() {
    this.setDepth(this.y);
    this.shadow.setPosition(this.x, this.y).setDepth(this.y - 0.5);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.syncDepth();
  }

  destroy(fromScene?: boolean) {
    this.shadow.destroy();
    super.destroy(fromScene);
  }
}
