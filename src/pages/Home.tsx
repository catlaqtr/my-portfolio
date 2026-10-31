import { Link } from "react-router-dom";
import { profile } from "../content/about";
import { skills } from "../content/skills";
import PixelButton from "../components/PixelButton";

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

      <aside
        aria-labelledby="village-invite"
        className="relative mt-12 w-full max-w-2xl overflow-hidden border-4 border-bark text-left shadow-[0_6px_0_#1e0f07]"
      >
        <div
          aria-hidden="true"
          className="pixelated absolute inset-0 bg-[url(/hearthvale.webp)] bg-[length:1920px_1344px] bg-[position:50%_45%]"
        />
        <div className="relative flex flex-col gap-4 bg-gradient-to-r from-bark/95 via-bark/80 to-bark/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="village-invite" className="font-pixel text-[27px] uppercase [word-spacing:0.4em] text-parchment">
              Visit Hearthvale
            </h2>
            <p className="mt-1 max-w-sm text-sm text-parchment/90">
              Prefer to explore? Walk through this portfolio as a pixel-art village.
            </p>
          </div>
          <PixelButton to="/play" variant="primary" size="lg">
            <span aria-hidden="true">▶</span> Enter the Village
          </PixelButton>
        </div>
      </aside>

      <ul className="flex flex-wrap justify-center items-center gap-3 mt-12" aria-label="Technologies">
        {skillLogos.map((skill) => (
          // Light tiles keep dark logos (React, Vite, Git…) visible on the dark page.
          <li key={skill.name} className="rounded-md bg-slate-100 p-1.5">
            <img src={skill.icon} alt={skill.name} title={skill.name} className="h-7 w-7 object-contain" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
