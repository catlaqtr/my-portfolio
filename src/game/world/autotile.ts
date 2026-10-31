/**
 * Picks the right edge/corner tile for terrain drawn as filled regions
 * (dirt paths, ponds). Every Ninja Adventure terrain set uses the same
 * relative layout, so a set is described by its top-left tile plus where
 * its optional inner-corner tiles live.
 *
 *   (0,0) (1,0) (2,0) (3,0)     3x3 block: outer corners + edges + centre
 *   (0,1) (1,1) (2,1) (3,1)     column 3:  1-tile-wide vertical strip
 *   (0,2) (1,2) (2,2) (3,2)     row 3:     1-tile-tall horizontal strip
 *   (0,3) (1,3) (2,3) (3,3)     (3,3):     isolated single tile
 */

export type TilePiece =
  | "center"
  | "n" | "s" | "e" | "w"
  | "nw" | "ne" | "sw" | "se"
  | "h-w" | "h-mid" | "h-e"
  | "v-n" | "v-mid" | "v-s"
  | "single"
  /** Centre tile whose one diagonal neighbour is missing (concave corner). */
  | "inner-nw" | "inner-ne" | "inner-sw" | "inner-se";

const BASE_LAYOUT: Record<Exclude<TilePiece, `inner-${string}`>, [number, number]> = {
  nw: [0, 0], n: [1, 0], ne: [2, 0],
  w: [0, 1], center: [1, 1], e: [2, 1],
  sw: [0, 2], s: [1, 2], se: [2, 2],
  "v-n": [3, 0], "v-mid": [3, 1], "v-s": [3, 2],
  "h-w": [0, 3], "h-mid": [1, 3], "h-e": [2, 3],
  single: [3, 3],
};

export interface TerrainSet {
  /** Columns in the source tileset image. */
  columns: number;
  /** Top-left tile of the 4x4 layout above. */
  origin: [number, number];
  /** Inner corners, relative to `origin`. Sets without them fall back to the centre tile. */
  inner?: Record<"nw" | "ne" | "sw" | "se", [number, number]>;
}

/** Which of the 8 neighbours belong to the same region. */
export interface Neighbours {
  n: boolean; e: boolean; s: boolean; w: boolean;
  ne: boolean; nw: boolean; se: boolean; sw: boolean;
}

export function pieceFor(nb: Neighbours): TilePiece {
  const { n, e, s, w } = nb;
  if (n && e && s && w) {
    if (!nb.nw) return "inner-nw";
    if (!nb.ne) return "inner-ne";
    if (!nb.sw) return "inner-sw";
    if (!nb.se) return "inner-se";
    return "center";
  }
  // Horizontal strip (no north or south neighbour).
  if (!n && !s) {
    if (e && w) return "h-mid";
    if (e) return "h-w";
    if (w) return "h-e";
    return "single";
  }
  // Vertical strip (no east or west neighbour).
  if (!e && !w) {
    if (n && s) return "v-mid";
    if (s) return "v-n";
    return "v-s";
  }
  if (!n) return !w ? "nw" : !e ? "ne" : "n";
  if (!s) return !w ? "sw" : !e ? "se" : "s";
  return !w ? "w" : "e";
}

/** Zero-based tile index of `piece` within the set's tileset image. */
export function tileIndex(set: TerrainSet, piece: TilePiece): number {
  let rel: [number, number];
  if (piece.startsWith("inner-")) {
    const corner = piece.slice("inner-".length) as keyof NonNullable<TerrainSet["inner"]>;
    rel = set.inner?.[corner] ?? BASE_LAYOUT.center;
  } else {
    rel = BASE_LAYOUT[piece as keyof typeof BASE_LAYOUT];
  }
  const [col, row] = [set.origin[0] + rel[0], set.origin[1] + rel[1]];
  return row * set.columns + col;
}

export function neighboursOf(
  isSame: (x: number, y: number) => boolean,
  x: number,
  y: number,
): Neighbours {
  return {
    n: isSame(x, y - 1), s: isSame(x, y + 1),
    e: isSame(x + 1, y), w: isSame(x - 1, y),
    ne: isSame(x + 1, y - 1), nw: isSame(x - 1, y - 1),
    se: isSame(x + 1, y + 1), sw: isSame(x - 1, y + 1),
  };
}
