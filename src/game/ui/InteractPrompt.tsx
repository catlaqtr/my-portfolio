import type { Interactable } from "../bridge";
import { getLocation } from "../../content/locations";
import { dialogue } from "../world/dialogue";
import KeyIcon from "./KeyIcon";

function promptLabel(target: Interactable) {
  return target.kind === "location"
    ? `Enter ${getLocation(target.id).name}`
    : `Talk to ${dialogue[target.id].name}`;
}

/**
 * "[E] Enter ArcClash Arena" — shown while the player stands at a door or
 * next to a villager. It's also a button, so it can be clicked or tapped.
 */
function InteractPrompt({ target, touch, onActivate }: { target: Interactable | null; touch: boolean; onActivate: () => void }) {
  const label = target ? promptLabel(target) : "";
  // On touch screens the A button already says "Enter"/"Talk"; show just the name.
  const shown = !target ? "" : touch ? target.kind === "location" ? getLocation(target.id).name : dialogue[target.id].name : label;
  return (
    <>
      <p aria-live="polite" className="sr-only">
        {target ? `${label}: ${touch ? "tap the A button" : "press E, Space or Enter"}.` : ""}
      </p>
      {target && (
        <button
          type="button"
          onClick={onActivate}
          // Don't steal keyboard focus from the game when clicked.
          onMouseDown={(e) => e.preventDefault()}
          className={`pixel-frame pointer-events-auto absolute left-1/2 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-3 text-bark motion-safe:animate-[prompt-in_160ms_ease-out] ${
            touch ? "bottom-[calc(10rem+env(safe-area-inset-bottom))]" : "bottom-16 sm:bottom-20"
          }`}
        >
          <KeyIcon k={touch ? "gamepadA" : "e"} />
          <span className="whitespace-nowrap font-pixel text-[18px] uppercase leading-6 [word-spacing:0.4em]">{shown}</span>
        </button>
      )}
    </>
  );
}

export default InteractPrompt;
