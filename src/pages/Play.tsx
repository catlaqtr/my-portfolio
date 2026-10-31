import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PhaserGame from "../game/PhaserGame";
import { Bridge, type Interactable, type ModalState } from "../game/bridge";
import InteractPrompt from "../game/ui/InteractPrompt";
import LocationPanel from "../game/ui/LocationPanel";
import DialogueBox from "../game/ui/DialogueBox";
import PlacesMenu from "../game/ui/PlacesMenu";
import TouchControls from "../game/ui/TouchControls";
import LoadingScreen from "../game/ui/LoadingScreen";
import KeyIcon from "../game/ui/KeyIcon";
import { useTouchMode } from "../game/ui/useTouchMode";
import { pixelButtonClass } from "../components/pixelButtonClass";
import { locations, type LocationId } from "../content/locations";

const isLocationId = (v: string | null): v is LocationId =>
  locations.some((l) => l.id === v);

/** The explorable village. Loaded lazily so classic visitors never download Phaser. */
function Play() {
  const [params] = useSearchParams();
  const at = params.get("at");
  const bridge = useMemo(() => new Bridge(), []);
  const touch = useTouchMode();

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [focus, setFocus] = useState<Interactable | null>(null);
  const [open, setOpen] = useState<Interactable | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const offs = [
      bridge.on("loading", setProgress),
      bridge.on("ready", () => setReady(true)),
      bridge.on("focus", setFocus),
      bridge.on("interact", setOpen),
    ];
    return () => offs.forEach((off) => off());
  }, [bridge]);

  // A building panel or the map covers the village (the game sleeps);
  // a conversation keeps it visible. Either way the player waits.
  const modal: ModalState = mapOpen || open?.kind === "location" ? "panel" : open ? "dialogue" : false;
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
    <div className="fixed inset-0 select-none overflow-hidden bg-[#2d4a26] [-webkit-touch-callout:none]">
      <PhaserGame bridge={bridge} startAt={isLocationId(at) ? at : undefined} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 px-[max(0.75rem,env(safe-area-inset-left))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:pt-4">
        <Link
          to="/"
          // Hidden on narrow phones so the Map and Recruiter Mode buttons fit.
          className="pixel-plate pointer-events-auto hidden px-3 py-1.5 hover:brightness-110 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-ember min-[480px]:block"
          aria-label="Hearthvale: back to the title screen"
        >
          <span className="block font-pixel text-[18px] uppercase leading-6 tracking-wide">Hearthvale</span>
          <span className="hidden text-xs text-paper/85 sm:block">Mete Ünal's portfolio village</span>
        </Link>
        <div className="pointer-events-auto ml-auto flex shrink-0 gap-2">
          <button type="button" onClick={() => setMapOpen(true)} className={`${pixelButtonClass("parchment")} min-h-11`}>
            Map
          </button>
          <Link to="/portfolio" className={`${pixelButtonClass("dark")} min-h-11`}>
            Recruiter Mode
          </Link>
        </div>
      </div>

      {ready && !modal && touch && <TouchControls bridge={bridge} target={focus} />}
      {ready && !modal && <InteractPrompt target={focus} touch={touch} onActivate={() => focus && setOpen(focus)} />}

      {!touch && (
        <p className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5 bg-ink/75 px-2.5 py-1.5 text-xs text-paper sm:bottom-4 sm:left-4">
          <KeyIcon k="w" scale={1} /><KeyIcon k="a" scale={1} /><KeyIcon k="s" scale={1} /><KeyIcon k="d" scale={1} /> walk ·
          <KeyIcon k="e" scale={1} /> interact · <KeyIcon k="esc" scale={1} /> close
        </p>
      )}

      {open?.kind === "location" && <LocationPanel key={open.id} id={open.id} touch={touch} onClose={close} />}
      {open?.kind === "npc" && <DialogueBox key={open.id} npc={open.id} touch={touch} onClose={close} />}
      {mapOpen && (
        <PlacesMenu
          onClose={() => setMapOpen(false)}
          onPick={(id) => {
            setMapOpen(false);
            setOpen({ kind: "location", id });
          }}
        />
      )}

      {!ready && <LoadingScreen progress={progress} />}
    </div>
  );
}

export default Play;
