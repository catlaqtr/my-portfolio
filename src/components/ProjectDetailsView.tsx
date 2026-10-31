import type { ReactNode } from "react";
import type { Project } from "../content/projects";
import { tones, type Tone } from "./tones";

export type DetailSection = "highlights" | "architecture" | "stack" | "testing" | "planned" | "screenshots";

const DEFAULT_SECTIONS: DetailSection[] = ["highlights", "architecture", "stack", "testing", "planned"];

interface Props {
  project: Project;
  tone: Tone;
  /** Which parts to show, in this order (the village panels split them into tabs). */
  sections?: DetailSection[];
  /** Heading level for section titles, so the outline stays valid wherever this is placed. */
  headingLevel?: 3 | 4;
}

function Section({ title, tone, level, children }: { title: string; tone: Tone; level: 3 | 4; children: ReactNode }) {
  const H = `h${level}` as const;
  return (
    <section className="mt-6 first:mt-0">
      <H className={tones[tone].heading}>{title}</H>
      <div className="mt-2">{children}</div>
    </section>
  );
}

/** Highlights, architecture, stack, testing, roadmap and screenshots of a project. */
function ProjectDetailsView({ project, tone, sections = DEFAULT_SECTIONS, headingLevel = 3 }: Props) {
  const t = tones[tone];
  const d = project.details;
  const s = (title: string, children: ReactNode) => (
    <Section key={title} title={title} tone={tone} level={headingLevel}>{children}</Section>
  );

  const render: Record<DetailSection, () => ReactNode> = {
    highlights: () =>
      s("Highlights", (
        <ul className="list-disc space-y-1.5 pl-5">
          {d.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      )),
    architecture: () =>
      s("Architecture", (
        <>
          <p className={t.muted}>{d.architecture.summary}</p>
          <ol className="mt-3 flex flex-col items-stretch gap-1.5" aria-label="Architecture layers, top to bottom">
            {d.architecture.layers.map((layer, i) => (
              <li key={layer.name} className="flex flex-col items-center">
                {i > 0 && <span aria-hidden="true" className={`text-xs leading-none ${t.muted}`}>▼</span>}
                <div className={`w-full rounded-sm border-2 px-3 py-2 ${t.box}`}>
                  <span className="font-semibold">{layer.name}</span>
                  <span className={t.muted}> · {layer.detail}</span>
                </div>
              </li>
            ))}
          </ol>
          {d.endpoints && (
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className={t.muted}>API:</span>
              {d.endpoints.map((e) => (
                <code key={e} className={`rounded-sm px-2 py-0.5 text-xs ${t.code}`}>{e}</code>
              ))}
            </p>
          )}
        </>
      )),
    stack: () =>
      s("Tech stack", (
        <dl className="grid gap-3 sm:grid-cols-2">
          {d.stack.map((g) => (
            <div key={g.group}>
              <dt className={`text-sm font-semibold ${t.muted}`}>{g.group}</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span key={item} className={`rounded-full border px-2.5 py-0.5 text-xs ${t.chip}`}>{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      )),
    testing: () => s("Testing", <p>{d.testing}</p>),
    planned: () =>
      d.planned &&
      s("Planned next", (
        <ul className="list-disc space-y-1 pl-5">
          {d.planned.map((p) => <li key={p}>{p}</li>)}
        </ul>
      )),
    screenshots: () =>
      s("Screenshots", project.image ? (
        <img src={project.image} alt={`${project.title} screenshot`} className="w-full rounded-sm border-2 border-current/20" loading="lazy" />
      ) : (
        <p className={`rounded-sm border-2 border-dashed px-4 py-6 text-center text-sm ${t.box} ${t.muted}`}>
          {d.screenshotsNote ?? "Screenshots coming soon."}
        </p>
      )),
  };

  return <div className={t.text}>{sections.map((key) => render[key]())}</div>;
}

export default ProjectDetailsView;
