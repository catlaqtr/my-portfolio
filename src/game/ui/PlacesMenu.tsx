import { locations, type LocationId } from "../../content/locations";
import { pixelButtonClass } from "../../components/pixelButtonClass";
import { useModalDialog } from "./useModalDialog";

/**
 * Lists every place in the village so it can be opened without walking
 * there: a shortcut for visitors in a hurry, keyboard and screen-reader
 * users, and phones until touch controls arrive.
 */
function PlacesMenu({ onPick, onClose }: { onPick: (id: LocationId) => void; onClose: () => void }) {
  const { ref, onCancel } = useModalDialog(onClose);
  return (
    <dialog
      ref={ref}
      aria-labelledby="places-title"
      onCancel={onCancel}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[calc(100%-1rem)] max-w-md border-4 border-bark bg-parchment p-0 text-bark shadow-[0_8px_0_#1e0f07] backdrop:bg-[#1e0f07]/55"
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-bark/20 px-4 py-3">
        <h2 id="places-title" className="font-pixel text-[27px] uppercase [word-spacing:0.4em]">Map</h2>
        <button type="button" onClick={onClose} className={pixelButtonClass("dark")} aria-label="Close map">
          <span aria-hidden="true">✕</span> Close
        </button>
      </div>
      <ul className="space-y-2 p-3">
        {locations.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              onClick={() => onPick(l.id)}
              className="flex w-full items-start gap-3 border-2 border-bark/30 bg-parchment-dark/40 p-3 text-left hover:border-bark focus-visible:border-bark focus-visible:outline-none"
            >
              <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 border-2 border-bark" style={{ background: l.accent }} />
              <span>
                <span className="block font-semibold">{l.name}</span>
                <span className="block text-sm text-bark/75">{l.tagline}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}

export default PlacesMenu;
