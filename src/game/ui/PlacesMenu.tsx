import { locations, type LocationId } from "../../content/locations";
import { useModalDialog } from "./useModalDialog";

/**
 * Lists every place in the village so it can be opened without walking
 * there: a shortcut for visitors in a hurry and for keyboard and
 * screen-reader users.
 */
function PlacesMenu({ onPick, onClose }: { onPick: (id: LocationId) => void; onClose: () => void }) {
  const { ref, onCancel } = useModalDialog(onClose);
  return (
    <dialog
      ref={ref}
      aria-labelledby="places-title"
      onCancel={onCancel}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="pixel-frame m-auto max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-md p-0 text-bark backdrop:bg-ink/60"
    >
      <div className="flex items-center justify-between gap-3 pb-3">
        <h2 id="places-title" className="pixel-plate px-3 py-1 font-pixel text-[27px] uppercase leading-9">Map</h2>
        <button type="button" onClick={onClose} className="pixel-plate flex min-h-11 min-w-11 items-center justify-center px-2 font-pixel text-[18px] uppercase hover:brightness-110 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ember" aria-label="Close map">
          <span aria-hidden="true" className="text-[27px] leading-none">✕</span>
        </button>
      </div>
      <p className="mb-3 text-sm text-bark/75">Jump straight to any place in the village.</p>
      <ul className="space-y-2">
        {locations.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              onClick={() => onPick(l.id)}
              className="flex min-h-14 w-full items-start gap-3 border-2 border-ember-dark/60 bg-ember/10 p-3 text-left hover:border-ink hover:bg-ember/25 focus-visible:border-ink focus-visible:bg-ember/25 focus-visible:outline-none"
            >
              <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 border-2 border-ink" style={{ background: l.accent }} />
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
