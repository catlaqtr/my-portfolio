import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PhaserGame from "../game/PhaserGame";
import { Bridge, type Interactable } from "../game/bridge";
import InteractPrompt from "../game/ui/InteractPrompt";
import LocationPanel from "../game/ui/LocationPanel";
import DialogueBox from "../game/ui/DialogueBox";
import PlacesMenu from "../game/ui/PlacesMenu";
import { pixelButtonClass } from "../components/pixelButtonClass";
import { locations, type LocationId } from "../content/locations";

const isLocationId = (v: string | null): v is LocationId =>
  locations.some((l) => l.id === v);

/** The explorable village. Loaded lazily so classic visitors never download Phaser. */
function Play() {
  const [params] = useSearchParams();
  const at = params.get("at");
  const bridge = useMemo(() => new Bridge(), []);

  const [focus, setFocus] = useState<Interactable | null>(null);
  const [open, setOpen] = useState<Interactable | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const offFocus = bridge.on("focus", setFocus);
    const offInteract = bridge.on("interact", setOpen);
    return () => {
      offFocus();
      offInteract();
    };
  }, [bridge]);

  // Pause the player while anything is open on top of the village.
  const modal = open !== null || mapOpen;
  useEffect(() => bridge.emit("modal", modal), [bridge, modal]);

  useEffect(() => {
    const previous = document.title;
    document.title = "Hearthvale — Mete Ünal";
    return () => {
      document.title = previous;
    };
  }, []);

  const close = () => setOpen(null);

  return (
    <div className="fixed inset-0 select-none overflow-hidden bg-[#2d4a26]">
      <PhaserGame bridge={bridge} startAt={isLocationId(at) ? at : undefined} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
        <Link
          to="/"
          // Hidden on narrow phones so the Map and Recruiter Mode buttons fit.
          className="pointer-events-auto hidden border-2 border-bark bg-parchment/95 px-3 py-2 min-[480px]:block text-bark shadow-[0_3px_0_#3b1f0e] hover:bg-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment"
          aria-label="Hearthvale: back to the title screen"
        >
          <span className="block font-pixel text-[18px] uppercase tracking-wide">Hearthvale</span>
          <span className="hidden text-xs sm:block">Mete Ünal's portfolio village</span>
        </Link>
        <div className="pointer-events-auto ml-auto flex shrink-0 gap-2">
          <button type="button" onClick={() => setMapOpen(true)} className={pixelButtonClass("parchment")}>
            Map
          </button>
          <Link to="/portfolio" className={pixelButtonClass("dark")}>
            Recruiter Mode
          </Link>
        </div>
      </div>

      {!modal && <InteractPrompt target={focus} onActivate={() => focus && setOpen(focus)} />}

      {/* Touch controls arrive in a later milestone; until then this hint is keyboard-only. */}
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-sm bg-[#1e0f07]/75 px-3 py-1.5 text-xs text-parchment pointer-coarse:hidden sm:bottom-4 sm:left-4">
        <kbd className="font-semibold">WASD</kbd> / <kbd className="font-semibold">arrows</kbd> walk ·{" "}
        <kbd className="font-semibold">E</kbd>, <kbd className="font-semibold">Space</kbd> or{" "}
        <kbd className="font-semibold">Enter</kbd> interact
      </p>

      {open?.kind === "location" && <LocationPanel key={open.id} id={open.id} onClose={close} />}
      {open?.kind === "npc" && <DialogueBox key={open.id} npc={open.id} onClose={close} />}
      {mapOpen && (
        <PlacesMenu
          onClose={() => setMapOpen(false)}
          onPick={(id) => {
            setMapOpen(false);
            setOpen({ kind: "location", id });
          }}
        />
      )}
    </div>
  );
}

export default Play;
