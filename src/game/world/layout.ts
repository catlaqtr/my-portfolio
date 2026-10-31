/**
 * The layout of Hearthvale, in tile coordinates (1 tile = 16px).
 *
 * Kept as typed data rather than a Tiled file: buildings are composites of
 * several tileset regions, and plain data is reviewable in diffs and
 * type-checked against the portfolio's location ids.
 *
 *          forest
 *   ArcClash Arena ─── north road ─── AnimeGuess Arcade
 *                         │
 *   Skills Academy ── Fountain Square ── Contact Center
 *                         │
 *                  About Me House · pond
 */
import type { AnimalKey, CharacterKey, EffectKey, PropName } from "../assets";
import type { LocationId } from "../../content/locations";

export const MAP_WIDTH = 60;
export const MAP_HEIGHT = 42;

export interface Rect { x: number; y: number; w: number; h: number }
export interface Point { x: number; y: number }

export interface Placement extends Point {
  prop: PropName;
  /** Draw above everything at the same base line (e.g. banners hung on a wall). */
  front?: boolean;
}

export interface BuildingPlacement extends Placement {
  location: LocationId;
  /** Text on the wooden sign in front of the building. */
  sign: string;
  signAt: Point;
  /** Walkable tile right in front of the door (used for interactions in M2). */
  entrance: Point;
}

export type Facing = "down" | "up" | "left" | "right";

export interface NpcPlacement extends Point {
  sprite: CharacterKey;
  facing: Facing;
  /** How far (in tiles) the NPC may wander from home. 0 = stands still. */
  wander: number;
}

export interface AnimalPlacement extends Point {
  sprite: AnimalKey;
  wander: number;
}

export interface EffectPlacement extends Point {
  effect: EffectKey;
  /** Frames per second of the looping animation. */
  fps?: number;
  /** Extra depth offset so the effect sorts above its host (e.g. a flag on a tower). */
  above?: Point;
}

// ── Terrain ───────────────────────────────────────────────────────────────

export const dirt: Rect[] = [
  { x: 6, y: 11, w: 42, h: 2 },   // north road
  { x: 6, y: 4, w: 14, h: 5 },    // arena yard
  { x: 12, y: 9, w: 3, h: 2 },    // arena gate
  { x: 29, y: 13, w: 2, h: 3 },   // north spine
  { x: 24, y: 16, w: 12, h: 10 }, // fountain square
  { x: 42, y: 9, w: 2, h: 2 },    // arcade doorstep
  { x: 5, y: 20, w: 19, h: 2 },   // west road
  { x: 16, y: 17, w: 2, h: 3 },   // beige house path
  { x: 36, y: 20, w: 17, h: 2 },  // east road
  { x: 37, y: 18, w: 2, h: 2 },   // red house path
  { x: 29, y: 26, w: 2, h: 10 },  // south road
  { x: 20, y: 34, w: 9, h: 2 },   // lane to the house
];

export const ponds: Rect[] = [{ x: 33, y: 30, w: 6, h: 5 }];

/** Footprint of the fountain in the middle of the square. */
export const fountainBasin: Rect = { x: 28, y: 19, w: 4, h: 4 };

// ── The five portfolio locations ──────────────────────────────────────────

export const buildings: BuildingPlacement[] = [
  {
    location: "arena", prop: "domeHall", x: 12, y: 3,
    sign: "ArcClash Arena", signAt: { x: 16, y: 14 }, entrance: { x: 13, y: 11 },
  },
  {
    location: "arcade", prop: "lanternHall", x: 41, y: 6,
    sign: "AnimeGuess Arcade", signAt: { x: 37, y: 10 }, entrance: { x: 42, y: 9 },
  },
  {
    location: "academy", prop: "grandHall", x: 5, y: 14,
    sign: "Skills Academy", signAt: { x: 10, y: 23 }, entrance: { x: 6, y: 20 },
  },
  {
    location: "house", prop: "cottage", x: 20, y: 31,
    sign: "About Me", signAt: { x: 25, y: 37 }, entrance: { x: 21, y: 34 },
  },
  {
    location: "post-office", prop: "lodge", x: 49, y: 16,
    sign: "Contact Center", signAt: { x: 46, y: 23 }, entrance: { x: 50, y: 20 },
  },
];

// ── Props ─────────────────────────────────────────────────────────────────

const row = (prop: PropName, y: number, from: number, to: number): Placement[] =>
  Array.from({ length: to - from + 1 }, (_, i) => ({ prop, x: from + i, y }));

const column = (prop: PropName, x: number, from: number, to: number): Placement[] =>
  Array.from({ length: to - from + 1 }, (_, i) => ({ prop, x, y: from + i }));

