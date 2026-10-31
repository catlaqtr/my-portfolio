/**
 * The village (Phaser + game code) is a separate download. Start fetching it
 * as soon as someone shows intent — hovering, focusing or touching an
 * "Enter the Village" link — so it's usually ready by the time they click.
 * Visitors who never head for the village never download it.
 */
let pending: Promise<typeof import("./Play")> | undefined;

export const loadPlay = () => (pending ??= import("./Play"));

/** Spread onto any link to /play. */
export const prefetchVillageProps = {
  onPointerEnter: () => void loadPlay(),
  onFocus: () => void loadPlay(),
  onTouchStart: () => void loadPlay(),
};
