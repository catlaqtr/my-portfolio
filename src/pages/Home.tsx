import { Link } from "react-router-dom";
import { profile } from "../content/about";
import { skills } from "../content/skills";

const featuredSkills = skills.filter((s) => "featured" in s && s.featured);
const skillLogos = skills.filter((s) => "icon" in s);

function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 -translate-x-1/2 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        <span className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Hey, I'm {profile.name}
        </span>
      </h1>
      <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-2">
        {profile.tagline}
      </p>
      <p className="text-slate-400 mb-8">{profile.education}</p>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
        {featuredSkills.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200"
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to="/projects"
          className="px-5 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          View Projects
        </Link>
        <Link
          to="/about"
          className="px-5 py-3 rounded-md bg-slate-800 border border-slate-700 text-white font-medium hover:bg-slate-700"
        >
          See All Skills
        </Link>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mt-12 opacity-80">
        {skillLogos.map((skill) => (
          <img key={skill.name} src={skill.icon} alt={skill.name} className="h-8" />
        ))}
      </div>
    </section>
  );
}

export default Home;