const arena: Placement[] = [
  ...row("palisade", 2, 5, 20),
  ...column("palisadePost", 5, 4, 9),
  ...column("palisadePost", 20, 4, 9),
  ...row("palisade", 9, 5, 11),
  ...row("palisade", 9, 15, 20),
  { prop: "stoneArch", x: 12, y: 8 },
  { prop: "watchtower", x: 4, y: 1 },
  { prop: "watchtower", x: 19, y: 1 },
  { prop: "bannerRed", x: 8, y: 2, front: true },
  { prop: "bannerRed", x: 17, y: 2, front: true },
  { prop: "bannerRed", x: 11, y: 9, front: true },
  { prop: "bannerRed", x: 15, y: 9, front: true },
  { prop: "weaponTable", x: 7, y: 4 },
  { prop: "scarecrow", x: 8, y: 7 },
  { prop: "scarecrow", x: 10, y: 6 },
  { prop: "scarecrow", x: 17, y: 7 },
  { prop: "barrel", x: 18, y: 4 },
  { prop: "crate", x: 19, y: 4 },
];

const arcade: Placement[] = [
  { prop: "treeCherry", x: 38, y: 6 },
  { prop: "treeCherry", x: 45, y: 5 },
  { prop: "clumpPink", x: 35, y: 2 },
  { prop: "bannerPurple", x: 40, y: 7, front: true },
  { prop: "bannerYellow", x: 45, y: 7, front: true },
  { prop: "noodleStall", x: 48, y: 7 },
  { prop: "barrel", x: 47, y: 9 },
  { prop: "bucket", x: 51, y: 9 },
];

const academy: Placement[] = [
  { prop: "bannerTeal", x: 4, y: 18, front: true },
  { prop: "bannerTeal", x: 9, y: 18, front: true },
  { prop: "sageStatue", x: 11, y: 16 },
  { prop: "bush", x: 10, y: 18 },
  { prop: "bush", x: 13, y: 18 },
  { prop: "treeBigGreen", x: 1, y: 11 },
];

const contact: Placement[] = [
  { prop: "mailbox", x: 48, y: 19 },
  { prop: "noticeBoard", x: 53, y: 19 },
  { prop: "crate", x: 53, y: 17 },
  { prop: "crate", x: 54, y: 18 },
  { prop: "barrel", x: 54, y: 17 },
  { prop: "hay", x: 55, y: 21 },
];

const home: Placement[] = [
  ...row("railFence", 30, 13, 18),
  ...row("railFence", 35, 13, 18),
  { prop: "sunflower", x: 14, y: 32 },
  { prop: "sunflower", x: 15, y: 32 },
  { prop: "tulip", x: 16, y: 32 },
  { prop: "tulip", x: 17, y: 33 },
  { prop: "whiteFlower", x: 14, y: 34 },
  { prop: "whiteFlower", x: 16, y: 34 },
  { prop: "clothesline", x: 24, y: 31 },
  { prop: "bench", x: 33, y: 28 },
  { prop: "basket", x: 19, y: 33 },
  { prop: "treeBigAutumn", x: 24, y: 27 },
  { prop: "treeOak", x: 39, y: 29 },
];

const square: Placement[] = [
  { prop: "signpost", x: 27, y: 24 },
  { prop: "bench", x: 24, y: 16 },
  { prop: "bench", x: 32, y: 16 },
  { prop: "cart", x: 34, y: 23 },
  { prop: "crate", x: 24, y: 24 },
  { prop: "basket", x: 25, y: 25 },
];

const villageHouses: Placement[] = [
  { prop: "houseBeige", x: 15, y: 14 },
  { prop: "houseRed", x: 36, y: 15 },
  { prop: "stump", x: 19, y: 16 },
  { prop: "barrel", x: 40, y: 17 },
];

const scenery: Placement[] = [
  { prop: "treeBigAutumn", x: 23, y: 4 },
  { prop: "treeBigGreen", x: 31, y: 3 },
  { prop: "treeRound", x: 27, y: 6 },
  { prop: "clumpGreen", x: 52, y: 10 },
  { prop: "treeBigGreen", x: 55, y: 25 },
  { prop: "clumpGreen", x: 47, y: 30 },
  { prop: "treeBigPink", x: 42, y: 33 },
  { prop: "clumpPine", x: 5, y: 33 },
  { prop: "treeBigAutumn", x: 1, y: 24 },
  { prop: "treeOak", x: 20, y: 24 },
  { prop: "treeLight", x: 40, y: 23 },
  { prop: "treeRound", x: 13, y: 26 },
  { prop: "treeLight", x: 50, y: 25 },
  { prop: "rock", x: 21, y: 9 },
  { prop: "rock", x: 52, y: 14 },
  { prop: "rock", x: 9, y: 28 },
  { prop: "stump", x: 44, y: 27 },
  { prop: "bush", x: 37, y: 9 },
  { prop: "bush", x: 26, y: 13 },
  { prop: "bush", x: 33, y: 13 },
  { prop: "bushSmall", x: 23, y: 22 },
  { prop: "bushSmall", x: 36, y: 25 },
  { prop: "fern", x: 31, y: 28 },
  { prop: "fern", x: 27, y: 29 },
  { prop: "sunflower", x: 39, y: 36 },
  { prop: "tulip", x: 32, y: 37 },
];

