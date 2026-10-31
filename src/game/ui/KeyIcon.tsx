import keyE from "../../assets/game/ui/key-e.png";
import keyEnter from "../../assets/game/ui/key-enter.png";
import keyEscape from "../../assets/game/ui/key-escape.png";
import keySpace from "../../assets/game/ui/key-space.png";
import keyW from "../../assets/game/ui/key-w.png";
import keyA from "../../assets/game/ui/key-a.png";
import keyS from "../../assets/game/ui/key-s.png";
import keyD from "../../assets/game/ui/key-d.png";
import keyM from "../../assets/game/ui/key-m.png";
import buttonA from "../../assets/game/ui/button-a.png";

const icons = {
  e: { src: keyE, w: 13, h: 13, label: "E" },
  enter: { src: keyEnter, w: 17, h: 17, label: "Enter" },
  esc: { src: keyEscape, w: 18, h: 13, label: "Esc" },
  space: { src: keySpace, w: 33, h: 13, label: "Space" },
  w: { src: keyW, w: 13, h: 13, label: "W" },
  a: { src: keyA, w: 13, h: 13, label: "A" },
  s: { src: keyS, w: 13, h: 13, label: "S" },
  d: { src: keyD, w: 13, h: 13, label: "D" },
  m: { src: keyM, w: 13, h: 13, label: "M" },
  gamepadA: { src: buttonA, w: 16, h: 15, label: "A button" },
} as const;

/** A key or button glyph from the pack's input icons, drawn at whole-pixel scale. */
function KeyIcon({ k, scale = 2 }: { k: keyof typeof icons; scale?: number }) {
  const icon = icons[k];
  return (
    <img
      src={icon.src}
      alt={icon.label}
      width={icon.w * scale}
      height={icon.h * scale}
      className="pixelated inline-block align-middle"
      draggable={false}
    />
  );
}

export default KeyIcon;
