import type { SkillName } from "./skills";

/**
 * - `in-development`: being built, no release yet.
 * - `not-live`: built, but no public deployment at the moment.
 * - `live`: publicly playable (requires a verified `liveDemo`).
 */
export type ProjectStatus = "in-development" | "not-live" | "live";

export const statusLabel: Record<ProjectStatus, string> = {
  "in-development": "In development",
  "not-live": "Not live yet",
  live: "Live",
};

/** Deeper detail shown in the village panels and the Projects page. */
export interface ProjectDetails {
  tagline: string;
  highlights: string[];
  architecture: { summary: string; layers: { name: string; detail: string }[] };
  /** Technologies grouped by role, as found in the project's build files. */
  stack: { group: string; items: string[] }[];
  testing: string;
  /** Example API routes, where the project exposes a public HTTP API. */
  endpoints?: string[];
  /** Not built yet; taken from the project's own roadmap. */
  planned?: string[];
  /** Shown in place of screenshots while none are available. */
  screenshotsNote?: string;
  /** e.g. "Source code is private." */
  sourceNote?: string;
}

export interface Project {
  /** Stable slug, used for anchors (/projects#arcclash) and game locations. */
  id: string;
  title: string;
  description: string;
  techStack: SkillName[];
  status: ProjectStatus;
  details: ProjectDetails;
  /** Screenshot path in /public. Omit to show a "screenshot coming soon" tile. */
  image?: string;
  /** Only set when the live deployment has been verified to work. */
  liveDemo?: string;
  github?: string;
  /**
   * Content still missing. Shown as a notice in development builds only,
   * so gaps are obvious locally but never leak to production.
   */
  todo?: string[];
}

