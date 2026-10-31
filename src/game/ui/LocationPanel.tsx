import { Link } from "react-router-dom";
import { getLocation, type LocationId } from "../../content/locations";
import LocationContent from "./LocationContent";
import KeyIcon from "./KeyIcon";
import { useModalDialog } from "./useModalDialog";

/**
 * The information panel shown when entering a building: the pack's dialogue
 * frame as a window, full-screen on phones, centred on larger screens.
 */
function LocationPanel({ id, touch, onClose }: { id: LocationId; touch: boolean; onClose: () => void }) {
  const location = getLocation(id);
  const { ref, onCancel } = useModalDialog(onClose);
  const titleId = `panel-${id}-title`;

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={onCancel}
      // Clicking the dimmed backdrop (the dialog element itself) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="pixel-frame m-auto h-[100dvh] max-h-none w-full max-w-none p-0 text-bark backdrop:bg-ink/70 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:max-w-3xl"
    >
      <div className="flex h-full max-h-[calc(100dvh-2rem)] flex-col pt-[env(safe-area-inset-top)] max-sm:max-h-none sm:max-h-[calc(100dvh-5rem)]">
        <header className="flex items-start justify-between gap-3 pb-3">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="pixel-plate inline-block px-3 py-1 font-pixel text-[18px] uppercase leading-7 [word-spacing:0.4em] sm:text-[27px] sm:leading-9"
              style={{ borderBottomColor: location.accent }}
            >
              {location.name}
            </h2>
            <p className="mt-2 text-sm text-bark/75">{location.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${location.name}`}
            className="pixel-plate flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 px-2 font-pixel text-[18px] uppercase hover:brightness-110 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ember"
          >
            {touch ? <span aria-hidden="true" className="text-[27px] leading-none">✕</span> : <><KeyIcon k="esc" /> Close</>}
          </button>
        </header>

        <div className="-mx-2 min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-2 pb-2">
          <LocationContent id={id} />
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t-[3px] border-ember-dark/50 pt-2.5 text-sm pb-[env(safe-area-inset-bottom)]">
          <span className="flex items-center gap-2 text-bark/75">
            {touch ? "Tap ✕ to return to the village" : <>Press <KeyIcon k="esc" /> to return to the village</>}
          </span>
          <Link to={location.classicRoute} className="font-semibold text-frame underline decoration-2 underline-offset-2 hover:text-bark">
            View in Recruiter Mode →
          </Link>
        </footer>
      </div>
    </dialog>
  );
}

export default LocationPanel;
