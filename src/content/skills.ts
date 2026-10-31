import HTMLLogo from "../assets/tech/html.svg";
import CSSLogo from "../assets/tech/css.svg";
import JSLogo from "../assets/tech/javascript.svg";
import TypeScriptLogo from "../assets/tech/typescript.svg";
import ReactLogo from "../assets/tech/react.svg";
import RNLogo from "../assets/tech/react-native.svg";
import TailwindLogo from "../assets/tech/tailwindcss.svg";
import ViteLogo from "../assets/tech/vite.svg";
import NodeLogo from "../assets/tech/nodejs.svg";
import ExpressLogo from "../assets/tech/express.svg";
import JavaLogo from "../assets/tech/java.svg";
import SpringLogo from "../assets/tech/spring.svg";
import PythonLogo from "../assets/tech/python.svg";
import MongoLogo from "../assets/tech/mongodb.svg";
import PostgresLogo from "../assets/tech/postgresql.svg";
import MySQLLogo from "../assets/tech/mysql.svg";
import GitLogo from "../assets/tech/git.svg";

export const skillCategories = [
  "Backend",
  "Frontend",
  "Databases",
  "Testing",
  "Tools & DevOps",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

/**
 * - `applied`: used in real work or projects.
 * - `learning`: currently studying, not yet used in a shipped project.
 */
export type SkillStatus = "applied" | "learning";

export interface Skill {
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  /** Shown in the Home hero tech row. */
  featured?: boolean;
  /** Logo shown on the Home page. */
  icon?: string;
}

// The order here is the display order everywhere.
// Projects reference skills by `name` (type-checked via SkillName).
export const skills = [
  // Backend
  { name: "Java", category: "Backend", status: "applied", featured: true, icon: JavaLogo },
  { name: "Spring Boot", category: "Backend", status: "applied", featured: true, icon: SpringLogo },
  { name: "Spring Security", category: "Backend", status: "applied", featured: true },
  { name: "Spring Data JPA", category: "Backend", status: "applied", featured: true },
  { name: "Hibernate", category: "Backend", status: "applied" },
  { name: "REST APIs", category: "Backend", status: "applied" },
  { name: "WebSockets", category: "Backend", status: "applied" },
  { name: "Spring AI", category: "Backend", status: "applied" },
  { name: "Node.js", category: "Backend", status: "applied", featured: true, icon: NodeLogo },
  { name: "Express.js", category: "Backend", status: "applied", featured: true, icon: ExpressLogo },
  { name: "Python", category: "Backend", status: "applied", featured: true, icon: PythonLogo },

  // Frontend
  { name: "HTML", category: "Frontend", status: "applied", featured: true, icon: HTMLLogo },
  { name: "CSS", category: "Frontend", status: "applied", featured: true, icon: CSSLogo },
  { name: "JavaScript", category: "Frontend", status: "applied", featured: true, icon: JSLogo },
  { name: "TypeScript", category: "Frontend", status: "applied", featured: true, icon: TypeScriptLogo },
  { name: "React", category: "Frontend", status: "applied", featured: true, icon: ReactLogo },
  { name: "Next.js", category: "Frontend", status: "applied" },
  { name: "Tailwind CSS", category: "Frontend", status: "applied", featured: true, icon: TailwindLogo },
  { name: "Vite", category: "Frontend", status: "applied", featured: true, icon: ViteLogo },
  // The About page has always said mobile development is what Mete is currently learning.
  { name: "React Native", category: "Frontend", status: "learning", featured: true, icon: RNLogo },

  // Databases
  { name: "PostgreSQL", category: "Databases", status: "applied", featured: true, icon: PostgresLogo },
  { name: "MySQL", category: "Databases", status: "applied", featured: true, icon: MySQLLogo },
  { name: "MongoDB", category: "Databases", status: "applied", featured: true, icon: MongoLogo },
  { name: "Flyway", category: "Databases", status: "applied" },
  { name: "Redis", category: "Databases", status: "applied" },

  // Testing (all three are used in the ArcClash / AnimeGuess test suites)
  { name: "JUnit 5", category: "Testing", status: "applied" },
  { name: "Mockito", category: "Testing", status: "applied" },
  { name: "Testcontainers", category: "Testing", status: "applied" },

  // Tools & DevOps
  { name: "Git", category: "Tools & DevOps", status: "applied", featured: true, icon: GitLogo },
  { name: "Docker", category: "Tools & DevOps", status: "applied", featured: true },
  { name: "Maven", category: "Tools & DevOps", status: "applied" },
  { name: "Postman", category: "Tools & DevOps", status: "applied" },
  { name: "GitHub Actions", category: "Tools & DevOps", status: "applied" },
  { name: "Vercel", category: "Tools & DevOps", status: "applied" },
  { name: "Render", category: "Tools & DevOps", status: "applied" },
] as const satisfies readonly Skill[];

export type SkillName = (typeof skills)[number]["name"];

export function skillsByCategory(category: SkillCategory): readonly Skill[] {
  return skills.filter((s) => s.category === category);
}
