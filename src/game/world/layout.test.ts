import { describe, expect, it } from "vitest";
import { TILE, props, type Body } from "../assets";
import { locations } from "../../content/locations";
import {
  MAP_HEIGHT, MAP_WIDTH, buildings, dirt, fountainBasin, npcs, placements, ponds, spawn,
  type Placement, type Point, type Rect,
} from "./layout";

const inRect = (r: Rect, x: number, y: number) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h;
const onDirt = (p: Point) => dirt.some((r) => inRect(r, Math.floor(p.x), Math.floor(p.y)));

/** Solid rectangles in pixels, exactly as the scene builds them. */
function solidRects(list: Placement[]) {
  return list.flatMap(({ prop, x, y }) => {
    const def = props[prop];
    const bodies = ("bodies" in def ? def.bodies : []) as Body[];
    return bodies.map(([bx, by, w, h]) => ({ x: x * TILE + bx, y: y * TILE + by, w, h, prop }));
  });
}

const allSolids = solidRects([...placements, ...buildings]);
const blocked = (px: number, py: number) => allSolids.find((r) => inRect(r, px, py));

describe("village layout", () => {
  it("has exactly one building for each of the five portfolio locations", () => {
    expect(buildings.map((b) => b.location).sort()).toEqual(locations.map((l) => l.id).sort());
    expect(buildings).toHaveLength(5);
  });

  it("puts every entrance on a path that is free to walk on", () => {
    for (const b of buildings) {
      expect(onDirt(b.entrance), `${b.location} entrance on a path`).toBe(true);
      const cx = (b.entrance.x + 0.5) * TILE;
      const cy = (b.entrance.y + 0.5) * TILE;
      expect(blocked(cx, cy), `${b.location} entrance not blocked`).toBeUndefined();
    }
  });

  it("starts the player on open ground in the square", () => {
    expect(onDirt(spawn)).toBe(true);
    expect(blocked(spawn.x * TILE, spawn.y * TILE)).toBeUndefined();
    expect(inRect(fountainBasin, spawn.x, spawn.y)).toBe(false);
  });

  it("keeps villagers out of walls, water and the map edge", () => {
    for (const n of npcs) {
      expect(n.x > 0 && n.x < MAP_WIDTH && n.y > 0 && n.y < MAP_HEIGHT, n.sprite).toBe(true);
      expect(blocked(n.x * TILE, n.y * TILE - 2), `${n.sprite} not inside a prop`).toBeUndefined();
      expect(ponds.some((p) => inRect(p, n.x, n.y)), `${n.sprite} not in a pond`).toBe(false);
    }
  });

  it("doesn't overlap buildings with each other or with water", () => {
    const footprint = (b: Placement): Rect => ({ x: b.x, y: b.y, w: props[b.prop].w, h: props[b.prop].h });
    const overlaps = (a: Rect, b: Rect) =>
      a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    const rects = buildings.map(footprint);
    rects.forEach((a, i) => {
      rects.slice(i + 1).forEach((b) => expect(overlaps(a, b)).toBe(false));
      for (const water of [...ponds, fountainBasin]) expect(overlaps(a, water)).toBe(false);
    });
  });
});
