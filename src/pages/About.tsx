import { motion } from "framer-motion";

function About() {
  const skills = {
    Frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "Tailwind CSS",
      "Vite",
    ],
    Backend: ["Node.js", "Express.js", "Java", "Spring Boot", "Python"],
    Databases: ["MongoDB", "PostgreSQL", "MySQL"],
    Tools: ["Git", "REST APIs", "Vercel", "Postman"],
  } as const;

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-4">About me</h2>
        <p className="text-slate-300">
          I'm Mete Ünal — a full‑stack developer currently learning mobile
          development. I enjoy building end‑to‑end solutions with
          React/TypeScript on the front end, Node/Express or Java Spring Boot on
          the back end, and React Native for mobile.
        </p>
      </motion.div>

      {/* Quick facts */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
        >
          <div className="text-sm text-slate-400">Primary focus</div>
          <div className="mt-2 font-semibold text-slate-100">
            Full‑stack Engineering
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
        >
          <div className="text-sm text-slate-400">Currently exploring</div>
          <div className="mt-2 font-semibold text-slate-100">
            Mobile App Development
          </div>
        </motion.div>
        <motion.a
          href="https://leetcode.com/u/catlaqtr/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-blue-600 hover:shadow-lg transition"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-slate-400">Practice</div>
          <div className="mt-2 font-semibold text-blue-400">
            LeetCode Profile →
          </div>
          <div className="text-xs text-slate-500">leetcode.com/u/catlaqtr</div>
        </motion.a>
      </div>

      {/* Skills */}
      <h3 className="mt-14 text-2xl font-bold text-white">Skills</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="text-sm text-slate-400">{category}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 text-xs border border-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* LeetCode Stats */}
      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-lg font-semibold text-white mb-4">
          LeetCode Stats
        </h4>
        <a
          href="https://leetcode.com/u/catlaqtr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://leetcard.jacoblin.cool/catlaqtr?ext=activity&theme=dark&font=Gotham`}
            alt="LeetCode Stats"
            className="w-full max-w-2xl rounded-xl border border-slate-800"
            loading="lazy"
          />
        </a>
      </motion.div>

      {/* Bio */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-6"
          >
            {i === 0 ? (
              <>
                <h4 className="text-lg font-semibold text-white mb-2">
                  What I'm working on
                </h4>
                <p className="text-slate-300">
                  I'm building practical apps to solidify my fundamentals and
                  learn by doing. I focus on clean UIs, performance, and
                  readable code. Recent projects include a recipe discovery app,
                  a game explorer, an anime search tool, and a movie tracker.
                </p>
              </>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-white mb-2">
                  What I want next
                </h4>
                <p className="text-slate-300">
                  An opportunity where I can keep learning, contribute to real
                  code, and grow with a supportive team. I value feedback and
                  improve quickly.
                </p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default About;
