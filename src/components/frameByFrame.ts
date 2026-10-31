/**
 * Pass as `onUpdate` on a motion component. Framer Motion then animates
 * opacity frame by frame instead of through the browser's Web Animations API,
 * whose hand-off at the end of each animation briefly flashed the starting
 * value (content blinked invisible for one frame as it finished revealing).
 */
export const frameByFrame = () => {};
