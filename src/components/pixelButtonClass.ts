export const variants = {
  primary: "bg-meadow text-bark hover:bg-[#82cc5f]",
  parchment: "bg-parchment text-bark hover:bg-[#f9dfb4]",
  dark: "bg-bark text-parchment hover:bg-bark-light",
} as const;

export const sizes = {
  // The pixel font is only crisp at multiples of 9px.
  sm: "px-3 py-1 text-[18px] leading-6",
  lg: "px-5 py-3 text-[18px] leading-6",
} as const;

export const pixelButtonClass = (variant: keyof typeof variants = "parchment", size: keyof typeof sizes = "sm") =>
  [
    // Uppercase: this font's lowercase "i" is just a dot, which reads poorly in labels.
    "inline-flex items-center justify-center gap-2 font-pixel uppercase [word-spacing:0.4em] whitespace-nowrap",
    "border-2 border-bark shadow-[0_4px_0_#1e0f07] transition-[transform,box-shadow,background-color] duration-100",
    "active:translate-y-1 active:shadow-none",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffe08a] focus-visible:ring-offset-2 focus-visible:ring-offset-bark",
    variants[variant],
    sizes[size],
  ].join(" ");

