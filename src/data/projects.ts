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
    title: "CookEase",
    description:
      "CookEase is a modern recipe app that helps users discover, save, and share recipes with ease.",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS"],
    image: "/src/assets/tech/cookease.png",
    liveDemo: "https://cookease-fawn.vercel.app/",
    github: "https://github.com/catlaqtr/cookease",
  },
  {
    title: "GameHub+",
    description:
      "GameHub+ is a web app for discovering and exploring video games, featuring search, filters, and detailed game info.",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS"],
    image: "/src/assets/tech/gamehub.png",
    liveDemo: "https://gamehub-plus.vercel.app/",
    github: "https://github.com/catlaqtr/gamehub-plus",
  },
  {
    title: "Anime Finder",
    description:
      "Anime Finder is a web app that allows users to search and discover anime titles with detailed information and images.",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS"],
    image: "/src/assets/tech/anime-finder.png",
    liveDemo: "https://anime-finder-six.vercel.app/",
    github: "https://github.com/catlaqtr/anime-finder",
  },
  {
    title: "MovieWatch+",
    description:
      "MovieWatch+ is a web app for searching, discovering, and tracking movies with detailed information and user-friendly features.",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS"],
    image: "/src/assets/tech/moviewatch.png",
    liveDemo: "https://moviewatch-plus.vercel.app/",
    github: "https://github.com/catlaqtr/moviewatch-plus",
  },
  {
    title: "Task Tracker",
    description:
      "Task Tracker is a productivity app for managing and tracking daily tasks efficiently with a simple and intuitive interface.",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS"],
    image: "/src/assets/tech/task-tracker.png",
    liveDemo: "https://task-tracker-smoky-two.vercel.app/",
    github: "https://github.com/catlaqtr/task-tracker",
  },
];
