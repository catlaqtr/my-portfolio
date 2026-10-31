import Phaser from "phaser";
import { registerPixelSprites } from "../pixelSprites";
import { BRIDGE_KEY, type Bridge } from "../bridge";
import {
  TILE, animals, characters, decals, effects, images, props,
  type AnimalKey, type CharacterKey, type EffectKey,
} from "../assets";

export const FONT = "pixel";

/** Direction order of every character sheet's columns. */
export const DIRECTIONS = ["down", "up", "left", "right"] as const;

export const walkAnim = (key: CharacterKey, dir: string) => `${key}-walk-${dir}`;
export const animalAnim = (key: AnimalKey) => `${key}-idle`;
export const effectAnim = (key: EffectKey) => `${key}-loop`;
export const decalFrame = (i: number) => `decal-${i}`;

/** Loads all textures, then names frames and registers animations. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload() {
    const bridge = this.registry.get(BRIDGE_KEY) as Bridge | undefined;
    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => bridge?.emit("loading", value));
    for (const [key, url] of Object.entries(images)) this.load.image(key, url);
    for (const group of [characters, animals, effects]) {
      for (const [key, { url, frameWidth, frameHeight }] of Object.entries(group)) {
        this.load.spritesheet(key, url, { frameWidth, frameHeight });
      }
    }
  }

  create() {
    this.registerPropFrames();
    this.registerAnimations();
    this.registerFont();
    registerPixelSprites(this);
    this.scene.start("world");
  }

  private registerPropFrames() {
    for (const [name, def] of Object.entries(props)) {
      this.textures.get(def.sheet).add(
        name, 0, def.col * TILE, def.row * TILE, def.w * TILE, def.h * TILE,
      );
    }
    decals.frames.forEach(([col, row], i) => {
      this.textures.get(decals.sheet).add(decalFrame(i), 0, col * TILE, row * TILE, TILE, TILE);
    });
  }

  private registerAnimations() {
    for (const key of Object.keys(characters) as CharacterKey[]) {
      DIRECTIONS.forEach((dir, d) => {
        this.anims.create({
          key: walkAnim(key, dir),
          // Sheet rows are animation frames, columns are directions.
          frames: this.anims.generateFrameNumbers(key, { frames: [d, d + 4, d + 8, d + 12] }),
          frameRate: 8,
          repeat: -1,
        });
      });
    }
    for (const key of Object.keys(animals) as AnimalKey[]) {
      this.anims.create({
        key: animalAnim(key),
        frames: this.anims.generateFrameNumbers(key, { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1,
      });
    }
    for (const key of Object.keys(effects) as EffectKey[]) {
      this.anims.create({
        key: effectAnim(key),
        frames: this.anims.generateFrameNumbers(key),
        frameRate: 8,
        repeat: -1,
      });
    }
  }

  private registerFont() {
    // font8x8.png: printable ASCII from the space character, 15 glyphs per row.
    const data = Phaser.GameObjects.RetroFont.Parse(this, {
      image: "font8x8",
      width: 8,
      height: 8,
      chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
      charsPerRow: 15,
      "offset.x": 0,
      "offset.y": 0,
      "spacing.x": 0,
      "spacing.y": 0,
      lineSpacing: 0,
    });
    this.cache.bitmapFont.add(FONT, data);
  }
}
