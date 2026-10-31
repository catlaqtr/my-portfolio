/**
 * Canvas sizing for crisp pixel art at a sensible cost.
 *
 * Phones often have 3x screens; rendering every one of those pixels costs
 * battery for no visible gain in pixel art. So the canvas is rendered at
 * most at 2x and the browser scales it up (with `image-rendering:
 * pixelated`). The camera zoom is then chosen so each art pixel still
 * covers a whole number of screen pixels after that upscale.
 */
export const MAX_RENDER_DPR = 2;

/** Roughly how many art pixels should fit across the shorter screen side (16 tiles). */
export const SHORT_SIDE_ART_PX = 256;

export interface RenderSize {
  /** Canvas size in render pixels. */
  width: number;
  height: number;
  /** Device pixels per render pixel (1 when rendering at full device resolution). */
  upscale: number;
  /** CSS pixels per render pixel, for Phaser's scale manager. */
  cssPerRenderPx: number;
}

export function renderSize(cssWidth: number, cssHeight: number, devicePixelRatio: number): RenderSize {
  const dpr = Math.max(1, devicePixelRatio || 1);
  const render = Math.min(dpr, MAX_RENDER_DPR);
  return {
    width: Math.max(1, Math.round(cssWidth * render)),
    height: Math.max(1, Math.round(cssHeight * render)),
    upscale: dpr / render,
    cssPerRenderPx: 1 / render,
  };
}

/**
 * Whole-number camera zoom. Starts from the zoom that fits about 16 tiles on
 * the short side, then — if the browser upscales by a fraction (e.g. 1.5 on
 * a 3x phone) — moves to the nearest zoom where zoom × upscale is a whole
 * number, so pixels stay even. Ties go to the larger zoom (easier to see on
 * small screens).
 */
export function pixelPerfectZoom(shortSideRenderPx: number, upscale: number): number {
  const ideal = Math.max(1, Math.round(shortSideRenderPx / SHORT_SIDE_ART_PX));
  const even = (z: number) => Math.abs(z * upscale - Math.round(z * upscale)) < 1e-6;
  if (even(ideal)) return ideal;
  for (const z of [ideal + 1, ideal - 1]) if (z >= 1 && even(z)) return z;
  return ideal;
}
