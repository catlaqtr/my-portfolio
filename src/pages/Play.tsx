import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PhaserGame from "../game/PhaserGame";
import { locations, type LocationId } from "../content/locations";

const isLocationId = (v: string | null): v is LocationId =>
  locations.some((l) => l.id === v);

/** The explorable village. Loaded lazily so classic visitors never download Phaser. */
function Play() {
  const [params] = useSearchParams();
  const at = params.get("at");

  useEffect(() => {
    const previous = document.title;
    document.title = "Hearthvale — Mete Ünal";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#2d4a26] overflow-hidden select-none">
      <PhaserGame startAt={isLocationId(at) ? at : undefined} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-4">
        <div className="rounded-md border-2 border-[#3b1f0e] bg-[#f4d29c]/95 px-3 py-2 text-[#3b1f0e] shadow-[0_3px_0_#3b1f0e]">
          <h1 className="text-sm font-extrabold tracking-wide">Hearthvale</h1>
          <p className="hidden text-xs sm:block">Mete Ünal's portfolio village · prototype</p>
        </div>
        <Link
          to="/portfolio"
          className="pointer-events-auto shrink-0 whitespace-nowrap rounded-md border-2 border-[#3b1f0e] bg-[#3b1f0e] px-3 py-2 text-xs font-semibold text-[#f4d29c] shadow-[0_3px_0_#1e0f07] hover:bg-[#5c3a1e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4d29c]"
        >
          Recruiter Mode
        </Link>
      </div>

      {/* Touch controls arrive in a later milestone; until then this hint is keyboard-only. */}
      <p className="pointer-events-none absolute bottom-3 left-3 pointer-coarse:hidden rounded-md bg-[#1e0f07]/70 px-3 py-1.5 text-xs text-[#f4d29c] sm:bottom-4 sm:left-4">
        Walk with <kbd className="font-semibold">W A S D</kbd> or the{" "}
        <span className="font-semibold">arrow keys</span>
      </p>
    </div>
  );
}

export default Play;
