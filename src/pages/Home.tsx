import ReactLogo from "../assets/tech/react.svg";
import TypeScriptLogo from "../assets/tech/typescript.svg";
import TailwindLogo from "../assets/tech/tailwindcss.svg";
import GitLogo from "../assets/tech/git.svg";
import ViteLogo from "../assets/tech/vite.svg";

function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-6">
        Hey, I'm Mete Ünal
      </h1>
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8">
        I’m an aspiring front-end developer currently learning React,
        TypeScript, and Tailwind CSS. This site is my very first project — and
        I’m excited to grow and build more every day.
      </p>

      <p className="text-md text-gray-600 mb-4 font-semibold">
        Currently Practicing:
      </p>

      <div className="flex flex-wrap justify-center items-center gap-6 mt-2">
        <img src={ReactLogo} alt="React" className="h-10" />
        <img src={TypeScriptLogo} alt="TypeScript" className="h-10" />
        <img src={TailwindLogo} alt="Tailwind CSS" className="h-10" />
        <img src={GitLogo} alt="Git" className="h-10" />
        <img src={ViteLogo} alt="Vite" className="h-10" />
      </div>
    </section>
  );
}

export default Home;
