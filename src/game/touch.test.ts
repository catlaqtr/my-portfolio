import { describe, expect, it } from "vitest";
import { DEAD_ZONE, knobOffset, stickVector } from "./ui/joystick";
import { pixelPerfectZoom, renderSize } from "./viewport";

describe("stickVector", () => {
  const R = 40;
  it("ignores tiny movements inside the dead zone", () => {
    expect(stickVector(R * DEAD_ZONE * 0.9, 0, R)).toEqual({ x: 0, y: 0 });
  });
  it("reaches full speed at the rim and never exceeds it", () => {
    const v = stickVector(R * 3, 0, R);
    expect(v.x).toBeCloseTo(1);
    expect(Math.hypot(v.x, v.y)).toBeLessThanOrEqual(1 + 1e-9);
  });
  it("keeps the drag direction", () => {
    const v = stickVector(-30, 30, R);
    expect(v.x).toBeLessThan(0);
    expect(v.y).toBeGreaterThan(0);
    expect(Math.abs(v.x)).toBeCloseTo(Math.abs(v.y));
  });
  it("walks gently just outside the dead zone", () => {
    const v = stickVector(R * (DEAD_ZONE + 0.1), 0, R);
    expect(v.x).toBeGreaterThan(0);
    expect(v.x).toBeLessThan(0.2);
  });
});

describe("knobOffset", () => {
  it("follows the thumb inside the base and stops at its rim", () => {
    expect(knobOffset(10, -5, 40)).toEqual({ x: 10, y: -5 });
    const rim = knobOffset(80, 0, 40);
    expect(rim.x).toBeCloseTo(40);
  });
});

describe("renderSize", () => {
  it("renders 1x and 2x screens at full resolution", () => {
    expect(renderSize(1280, 720, 1)).toMatchObject({ width: 1280, height: 720, upscale: 1 });
    expect(renderSize(1280, 720, 2)).toMatchObject({ width: 2560, height: 1440, upscale: 1 });
  });
  it("caps 3x phones at 2x and lets the browser upscale", () => {
    const s = renderSize(390, 844, 3);
    expect(s).toMatchObject({ width: 780, height: 1688, upscale: 1.5 });
    expect(s.cssPerRenderPx).toBeCloseTo(0.5);
  });
});

describe("pixelPerfectZoom", () => {
  it("fits about 16 tiles on the short side", () => {
    expect(pixelPerfectZoom(720, 1)).toBe(3);
    expect(pixelPerfectZoom(1080, 1)).toBe(4);
    expect(pixelPerfectZoom(100, 1)).toBe(1);
  });
  it("picks an even zoom when the browser upscales by 1.5", () => {
    // 3x phone: 780 render px → ideal 3, but 3 × 1.5 isn't whole, so 4.
    const z = pixelPerfectZoom(780, 1.5);
    expect(z).toBe(4);
    expect(Number.isInteger(z * 1.5)).toBe(true);
  });
});
