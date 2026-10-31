import { useEffect, useState } from "react";

const coarse = () =>
  typeof window !== "undefined" && (window.matchMedia?.("(pointer: coarse)").matches ?? false);

/**
 * True on touch-first devices, or as soon as anyone touches the screen
 * (e.g. a laptop with a touchscreen). Shows the on-screen controls then.
 */
export function useTouchMode() {
  const [touch, setTouch] = useState(coarse);
  useEffect(() => {
    if (touch) return;
    const onTouch = () => setTouch(true);
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", onTouch);
  }, [touch]);
  return touch;
}
