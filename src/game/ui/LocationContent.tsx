import type { ReactNode } from "react";
import { FaExternalLinkAlt, FaFileAlt, FaGithub, FaPlay } from "react-icons/fa";
import ProjectDetailsView from "../../components/ProjectDetailsView";
import SkillGroups from "../../components/SkillGroups";
import Timeline from "../../components/Timeline";
import { pixelButtonClass } from "../../components/pixelButtonClass";
import Tabs from "./Tabs";
import { getProject, type Project } from "../../content/projects";
import { intro, profile, quickFacts, transition } from "../../content/about";
import { contactLinks, isExternal, resume } from "../../content/contact";
import type { LocationId } from "../../content/locations";

const heading = "font-pixel text-[18px] uppercase [word-spacing:0.4em] text-frame";

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

const statusNotice: Partial<Record<Project["status"], string>> = {
  "in-development": "Under development: no playable release yet.",
  "not-live": "Not live yet: there's no public deployment at the moment.",
};

/** A project building: a status notice and overview, then details split into tabs. */
function ProjectPanel({ project }: { project: Project }) {
  const notice = statusNotice[project.status];
  const tabs = [
    {
      label: "Overview",
      content: (
        <>
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
            <ProjectDetailsView project={project} tone="parchment" sections={["stats", "built", "screenshots"]} />
          </div>
        </>
      ),
    },
    {
      label: "Architecture",
      content: <ProjectDetailsView project={project} tone="parchment" sections={["architecture", "api"]} />,
    },
    {
      label: "Decisions",
      content: <ProjectDetailsView project={project} tone="parchment" sections={["decisions", "challenges"]} />,
    },
    {
      label: "Tech & tests",
      content: <ProjectDetailsView project={project} tone="parchment" sections={["stack", "testing"]} />,
    },
    ...(project.details.planned
      ? [{ label: "Roadmap", content: <ProjectDetailsView project={project} tone="parchment" sections={["planned"]} /> }]
      : []),
  ];

  return (
    <div>
      {notice && (
        <p role="note" className="mb-4 border-[3px] border-ink bg-[#b4202a] px-3 py-2 font-semibold text-paper shadow-[inset_0_-3px_0_#7a1219]">
          <span aria-hidden="true">⚒ </span>
          {notice}
        </p>
      )}
      <Tabs tabs={tabs} label={`${project.title} details`} />
    </div>
  );
}

function Arena() {
  return <ProjectPanel project={getProject("arcclash")!} />;
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
            <div key={f.label} className="rounded-sm border-2 border-ember-dark/60 bg-ember/10 p-3">
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
              className="flex min-h-14 items-center gap-3 rounded-sm border-2 border-ember-dark/60 bg-ember/10 p-3 hover:border-ink hover:bg-ember/25 focus-visible:outline-2 focus-visible:outline-ink"
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
