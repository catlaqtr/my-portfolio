/**
 * The places in Hearthvale village. The game map (Tiled) refers to these by
 * `id`, and each one has a classic-mode equivalent so every in-game panel
 * has a plain-HTML fallback for recruiters and assistive tech.
 */
export type LocationId =
  | "arena"
  | "arcade"
  | "academy"
  | "house"
  | "post-office";

export interface VillageLocation {
  id: LocationId;
  name: string;
  tagline: string;
  /** Signature color, reused as the accent of the location's info panel. */
  accent: string;
  /** Where the same content lives in Recruiter Mode. */
  classicRoute: string;
}

export const locations: VillageLocation[] = [
  {
    id: "arena",
    name: "ArcClash Arena",
    tagline: "A Java 21 / Spring Boot card-drafting duel game, under construction.",
    accent: "#b4202a",
    classicRoute: "/projects#arcclash",
  },
  {
    id: "arcade",
    name: "AnimeGuess Arcade",
    tagline: "Guess the hidden anime character by asking an AI.",
    accent: "#e03c8a",
    classicRoute: "/projects#animeguess",
  },
  {
    id: "academy",
    name: "Skills Academy",
    tagline: "The languages, frameworks and tools I work with.",
    accent: "#2b59c3",
    classicRoute: "/about#skills",
  },
  {
    id: "house",
    name: "About Me House",
    tagline: "From Geography to software development.",
    accent: "#8a5a2b",
    classicRoute: "/about",
  },
  {
    id: "post-office",
    name: "Contact Center",
    tagline: "Resume, email and social links.",
    accent: "#e08a1e",
    classicRoute: "/contact",
  },
];

export function getLocation(id: LocationId): VillageLocation {
  const location = locations.find((l) => l.id === id);
  if (!location) throw new Error(`Unknown location: ${id}`);
  return location;
}
