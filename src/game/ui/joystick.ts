/** Pushes shorter than this fraction of the radius are ignored (thumb jitter). */
export const DEAD_ZONE = 0.2;

/**
 * Turns a drag offset from the joystick's centre into a movement vector:
 * clamped to length 1, zero inside the dead zone, and rescaled so movement
 * starts gently just outside it.
 */
export function stickVector(dx: number, dy: number, radius: number): { x: number; y: number } {
  const dist = Math.hypot(dx, dy);
  const strength = Math.min(1, dist / radius);
  if (strength < DEAD_ZONE || dist === 0) return { x: 0, y: 0 };
  const scaled = (strength - DEAD_ZONE) / (1 - DEAD_ZONE);
  return { x: (dx / dist) * scaled, y: (dy / dist) * scaled };
}

/** Where to draw the knob: the drag offset, held inside the base's radius. */
export function knobOffset(dx: number, dy: number, radius: number): { x: number; y: number } {
  const dist = Math.hypot(dx, dy);
  if (dist <= radius) return { x: dx, y: dy };
  return { x: (dx / dist) * radius, y: (dy / dist) * radius };
}
