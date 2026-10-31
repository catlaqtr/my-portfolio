import type { SkillName } from "./skills";

export type ProjectStatus = "released" | "in-development";

export interface Project {
  /** Stable slug, used for anchors (/projects#arcclash) and game locations. */
  id: string;
  title: string;
  description: string;
  techStack: SkillName[];
  status: ProjectStatus;
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

export const projects: Project[] = [
  {
    id: "arcclash",
    title: "ArcClash",
    description:
      "A strategic deck-drafting game I'm building with Java 21 and Spring Boot. The backend uses Spring Security, Spring Data JPA/Hibernate on PostgreSQL, Flyway migrations, Maven and Docker, backed by automated tests. Currently in active development — not yet released.",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "PostgreSQL",
      "Flyway",
      "Maven",
      "Docker",
    ],
    status: "in-development",
    github: "https://github.com/catlaqtr/ArcClash",
    todo: [
      "Screenshots",
      "Architecture notes (for the Arena panel)",
      "Which testing tools the suite uses (JUnit 5 / Mockito / Testcontainers?)",
    ],
  },
  {
    id: "animeguess",
    title: "AnimeGuess",
    description:
      "An anime guessing web app where players identify anime from images and audio clips. Built with a separate frontend and backend, and previously deployed using Vercel and Render.",
    techStack: [],
    status: "released",
    // The GitHub repository is private, so no public link.
    todo: [
      "Tech stack",
      "Screenshots",
      "Live URL (add only once the deployment is confirmed working)",
    ],
  },
  {
    id: "throne-of-dust",
    title: "Throne of Dust",
    description:
      "A strategic kingdom builder game built with Spring Boot backend and Next.js frontend. Manage your kingdom, recruit characters, build structures, and lead raids in this immersive strategy game with real-time resource collection and character training.",
    techStack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Java"],
    status: "released",
    image: "/throne-of-dust.webp",
    liveDemo: "https://throneofdust-frontend.vercel.app/",
    github: "https://github.com/catlaqtr/throneofdustmain",
  },
  {
    id: "seastrike-battleship",
    title: "SeaStrike Battleship",
    description:
      "A full-stack Battleship game with Spring Boot + MySQL backend and React + TypeScript + Vite frontend. Features JWT authentication, ship placement validation, turn-based gameplay, TanStack Query for state management, React Hook Form with Zod validation, and Framer Motion animations.",
    techStack: ["React", "TypeScript", "Spring Boot", "MySQL"],
    status: "released",
    image: "/battleship.webp",
    liveDemo: "https://seastrikebattleship.vercel.app/",
    github: "https://github.com/catlaqtr/TheBattleShip",
  },
  {
    id: "cookease",
    title: "CookEase",
    description:
      "A modern recipe finder app built with React and TypeScript. Features fast search experience, responsive UI, keyboard-friendly modal, and clean error states for discovering and viewing recipe details.",
    techStack: ["React", "TypeScript"],
    status: "released",
    image: "/cookease.webp",
    liveDemo: "https://cookease-fawn.vercel.app/",
    github: "https://github.com/catlaqtr/cookease",
  },
  {
    id: "gamehub-plus",
    title: "GameHub+",
    description:
      "A modern game discovery app featuring trending games from RAWG API. Includes global search, playtime filtering, game details pages, dark mode, accessible modals, and form validation for adding custom games.",
    techStack: ["React", "TypeScript"],
    status: "released",
    image: "/gamehub.webp",
    liveDemo: "https://gamehub-plus.vercel.app/",
    github: "https://github.com/catlaqtr/gamehub-plus",
  },
  {
    id: "anime-finder",
    title: "Anime Finder",
    description:
      "A modern anime search app using Jikan API. Features responsive grid layout, lazy-loaded images, client-side routing, localStorage watchlist, accessible design, and improved SEO with meta tags.",
    techStack: ["React", "TypeScript"],
    status: "released",
    image: "/anime-finder.webp",
    liveDemo: "https://anime-finder-six.vercel.app/",
    github: "https://github.com/catlaqtr/anime-finder",
  },
  {
    id: "moviewatch-plus",
    title: "MovieWatch+",
    description:
      "A movie search and watchlist app powered by OMDb API. Features fast search with debouncing, responsive grid layout, localStorage watchlist, release year filtering, dark theme, and graceful loading states.",
    techStack: ["React", "TypeScript"],
    status: "released",
    image: "/moviewatch.webp",
    liveDemo: "https://moviewatch-plus.vercel.app/",
    github: "https://github.com/catlaqtr/moviewatch-plus",
  },
  {
    id: "task-tracker",
    title: "Task Tracker",
    description:
      "A clean task management app with priority levels, filtering, search functionality, and progress tracking. Features localStorage persistence, responsive design, and elegant styling with Tailwind CSS v4.",
    techStack: ["React", "TypeScript"],
    status: "released",
    image: "/task-tracker.webp",
    liveDemo: "https://task-tracker-smoky-two.vercel.app/",
    github: "https://github.com/catlaqtr/task-tracker",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function projectsUsing(skill: SkillName): Project[] {
  return projects.filter((p) => p.techStack.includes(skill));
}
