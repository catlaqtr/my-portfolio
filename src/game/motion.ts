/**
 * Reduced motion for the village. Follows the system "reduce motion" setting
 * unless the visitor flips the in-game toggle, which is remembered in
 * localStorage. Phaser (ambience, travel fades) and React (typewriter,
 * CSS animations) both read and subscribe to it.
 */
const KEY = "hearthvale:reduce-motion";
const listeners = new Set<(reduced: boolean) => void>();

const systemPrefersReduced = () =>
  typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

function stored(): boolean | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === null ? null : v === "1";
  } catch {
    return null; // storage blocked (private mode etc.)
  }
}

export function reducedMotion(): boolean {
  return stored() ?? systemPrefersReduced();
}

export function setReducedMotion(reduced: boolean) {
  try {
    window.localStorage.setItem(KEY, reduced ? "1" : "0");
  } catch {
    // Not persisted, but still applied for this visit.
  }
  applyToDocument(reduced);
  for (const fn of listeners) fn(reduced);
}

export function onReducedMotionChange(fn: (reduced: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Lets CSS switch off animations too (see the [data-reduce-motion] rule in index.css). */
export function applyToDocument(reduced = reducedMotion()) {
  if (typeof document === "undefined") return;
  document.documentElement.toggleAttribute("data-reduce-motion", reduced);
}
