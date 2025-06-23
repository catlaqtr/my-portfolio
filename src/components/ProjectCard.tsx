import React from "react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-56 object-cover mb-4 rounded-md border"
      style={{ maxWidth: 480 }}
    />
    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
    <p className="text-gray-600 mb-2">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-2">
      {project.techStack.map((tech) => (
        <span key={tech} className="bg-gray-200 text-xs px-2 py-1 rounded">
          {tech}
        </span>
      ))}
    </div>
    <div className="flex gap-4">
      {project.liveDemo && (
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Live Demo
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:underline"
        >
          GitHub
        </a>
      )}
    </div>
  </div>
);

export default ProjectCard;
