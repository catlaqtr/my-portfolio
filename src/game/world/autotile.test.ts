import { describe, expect, it } from "vitest";
import { neighboursOf, pieceFor, tileIndex, type TerrainSet } from "./autotile";

/** Builds a lookup from an ASCII picture where `#` marks the region. */
function grid(rows: string[]) {
  return (x: number, y: number) => rows[y]?.[x] === "#";
}

const pieceAt = (rows: string[], x: number, y: number) => pieceFor(neighboursOf(grid(rows), x, y));

describe("pieceFor", () => {
  const block = [
    ".....",
    ".###.",
    ".###.",
    ".###.",
    ".....",
  ];

  it("picks corners, edges and centre of a solid block", () => {
    expect(pieceAt(block, 1, 1)).toBe("nw");
    expect(pieceAt(block, 2, 1)).toBe("n");
    expect(pieceAt(block, 3, 1)).toBe("ne");
    expect(pieceAt(block, 1, 2)).toBe("w");
    expect(pieceAt(block, 2, 2)).toBe("center");
    expect(pieceAt(block, 3, 2)).toBe("e");
    expect(pieceAt(block, 1, 3)).toBe("sw");
    expect(pieceAt(block, 2, 3)).toBe("s");
    expect(pieceAt(block, 3, 3)).toBe("se");
  });

  it("handles one-tile-wide strips and single tiles", () => {
    const shapes = [
      ".......",
      ".###.#.",
      ".....#.",
      "..#..#.",
      ".......",
    ];
    expect(pieceAt(shapes, 1, 1)).toBe("h-w");
    expect(pieceAt(shapes, 2, 1)).toBe("h-mid");
    expect(pieceAt(shapes, 3, 1)).toBe("h-e");
    expect(pieceAt(shapes, 5, 1)).toBe("v-n");
    expect(pieceAt(shapes, 5, 2)).toBe("v-mid");
    expect(pieceAt(shapes, 5, 3)).toBe("v-s");
    expect(pieceAt(shapes, 2, 3)).toBe("single");
  });

  it("uses inner corners where two roads meet", () => {
    // A road running east with a road branching north from it.
    const junction = [
      "...##...",
      "...##...",
      "########",
      "########",
    ];
    expect(pieceAt(junction, 2, 2)).toBe("n");
    // Grass sits in the top-left corner of the tile just right of the bend…
    expect(pieceAt(junction, 3, 2)).toBe("inner-nw");
    // …and in the top-right corner of the tile on the other side.
    expect(pieceAt(junction, 4, 2)).toBe("inner-ne");
  });
});

describe("tileIndex", () => {
  const dirt: TerrainSet = {
    columns: 22,
    origin: [0, 7],
    inner: { se: [5, 1], sw: [6, 1], ne: [5, 2], nw: [6, 2] },
  };

  it("offsets the layout from the set's origin", () => {
    expect(tileIndex(dirt, "nw")).toBe(7 * 22 + 0);
    expect(tileIndex(dirt, "center")).toBe(8 * 22 + 1);
    expect(tileIndex(dirt, "single")).toBe(10 * 22 + 3);
    expect(tileIndex(dirt, "inner-nw")).toBe(9 * 22 + 6);
  });

  it("falls back to the centre tile when a set has no inner corners", () => {
    const pond: TerrainSet = { columns: 28, origin: [0, 6] };
    expect(tileIndex(pond, "inner-se")).toBe(tileIndex(pond, "center"));
  });
});
