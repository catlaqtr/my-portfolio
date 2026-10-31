import React from "react";
import { statusLabel, type Project } from "../content/projects";
import ProjectDetailsView from "./ProjectDetailsView";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <article
    id={project.id}
    className="group relative h-full scroll-mt-28 rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <div className="relative overflow-hidden">
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-slate-800/60 text-slate-500 text-sm">
          Screenshot coming soon
        </div>
      )}
      {project.status !== "live" && (
        <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-semibold">
          {statusLabel[project.status]}
        </span>
      )}
    </div>

    <div className="p-5">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-slate-300 mb-4">{project.description}</p>

      {project.techStack.length > 0 && (
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
      )}

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

      {project.details.sourceNote && (
        <p className="mt-3 text-xs text-slate-400">{project.details.sourceNote}</p>
      )}

      <details className="group/details mt-4 border-t border-slate-800 pt-3">
        <summary className="cursor-pointer select-none text-sm font-medium text-blue-400 hover:text-blue-300">
          Architecture, stack &amp; roadmap
        </summary>
        <div className="mt-4">
          <ProjectDetailsView project={project} tone="slate" headingLevel={4} />
        </div>
      </details>

      {import.meta.env.DEV && project.todo && (
        <div className="mt-4 rounded-md border border-dashed border-amber-500/60 p-3 text-xs text-amber-300">
          <div className="font-semibold">Placeholder — content needed (dev only):</div>
          <ul className="mt-1 list-disc pl-4">
            {project.todo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </article>
);

export default ProjectCard;
