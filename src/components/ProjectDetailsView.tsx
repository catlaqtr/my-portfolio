import type { ReactNode } from "react";
import type { Project } from "../content/projects";
import { tones, type Tone } from "./tones";

export type DetailSection =
  | "stats" | "built" | "architecture" | "api" | "decisions" | "challenges" | "stack" | "testing" | "planned" | "screenshots";

const DEFAULT_SECTIONS: DetailSection[] = [
  "stats", "built", "architecture", "api", "decisions", "challenges", "stack", "testing", "planned",
];

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

/** What a project does, how it's built, the decisions behind it, and what's next. */
function ProjectDetailsView({ project, tone, sections = DEFAULT_SECTIONS, headingLevel = 3 }: Props) {
  const t = tones[tone];
  const d = project.details;
  const s = (title: string, children: ReactNode) => (
    <Section key={title} title={title} tone={tone} level={headingLevel}>{children}</Section>
  );

  const render: Record<DetailSection, () => ReactNode> = {
    stats: () => (
      <dl key="stats" className="mt-6 grid grid-cols-2 gap-2 first:mt-0 sm:grid-cols-4">
        {d.stats.map((st) => (
          <div key={st.label} className={`rounded-sm border-2 px-3 py-2 text-center ${t.box}`}>
            <dd className="text-2xl font-bold">{st.value}</dd>
            <dt className={`text-xs ${t.muted}`}>{st.label}</dt>
          </div>
        ))}
      </dl>
    ),
    built: () =>
      s(project.status === "in-development" ? "Built so far" : "What's built", (
        <ul className="space-y-1.5">
          {d.built.map((b) => (
            <li key={b} className="flex gap-2">
              <span aria-hidden="true" className="font-bold text-emerald-600">✓</span>
              <span>{b}</span>
            </li>
          ))}
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
        </>
      )),
    api: () =>
      d.api &&
      s("REST API", (
        <ul className="space-y-2">
          {d.api.map((r) => (
            <li key={r.method + r.path} className={`rounded-sm border-2 px-3 py-2 ${t.box}`}>
              <code className={`mr-2 rounded-sm px-1.5 py-0.5 text-xs font-bold ${t.code}`}>{r.method}</code>
              <code className="text-sm font-semibold">{r.path}</code>
              <p className="mt-1 text-sm">{r.summary}</p>
              <p className={`text-xs ${t.muted}`}>{r.responses}</p>
            </li>
          ))}
        </ul>
      )),
    decisions: () =>
      s("Technical decisions", (
        <dl className="space-y-2">
          {d.decisions.map((dec) => (
            <div key={dec.title}>
              <dt className="font-semibold">{dec.title}</dt>
              <dd className={t.muted}>{dec.detail}</dd>
            </div>
          ))}
        </dl>
      )),
    challenges: () =>
      d.challenges &&
      s("Challenges & solutions", (
        <dl className="space-y-2">
          {d.challenges.map((c) => (
            <div key={c.challenge} className={`rounded-sm border-2 px-3 py-2 ${t.box}`}>
              <dt className="font-semibold">{c.challenge}</dt>
              <dd className={t.muted}>{c.solution}</dd>
            </div>
          ))}
        </dl>
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
      s("Planned (not built yet)", (
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
