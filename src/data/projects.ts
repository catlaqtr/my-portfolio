export interface Project {
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveDemo?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "Throne of Dust",
    description:
      "A strategic kingdom builder game built with Spring Boot backend and Next.js frontend. Manage your kingdom, recruit characters, build structures, and lead raids in this immersive strategy game with real-time resource collection and character training.",
    techStack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Java"],
    image: "/throne-of-dust.png",
    liveDemo: "https://throneofdust-frontend.vercel.app/",
    github: "https://github.com/catlaqtr/throneofdustmain",
  },
  {
    title: "SeaStrike Battleship",
    description:
      "A full-stack Battleship game with Spring Boot + MySQL backend and React + TypeScript + Vite frontend. Features JWT authentication, ship placement validation, turn-based gameplay, TanStack Query for state management, React Hook Form with Zod validation, and Framer Motion animations.",
    techStack: ["React", "TypeScript", "Spring Boot", "MySQL"],
    image: "/battleship.png",
    liveDemo: "https://seastrikebattleship.vercel.app/",
    github: "https://github.com/catlaqtr/TheBattleShip",
  },
  {
    title: "CookEase",
    description:
      "A modern recipe finder app built with React and TypeScript. Features fast search experience, responsive UI, keyboard-friendly modal, and clean error states for discovering and viewing recipe details.",
    techStack: ["React", "TypeScript"],
    image: "/cookease.png",
    liveDemo: "https://cookease-fawn.vercel.app/",
    github: "https://github.com/catlaqtr/cookease",
  },
  {
    title: "GameHub+",
    description:
      "A modern game discovery app featuring trending games from RAWG API. Includes global search, playtime filtering, game details pages, dark mode, accessible modals, and form validation for adding custom games.",
    techStack: ["React", "TypeScript"],
    image: "/gamehub.png",
    liveDemo: "https://gamehub-plus.vercel.app/",
    github: "https://github.com/catlaqtr/gamehub-plus",
  },
  {
    title: "Anime Finder",
    description:
      "A modern anime search app using Jikan API. Features responsive grid layout, lazy-loaded images, client-side routing, localStorage watchlist, accessible design, and improved SEO with meta tags.",
    techStack: ["React", "TypeScript"],
    image: "/anime-finder.png",
    liveDemo: "https://anime-finder-six.vercel.app/",
    github: "https://github.com/catlaqtr/anime-finder",
  },
  {
    title: "MovieWatch+",
    description:
      "A movie search and watchlist app powered by OMDb API. Features fast search with debouncing, responsive grid layout, localStorage watchlist, release year filtering, dark theme, and graceful loading states.",
    techStack: ["React", "TypeScript"],
    image: "/moviewatch.png",
    liveDemo: "https://moviewatch-plus.vercel.app/",
    github: "https://github.com/catlaqtr/moviewatch-plus",
  },
  {
    title: "Task Tracker",
    description:
      "A clean task management app with priority levels, filtering, search functionality, and progress tracking. Features localStorage persistence, responsive design, and elegant styling with Tailwind CSS v4.",
    techStack: ["React", "TypeScript"],
    image: "/task-tracker.png",
    liveDemo: "https://task-tracker-smoky-two.vercel.app/",
    github: "https://github.com/catlaqtr/task-tracker",
  },
];
