import Phaser from "phaser";
import { TILE } from "./assets";
import { MAP_HEIGHT, MAP_WIDTH, arcadeGlow, chimneys } from "./world/layout";
import { effectAnim } from "./scenes/BootScene";
import { onReducedMotionChange, reducedMotion } from "./motion";
import { onSceneEnd } from "./sceneEnd";

/** Above every world object, below nothing. */
const SKY = 100_000;

/** Turns a piece of ambience down when reduced motion is on, and back up when off. */
type Toggle = (reduced: boolean) => void;

/**
 * Atmosphere that isn't tied to the layout grid: drifting leaves, chimney
 * smoke and the arcade's glowing marquee. With reduced motion on, leaves and
 * sparkles stop, the glow holds still and smoke thins out — and this updates
 * live when the in-game setting changes.
 */
export function addAmbience(scene: Phaser.Scene) {
  const toggles = [addCloudShadows(scene), addLeaves(scene), addChimneySmoke(scene), addArcadeGlow(scene)];
  const apply = (reduced: boolean) => toggles.forEach((t) => t(reduced));
  apply(reducedMotion());
  const off = onReducedMotionChange(apply);
  onSceneEnd(scene, off);
}

const setEmitting = (emitter: Phaser.GameObjects.Particles.ParticleEmitter, on: boolean) => {
  if (on) emitter.start();
  else {
    emitter.stop();
    emitter.killAll();
  }
};

/** Soft shadows of passing clouds drifting slowly across the whole village. */
function addCloudShadows(scene: Phaser.Scene): Toggle {
  const width = MAP_WIDTH * TILE;
  const height = MAP_HEIGHT * TILE;
  const clouds = [
    { x: 80, y: 120, speed: 5 },
    { x: 520, y: 380, speed: 4 },
    { x: 860, y: 90, speed: 6 },
    { x: 300, y: 560, speed: 4.5 },
  ].map(({ x, y, speed }) => ({
    img: scene.add.image(x, y, "cloud").setScale(3).setTint(0x000000).setAlpha(0.07).setDepth(SKY - 5),
    speed,
  }));
  let paused = false;
  scene.events.on(Phaser.Scenes.Events.UPDATE, (_: number, delta: number) => {
    if (paused) return;
    for (const c of clouds) {
      c.img.x += (c.speed * delta) / 1000;
      if (c.img.x - c.img.displayWidth / 2 > width) {
        c.img.x = -c.img.displayWidth / 2;
        c.img.y = Phaser.Math.Between(40, height - 40);
      }
    }
  });
  return (reduced) => {
    paused = reduced;
    for (const c of clouds) c.img.setVisible(!reduced);
  };
}

function addLeaves(scene: Phaser.Scene): Toggle {
  // Emit along a strip just above whatever the camera is looking at.
  const zone = new Phaser.Geom.Rectangle(0, 0, 1, 1);
  const cam = scene.cameras.main;
  const config = (key: string): Phaser.Types.GameObjects.Particles.ParticleEmitterConfig => ({
    frame: [0, 1, 2, 3, 4, 5],
    lifespan: 9000,
    speedX: { min: 6, max: 22 },
    speedY: { min: 10, max: 20 },
    rotate: { min: -40, max: 40 },
    alpha: { start: 0.95, end: 0 },
    frequency: key === "leafPink" ? 1800 : 1100,
    emitZone: { type: "random", source: zone, quantity: 1 } as Phaser.Types.GameObjects.Particles.EmitZoneData,
  });
  const leaves = [
    scene.add.particles(0, 0, "leaf", config("leaf")),
    scene.add.particles(0, 0, "leafPink", config("leafPink")),
  ];
  for (const e of leaves) e.setDepth(SKY);
  scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
    const view = cam.worldView;
    zone.setTo(view.x - 40, view.y - 10, view.width + 40, 8);
  });
  return (reduced) => leaves.forEach((e) => setEmitting(e, !reduced));
}

function addChimneySmoke(scene: Phaser.Scene): Toggle {
  let reduced = false;
  let tick = 0;
  for (const c of chimneys) {
    const puff = () => {
      if (reduced && tick++ % 2) return; // half as many puffs
      const s = scene.add.sprite(c.x * TILE, c.y * TILE, "smoke").setScale(0.5).setAlpha(0.55).setDepth(SKY - 1);
      s.play({ key: effectAnim("smoke"), frameRate: 4, repeat: 0 });
      scene.tweens.add({
        targets: s,
        y: s.y - 18,
        x: s.x + 6,
        alpha: 0,
        duration: 1500,
        onComplete: () => s.destroy(),
      });
    };
    scene.time.addEvent({ delay: 1300, loop: true, callback: puff });
  }
  return (r) => (reduced = r);
}

function addArcadeGlow(scene: Phaser.Scene): Toggle {
  if (!scene.textures.exists("glow")) {
    const size = 64;
    const tex = scene.textures.createCanvas("glow", size, size)!;
    const ctx = tex.getContext();
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    tex.refresh();
  }
  const x = arcadeGlow.x * TILE;
  const y = arcadeGlow.y * TILE;
  const glow = scene.add.image(x, y, "glow").setBlendMode(Phaser.BlendModes.ADD)
    .setScale(1.6, 0.8).setTint(0xff4fb8).setAlpha(0.45).setDepth(SKY - 2);

  // Cycle the neon between magenta and cyan, like an arcade marquee.
  const pulse = scene.tweens.addCounter({
    from: 0, to: 1, duration: 2400, yoyo: true, repeat: -1, ease: "Sine.easeInOut",
    onUpdate: (tween) => {
      const v = tween.getValue() ?? 0;
      const c = Phaser.Display.Color.Interpolate.ColorWithColor(
        Phaser.Display.Color.ValueToColor(0xff4fb8), Phaser.Display.Color.ValueToColor(0x4fe3ff), 1, v,
      );
      glow.setTint(Phaser.Display.Color.GetColor(c.r, c.g, c.b)).setAlpha(0.38 + 0.14 * Math.sin(v * Math.PI));
    },
  });
  const sparks = scene.add.particles(x, y - 6, "spark", {
    frame: [0, 1, 2, 3, 4],
    x: { min: -28, max: 28 },
    y: { min: -10, max: 6 },
    lifespan: 900,
    frequency: 380,
    alpha: { start: 1, end: 0 },
    speedY: { min: -8, max: -2 },
    tint: [0xff8ad8, 0x8af0ff, 0xfff38a],
  }).setDepth(SKY - 2);

  return (reduced) => {
    if (reduced) {
      pulse.pause();
      glow.setTint(0xff4fb8).setAlpha(0.45);
    } else pulse.resume();
    setEmitting(sparks, !reduced);
  };
}
