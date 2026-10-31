import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { WorldScene } from "./scenes/WorldScene";
import type { LocationId } from "../content/locations";

/** Canvas size in device pixels, so every art pixel maps to whole screen pixels. */
function deviceSize(el: HTMLElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  return {
    width: Math.max(1, Math.round(el.clientWidth * dpr)),
    height: Math.max(1, Math.round(el.clientHeight * dpr)),
    dpr,
  };
}

interface Props {
  /** Start next to this location instead of the fountain. */
  startAt?: LocationId;
  className?: string;
}

/**
 * Owns the Phaser.Game for as long as the component is mounted. React only
 * creates and destroys it; everything per-frame stays inside Phaser.
 */
export default function PhaserGame({ startAt, className }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current!;
    const size = deviceSize(parent);
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent,
      pixelArt: true,
      roundPixels: true,
      backgroundColor: "#2d4a26",
      banner: false,
      physics: { default: "arcade", arcade: { debug: false } },
      // The canvas is rendered at device resolution and shown at CSS size.
      scale: { mode: Phaser.Scale.NONE, width: size.width, height: size.height, zoom: 1 / size.dpr },
      scene: [BootScene, WorldScene],
    });
    game.registry.set("startAt", startAt);
    if (import.meta.env.DEV) (window as unknown as { __hearthvale?: Phaser.Game }).__hearthvale = game;

    const observer = new ResizeObserver(() => {
      const next = deviceSize(parent);
      game.scale.resize(next.width, next.height);
      game.scale.setZoom(1 / next.dpr);
    });
    observer.observe(parent);

    // StrictMode mounts effects twice in development; destroying here keeps
    // exactly one canvas alive.
    return () => {
      observer.disconnect();
      game.destroy(true);
    };
  }, [startAt]);

  return (
    <div
      ref={parentRef}
      className={className}
      role="application"
      aria-label="Hearthvale village. Use W A S D or the arrow keys to walk around."
    />
  );
}