/** A dense, seamless tree line around the map edge. */
function forestBorder(): Placement[] {
  const trees: Placement[] = [];
  const kinds: PropName[] = ["treePine", "treeRound", "treePine", "treeLight"];
  let i = 0;
  const pick = () => kinds[i++ % kinds.length];
  for (let x = -1; x < MAP_WIDTH; x += 1.5) {
    trees.push({ prop: pick(), x, y: -1 });
    trees.push({ prop: pick(), x: x + 0.75, y: MAP_HEIGHT - 2 });
    trees.push({ prop: pick(), x, y: MAP_HEIGHT - 1 });
  }
  for (let y = 0.5; y < MAP_HEIGHT - 2; y += 1.5) {
    trees.push({ prop: pick(), x: -1, y });
    trees.push({ prop: pick(), x: MAP_WIDTH - 1, y });
    trees.push({ prop: pick(), x: MAP_WIDTH - 2.25, y: y + 0.75 });
  }
  return trees;
}

export const placements: Placement[] = [
  ...arena, ...arcade, ...academy, ...contact, ...home, ...square,
  ...villageHouses, ...scenery, ...forestBorder(),
];

// ── Life ──────────────────────────────────────────────────────────────────

export const spawn: Point = { x: 29.5, y: 24.5 };

export const npcs: NpcPlacement[] = [
  { sprite: "oldman", x: 26.5, y: 22.5, facing: "down", wander: 0 },   // village guide
  { sprite: "gladiator", x: 14.5, y: 7, facing: "down", wander: 2 },
  { sprite: "princess", x: 45.5, y: 11, facing: "left", wander: 2 },
  { sprite: "monk", x: 11, y: 21, facing: "down", wander: 2 },
  { sprite: "inspector", x: 47.5, y: 21, facing: "right", wander: 1 },
  { sprite: "woman", x: 19.5, y: 36.5, facing: "down", wander: 2 },
  { sprite: "villager3", x: 31.5, y: 31.5, facing: "right", wander: 2 },
  { sprite: "villager4", x: 33, y: 19, facing: "left", wander: 2 },
];

export const animals: AnimalPlacement[] = [
  { sprite: "cat", x: 25.5, y: 17.8, wander: 0 },
  { sprite: "dog", x: 26, y: 35, wander: 2 },
  { sprite: "chicken", x: 56, y: 22.5, wander: 2 },
  { sprite: "chicken", x: 57.5, y: 23.5, wander: 2 },
  { sprite: "chicken", x: 55, y: 24, wander: 2 },
];

export const effects: EffectPlacement[] = [
  // Flags on the arena watchtowers, the contact lodge and the arcade
  { effect: "flagRed", x: 4.5, y: 0.3, fps: 8, above: { x: 0, y: 2 } },
  { effect: "flagRed", x: 20.5, y: 0.3, fps: 8, above: { x: 0, y: 2 } },
  { effect: "flagYellow", x: 51.6, y: 14.8, fps: 8, above: { x: 0, y: 2 } },
  { effect: "flagWhite", x: 43, y: 4.8, fps: 7, above: { x: 0, y: 2 } },
  // Animated daisies in the garden and around the square
  { effect: "daisy", x: 15, y: 33, fps: 4 },
  { effect: "daisy", x: 17, y: 31, fps: 4 },
  { effect: "daisy", x: 23, y: 18, fps: 4 },
  { effect: "daisy", x: 36, y: 17, fps: 4 },
  { effect: "daisy", x: 37, y: 33, fps: 4 },
  { effect: "daisy", x: 12, y: 24, fps: 4 },
];

/** Where chimney smoke rises from (pixel offsets inside the cottage roof). */
export const chimneys: Point[] = [{ x: 22.6, y: 30.6 }, { x: 16.6, y: 13.4 }];

/** Fire bowls flanking the arena gate. */
export const braziers: Point[] = [{ x: 10.9, y: 11 }, { x: 15.4, y: 11 }];

/** Lantern glow in front of the arcade. */
export const arcadeGlow: Point = { x: 43, y: 8.2 };
