import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import { locations } from "./locations";
import { contactLinks, resume } from "./contact";
import { skills } from "./skills";

describe("portfolio content", () => {
  it("showcases only ArcClash and AnimeGuess", () => {
    expect(projects.map((p) => p.id)).toEqual(["arcclash", "animeguess"]);
  });

  it("only shows a live link for verified, live deployments", () => {
    // Neither project is live yet, so neither may show a Play / Live Demo button.
    for (const p of projects) {
      expect(p.status === "live", p.id).toBe(Boolean(p.liveDemo));
      expect(p.status, p.id).not.toBe("live");
    }
  });

  it("references only known skills in project tech stacks", () => {
    const names = new Set<string>(skills.map((s) => s.name));
    for (const p of projects) for (const t of p.techStack) expect(names.has(t), t).toBe(true);
  });

  it("has five village locations, each with a Recruiter Mode equivalent", () => {
    expect(locations.map((l) => l.id)).toEqual(["arena", "arcade", "academy", "house", "post-office"]);
    for (const l of locations) expect(l.classicRoute).toMatch(/^\/(projects|about|contact)/);
  });

  it("keeps every contact channel and the resume", () => {
    expect(contactLinks.map((c) => c.id)).toEqual(["email", "github", "linkedin", "instagram", "leetcode"]);
    expect(resume.href).toBe("/Mete_Unal_Coop_Resume_Updated.pdf");
  });
});
