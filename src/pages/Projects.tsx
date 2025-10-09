import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";

function Projects() {
  const [active, setActive] = useState<string>("All");

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.techStack.includes(active));
  }, [active]);

  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl font-extrabold text-white text-center mb-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>
      <motion.p
        className="text-slate-300 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        A selection of apps I’ve built while learning and experimenting.
      </motion.p>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mt-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {allTech.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              active === t
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, idx) => (
          <motion.div
            key={project.title}
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
