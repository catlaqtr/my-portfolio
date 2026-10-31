import Phaser from "phaser";

/**
 * Runs `cleanup` once when the scene stops (SHUTDOWN) or the whole game is
 * destroyed (DESTROY — leaving /play calls game.destroy(), which skips
 * SHUTDOWN). Anything subscribed outside the game, such as module-level
 * listeners, must be released here or it keeps the old game in memory.
 */
export function onSceneEnd(scene: Phaser.Scene, cleanup: () => void) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    scene.events.off(Phaser.Scenes.Events.SHUTDOWN, run);
    scene.events.off(Phaser.Scenes.Events.DESTROY, run);
    cleanup();
  };
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, run);
  scene.events.once(Phaser.Scenes.Events.DESTROY, run);
}
