import type { Interactable } from "../bridge";
import { getLocation } from "../../content/locations";
import { dialogue } from "../world/dialogue";

function promptLabel(target: Interactable) {
  return target.kind === "location"
    ? `Enter ${getLocation(target.id).name}`
    : `Talk to ${dialogue[target.id].name}`;
}

/**
 * "[E] Enter ArcClash Arena" — shown while the player stands at a door or
 * next to a villager. It's also a button, so it can be clicked or tapped.
 */
function InteractPrompt({ target, onActivate }: { target: Interactable | null; onActivate: () => void }) {
  const label = target ? promptLabel(target) : "";
  return (
    <>
      <p aria-live="polite" className="sr-only">
        {target ? `${label}: press E, Space or Enter.` : ""}
      </p>
      {target && (
        <button
          type="button"
          onClick={onActivate}
          // Don't steal keyboard focus from the game when clicked.
          onMouseDown={(e) => e.preventDefault()}
          className="pointer-events-auto absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-3 border-4 border-bark bg-parchment px-4 py-2 text-bark shadow-[0_4px_0_#1e0f07] motion-safe:animate-[prompt-in_160ms_ease-out] sm:bottom-20"
        >
          <kbd className="grid h-8 min-w-8 place-items-center border-2 border-bark bg-bark px-1.5 font-pixel text-[18px] text-parchment shadow-[0_2px_0_#1e0f07]">
            E
          </kbd>
          <span className="whitespace-nowrap font-pixel text-[18px] uppercase [word-spacing:0.4em]">{label}</span>
        </button>
      )}
    </>
  );
}

export default InteractPrompt;
