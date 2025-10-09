import React from "react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="group relative rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <div className="p-5">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-slate-300 mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;
