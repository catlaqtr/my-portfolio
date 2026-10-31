import { useEffect, useState } from "react";
import { onReducedMotionChange, reducedMotion } from "../game/motion";

/**
 * The OS setting, or the in-game "Reduce motion" toggle if the visitor used
 * it, kept live. Starts false so server and hydration renders match.
 */
export function useReduceMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(reducedMotion());
    return onReducedMotionChange(setReduced);
  }, []);
  return reduced;
}
