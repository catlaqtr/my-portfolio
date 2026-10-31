import { useEffect, useState } from "react";
import { onSoundChange, setSoundEnabled, soundEnabled } from "../audio";

/** A tiny pixel speaker (drawn on a 9×9 grid so it scales crisply). */
function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 9 9" width={18} height={18} shapeRendering="crispEdges" fill="currentColor">
      <rect x="0" y="3" width="2" height="3" />
      <rect x="2" y="2" width="1" height="5" />
      <rect x="3" y="1" width="1" height="7" />
      {on ? (
        <>
          <rect x="5" y="3" width="1" height="3" />
          <rect x="7" y="2" width="1" height="5" />
        </>
      ) : (
        <>
          <rect x="5" y="3" width="1" height="1" />
          <rect x="6" y="4" width="1" height="1" />
          <rect x="7" y="5" width="1" height="1" />
          <rect x="7" y="3" width="1" height="1" />
          <rect x="5" y="5" width="1" height="1" />
        </>
      )}
    </svg>
  );
}

/** Music and sound effects on/off. Off by default; remembered. */
function SoundToggle({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(soundEnabled);
  useEffect(() => onSoundChange(setOn), []);

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setSoundEnabled(!on)}
      className={className}
      title={on ? "Sound on" : "Sound off"}
    >
      <SpeakerIcon on={on} />
      <span className="sr-only sm:not-sr-only">Sound</span>
      <span className="sr-only">{on ? " on" : " off"}</span>
    </button>
  );
}

export default SoundToggle;
