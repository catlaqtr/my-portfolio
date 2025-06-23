import React from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="px-6 py-20 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
