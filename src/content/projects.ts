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

// Only the two showcase projects are published. Earlier projects are
// archived — see archive/README.md for how to restore them.
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
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function projectsUsing(skill: SkillName): Project[] {
  return projects.filter((p) => p.techStack.includes(skill));
}
