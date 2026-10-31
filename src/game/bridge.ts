import type { LocationId } from "../content/locations";
import type { NpcId } from "./world/layout";

/** Something the player can interact with. */
export type Interactable =
  | { kind: "location"; id: LocationId }
  | { kind: "npc"; id: NpcId };

/**
 * Messages between Phaser and React. Phaser reports what the player is
 * standing next to and when they interact; React reports when a panel or
 * dialogue is open so the game can pause player input.
 */
export interface BridgeEvents {
  /** Phaser → React: the interactable in reach changed (null = nothing). */
  focus: Interactable | null;
  /** Phaser → React: the player pressed E / Space / Enter. */
  interact: Interactable;
  /** React → Phaser: a panel, dialogue or menu is open. */
  modal: boolean;
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
