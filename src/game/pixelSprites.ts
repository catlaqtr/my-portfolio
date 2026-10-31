import Phaser from "phaser";

/**
 * The few sprites the pack doesn't include, drawn pixel by pixel in the
 * pack's own palette so they sit naturally next to the artist's work.
 */
const PALETTE = {
  outline: "#141b1b",
  stoneLight: "#f2eaf1",
  stone: "#abc2bc",
  stoneMid: "#8d977f",
  stoneDark: "#56634d",
  water: "#71ddee",
  waterShade: "#79b8ce",
  foam: "#ffffff",
  iron: "#56634d",
};

type Color = string | null;

class PixelCanvas {
  readonly px: Color[];
  constructor(readonly w: number, readonly h: number) {
    this.px = new Array(w * h).fill(null);
  }
  set(x: number, y: number, c: Color) {
    if (x >= 0 && y >= 0 && x < this.w && y < this.h) this.px[y * this.w + x] = c;
  }
  get(x: number, y: number): Color {
    return x >= 0 && y >= 0 && x < this.w && y < this.h ? this.px[y * this.w + x] : null;
  }
  /** Dark 1px outline around every filled shape, like the rest of the pack. */
  outline() {
    const out = [...this.px];
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (this.get(x, y)) continue;
        if (this.get(x + 1, y) || this.get(x - 1, y) || this.get(x, y + 1) || this.get(x, y - 1)) {
          out[y * this.w + x] = PALETTE.outline;
        }
      }
    }
    this.px.splice(0, this.px.length, ...out);
    return this;
  }
  over(top: PixelCanvas, ox = 0, oy = 0) {
    for (let y = 0; y < top.h; y++) {
      for (let x = 0; x < top.w; x++) {
        const c = top.get(x, y);
        if (c) this.set(x + ox, y + oy, c);
      }
    }
    return this;
  }
  toTexture(scene: Phaser.Scene, key: string) {
    const tex = scene.textures.createCanvas(key, this.w, this.h)!;
    const ctx = tex.getContext();
    this.px.forEach((c, i) => {
      if (!c) return;
      ctx.fillStyle = c;
      ctx.fillRect(i % this.w, Math.floor(i / this.w), 1, 1);
    });
    tex.refresh();
  }
}

const inEllipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) =>
  ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;

export const FOUNTAIN = { width: 64, height: 54, spoutX: 32, spoutY: 9 };

/** A round stone basin seen from above at a slight angle, with a tiered spout. */
function drawFountain() {
  const { width: w, height: h } = FOUNTAIN;
  const cx = w / 2, cy = 30, rx = 30, ry = 18, wall = 6;

  const basin = new PixelCanvas(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (inEllipse(x, y, cx, cy, rx, ry)) {
        let c = x < cx - 6 && y < cy - 4 ? PALETTE.stoneLight : PALETTE.stone;
        if (inEllipse(x, y, cx, cy + 1, rx - 4, ry - 4)) {
          c = inEllipse(x, y, cx, cy + 3, rx - 4, ry - 5) ? PALETTE.water : PALETTE.waterShade;
        }
        basin.set(x, y, c);
      } else if (y > cy) {
        // The basin's front wall: the rim ellipse extruded downwards.
        for (let d = 1; d <= wall; d++) {
          if (inEllipse(x, y - d, cx, cy, rx, ry)) {
            basin.set(x, y, d >= wall - 1 || y >= h - 4 ? PALETTE.stoneDark : PALETTE.stoneMid);
            break;
          }
        }
      }
    }
  }
  basin.outline();

  // Central column with a small bowl on top.
  const column = new PixelCanvas(24, 30);
  for (let y = 6; y < 28; y++) {
    for (let x = 9; x < 15; x++) column.set(x, y, x >= 13 ? PALETTE.stoneMid : PALETTE.stone);
  }
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 24; x++) {
      if (inEllipse(x, y, 12, 6, 11, 4.5)) column.set(x, y, y < 4 ? PALETTE.stoneLight : PALETTE.stone);
      if (inEllipse(x, y, 12, 5.5, 8, 2.6)) column.set(x, y, PALETTE.water);
      if (inEllipse(x, y, 12, 10, 9, 2.2) && y >= 9) column.set(x, y, PALETTE.stoneMid);
    }
  }
  column.set(11, 3, PALETTE.foam);
  column.set(12, 3, PALETTE.foam);
  column.outline();

  return basin.over(column, cx - 12, 4);
}

/** A small iron fire bowl on three legs; the animated flame sits on top. */
function drawBrazier() {
  const b = new PixelCanvas(12, 12);
  for (let x = 1; x < 11; x++) b.set(x, 1, PALETTE.stoneMid);
  for (let y = 2; y < 5; y++) for (let x = 1 + (y - 2); x < 11 - (y - 2); x++) b.set(x, y, PALETTE.iron);
  for (let y = 5; y < 11; y++) {
    b.set(3, y, PALETTE.iron);
    b.set(8, y, PALETTE.iron);
  }
  b.set(2, 10, PALETTE.iron);
  b.set(9, 10, PALETTE.iron);
  return b.outline();
}

export function registerPixelSprites(scene: Phaser.Scene) {
  if (!scene.textures.exists("fountain")) drawFountain().toTexture(scene, "fountain");
  if (!scene.textures.exists("brazier")) drawBrazier().toTexture(scene, "brazier");
}
