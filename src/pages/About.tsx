import { motion } from "framer-motion";
import { bio, intro, profile, quickFacts, transition } from "../content/about";
import SkillGroups from "../components/SkillGroups";
import Timeline from "../components/Timeline";
import { useScrollToHash } from "../hooks/useScrollToHash";
import { frameByFrame } from "../components/frameByFrame";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  onUpdate: frameByFrame,
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
        <h1 className="text-4xl font-extrabold text-white mb-4">About me</h1>
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
        <h2 className="text-2xl font-bold text-white">{transition.heading}</h2>
        <div className="mt-4 space-y-3 text-slate-300 max-w-3xl">
          {transition.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-8">
          <Timeline tone="slate" />
        </div>
      </motion.div>

      {/* Skills */}
      <h2 id="skills" className="mt-14 scroll-mt-28 text-2xl font-bold text-white">
        Skills
      </h2>
      <motion.div className="mt-2" {...reveal} transition={{ duration: 0.5 }}>
        <SkillGroups tone="slate" headingLevel={3} />
      </motion.div>

      {/* LeetCode Stats */}
      <motion.div className="mt-14" {...reveal} transition={{ duration: 0.5 }}>
        <h2 className="text-lg font-semibold text-white mb-4">
          LeetCode Stats
        </h2>
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
            <h2 className="text-lg font-semibold text-white mb-2">
              {block.heading}
            </h2>
            <p className="text-slate-300">{block.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default About;
