/**
 * Every texture the village uses, curated from the Ninja Adventure pack
 * (CC0, by Pixel-boy & AAA). Importing through Vite gives hashed,
 * long-cacheable URLs.
 */
import floor from "../assets/game/tiles/floor.png";
import water from "../assets/game/tiles/water.png";
import house from "../assets/game/tiles/house.png";
import nature from "../assets/game/tiles/nature.png";
import element from "../assets/game/tiles/element.png";
import towers from "../assets/game/tiles/towers.png";
import floorDetail from "../assets/game/tiles/floor-detail.png";
import font8x8 from "../assets/game/ui/font8x8.png";
import boy from "../assets/game/chars/boy.png";
import oldman from "../assets/game/chars/oldman.png";
import woman from "../assets/game/chars/woman.png";
import villager4 from "../assets/game/chars/villager4.png";
import monk from "../assets/game/chars/monk.png";
import inspector from "../assets/game/chars/inspector.png";
import gladiator from "../assets/game/chars/gladiatorblue.png";
import villager3 from "../assets/game/chars/villager3.png";
import princess from "../assets/game/chars/princess.png";
import shadow from "../assets/game/chars/shadow.png";
import cat from "../assets/game/chars/cat.png";
import dog from "../assets/game/chars/dog.png";
import chicken from "../assets/game/chars/chicken.png";
import flagRed from "../assets/game/anim/flag-red.png";
import flagYellow from "../assets/game/anim/flag-yellow.png";
import flagWhite from "../assets/game/anim/flag-white.png";
import ripples from "../assets/game/anim/ripples.png";
import daisy from "../assets/game/anim/daisy.png";
import smoke from "../assets/game/fx/smoke.png";
import leaf from "../assets/game/fx/leaf.png";
import leafPink from "../assets/game/fx/leaf-pink.png";
import spark from "../assets/game/fx/spark.png";
import fire from "../assets/game/fx/fire.png";
import cloud from "../assets/game/fx/cloud.png";

export const TILE = 16;

export const images = {
  floor, water, house, nature, element, towers, floorDetail, font8x8, shadow, cloud,
} as const;
export type ImageKey = keyof typeof images;

const sheet = (url: string, frameWidth: number, frameHeight = frameWidth) => ({
  url, frameWidth, frameHeight,
});

export const characters = {
  boy: sheet(boy, 16), oldman: sheet(oldman, 16), woman: sheet(woman, 16),
  villager4: sheet(villager4, 16), monk: sheet(monk, 16), inspector: sheet(inspector, 16),
  gladiator: sheet(gladiator, 16), villager3: sheet(villager3, 16), princess: sheet(princess, 16),
} as const;
export type CharacterKey = keyof typeof characters;

export const animals = {
  cat: sheet(cat, 16), dog: sheet(dog, 16), chicken: sheet(chicken, 16),
} as const;
export type AnimalKey = keyof typeof animals;

export const effects = {
  flagRed: sheet(flagRed, 16),
  flagYellow: sheet(flagYellow, 16), flagWhite: sheet(flagWhite, 16),
  ripples: sheet(ripples, 16), daisy: sheet(daisy, 16),
  smoke: sheet(smoke, 32), leaf: sheet(leaf, 12, 7), leafPink: sheet(leafPink, 12, 7),
  spark: sheet(spark, 10, 8), fire: sheet(fire, 8, 12),
} as const;
export type EffectKey = keyof typeof effects;

/** A collision rectangle in pixels, relative to the sprite's top-left. */
export type Body = [x: number, y: number, w: number, h: number];

export interface PropDef {
  sheet: ImageKey;
  /** Source rectangle in tiles. */
  col: number;
  row: number;
  w: number;
  h: number;
  bodies?: Body[];
}

/** A prop whose solid part is the bottom `rows` tile rows (inset `inset` px each side). */
function solid(sheet: ImageKey, col: number, row: number, w: number, h: number, rows = 1, inset = 1): PropDef {
  return {
    sheet, col, row, w, h,
    bodies: [[inset, (h - rows) * TILE, w * TILE - inset * 2, rows * TILE]],
  };
}

/** Trees: only a small trunk area at the bottom-centre blocks movement. */
function tree(col: number, row: number, w: number, h: number): PropDef {
  const width = w * TILE;
  return { sheet: "nature", col, row, w, h, bodies: [[width / 2 - 6, h * TILE - 9, 12, 7]] };
}

const decor = (sheet: ImageKey, col: number, row: number, w = 1, h = 1): PropDef => ({
  sheet, col, row, w, h,
});

