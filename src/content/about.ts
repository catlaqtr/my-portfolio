export const profile = {
  name: "Mete Ünal",
  tagline:
    "Full‑stack, mobile app learning developer building modern apps for the web and mobile.",
  education:
    "I completed the Computer Programming diploma at Humber College (2024–2026).",
  leetcode: {
    href: "https://leetcode.com/u/catlaqtr/",
    statsCard:
      "https://leetcard.jacoblin.cool/catlaqtr?ext=activity&theme=dark&font=Gotham",
  },
};

export const intro =
  "I'm Mete Ünal — a full‑stack developer currently learning mobile development. I enjoy building end‑to‑end solutions with React/TypeScript on the front end, Node/Express or Java Spring Boot on the back end, and React Native for mobile.";

export const quickFacts = [
  { label: "Primary focus", value: "Full‑stack Engineering" },
  { label: "Currently exploring", value: "Mobile App Development" },
];

// TODO(Mete): review the wording of this story — it's the only prose on the
// site not written by you.
export const transition = {
  heading: "From Geography to Software Development",
  paragraphs: [
    "My first degree was in Geography at Istanbul University. Studying how complex systems fit together, and drawing conclusions from real data, built the analytical habits I now bring to software.",
    "I then moved into software development and completed the Computer Programming diploma at Humber College. Today I build full‑stack applications, with a particular focus on Java and Spring Boot back ends.",
  ],
};

export interface TimelineEntry {
  period: string;
  title: string;
  place: string;
  detail?: string;
}

export const timeline: TimelineEntry[] = [
  {
    period: "2017 – 2023",
    title: "Bachelor's Degree, Geography",
    place: "Istanbul University",
  },
  {
    period: "2024 – 2026",
    title: "Diploma, Computer Programming",
    place: "Humber College",
  },
  {
    period: "Now",
    title: "Building ArcClash",
    place: "Personal project",
    detail:
      "A strategic card-drafting duel game on Java 21 and Spring Boot — in active development.",
  },
];

export const bio = [
  {
    heading: "What I'm working on",
    body: "I'm building practical apps to solidify my fundamentals and learn by doing. I focus on clean UIs, performance, and readable code. My current projects are ArcClash, a strategic card-drafting duel game on Java 21 and Spring Boot, and AnimeGuess, an AI-powered anime character guessing game.",
  },
  {
    heading: "What I want next",
    body: "An opportunity where I can keep learning, contribute to real code, and grow with a supportive team. I value feedback and improve quickly.",
  },
];
