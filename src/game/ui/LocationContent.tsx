import type { ReactNode } from "react";
import { FaExternalLinkAlt, FaFileAlt, FaGithub, FaPlay } from "react-icons/fa";
import ProjectDetailsView from "../../components/ProjectDetailsView";
import SkillGroups from "../../components/SkillGroups";
import Timeline from "../../components/Timeline";
import { pixelButtonClass } from "../../components/pixelButtonClass";
import { getProject, type Project } from "../../content/projects";
import { intro, profile, quickFacts, transition } from "../../content/about";
import { contactLinks, isExternal, resume } from "../../content/contact";
import type { LocationId } from "../../content/locations";

const heading = "font-pixel text-[18px] uppercase [word-spacing:0.4em] text-bark";

function ExternalButton({ href, children, variant = "parchment" }: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "parchment" | "dark";
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={pixelButtonClass(variant)}>
      {children}
    </a>
  );
}

function ProjectPanel({ project, children }: { project: Project; children?: ReactNode }) {
  return (
    <div>
      {children}
      <p className="text-bark">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {project.liveDemo && (
          <ExternalButton href={project.liveDemo} variant="primary">
            <FaPlay aria-hidden="true" /> Play
          </ExternalButton>
        )}
        {project.github && (
          <ExternalButton href={project.github} variant="dark">
            <FaGithub aria-hidden="true" /> GitHub
          </ExternalButton>
        )}
        {project.details.sourceNote && <span className="text-sm text-bark/75">{project.details.sourceNote}</span>}
      </div>
      <div className="mt-6">
        <ProjectDetailsView project={project} tone="parchment" showScreenshots />
      </div>
    </div>
  );
}

function Arena() {
  const project = getProject("arcclash")!;
  return (
    <ProjectPanel project={project}>
      <p role="note" className="mb-4 border-2 border-[#b4202a] bg-[#b4202a]/10 px-3 py-2 font-semibold text-[#7a1219]">
        <span aria-hidden="true">⚒ </span>Under development: ArcClash has no playable release yet.
      </p>
    </ProjectPanel>
  );
}

function Arcade() {
  return <ProjectPanel project={getProject("animeguess")!} />;
}

function Academy() {
  return (
    <div>
      <p className="mb-4 text-bark">
        The technologies I work with, grouped by area, and which ones I'm still learning.
      </p>
      <SkillGroups tone="parchment" />
    </div>
  );
}

function House() {
  return (
    <div className="space-y-6 text-bark">
      <p>{intro}</p>
      <section>
        <h3 className={heading}>{transition.heading}</h3>
        <div className="mt-2 space-y-3">
          {transition.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>
      <section>
        <h3 className={heading}>Journey</h3>
        <div className="mt-3">
          <Timeline tone="parchment" />
        </div>
      </section>
      <section>
        <h3 className={heading}>At a glance</h3>
        <dl className="mt-2 grid gap-3 sm:grid-cols-2">
          {quickFacts.map((f) => (
            <div key={f.label} className="rounded-md border-2 border-bark/30 bg-parchment-dark/40 p-3">
              <dt className="text-sm text-bark/75">{f.label}</dt>
              <dd className="font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="flex flex-wrap gap-3">
        <ExternalButton href={resume.href} variant="dark">
          <FaFileAlt aria-hidden="true" /> {resume.label}
        </ExternalButton>
        <ExternalButton href={profile.leetcode.href}>
          LeetCode <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
        </ExternalButton>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="text-bark">
      <p>I'd love to hear from you. Here's my resume and every way to reach me.</p>
      <a
        href={resume.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${pixelButtonClass("primary", "lg")} mt-4 w-full sm:w-auto`}
      >
        <FaFileAlt aria-hidden="true" /> Download resume
      </a>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {contactLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              {...(isExternal(link) && { target: "_blank", rel: "noopener noreferrer" })}
              className="flex items-center gap-3 rounded-md border-2 border-bark/30 bg-parchment-dark/40 p-3 hover:border-bark focus-visible:outline-2 focus-visible:outline-bark"
            >
              <link.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
              <span>
                <span className="block text-sm text-bark/75">{link.label}</span>
                <span className="block break-all font-semibold">{link.handle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const content: Record<LocationId, () => ReactNode> = {
  arena: Arena,
  arcade: Arcade,
  academy: Academy,
  house: House,
  "post-office": Contact,
};

/** What's inside each building. */
function LocationContent({ id }: { id: LocationId }) {
  const Content = content[id];
  return <Content />;
}

export default LocationContent;
