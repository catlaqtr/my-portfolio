import { FaFileAlt } from "react-icons/fa";
import { prefetchVillageProps } from "./playLoader";
import PixelButton from "../components/PixelButton";
import { profile } from "../content/about";
import { contactLinks, isExternal, resume } from "../content/contact";

const quickLinks = contactLinks.filter((l) => ["github", "linkedin", "email"].includes(l.id));

/**
 * The landing page: a pixel-art title screen that offers the village or
 * the classic portfolio. It's plain HTML (no Phaser), so it loads instantly
 * and its text is readable by search engines and screen readers.
 */
function Title() {
  return (
    <main className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-bark px-4 py-10 text-parchment">
      {/* The real village, captured at 1:1 and scaled up by whole pixels */}
      <div
        aria-hidden="true"
        className="pixelated absolute inset-0 -z-20 bg-[url(/hearthvale.webp)] bg-[length:1920px_1344px] bg-center motion-safe:animate-[village-pan_60s_ease-in-out_infinite_alternate] min-[1800px]:bg-[length:2880px_2016px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(30,15,7,0.25)_0%,rgba(30,15,7,0.55)_55%,rgba(30,15,7,0.85)_100%)]"
      />

      <section
        aria-labelledby="title-heading"
        className="w-full max-w-2xl border-4 border-bark bg-parchment/95 px-6 py-8 text-center text-bark shadow-[0_0_0_4px_#e2b878,0_10px_0_4px_#1e0f07] sm:px-10"
      >
        <h1 id="title-heading" className="font-pixel text-[18px] uppercase tracking-widest [word-spacing:0.4em] text-bark-light">
          {profile.name}
        </h1>
        <p className="mt-2 font-pixel text-[54px] leading-none text-bark drop-shadow-[3px_3px_0_#e2b878] sm:text-[72px]">
          Hearthvale
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-bark/80 sm:text-base">{profile.tagline}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-bark/80 sm:text-base">
          Explore my portfolio as a pixel-art village, or jump straight to the classic version.
        </p>

        <nav aria-label="Choose how to view the portfolio" className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
          <PixelButton to="/play" {...prefetchVillageProps} variant="primary" size="lg">
            <span aria-hidden="true">▶</span> Enter the Village
          </PixelButton>
          <PixelButton to="/portfolio" variant="dark" size="lg">
            Recruiter Mode
          </PixelButton>
        </nav>

        <p className="mt-5 text-xs text-bark/70">
          Walk with WASD or the arrow keys
        </p>
      </section>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
        <li>
          <a
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-bark/80 px-3 py-1.5 text-parchment hover:bg-bark focus-visible:outline-2 focus-visible:outline-parchment"
          >
            <FaFileAlt aria-hidden="true" /> {resume.label}
          </a>
        </li>
        {quickLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              {...(isExternal(link) && { target: "_blank", rel: "noopener noreferrer" })}
              className="inline-flex items-center gap-2 rounded-sm bg-bark/80 px-3 py-1.5 text-parchment hover:bg-bark focus-visible:outline-2 focus-visible:outline-parchment"
            >
              <link.icon aria-hidden="true" /> {link.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Title;
