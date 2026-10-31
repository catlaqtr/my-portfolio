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

export interface ApiRoute {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  summary: string;
  /** Status codes and what they mean, as implemented. */
  responses: string;
}

/** Deeper detail shown in the village panels and on the Projects page. */
export interface ProjectDetails {
  tagline: string;
  /** Hard numbers from the repository (counted, not estimated). */
  stats: { label: string; value: string }[];
  /** Features that exist in the code today. */
  built: string[];
  architecture: { summary: string; layers: { name: string; detail: string }[] };
  /** Public HTTP routes, where they're few enough to list. */
  api?: ApiRoute[];
  /** Engineering choices visible in the code or configuration. */
  decisions: { title: string; detail: string }[];
  /** Problems the project had to solve, and how the code solves them. */
  challenges?: { challenge: string; solution: string }[];
  /** Technologies grouped by role, as found in the project's build files. */
  stack: { group: string; items: string[] }[];
  testing: string;
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
// Every statement below was checked against the projects' repositories
// (source, build files, tests, migrations, design docs) in October 2026:
//   ArcClash  — github.com/catlaqtr/ArcClash @ a9f6dfa
//   AnimeGuess — github.com/catlaqtr/animeguess (private) @ 5b771b4
// Keep it in sync when the projects change.
export const projects: Project[] = [
  {
    id: "arcclash",
    title: "ArcClash",
    description:
      "A turn-based, anime-inspired card-drafting duel game I'm building backend-first with Java 21 and Spring Boot 4. The rules engine and a first REST API with PostgreSQL persistence are implemented and tested; the playable game and its client are still to come.",
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
      tagline: "Card-drafting duel game · Java 21 & Spring Boot 4 backend",
      stats: [
        { label: "JUnit tests", value: "16" },
        { label: "REST endpoints", value: "2" },
        { label: "Engine packages", value: "6" },
      ],
      built: [
        "Rules engine in plain Java: character stats, a three-stance counter cycle, Duel Power calculation and duel resolution",
        "Hidden five-character draft, magic cards with their effects, and battlefield events",
        "Set and match flow for the Quick Duel and Championship modes",
        "REST API to create a match and fetch it by id, persisted in PostgreSQL",
        "Request validation (400) and not-found handling (404), covered by tests",
      ],
      architecture: {
        summary:
          "A modular monolith in one Spring Boot application. The match API follows Controller → Service → Repository with DTOs at the edges; the game rules live in a separate plain-Java engine with no Spring, HTTP or database code.",
        layers: [
          { name: "Controller", detail: "MatchController (@RestController) maps the routes and validates request bodies with @Valid" },
          { name: "DTOs", detail: "Java records: CreateMatchRequest (mode is @NotNull) and MatchResponse, so entities never leave the service layer" },
          { name: "Service", detail: "MatchService creates matches with UUID ids, maps entities to responses and raises 404 for unknown ids" },
          { name: "Repository", detail: "MatchRepository extends JpaRepository<MatchEntity, UUID>" },
          { name: "Database", detail: "MatchEntity on a PostgreSQL table created by a Flyway migration: UUID key, mode stored as text with a CHECK constraint, timestamp set by the database" },
          { name: "Game engine", detail: "Draft, duels, stances, magic, events and match coordination in plain Java. Not yet connected to the API" },
        ],
      },
      api: [
        {
          method: "POST",
          path: "/api/matches",
          summary: 'Create a match. Body: { "mode": "QUICK_DUEL" | "CHAMPIONSHIP" }',
          responses: "201 Created with the new match id · 400 if mode is missing",
        },
        {
          method: "GET",
          path: "/api/matches/{id}",
          summary: "Fetch a match: mode, set wins for each player, finished flag, created time",
          responses: "200 OK · 404 if no match has that id",
        },
      ],
      decisions: [
        { title: "Rules engine without framework code", detail: "The engine has no Spring or JPA imports, so the game rules are unit-tested quickly in isolation and can be reused by the API." },
        { title: "Schema owned by Flyway", detail: "Hibernate runs with ddl-auto=validate: it checks the entities against the migrated schema but never changes it." },
        { title: "Open Session in View disabled", detail: "spring.jpa.open-in-view=false keeps database access inside the service layer instead of during view rendering." },
        { title: "Immutable DTOs and constructor injection", detail: "Requests and responses are Java records validated with Bean Validation; dependencies are injected through constructors." },
        { title: "Errors via ResponseStatusException", detail: "A missing match maps to 404 with a clear reason. A global @ControllerAdvice for uniform error bodies isn't built yet." },
      ],
      stack: [
        { group: "Backend", items: ["Java 21", "Spring Boot 4", "Spring Web MVC", "Bean Validation"] },
        { group: "Data", items: ["Spring Data JPA", "Hibernate", "PostgreSQL", "Flyway"] },
        { group: "Build & tests", items: ["Maven", "JUnit 5", "Mockito", "MockMvc"] },
      ],
      testing:
        "16 JUnit 5 tests: a unit test for each engine component (stances, stats, Duel Power, duel resolution, draft, magic, events, sets and match flow), a context-load test, and four @WebMvcTest slice tests that use MockMvc with a Mockito-mocked service to check 201, 200, 400 and 404 responses.",
      planned: [
        "Connect the rules engine to the API, with match state persisted in PostgreSQL",
        "Clear, non-leaking error responses and duplicate-safe commands (from the design doc)",
        "Computer opponent for single-player matches",
        "React + TypeScript game client",
        "Spring Security once player accounts arrive",
        "Docker packaging and Testcontainers integration tests",
        "Real-time PvP over WebSockets",
      ],
      screenshotsNote:
        "No UI yet: ArcClash currently runs as a backend and rules engine. Screenshots will come with the React client.",
    },
    todo: ["Screenshots (once the React client exists)"],
  },
  {
    id: "animeguess",
    title: "AnimeGuess",
    description:
      "An AI-powered anime character guessing game. Players ask yes/no questions about a hidden character and an AI answers from that character's stored profile, then they try to name them. It has several game modes, accounts, leaderboards and ranked real-time multiplayer: a Next.js frontend on a Spring Boot, PostgreSQL and Redis backend. It isn't live yet.",
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
      stats: [
        { label: "REST controllers", value: "21" },
        { label: "Flyway migrations", value: "92" },
        { label: "JPA entities", value: "28" },
        { label: "Tests", value: "84" },
      ],
      built: [
        "Ask yes/no questions about a hidden character; an AI answers from that character's stored profile, then you guess who it is",
        "Modes: Classic, Daily Challenge, Single Anime, Quick Game, Progressive Hints and Quiz (multiple choice with AI-written clues at three difficulty levels)",
        "Typo-tolerant guess matching: \"lufy\" or just \"luffy\" both count for Monkey D. Luffy",
        "Accounts with email verification, password reset, and Google or GitHub sign-in",
        "Ranked real-time multiplayer with matchmaking and an Elo-style rating",
        "Leaderboards, login streaks, achievements, friends and messages, plus a shop and avatar customisation",
      ],
      architecture: {
        summary:
          "A Next.js frontend talks to a layered Spring Boot API over REST and WebSockets. The backend is organised into controller, service, repository, entity, DTO, security, filter and exception packages.",
        layers: [
          { name: "Frontend", detail: "Next.js 14 and React 18 with TypeScript and Tailwind CSS; TanStack Query for API data, React Hook Form + Zod for forms, STOMP over SockJS for live games" },
          { name: "API", detail: "21 @RestController classes over 37 services, documented with OpenAPI; a global exception handler returns one consistent error format" },
          { name: "Security", detail: "Stateless Spring Security: JWT authentication filter, BCrypt password hashing, OAuth2 login with Google and GitHub, reCAPTCHA on registration and guest games" },
          { name: "Real time", detail: "STOMP WebSocket endpoint with a SockJS fallback; the JWT is checked during the WebSocket handshake" },
          { name: "AI", detail: "Spring AI ChatModel calls OpenAI with a prompt template built from the character's profile" },
          { name: "Data", detail: "PostgreSQL through Spring Data JPA (28 entities, 92 Flyway migrations); Redis for rate limiting, live game state and leaderboard caching" },
        ],
      },
      decisions: [
        { title: "Ground the AI in stored data", detail: "Each answer is generated from the hidden character's own profile and restricted to \"yes\", \"no\" or \"I'm not sure\", so answers stay consistent and on-topic." },
        { title: "Validate before calling the AI", detail: "Questions are checked to be yes/no questions first, so open-ended questions never cost an AI call." },
        { title: "Stateless auth everywhere", detail: "The same JWT secures REST requests and the WebSocket handshake; there are no server sessions to share between instances." },
        { title: "Schema in migrations", detail: "All 92 schema changes are versioned Flyway migrations." },
      ],
      challenges: [
        { challenge: "Keeping AI costs and abuse under control", solution: "Bucket4j rate limits backed by Redis, so they hold across instances, with separate budgets for the AI question endpoint, sign-in, polling and other routes; reCAPTCHA v3 on registration and guest games; non-yes/no questions rejected before any AI call." },
        { challenge: "Live multiplayer state", solution: "Game conversations live in Redis with an expiry, and players join through JWT-authenticated STOMP connections." },
        { challenge: "Fair ranked matches", solution: "A matchmaking queue with a scheduler, and an Elo-style rating update (K-factor 32) after each game." },
        { challenge: "Forgiving answers", solution: "Fuzzy name matching allows one typo and partial names, with its own unit tests." },
      ],
      stack: [
        { group: "Frontend", items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "TanStack Query", "Zod"] },
        { group: "Backend", items: ["Java 17", "Spring Boot 3", "Spring Security", "JWT & OAuth2", "WebSockets (STOMP)", "Spring AI"] },
        { group: "Data", items: ["PostgreSQL", "Spring Data JPA", "Flyway", "Redis"] },
        { group: "Quality & delivery", items: ["JUnit 5", "Mockito", "Testcontainers", "Docker", "GitHub Actions", "Sentry"] },
      ],
      testing:
        "84 tests: PostgreSQL integration tests on Testcontainers for authentication and the game service, @WebMvcTest controller tests with Mockito, and unit tests for question validation, guess matching, game rules and reCAPTCHA. GitHub Actions runs separate backend and frontend CI.",
      screenshotsNote: "Screenshots coming soon.",
      sourceNote: "Source code is private.",
    },
    todo: [
      "Screenshots (home, a Classic game, multiplayer, leaderboard)",
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
