import { useEffect, useState, type KeyboardEvent } from "react";
import { dialogue } from "../world/dialogue";
import type { NpcId } from "../world/layout";
import { pixelButtonClass } from "../../components/pixelButtonClass";
import { prefersReducedMotion, useModalDialog } from "./useModalDialog";

const CHARS_PER_TICK = 2;
const TICK_MS = 22;

/** Classic RPG speech box with a portrait, typewriter text and paging. */
function DialogueBox({ npc, onClose }: { npc: NpcId; onClose: () => void }) {
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
      className="mx-auto mb-4 mt-auto w-[calc(100%-1rem)] max-w-2xl border-4 border-bark bg-parchment p-0 text-bark shadow-[0_6px_0_#1e0f07] backdrop:bg-transparent sm:mb-8"
    >
      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
        <img
          src={portrait}
          alt=""
          width={76}
          height={76}
          className="pixelated h-[57px] w-[57px] shrink-0 border-2 border-bark bg-parchment-dark sm:h-[76px] sm:w-[76px]"
        />
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[18px] uppercase [word-spacing:0.4em] text-bark-light">{name}</p>
          {/* The typed-out text is decorative; screen readers get the whole line at once. */}
          <p aria-hidden="true" className="mt-1 min-h-[3rem] text-[15px] leading-snug sm:text-base">
            {line.slice(0, shown)}
          </p>
          <p aria-live="polite" className="sr-only">{line}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t-2 border-bark/20 px-3 py-2 sm:px-4">
        <span className="text-xs text-bark/70">
          {page + 1} / {lines.length} · E, Space or Enter
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className={pixelButtonClass("parchment")}>
            Close
          </button>
          <button type="button" data-autofocus onClick={advance} className={pixelButtonClass("dark")}>
            {done && last ? "Done" : "Next"} <span aria-hidden="true">▼</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DialogueBox;
