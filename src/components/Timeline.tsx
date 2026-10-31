import { timeline } from "../content/about";
import { tones, type Tone } from "./tones";

/** Education and career milestones, oldest first. */
function Timeline({ tone }: { tone: Tone }) {
  const t = tones[tone];
  return (
    <ol className={`relative ml-2 space-y-6 border-l ${t.line}`}>
      {timeline.map((entry) => (
        <li key={entry.title} className="relative pl-6">
          <span aria-hidden="true" className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${t.dot}`} />
          <div className={`text-xs uppercase tracking-wide ${t.muted}`}>{entry.period}</div>
          <div className={`font-semibold ${t.text}`}>{entry.title}</div>
          <div className={`text-sm ${t.muted}`}>{entry.place}</div>
          {entry.detail && <p className={`mt-1 text-sm ${t.text}`}>{entry.detail}</p>}
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
