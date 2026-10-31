import { projects } from "../content/projects";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
import { useScrollToHash } from "../hooks/useScrollToHash";

function Projects() {
  useScrollToHash();

  return (
    <div className="px-6 py-20 max-w-5xl mx-auto">
      <motion.h1
        className="text-4xl font-extrabold text-white text-center mb-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>
      <motion.p
        className="text-slate-300 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        The projects I'm focused on right now.
      </motion.p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