export const props = {
  // Buildings (the solid part leaves the roof walkable-behind)
  cottage: solid("house", 0, 0, 4, 3, 2, 2),
  houseBeige: solid("house", 4, 0, 4, 3, 2, 2),
  houseRed: solid("house", 12, 0, 4, 3, 2, 2),
  noodleStall: solid("house", 16, 0, 3, 3, 2, 2),
  lanternHall: solid("house", 19, 0, 4, 3, 2, 2),
  domeHall: solid("house", 23, 0, 3, 3, 2, 2),
  lodge: { sheet: "house", col: 29, row: 0, w: 4, h: 4, bodies: [[2, 24, 60, 40]] },
  grandHall: solid("house", 25, 8, 4, 6, 3, 2),
  stoneArch: { sheet: "house", col: 29, row: 20, w: 3, h: 3, bodies: [[0, 26, 12, 22], [36, 26, 12, 22]] },
  palisade: solid("house", 23, 12, 1, 2, 1, 0),
  palisadePost: solid("house", 23, 14, 1, 1, 1, 2),
  watchtower: { sheet: "towers", col: 0, row: 0, w: 2, h: 2, bodies: [[5, 18, 22, 12]] },
  sageStatue: solid("house", 3, 15, 2, 2, 1, 3),
  weaponTable: solid("house", 29, 8, 2, 2, 1, 2),
  bannerRed: decor("house", 23, 20, 1, 2),
  bannerTeal: decor("house", 24, 20, 1, 2),
  bannerGreen: decor("house", 25, 20, 1, 2),
  bannerPurple: decor("house", 27, 20, 1, 2),
  bannerYellow: decor("house", 28, 20, 1, 2),
  railFence: solid("house", 11, 7, 1, 1, 1, 0),

  // Nature
  treeRound: tree(0, 0, 2, 2),
  treePine: tree(2, 0, 2, 2),
  treeCherry: tree(14, 0, 2, 2),
  treeLight: tree(16, 0, 2, 2),
  treeOak: tree(6, 8, 2, 2),
  treeBigGreen: tree(3, 18, 3, 3),
  treeBigAutumn: tree(9, 18, 3, 3),
  treeBigPink: tree(0, 18, 3, 3),
  clumpGreen: { sheet: "nature", col: 16, row: 2, w: 4, h: 3, bodies: [[8, 34, 48, 12]] },
  clumpPink: { sheet: "nature", col: 12, row: 2, w: 4, h: 3, bodies: [[8, 34, 48, 12]] },
  clumpPine: { sheet: "nature", col: 0, row: 2, w: 4, h: 3, bodies: [[8, 34, 48, 12]] },
  bush: solid("nature", 0, 10, 1, 1, 1, 2),
  bushSmall: decor("nature", 2, 10),
  fern: decor("nature", 4, 10),
  sunflower: decor("nature", 0, 11),
  tulip: decor("nature", 3, 11),
  whiteFlower: decor("nature", 6, 11),
  rock: solid("nature", 5, 13, 1, 1, 1, 2),
  stump: solid("nature", 4, 8, 1, 1, 1, 3),

  // Village props
  crate: solid("element", 0, 0, 1, 1),
  barrel: solid("element", 12, 0, 1, 1),
  bucket: decor("element", 5, 0),
  mailbox: solid("element", 13, 0, 1, 1, 1, 4),
  scarecrow: solid("element", 15, 0, 1, 1, 1, 4),
  noticeBoard: solid("element", 8, 0, 1, 1),
  basket: decor("element", 8, 1),
  bench: solid("element", 11, 1, 4, 1, 1, 2),
  signpost: { sheet: "element", col: 6, row: 3, w: 1, h: 2, bodies: [[5, 24, 6, 6]] },
  cart: solid("element", 0, 3, 2, 2, 1, 2),
  hay: solid("element", 4, 3, 2, 2, 1, 2),
  clothesline: decor("element", 14, 2, 2, 2),
} as const satisfies Record<string, PropDef>;

export type PropName = keyof typeof props;

/** Small ground decals (no collision) scattered over grass. */
export const decals = {
  sheet: "floorDetail" as const,
  frames: [
    [0, 2], [1, 2], [2, 2], [3, 2], [5, 2], [6, 2], [7, 2], [4, 2],
  ] as [number, number][],
};

/** Terrain sets used by the tilemap layers. */
export const terrain = {
  floorColumns: 22,
  waterColumns: 28,
  grass: { plain: [0, 12] as [number, number], variants: [[1, 12], [2, 12], [3, 12], [4, 12], [2, 11], [3, 11]] as [number, number][] },
  dirt: {
    columns: 22,
    origin: [0, 7] as [number, number],
    inner: { se: [5, 1], sw: [6, 1], ne: [5, 2], nw: [6, 2] } as Record<"nw" | "ne" | "sw" | "se", [number, number]>,
  },
  pond: { columns: 28, origin: [0, 6] as [number, number] },
};
