import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { WorldScene } from "./scenes/WorldScene";
import type { LocationId } from "../content/locations";
import { BRIDGE_KEY, type Bridge } from "./bridge";
import { renderSize } from "./viewport";

const measure = (el: HTMLElement) => renderSize(el.clientWidth, el.clientHeight, window.devicePixelRatio);

interface Props {
  /** Shared channel between the game and the React overlay. */
  bridge: Bridge;
  /** Start next to this location instead of the fountain. */
  startAt?: LocationId;
  className?: string;
}

/**
 * Owns the Phaser.Game for as long as the component is mounted. React only
 * creates and destroys it; everything per-frame stays inside Phaser.
 */
export default function PhaserGame({ bridge, startAt, className }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current!;
    const size = measure(parent);
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent,
      pixelArt: true,
      roundPixels: true,
      backgroundColor: "#2d4a26",
      banner: false,
      physics: { default: "arcade", arcade: { debug: false } },
      // Rendered at up to 2x device resolution and shown at CSS size (see viewport.ts).
      scale: { mode: Phaser.Scale.NONE, width: size.width, height: size.height, zoom: size.cssPerRenderPx },
      scene: [BootScene, WorldScene],
    });
    game.registry.set("startAt", startAt);
    game.registry.set("upscale", size.upscale);
    game.registry.set(BRIDGE_KEY, bridge);
    if (import.meta.env.DEV) (window as unknown as { __hearthvale?: Phaser.Game }).__hearthvale = game;

    const observer = new ResizeObserver(() => {
      const next = measure(parent);
      game.registry.set("upscale", next.upscale);
      game.scale.resize(next.width, next.height);
      game.scale.setZoom(next.cssPerRenderPx);
    });
    observer.observe(parent);

    // StrictMode mounts effects twice in development; destroying here keeps
    // exactly one canvas alive.
    return () => {
      observer.disconnect();
      game.destroy(true);
    };
  }, [bridge, startAt]);

  return (
    <div
      ref={parentRef}
      // touch-none: the game handles touches itself (no page panning or pinch-zoom).
      className={`touch-none [&_canvas]:[image-rendering:pixelated] ${className ?? ""}`}
      role="application"
      aria-label="Hearthvale village. Walk with W A S D or the arrow keys; press E, Space or Enter to interact. The Map button lists every place."
    />
  );
}
