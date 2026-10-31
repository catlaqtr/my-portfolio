import Phaser from "phaser";
import { TILE, decals, props, terrain, type Body } from "../assets";
import { neighboursOf, pieceFor, tileIndex, type TerrainSet } from "../world/autotile";
import {
  MAP_HEIGHT, MAP_WIDTH, animals, braziers, buildings, dirt, effects, fountainBasin, npcs,
  placements, ponds, spawn, type Placement, type Rect,
} from "../world/layout";
import { Player } from "../entities/Player";
import { Animal, Villager } from "../entities/Villager";
import { addAmbience } from "../ambience";
import { FONT, decalFrame, effectAnim } from "./BootScene";
import { FOUNTAIN } from "../pixelSprites";
import { pixelPerfectZoom } from "../viewport";
import type { LocationId } from "../../content/locations";
import { BRIDGE_KEY, type Bridge } from "../bridge";
import { Interactions } from "../systems/Interactions";
import { onSceneEnd } from "../sceneEnd";

const WATER_GID = 1000;


const inRects = (rects: Rect[], x: number, y: number) =>
  rects.some((r) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h);

/** Small deterministic PRNG so the village decorates the same way every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class WorldScene extends Phaser.Scene {
  private obstacles: Phaser.GameObjects.Zone[] = [];
  /** Tiles covered by something, so scattered decals avoid them. */
  private occupied = new Set<string>();
  private player!: Player;

  constructor() {
    super("world");
  }

  create() {
    const rand = mulberry32(2026);
    this.physics.world.setBounds(0, 0, MAP_WIDTH * TILE, MAP_HEIGHT * TILE);

    const waterLayer = this.buildTerrain(rand);
    for (const p of placements) this.placeProp(p);
    for (const b of buildings) {
      this.placeProp(b);
      this.placeSign(b.sign, b.signAt.x, b.signAt.y);
    }
    this.buildFountain();
    this.placeBraziers();
    this.scatterDecals(rand);
    this.placeEffects();

    const start = this.startPoint();
    this.player = new Player(this, start.x * TILE, start.y * TILE);
    const villagers = npcs.map((n) => new Villager(this, n));
    const critters = animals.map((a) => new Animal(this, a.sprite, a.x, a.y, a.wander));
    const movers = [this.player, ...villagers, ...critters];

    this.physics.add.collider(movers, this.obstacles);
    this.physics.add.collider(movers, waterLayer);
    this.physics.add.collider(this.player, [...villagers, ...critters]);
    for (const m of [...villagers, ...critters]) m.setCollideWorldBounds(true);

    const bridge = this.registry.get(BRIDGE_KEY) as Bridge;
    new Interactions(this, this.player, villagers, bridge);
    addAmbience(this);
    this.setupCamera();
    // Let the first frame render before React removes the loading screen.
    this.time.delayedCall(0, () => bridge.emit("ready", true));
  }

  /** The fountain, or just outside a building when the URL asks for one (?at=arena). */
  private startPoint() {
    const id = this.registry.get("startAt") as LocationId | undefined;
    const building = buildings.find((b) => b.location === id);
    return building ? { x: building.entrance.x + 1, y: building.entrance.y + 2 } : spawn;
  }

  // ── Terrain ─────────────────────────────────────────────────────────────

  private buildTerrain(rand: () => number) {
    const map = this.make.tilemap({ width: MAP_WIDTH, height: MAP_HEIGHT, tileWidth: TILE, tileHeight: TILE });
    const floorTiles = map.addTilesetImage("floor", "floor", TILE, TILE, 0, 0, 0)!;
    const waterTiles = map.addTilesetImage("water", "water", TILE, TILE, 0, 0, WATER_GID)!;
    const ground = map.createBlankLayer("ground", floorTiles)!.setDepth(-20);
    const water = map.createBlankLayer("water", waterTiles)!.setDepth(-10);

    const isDirt = (x: number, y: number) => inRects(dirt, x, y);
    const isPond = (x: number, y: number) => inRects(ponds, x, y);
    const autotile = (set: TerrainSet, same: (x: number, y: number) => boolean, x: number, y: number) =>
      tileIndex(set, pieceFor(neighboursOf(same, x, y)));

    const { grass } = terrain;
    const floorIndex = ([col, row]: [number, number]) => row * terrain.floorColumns + col;

    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (isDirt(x, y)) {
          ground.putTileAt(autotile(terrain.dirt, isDirt, x, y), x, y);
          this.occupied.add(`${x},${y}`);
        } else {
          const variant = rand() < 0.12
            ? grass.variants[Math.floor(rand() * grass.variants.length)]
            : grass.plain;
          ground.putTileAt(floorIndex(variant), x, y);
        }
        if (isPond(x, y)) water.putTileAt(WATER_GID + autotile(terrain.pond, isPond, x, y), x, y);
        if (isPond(x, y)) this.occupied.add(`${x},${y}`);
      }
    }
    water.setCollisionByExclusion([-1]);
    return water;
  }

  // ── Props ───────────────────────────────────────────────────────────────

  private placeProp({ prop, x, y, front }: Placement) {
    const def = props[prop];
    const px = x * TILE;
    const py = y * TILE;
    const bottom = py + def.h * TILE;
    this.add.image(px, py, def.sheet, prop).setOrigin(0, 0).setDepth(bottom + (front ? 1 : 0));

    for (const [bx, by, bw, bh] of ("bodies" in def ? def.bodies : []) as Body[]) {
      this.addObstacle(px + bx, py + by, bw, bh);
    }
    for (let ty = Math.floor(y); ty < y + def.h; ty++) {
      for (let tx = Math.floor(x); tx < x + def.w; tx++) this.occupied.add(`${tx},${ty}`);
    }
  }

  private addObstacle(x: number, y: number, w: number, h: number) {
    const zone = this.add.zone(x + w / 2, y + h / 2, w, h);
    this.physics.add.existing(zone, true);
    this.obstacles.push(zone);
  }

  /** A parchment plaque on two posts, with the location's name. */
  private placeSign(label: string, tx: number, ty: number) {
    const text = this.add.bitmapText(0, 0, FONT, label.toUpperCase()).setTint(0x3b1f0e);
    const width = Math.ceil(text.width) + 10;
    const height = 13;
    const left = Math.round(tx * TILE + TILE / 2 - width / 2);
    const top = ty * TILE - height;
    const depth = ty * TILE + 6;

    const g = this.add.graphics().setDepth(depth);
    // Posts
    g.fillStyle(0x141b1b).fillRect(left + 3, top + height - 1, 4, 8).fillRect(left + width - 7, top + height - 1, 4, 8);
    g.fillStyle(0x965340).fillRect(left + 4, top + height - 1, 2, 7).fillRect(left + width - 6, top + height - 1, 2, 7);
    // Board: outline, parchment face, darker lower lip
    g.fillStyle(0x141b1b).fillRect(left, top, width, height);
    g.fillStyle(0xc8966b).fillRect(left + 1, top + 1, width - 2, height - 2);
    g.fillStyle(0xeecf9b).fillRect(left + 1, top + 1, width - 2, height - 4);
    text.setPosition(left + 5, top + 2).setDepth(depth + 0.1);
    this.addObstacle(left + 3, top + height + 2, width - 6, 4);
  }

  // ── Fountain ────────────────────────────────────────────────────────────

  private buildFountain() {
    const { x, y, w, h } = fountainBasin;
    const left = Math.round((x + w / 2) * TILE - FOUNTAIN.width / 2);
    const top = (y + h) * TILE - FOUNTAIN.height;
    const depth = (y + h) * TILE;
    this.add.image(left, top, "fountain").setOrigin(0, 0).setDepth(depth);
    this.addObstacle(left + 4, top + 18, FOUNTAIN.width - 8, FOUNTAIN.height - 22);

    // Water arcing out of the spout and falling back into the basin.
    // (A canvas texture, not Graphics.generateTexture: Phaser's static
    // Graphics.TargetCamera would keep this game alive after leaving /play.)
    if (!this.textures.exists("droplet")) {
      const tex = this.textures.createCanvas("droplet", 1, 1)!;
      tex.context.fillStyle = "#fff";
      tex.context.fillRect(0, 0, 1, 1);
      tex.refresh();
    }
    this.add.particles(left + FOUNTAIN.spoutX, top + FOUNTAIN.spoutY, "droplet", {
      speedX: { min: -30, max: 30 },
      speedY: { min: -46, max: -30 },
      gravityY: 150,
      lifespan: { min: 520, max: 700 },
      frequency: 30,
      alpha: { start: 1, end: 0.3 },
      tint: [0xffffff, 0xcdeffd, 0x9fe6f5],
    }).setDepth(depth + 0.5);
  }

  private placeBraziers() {
    for (const b of braziers) {
      const bx = Math.round(b.x * TILE);
      const by = Math.round(b.y * TILE);
      this.add.image(bx, by, "brazier").setOrigin(0, 0).setDepth(by + 12);
      this.add.sprite(bx + 2, by - 9, "fire").setOrigin(0, 0).setDepth(by + 12.5)
        .play({ key: effectAnim("fire"), frameRate: 12, startFrame: Math.floor(Math.random() * 6) });
      this.addObstacle(bx + 1, by + 6, 10, 6);
    }
  }

  // ── Small details ───────────────────────────────────────────────────────

  private scatterDecals(rand: () => number) {
    for (let y = 1; y < MAP_HEIGHT - 2; y++) {
      for (let x = 1; x < MAP_WIDTH - 2; x++) {
        if (this.occupied.has(`${x},${y}`) || rand() > 0.06) continue;
        const frame = decalFrame(Math.floor(rand() * decals.frames.length));
        this.add.image(x * TILE, y * TILE, decals.sheet, frame).setOrigin(0, 0).setDepth(-1);
      }
    }
    for (const pond of ponds) {
      for (let i = 0; i < 3; i++) {
        const rx = pond.x + 1 + rand() * (pond.w - 3);
        const ry = pond.y + 1 + rand() * (pond.h - 3);
        this.add.sprite(rx * TILE, ry * TILE, "ripples").setOrigin(0, 0).setDepth(-5).setAlpha(0.5)
          .play({ key: effectAnim("ripples"), frameRate: 3, startFrame: i });
      }
    }
  }

  private placeEffects() {
    for (const e of effects) {
      const above = e.above ? (e.y + e.above.y) * TILE + 1 : (e.y + 1) * TILE;
      this.add.sprite(e.x * TILE, e.y * TILE, e.effect).setOrigin(0, 0).setDepth(above)
        .play({ key: effectAnim(e.effect), frameRate: e.fps ?? 8, startFrame: Math.floor(Math.random() * 4) });
    }
  }

  // ── Camera ──────────────────────────────────────────────────────────────

  private setupCamera() {
    const cam = this.cameras.main;
    cam.setBounds(0, 0, MAP_WIDTH * TILE, MAP_HEIGHT * TILE);
    cam.setRoundPixels(true);
    cam.startFollow(this.player, true, 0.15, 0.15);
    cam.setBackgroundColor(0x2d4a26);
    // Warm, soft edges for a late-afternoon feel (filters are WebGL-only).
    if (this.renderer.type === Phaser.WEBGL) {
      cam.filters.external.addVignette(0.5, 0.5, 0.95, 0.35, 0x2a160a);
    }

    const fitZoom = () => {
      const short = Math.min(this.scale.width, this.scale.height);
      cam.setZoom(pixelPerfectZoom(short, (this.registry.get("upscale") as number) ?? 1));
    };
    fitZoom();
    this.scale.on(Phaser.Scale.Events.RESIZE, fitZoom);
    onSceneEnd(this, () => this.scale.off(Phaser.Scale.Events.RESIZE, fitZoom));
  }
}
