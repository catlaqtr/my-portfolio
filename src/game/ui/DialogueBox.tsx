import { useEffect, useState, type KeyboardEvent } from "react";
import { dialogue } from "../world/dialogue";
import type { NpcId } from "../world/layout";
import { pixelButtonClass } from "../../components/pixelButtonClass";
import { prefersReducedMotion, useModalDialog } from "./useModalDialog";
import KeyIcon from "./KeyIcon";
import facesetBox from "../../assets/game/ui/faceset-box.png";
import arrow from "../../assets/game/ui/arrow.png";

const CHARS_PER_TICK = 2;
const TICK_MS = 22;

/** Classic RPG speech box with a portrait, typewriter text and paging. */
function DialogueBox({ npc, touch, onClose }: { npc: NpcId; touch: boolean; onClose: () => void }) {
  const { name, portrait, lines } = dialogue[npc];
  const { ref, onCancel } = useModalDialog(onClose);
  const [page, setPage] = useState(0);
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? Infinity : 0));
  const line = lines[page];
  const done = shown >= line.length;
  const last = page === lines.length - 1;

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => setShown((n) => n + CHARS_PER_TICK), TICK_MS);
    return () => clearInterval(timer);
  }, [done, page]);

  const advance = () => {
    if (!done) setShown(Infinity);
    else if (last) onClose();
    else {
      setPage((p) => p + 1);
      setShown(prefersReducedMotion() ? Infinity : 0);
    }
  };

  // E advances too, like in the village. Space/Enter reach the focused button.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "e" || e.key === "E") {
      e.preventDefault();
      advance();
    }
  };

  return (
    <dialog
      ref={ref}
      aria-label={`Talking to ${name}`}
      onCancel={onCancel}
      onKeyDown={onKeyDown}
      className="pixel-frame mx-auto mb-[max(0.5rem,env(safe-area-inset-bottom))] mt-auto w-[calc(100%-1rem)] max-w-2xl p-0 text-bark backdrop:bg-transparent sm:mb-8"
    >
      {/* Tapping anywhere in the speech area also continues, which suits phones. */}
      <div className="flex cursor-pointer gap-3 sm:gap-4" onClick={advance}>
        <div className="relative h-[72px] w-[72px] shrink-0 sm:h-24 sm:w-24">
          <img src={facesetBox} alt="" className="pixelated absolute inset-0 h-full w-full" draggable={false} />
          <img
            src={portrait}
            alt=""
            className="pixelated absolute left-[7.5px] top-[7.5px] h-[57px] w-[57px] sm:left-[10px] sm:top-[10px] sm:h-[76px] sm:w-[76px]"
            draggable={false}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="pixel-plate inline-block px-2 font-pixel text-[18px] uppercase leading-7 [word-spacing:0.4em]">{name}</p>
          {/* The typed-out text is decorative; screen readers get the whole line at once. */}
          <p aria-hidden="true" className="mt-2 min-h-[3.75rem] text-[15px] leading-snug sm:text-base">
            {line.slice(0, shown)}
            {done && (
              <img src={arrow} alt="" width={13} height={13} className="pixelated ml-1 inline-block align-baseline motion-safe:animate-[nudge-down_700ms_ease-in-out_infinite]" />
            )}
          </p>
          <p aria-live="polite" className="sr-only">{line}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 border-t-[3px] border-ember-dark/50 pt-2">
        <span className="flex items-center gap-1.5 text-xs text-bark/75">
          {page + 1} / {lines.length}
          {touch ? " · tap to continue" : <> · <KeyIcon k="e" scale={1} /> <KeyIcon k="space" scale={1} /> <KeyIcon k="enter" scale={1} /></>}
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className={`${pixelButtonClass("parchment")} min-h-11`}>
            Close
          </button>
          <button type="button" data-autofocus onClick={advance} className={`${pixelButtonClass("dark")} min-h-11`}>
            {done && last ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DialogueBox;
