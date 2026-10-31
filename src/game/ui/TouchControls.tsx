import { useRef, useState, type PointerEvent } from "react";
import base from "../../assets/game/ui/joystick-base.png";
import knob from "../../assets/game/ui/joystick-knob.png";
import buttonA from "../../assets/game/ui/button-a.png";
import buttonAPressed from "../../assets/game/ui/button-a-pressed.png";
import buttonADisabled from "../../assets/game/ui/button-a-disabled.png";
import type { Bridge, Interactable } from "../bridge";
import { getLocation } from "../../content/locations";
import { dialogue } from "../world/dialogue";
import { knobOffset, stickVector } from "./joystick";

const SCALE = 4; // pack sprites are tiny; draw them at 4x
const BASE = 32 * SCALE;
const RADIUS = 44;

/** Drag anywhere in the lower-left of the screen to walk; the stick appears under your thumb. */
function Joystick({ bridge }: { bridge: Bridge }) {
  const zone = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const local = (e: PointerEvent) => {
    const r = zone.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
  };

  const onDown = (e: PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = local(e);
    // Keep the whole base on screen even if the touch lands near an edge.
    const half = BASE / 2;
    setOrigin({ x: Math.min(Math.max(p.x, half), p.w - half), y: Math.min(Math.max(p.y, half), p.h - half) });
    setOffset({ x: 0, y: 0 });
  };

  const onMove = (e: PointerEvent) => {
    if (!origin) return;
    const p = local(e);
    const dx = p.x - origin.x;
    const dy = p.y - origin.y;
    setOffset(knobOffset(dx, dy, RADIUS));
    bridge.emit("move", stickVector(dx, dy, RADIUS));
  };

  const onUp = () => {
    setOrigin(null);
    setOffset({ x: 0, y: 0 });
    bridge.emit("move", { x: 0, y: 0 });
  };

  // When idle the stick rests in the bottom-left corner as a hint.
  const placement = origin
    ? { left: origin.x - BASE / 2, top: origin.y - BASE / 2 }
    : { left: 8, bottom: 8 };

  return (
    <div
      ref={zone}
      aria-hidden="true"
      data-testid="joystick"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="pointer-events-auto absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-[max(0.5rem,env(safe-area-inset-left))] h-[46%] w-[55%] touch-none select-none"
    >
      <div
        className={`absolute transition-opacity ${origin ? "opacity-95" : "opacity-60"}`}
        style={{ ...placement, width: BASE, height: BASE }}
      >
        <img src={base} alt="" width={BASE} height={BASE} className="pixelated absolute inset-0" draggable={false} />
        <img
          src={knob}
          alt=""
          width={15 * SCALE}
          height={18 * SCALE}
          draggable={false}
          className="pixelated absolute"
          style={{ left: BASE / 2 - 30 + offset.x, top: BASE / 2 - 40 + offset.y }}
        />
      </div>
    </div>
  );
}

/** The on-screen A button: enters a building or talks to the villager in reach. */
function ActionButton({ bridge, target }: { bridge: Bridge; target: Interactable | null }) {
  const [pressed, setPressed] = useState(false);
  const verb = target?.kind === "npc" ? "Talk" : "Enter";
  const label = !target
    ? "Enter (walk up to a door or a villager first)"
    : target.kind === "location"
      ? `Enter ${getLocation(target.id).name}`
      : `Talk to ${dialogue[target.id].name}`;
  const src = !target ? buttonADisabled : pressed ? buttonAPressed : buttonA;

  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={!target}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={() => target && bridge.emit("action", true)}
      className="pointer-events-auto absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] flex touch-manipulation select-none flex-col items-center gap-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-ember"
    >
      <img src={src} alt="" width={16 * 5} height={15 * 5} className="pixelated" draggable={false} />
      <span className={`pixel-plate px-2 font-pixel text-[18px] uppercase leading-6 ${target ? "" : "opacity-60"}`}>
        {verb}
      </span>
    </button>
  );
}

/** Joystick + action button for phones and tablets. */
function TouchControls({ bridge, target }: { bridge: Bridge; target: Interactable | null }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Joystick bridge={bridge} />
      <ActionButton bridge={bridge} target={target} />
    </div>
  );
}

export default TouchControls;
