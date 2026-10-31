import { motion } from "framer-motion";
import {
  bio,
  intro,
  profile,
  quickFacts,
  timeline,
  transition,
} from "../content/about";
import { skillCategories, skillsByCategory } from "../content/skills";
import { useScrollToHash } from "../hooks/useScrollToHash";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

function About() {
  useScrollToHash();

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <motion.div
        className="text-center max-w-3xl mx-auto"
        {...reveal}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-4">About me</h2>
        <p className="text-slate-300">{intro}</p>
      </motion.div>

      {/* Quick facts */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickFacts.map((fact, idx) => (
          <motion.div
            key={fact.label}
            {...reveal}
            transition={{ duration: 0.5 + idx * 0.05 }}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="text-sm text-slate-400">{fact.label}</div>
            <div className="mt-2 font-semibold text-slate-100">{fact.value}</div>
          </motion.div>
        ))}
        <motion.a
          href={profile.leetcode.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-blue-600 hover:shadow-lg transition"
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-slate-400">Practice</div>
          <div className="mt-2 font-semibold text-blue-400">
            LeetCode Profile →
          </div>
          <div className="text-xs text-slate-500">leetcode.com/u/catlaqtr</div>
        </motion.a>
      </div>

      {/* Journey */}
      <motion.div className="mt-14" {...reveal} transition={{ duration: 0.5 }}>
        <h3 className="text-2xl font-bold text-white">{transition.heading}</h3>
        <div className="mt-4 space-y-3 text-slate-300 max-w-3xl">
          {transition.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ol className="mt-8 relative border-l border-slate-700 ml-2 space-y-6">
          {timeline.map((entry) => (
            <li key={entry.title} className="pl-6 relative">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-slate-900"
              />
              <div className="text-xs uppercase tracking-wide text-slate-400">
                {entry.period}
              </div>
              <div className="font-semibold text-slate-100">{entry.title}</div>
              <div className="text-sm text-slate-400">{entry.place}</div>
              {entry.detail && (
                <p className="mt-1 text-sm text-slate-300">{entry.detail}</p>
              )}
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Skills */}
      <h3 id="skills" className="mt-14 scroll-mt-28 text-2xl font-bold text-white">
        Skills
      </h3>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-5 rounded-full bg-slate-800 border border-slate-700" />
          Used in projects
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-5 rounded-full border border-dashed border-amber-400/70" />
          Currently learning
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, idx) => {
          const items = skillsByCategory(category);
          const applied = items.filter((s) => s.status === "applied");
          const learning = items.filter((s) => s.status === "learning");
          return (
            <motion.div
              key={category}
              {...reveal}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="text-sm text-slate-400">{category}</div>
              {applied.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${category}: used in projects`}>
                  {applied.map((s) => (
                    <li
                      key={s.name}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 text-xs border border-slate-700"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              )}
              {learning.length > 0 && (
                <>
                  <div className="mt-3 text-xs text-amber-300/90">Currently learning</div>
                  <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${category}: currently learning`}>
                    {learning.map((s) => (
                      <li
                        key={s.name}
                        className="px-2.5 py-1 rounded-full text-amber-100 text-xs border border-dashed border-amber-400/70"
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* LeetCode Stats */}
      <motion.div className="mt-14" {...reveal} transition={{ duration: 0.5 }}>
        <h4 className="text-lg font-semibold text-white mb-4">
          LeetCode Stats
        </h4>
        <a
          href={profile.leetcode.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={profile.leetcode.statsCard}
            alt="LeetCode Stats"
            className="w-full max-w-2xl rounded-xl border border-slate-800"
            loading="lazy"
          />
        </a>
      </motion.div>

      {/* Bio */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {bio.map((block, i) => (
          <motion.div
            key={block.heading}
            {...reveal}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2">
              {block.heading}
            </h4>
            <p className="text-slate-300">{block.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default About;
