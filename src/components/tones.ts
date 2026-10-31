/**
 * Shared content components render on the parchment village panels and on
 * the dark classic pages; each "tone" maps the same structure to that look.
 */
export const tones = {
  parchment: {
    heading: "font-pixel text-[18px] uppercase [word-spacing:0.4em] text-bark",
    text: "text-bark",
    muted: "text-bark/75",
    chip: "border-bark/30 bg-bark/10 text-bark",
    learningChip: "border-dashed border-[#b4202a]/70 text-bark",
    box: "border-bark/30 bg-parchment-dark/40",
    code: "bg-bark text-parchment",
    dot: "bg-bark",
    line: "border-bark/30",
  },
  slate: {
    heading: "text-sm font-semibold uppercase tracking-wide text-slate-300",
    text: "text-slate-200",
    muted: "text-slate-400",
    chip: "border-slate-700 bg-slate-800 text-slate-200",
    learningChip: "border-dashed border-amber-400/70 text-amber-100",
    box: "border-slate-700 bg-slate-800/50",
    code: "bg-slate-950 text-slate-200",
    dot: "bg-blue-500",
    line: "border-slate-700",
  },
} as const;

export type Tone = keyof typeof tones;
