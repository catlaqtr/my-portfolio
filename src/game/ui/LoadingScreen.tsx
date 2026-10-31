/**
 * Pixel-art loading screen shown while the game code and art download.
 * `progress` is 0–1, or undefined while the size of the work is unknown.
 */
function LoadingScreen({ progress }: { progress?: number }) {
  const pct = progress === undefined ? undefined : Math.round(progress * 100);
  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-bark px-6 text-paper">
      <div className="w-full max-w-xs text-center">
        <p className="font-pixel text-[36px] leading-none">Hearthvale</p>
        <p className="mt-3 text-sm text-paper/80">Building the village…</p>
        <div
          role="progressbar"
          aria-label="Loading the village"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className="mt-5 h-6 border-[3px] border-ink bg-ink p-[3px] shadow-[0_0_0_3px_var(--color-frame)]"
        >
          <div
            className={`h-full bg-ember transition-[width] duration-200 ${pct === undefined ? "w-1/3 motion-safe:animate-pulse" : ""}`}
            style={pct === undefined ? undefined : { width: `${Math.max(4, pct)}%` }}
          />
        </div>
        <p className="mt-2 font-pixel text-[18px]" aria-hidden="true">
          {pct === undefined ? "…" : `${pct}%`}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
