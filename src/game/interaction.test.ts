import { describe, expect, it, vi } from "vitest";
import { Bridge } from "./bridge";
import { TALK_RADIUS, findInteractable, sameInteractable, type LocationZone, type NpcSpot } from "./world/interaction";
import { dialogue } from "./world/dialogue";
import { buildings, fountainBasin, npcs } from "./world/layout";
import { locations } from "../content/locations";

describe("Bridge", () => {
  it("delivers events to listeners until they unsubscribe", () => {
    const bridge = new Bridge();
    const seen = vi.fn();
    const off = bridge.on("modal", seen);
    bridge.emit("modal", "panel");
    off();
    bridge.emit("modal", false);
    expect(seen).toHaveBeenCalledTimes(1);
    expect(seen).toHaveBeenCalledWith("panel");
  });
});

describe("findInteractable", () => {
  const zones: LocationZone[] = [{ id: "arena", area: { x: 0, y: 0, w: 48, h: 32 } }];
  const villagers: NpcSpot[] = [
    { id: "guide", at: { x: 200, y: 200 } },
    { id: "townsfolk", at: { x: 212, y: 200 } },
  ];
  const far = { x: 500, y: 500 };

  it("finds a door when the player stands in front of it", () => {
    expect(findInteractable({ x: 20, y: 40 }, { x: 20, y: 30 }, zones, villagers)).toEqual({ kind: "location", id: "arena" });
  });

  it("finds the closest villager within reach", () => {
    expect(findInteractable(far, { x: 210, y: 201 }, zones, villagers)).toEqual({ kind: "npc", id: "townsfolk" });
    expect(findInteractable(far, { x: 199, y: 205 }, zones, villagers)).toEqual({ kind: "npc", id: "guide" });
  });

  it("ignores villagers out of reach", () => {
    expect(findInteractable(far, { x: 200, y: 200 + TALK_RADIUS + 1 }, zones, villagers)).toBeNull();
  });

  it("prefers a door over a villager standing in it", () => {
    const inDoor: NpcSpot[] = [{ id: "guide", at: { x: 22, y: 30 } }];
    expect(findInteractable({ x: 20, y: 40 }, { x: 20, y: 30 }, zones, inDoor)?.kind).toBe("location");
  });

  it("compares interactables by kind and id", () => {
    expect(sameInteractable({ kind: "npc", id: "guide" }, { kind: "npc", id: "guide" })).toBe(true);
    expect(sameInteractable({ kind: "npc", id: "guide" }, null)).toBe(false);
    expect(sameInteractable(null, null)).toBe(true);
  });
});

describe("village content", () => {
  it("gives every villager something to say", () => {
    for (const npc of npcs) {
      expect(dialogue[npc.id].lines.length, npc.id).toBeGreaterThan(0);
    }
  });

  it("puts the guide next to the fountain", () => {
    const guide = npcs.find((n) => n.id === "guide")!;
    const cx = fountainBasin.x + fountainBasin.w / 2;
    const cy = fountainBasin.y + fountainBasin.h / 2;
    expect(Math.hypot(guide.x - cx, guide.y - cy)).toBeLessThan(5);
  });

  it("makes all five locations enterable", () => {
    expect(buildings.map((b) => b.location).sort()).toEqual(locations.map((l) => l.id).sort());
  });
});
