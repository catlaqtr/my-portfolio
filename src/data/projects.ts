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
    title: "SeaStrike Battleship",
    description:
      "A full-stack Battleship game with a Spring Boot + MySQL backend and a React + TypeScript + Vite frontend. Supports two players, JWT authentication, validated ship placement, turn-based shots, and win detection.",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Spring Boot",
      "MySQL",
      "JWT",
    ],
    image: "/battleship.png",
    liveDemo: "https://seastrikebattleship.vercel.app/",
    github: "https://github.com/catlaqtr/TheBattleShip",
  },
  {
    title: "CookEase",
    description:
      "CookEase is a modern recipe app that helps users discover, save, and share recipes with ease.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/cookease.png",
    liveDemo: "https://cookease-fawn.vercel.app/",
    github: "https://github.com/catlaqtr/cookease",
  },
  {
    title: "GameHub+",
    description:
      "GameHub+ is a web app for discovering and exploring video games, featuring search, filters, and detailed game info.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/gamehub.png",
    liveDemo: "https://gamehub-plus.vercel.app/",
    github: "https://github.com/catlaqtr/gamehub-plus",
  },
  {
    title: "Anime Finder",
    description:
      "Anime Finder is a web app that allows users to search and discover anime titles with detailed information and images.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/anime-finder.png",
    liveDemo: "https://anime-finder-six.vercel.app/",
    github: "https://github.com/catlaqtr/anime-finder",
  },
  {
    title: "MovieWatch+",
    description:
      "MovieWatch+ is a web app for searching, discovering, and tracking movies with detailed information and user-friendly features.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/moviewatch.png",
    liveDemo: "https://moviewatch-plus.vercel.app/",
    github: "https://github.com/catlaqtr/moviewatch-plus",
  },
  {
    title: "Task Tracker",
    description:
      "Task Tracker is a productivity app for managing and tracking daily tasks efficiently with a simple and intuitive interface.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    image: "/task-tracker.png",
    liveDemo: "https://task-tracker-smoky-two.vercel.app/",
    github: "https://github.com/catlaqtr/task-tracker",
  },
];
