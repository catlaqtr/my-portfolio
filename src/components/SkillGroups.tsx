import { skillCategories, skillsByCategory } from "../content/skills";
import { projectsUsing } from "../content/projects";
import type { SkillName } from "../content/skills";
import { tones, type Tone } from "./tones";

interface Props {
  tone: Tone;
  headingLevel?: 3 | 4;
}

/** Skills by category, separating those used in projects from those being learned. */
function SkillGroups({ tone, headingLevel = 3 }: Props) {
  const t = tones[tone];
  const H = `h${headingLevel}` as const;

  return (
    <div>
      <p className={`flex flex-wrap gap-4 text-xs ${t.muted}`}>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className={`h-3 w-5 rounded-full border ${t.chip}`} />
          Used in projects
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className={`h-3 w-5 rounded-full border ${t.learningChip}`} />
          Currently learning
        </span>
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => {
          const items = skillsByCategory(category);
          const applied = items.filter((s) => s.status === "applied");
          const learning = items.filter((s) => s.status === "learning");
          return (
            <section key={category} className={`rounded-md border-2 p-4 ${t.box}`}>
              <H className={t.heading}>{category}</H>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${category}: used in projects`}>
                {applied.map((s) => {
                  const used = projectsUsing(s.name as SkillName).map((p) => p.title);
                  return (
                    <li
                      key={s.name}
                      title={used.length ? `Used in ${used.join(" and ")}` : undefined}
                      className={`rounded-full border px-2.5 py-1 text-xs ${t.chip}`}
                    >
                      {s.name}
                    </li>
                  );
                })}
              </ul>
              {learning.length > 0 && (
                <>
                  <p className={`mt-3 text-xs ${t.muted}`}>Currently learning</p>
                  <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${category}: currently learning`}>
                    {learning.map((s) => (
                      <li key={s.name} className={`rounded-full border px-2.5 py-1 text-xs ${t.learningChip}`}>
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default SkillGroups;
