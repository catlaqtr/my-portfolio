import type { Interactable } from "../bridge";
import type { LocationId } from "../../content/locations";
import type { NpcId, Point, Rect } from "./layout";

export interface LocationZone {
  id: LocationId;
  /** Area in pixels in front of the door where the player can interact. */
  area: Rect;
}

export interface NpcSpot {
  id: NpcId;
  /** Feet position in pixels. */
  at: Point;
}

/** How close (in px) the player's reach has to be to a villager to talk. */
export const TALK_RADIUS = 18;

const inside = (r: Rect, p: Point) => p.x >= r.x && p.x < r.x + r.w && p.y >= r.y && p.y < r.y + r.h;

/**
 * Picks what the player can interact with. `feet` is the player's position;
 * `reach` is a point a little ahead of them in the direction they face.
 * Doors win over villagers; among villagers the closest one wins.
 */
export function findInteractable(
  feet: Point,
  reach: Point,
  zones: LocationZone[],
  npcs: NpcSpot[],
): Interactable | null {
  const zone = zones.find((z) => inside(z.area, reach) || inside(z.area, feet));
  if (zone) return { kind: "location", id: zone.id };

  let best: NpcSpot | null = null;
  let bestDist = TALK_RADIUS;
  for (const npc of npcs) {
    const d = Math.hypot(npc.at.x - reach.x, npc.at.y - reach.y);
    if (d <= bestDist) {
      best = npc;
      bestDist = d;
    }
  }
  return best ? { kind: "npc", id: best.id } : null;
}

export const sameInteractable = (a: Interactable | null, b: Interactable | null) =>
  a?.kind === b?.kind && a?.id === b?.id;
