import { Link } from "react-router-dom";
import { getLocation, type LocationId } from "../../content/locations";
import { pixelButtonClass } from "../../components/pixelButtonClass";
import LocationContent from "./LocationContent";
import { useModalDialog } from "./useModalDialog";

/** The information panel shown when entering a building. */
function LocationPanel({ id, onClose }: { id: LocationId; onClose: () => void }) {
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
      className="m-auto w-[calc(100%-1rem)] max-w-3xl overflow-hidden border-4 border-bark bg-parchment p-0 text-bark shadow-[0_8px_0_#1e0f07] backdrop:bg-[#1e0f07]/65"
    >
      <div className="flex max-h-[calc(100svh-2rem)] flex-col">
        <header
          className="flex items-start justify-between gap-3 border-b-4 bg-parchment-dark/50 px-4 py-3 sm:px-6 sm:py-4"
          style={{ borderBottomColor: location.accent }}
        >
          <div className="min-w-0">
            <h2 id={titleId} className="font-pixel text-[27px] uppercase leading-tight [word-spacing:0.4em]">
              {location.name}
            </h2>
            <p className="mt-1 text-sm text-bark/75">{location.tagline}</p>
          </div>
          <button type="button" onClick={onClose} className={pixelButtonClass("dark")} aria-label={`Close ${location.name}`}>
            <span aria-hidden="true">✕</span> Close
          </button>
        </header>

        <div className="overflow-y-auto px-4 py-5 sm:px-6">
          <LocationContent id={id} />
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-bark/20 px-4 py-2.5 text-sm sm:px-6">
          <span className="text-bark/70">
            Press <kbd className="font-semibold">Esc</kbd> to return to the village
          </span>
          <Link to={location.classicRoute} className="font-semibold underline decoration-2 underline-offset-2 hover:text-bark-light">
            View in Recruiter Mode →
          </Link>
        </footer>
      </div>
    </dialog>
  );
}

export default LocationPanel;
