import type { LocationId } from "../content/locations";
import type { NpcId } from "./world/layout";

/** Something the player can interact with. */
export type Interactable =
  | { kind: "location"; id: LocationId }
  | { kind: "npc"; id: NpcId };

/**
 * What React has open on top of the village:
 * - `dialogue`: the village stays visible and animated, the player waits.
 * - `panel`: a building panel or the map covers the view, so the game
 *   loop sleeps to save battery.
 */
export type ModalState = false | "dialogue" | "panel";

/**
 * Messages between Phaser and React. Phaser reports loading progress, what
 * the player is standing next to and when they interact; React reports
 * what's open on top of the game and relays touch controls.
 */
export interface BridgeEvents {
  /** Phaser → React: asset loading progress, 0 to 1. */
  loading: number;
  /** Phaser → React: the village is built and playable. */
  ready: true;
  /** Phaser → React: the interactable in reach changed (null = nothing). */
  focus: Interactable | null;
  /** Phaser → React: the player pressed E / Space / Enter (or the A button). */
  interact: Interactable;
  /** React → Phaser: what's open on top of the village. */
  modal: ModalState;
  /** React → Phaser: touch joystick direction; length 0 (still) to 1 (full speed). */
  move: { x: number; y: number };
  /** React → Phaser: the on-screen A button was pressed. */
  action: true;
}

type Listener<K extends keyof BridgeEvents> = (payload: BridgeEvents[K]) => void;

export class Bridge {
  // Typed at the method boundaries; stored loosely.
  private listeners = new Map<keyof BridgeEvents, Set<(payload: never) => void>>();

  on<K extends keyof BridgeEvents>(event: K, fn: Listener<K>): () => void {
    let set = this.listeners.get(event);
    if (!set) this.listeners.set(event, (set = new Set()));
    set.add(fn as (payload: never) => void);
    return () => set.delete(fn as (payload: never) => void);
  }

  emit<K extends keyof BridgeEvents>(event: K, payload: BridgeEvents[K]) {
    for (const fn of this.listeners.get(event) ?? []) (fn as Listener<K>)(payload);
  }
}

/** Key under which the bridge is stored in the Phaser game registry. */
export const BRIDGE_KEY = "bridge";
