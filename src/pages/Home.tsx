import ReactLogo from "../assets/tech/react.svg";
import TypeScriptLogo from "../assets/tech/typescript.svg";
import TailwindLogo from "../assets/tech/tailwindcss.svg";
import GitLogo from "../assets/tech/git.svg";
import ViteLogo from "../assets/tech/vite.svg";
import HTMLLogo from "../assets/tech/html.svg";
import CSSLogo from "../assets/tech/css.svg";
import RNLogo from "../assets/tech/react-native.svg";
import JSLogo from "../assets/tech/javascript.svg";
import NodeLogo from "../assets/tech/nodejs.svg";
import ExpressLogo from "../assets/tech/express.svg";
import JavaLogo from "../assets/tech/java.svg";
import SpringLogo from "../assets/tech/spring.svg";
import PythonLogo from "../assets/tech/python.svg";
import MongoLogo from "../assets/tech/mongodb.svg";
import PostgresLogo from "../assets/tech/postgresql.svg";
import MySQLLogo from "../assets/tech/mysql.svg";
import { Link } from "react-router-dom";

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
          Hey, I'm Mete Ünal
        </span>
      </h1>
      <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-2">
        Full‑stack, mobile app learning developer building modern apps for the
        web and mobile.
      </p>
      <p className="text-slate-400 mb-8">
        I'm currently a Computer Programming student at Humber College.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          HTML
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          CSS
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          JavaScript
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          TypeScript
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          React
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          React Native
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          Tailwind CSS
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          Vite
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          Node.js
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          Express.js
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          Java
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          Spring Boot
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          Python
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          MongoDB
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          PostgreSQL
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-slate-900 border border-slate-700 text-slate-200">
          MySQL
        </span>
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
        <img src={HTMLLogo} alt="HTML" className="h-8" />
        <img src={CSSLogo} alt="CSS" className="h-8" />
        <img src={JSLogo} alt="JavaScript" className="h-8" />
        <img src={ReactLogo} alt="React" className="h-8" />
        <img src={RNLogo} alt="React Native" className="h-8" />
        <img src={TypeScriptLogo} alt="TypeScript" className="h-8" />
        <img src={TailwindLogo} alt="Tailwind CSS" className="h-8" />
        <img src={NodeLogo} alt="Node.js" className="h-8" />
        <img src={ExpressLogo} alt="Express.js" className="h-8" />
        <img src={JavaLogo} alt="Java" className="h-8" />
        <img src={SpringLogo} alt="Spring Boot" className="h-8" />
        <img src={PythonLogo} alt="Python" className="h-8" />
        <img src={MongoLogo} alt="MongoDB" className="h-8" />
        <img src={PostgresLogo} alt="PostgreSQL" className="h-8" />
        <img src={MySQLLogo} alt="MySQL" className="h-8" />
        <img src={GitLogo} alt="Git" className="h-8" />
        <img src={ViteLogo} alt="Vite" className="h-8" />
      </div>
    </section>
  );
}

export default Home;
