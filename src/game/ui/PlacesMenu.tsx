import { useState } from "react";
import { locations, type LocationId } from "../../content/locations";
import { reducedMotion, setReducedMotion } from "../motion";
import { useModalDialog } from "./useModalDialog";
import KeyIcon from "./KeyIcon";

interface Props {
  /** Move the player to the building's door. */
  onTravel: (id: LocationId) => void;
  /** Open the building's information panel straight away. */
  onOpen: (id: LocationId) => void;
  onClose: () => void;
}

const smallButton =
  "pixel-plate min-h-11 px-3 font-pixel text-[18px] uppercase leading-6 hover:brightness-110 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ember";

/**
 * Quick Travel (opened with the Map button or the M key): jump to any place,
 * or read about it without walking there at all — a shortcut for visitors in
 * a hurry and for keyboard and screen-reader users. Also holds the
 * reduce-motion setting.
 */
function PlacesMenu({ onTravel, onOpen, onClose }: Props) {
  const { ref, onCancel } = useModalDialog(onClose);
  const [reduced, setReduced] = useState(reducedMotion);

  return (
    <dialog
      ref={ref}
      aria-labelledby="places-title"
      aria-describedby="places-help"
      onCancel={onCancel}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="pixel-frame m-auto max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-lg p-0 text-bark backdrop:bg-ink/60"
    >
      <div className="flex items-center justify-between gap-3 pb-3">
        <h2 id="places-title" className="pixel-plate px-3 py-1 font-pixel text-[18px] uppercase leading-8 [word-spacing:0.4em] sm:text-[27px] sm:leading-9">
          Quick Travel
        </h2>
        <button type="button" onClick={onClose} className={`${smallButton} min-w-11 px-2`} aria-label="Close Quick Travel">
          <span aria-hidden="true" className="text-[27px] leading-none">✕</span>
        </button>
      </div>
      <p id="places-help" className="mb-3 text-sm text-bark/75">
        Travel to a building's door, or open its information right away.
      </p>

      <ul className="space-y-2">
        {locations.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center gap-3 border-2 border-ember-dark/60 bg-ember/10 p-3">
            <span aria-hidden="true" className="h-4 w-4 shrink-0 border-2 border-ink" style={{ background: l.accent }} />
            <span className="min-w-[12rem] flex-1">
              <span className="block font-semibold">{l.name}</span>
              <span className="block text-sm text-bark/75">{l.tagline}</span>
            </span>
            {/* On narrow screens the buttons wrap onto their own full-width row. */}
            <span className="flex gap-2 max-sm:w-full max-sm:[&>button]:flex-1">
              {/* Visible words first, so voice control ("click Travel") matches the accessible name. */}
              <button type="button" onClick={() => onTravel(l.id)} className={smallButton}>
                Travel<span className="sr-only"> to {l.name}</span>
              </button>
              <button type="button" onClick={() => onOpen(l.id)} className={smallButton}>
                Info<span className="sr-only"> about {l.name}</span>
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-ember-dark/50 pt-3">
        <button
          type="button"
          aria-pressed={reduced}
          onClick={() => {
            setReduced(!reduced);
            setReducedMotion(!reduced);
          }}
          className="flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ember"
        >
          <span aria-hidden="true" className={`grid h-6 w-6 place-items-center border-[3px] border-ink ${reduced ? "bg-ember" : "bg-paper"}`}>
            {reduced ? "✓" : ""}
          </span>
          Reduce motion
        </button>
        <span className="hidden items-center gap-1.5 text-xs text-bark/70 sm:flex">
          Open this anytime with <KeyIcon k="m" scale={1} />
        </span>
      </div>
    </dialog>
  );
}

export default PlacesMenu;