// Only the two showcase projects are published. Earlier projects are
// archived — see archive/README.md for how to restore them.
//
// Facts below come from each project's repository (build files, tests,
// design docs). Keep them in sync when the projects change.
export const projects: Project[] = [
  {
    id: "arcclash",
    title: "ArcClash",
    description:
      "A turn-based, anime-inspired card-drafting duel game. Players draft a secret five-character team, then pick a hidden fighter, a stance and optional magic each duel; both sides reveal together and one Duel Power calculation decides the winner. The Java 21 / Spring Boot backend is in active development — there is no playable release yet.",
    techStack: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Spring Data JPA",
      "Hibernate",
      "PostgreSQL",
      "Flyway",
      "Maven",
      "JUnit 5",
      "Mockito",
    ],
    status: "in-development",
    github: "https://github.com/catlaqtr/ArcClash",
    details: {
      tagline: "Strategic card-drafting duel game · Java 21 & Spring Boot",
      highlights: [
        "Pure-Java duel engine (stats, stances and a single Duel Power formula) kept free of web and database code so the rules are easy to unit-test",
        "Hidden five-character draft, limited magic cards and battlefield events",
        "Quick Duel and Championship match modes",
        "Match REST API with request validation and PostgreSQL persistence",
        "Database schema versioned with Flyway; Hibernate only validates it",
      ],
      architecture: {
        summary:
          "A modular monolith: one Spring Boot application split into focused packages, with the game rules isolated from HTTP and persistence.",
        layers: [
          { name: "REST API", detail: "Spring Web MVC controllers with Bean Validation" },
          { name: "Services", detail: "Match service coordinating creation and lookup of matches" },
          { name: "Game engine", detail: "Plain Java: draft, duel resolution, stances, magic effects, battlefield events and match flow" },
          { name: "Persistence", detail: "Spring Data JPA repositories and Hibernate entities" },
          { name: "Database", detail: "PostgreSQL, with the schema owned by Flyway migrations" },
        ],
      },
      stack: [
        { group: "Backend", items: ["Java 21", "Spring Boot 4", "Spring Web MVC", "Bean Validation"] },
        { group: "Data", items: ["Spring Data JPA", "Hibernate", "PostgreSQL", "Flyway"] },
        { group: "Build & tests", items: ["Maven", "JUnit 5", "Mockito", "MockMvc"] },
      ],
      testing:
        "JUnit 5 unit tests cover the duel engine (stances, Duel Power, draft, magic, events and match flow); the REST controller is tested with MockMvc and Mockito.",
      endpoints: ["POST /api/matches", "GET /api/matches/{id}"],
      planned: [
        "React + TypeScript game client",
        "Computer opponent for single-player matches",
        "Spring Security once player accounts arrive",
        "Docker packaging and Testcontainers integration tests",
        "Real-time PvP over WebSockets",
      ],
      screenshotsNote:
        "No UI yet: the game currently runs as a backend and rules engine. Screenshots will come with the React client.",
    },
    todo: ["Screenshots (once the React client exists)"],
  },
  {
    id: "animeguess",
    title: "AnimeGuess",
    description:
      "An AI-powered anime character guessing game. Players ask yes/no questions about a hidden character and an AI answers from the character's canonical information. It has several game modes, accounts and leaderboards, and real-time multiplayer, with a Next.js frontend and a Spring Boot backend set up for Vercel and Render. It isn't live yet.",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Spring AI",
      "REST APIs",
      "WebSockets",
      "Spring Data JPA",
      "Hibernate",
      "PostgreSQL",
      "Flyway",
      "Redis",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "GitHub Actions",
      "JUnit 5",
      "Mockito",
      "Testcontainers",
      "Maven",
      "Vercel",
      "Render",
    ],
    status: "not-live",
    details: {
      tagline: "AI-powered anime character guessing game · Next.js + Spring Boot",
      highlights: [
        "Ask yes/no questions and an AI (Spring AI with OpenAI) answers from the character's canonical information",
        "Modes: Classic, Daily Challenge, Single Anime, Quick Game, Progressive Hints and Quiz",
        "Accounts with JWT and OAuth2 sign-in, leaderboards, achievements and friends",
        "Real-time multiplayer over WebSockets (STOMP)",
        "Redis-backed rate limiting and Sentry error monitoring",
      ],
      architecture: {
        summary:
          "A Next.js frontend talks to a Spring Boot API over REST and WebSockets; the API owns the game logic, authentication and the AI integration.",
        layers: [
          { name: "Frontend", detail: "Next.js 14, React 18, TypeScript and Tailwind CSS, with TanStack Query and Zod-validated forms" },
          { name: "API", detail: "Spring Boot 3 REST and WebSocket (STOMP) endpoints, documented with OpenAPI" },
          { name: "Security", detail: "Spring Security with JWT and OAuth2 login" },
          { name: "AI", detail: "Spring AI with OpenAI answers players' questions" },
          { name: "Data", detail: "PostgreSQL via Spring Data JPA with Flyway migrations; Redis for rate limiting" },
          { name: "Delivery", detail: "Docker images and GitHub Actions CI, configured for Vercel and Render" },
        ],
      },
      stack: [
        { group: "Frontend", items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "TanStack Query", "Zod"] },
        { group: "Backend", items: ["Java 17", "Spring Boot 3", "Spring Security", "JWT & OAuth2", "WebSockets (STOMP)", "Spring AI"] },
        { group: "Data", items: ["PostgreSQL", "Spring Data JPA", "Flyway", "Redis"] },
        { group: "Quality & delivery", items: ["JUnit 5", "Mockito", "Testcontainers", "Docker", "GitHub Actions", "Sentry"] },
      ],
      testing:
        "JUnit 5 and Mockito unit tests, Spring Security tests, and Testcontainers-backed PostgreSQL integration tests.",
      screenshotsNote: "Screenshots coming soon.",
      sourceNote: "Source code is private.",
    },
    todo: [
      "Screenshots",
      "Not live yet. When it is, set liveDemo (canonical address in its code: https://animeguess.net) and status \"live\"",
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function projectsUsing(skill: SkillName): Project[] {
  return projects.filter((p) => p.techStack.includes(skill));
}
