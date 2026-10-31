/**
 * Title and description for every route. Used at runtime (document head on
 * navigation), at build time (pre-rendered HTML for Recruiter Mode) and for
 * the sitemap. Keep titles under ~60 characters and descriptions under ~160.
 */
export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Rendered to static HTML at build time, so crawlers and link previews see real content. */
  prerender: boolean;
}

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Mete Ünal — Java Backend Developer Portfolio",
    description:
      "Portfolio of Mete Ünal, a Java and Spring Boot backend developer. Explore it as a pixel-art village or in classic Recruiter Mode.",
    prerender: true,
  },
  {
    path: "/portfolio",
    title: "Mete Ünal — Java Backend Developer | Recruiter Mode",
    description:
      "Java and Spring Boot backend developer: REST APIs, PostgreSQL, Spring Data JPA and testing. Projects, skills, education, resume and contact details.",
    prerender: true,
  },
  {
    path: "/about",
    title: "About Mete Ünal — Education & Skills",
    description:
      "From a Geography degree at Istanbul University to a Computer Programming diploma at Humber College: Mete Ünal's background and technical skills.",
    prerender: true,
  },
  {
    path: "/projects",
    title: "Projects: ArcClash & AnimeGuess — Mete Ünal",
    description:
      "ArcClash, a Java 21 / Spring Boot card-drafting duel game in development, and AnimeGuess, an AI-powered anime character guessing game.",
    prerender: true,
  },
  {
    path: "/contact",
    title: "Contact Mete Ünal",
    description: "Resume, email, GitHub, LinkedIn, Instagram and LeetCode for Mete Ünal.",
    prerender: true,
  },
  {
    path: "/play",
    title: "Hearthvale — Mete Ünal's Pixel-Art Portfolio Village",
    description:
      "Walk through a pixel-art village to explore Mete Ünal's projects, skills and background. Keyboard, touch and Quick Travel supported.",
    prerender: false,
  },
];

export const pageMeta = (path: string): PageMeta => pages.find((p) => p.path === path) ?? pages[0];

/** The production address (scripts/site.mjs), fixed at build time. */
export const SITE_URL: string = __SITE_URL__;
