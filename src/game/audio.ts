/**
 * Optional music and sound effects for the village. Muted by default; the
 * choice is remembered. Nothing is downloaded until sound is switched on,
 * and browsers only allow audio after a user gesture, so music starts on
 * the toggle click (or on the first key/tap of a later visit).
 *
 * Audio: "Calm Village" and menu sounds from the Ninja Adventure pack (CC0).
 */
import musicUrl from "../assets/game/audio/calm-village.mp3";
import openUrl from "../assets/game/audio/open.mp3";
import closeUrl from "../assets/game/audio/close.mp3";
import talkUrl from "../assets/game/audio/talk.mp3";
import travelUrl from "../assets/game/audio/travel.mp3";
import blipUrl from "../assets/game/audio/blip.mp3";

const KEY = "hearthvale:sound";
const MUSIC_VOLUME = 0.35;
const SFX_VOLUME = 0.6;

const effects = { open: openUrl, close: closeUrl, talk: talkUrl, travel: travelUrl, blip: blipUrl } as const;
export type SoundEffect = keyof typeof effects;

let music: HTMLAudioElement | null = null;
const sfx = new Map<SoundEffect, HTMLAudioElement>();
const listeners = new Set<(on: boolean) => void>();

export function soundEnabled(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    window.localStorage.setItem(KEY, on ? "1" : "0");
  } catch {
    // Not persisted, but still applied for this visit.
  }
  if (on) startMusic();
  else stopMusic();
  for (const fn of listeners) fn(on);
}

export function onSoundChange(fn: (on: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Starts (or resumes) the looping music. Must run inside a user gesture the first time. */
export function startMusic() {
  if (!soundEnabled()) return;
  if (!music) {
    music = new Audio(musicUrl);
    music.loop = true;
    music.volume = MUSIC_VOLUME;
  }
  void music.play().catch(() => {
    // Autoplay blocked until the visitor interacts; resumeOnFirstGesture() retries.
  });
}

export function stopMusic() {
  music?.pause();
}

/**
 * If sound was left on last visit, browsers still block playback until the
 * visitor interacts. Retry once on their first key press or tap.
 */
export function resumeOnFirstGesture(): () => void {
  const resume = () => {
    startMusic();
    cleanup();
  };
  const cleanup = () => {
    window.removeEventListener("pointerdown", resume);
    window.removeEventListener("keydown", resume);
  };
  if (soundEnabled()) {
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
  }
  return cleanup;
}

export function playSound(name: SoundEffect) {
  if (!soundEnabled()) return;
  let el = sfx.get(name);
  if (!el) {
    el = new Audio(effects[name]);
    el.volume = SFX_VOLUME;
    sfx.set(name, el);
  }
  el.currentTime = 0;
  void el.play().catch(() => {});
}

/** Leaving the village: silence everything and release the music element. */
export function releaseAudio() {
  stopMusic();
  music = null;
  sfx.clear();
}
