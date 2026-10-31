# Mete Ünal — Portfolio

My portfolio, live at **https://www.meteunal.dev**. It opens on a
title screen with two ways in: **Hearthvale**, an explorable pixel-art village
built with Phaser 4, and **Recruiter Mode**, a fast classic site with the
résumé, projects, skills and contact details on plain pages.

## Features

- Recruiter Mode: dark classic site, pre-rendered for speed and search engines
- Projects page showcasing ArcClash and AnimeGuess (architecture, API, decisions, tests, roadmap)
- Animated scroll reveals (Framer Motion)
- About page with categorized skills and LeetCode stats
- Contact page and global footer with Email, GitHub, LinkedIn, Instagram, and LeetCode
- Resume download from `/Mete_Unal_Coop_Resume_Updated.pdf`
- **Hearthvale** (`/play`): an explorable pixel-art village built with Phaser 4 — five buildings,
  villagers to talk to, Quick Travel, touch controls, optional music (off by default)

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- Phaser 4 (village mode only, lazy-loaded)
- Vitest

## Projects shown

- ArcClash — Java 21 / Spring Boot card-drafting duel game (in development)
- AnimeGuess — AI-powered anime character guessing game (Next.js + Spring Boot)

Earlier projects are archived (not deployed) — see `archive/README.md` to restore one.

## Editing content

All portfolio content lives in `src/content/` and is shared by every page:

- `projects.ts` — projects (missing details are listed in `todo` and shown only in dev builds)
- `skills.ts` — skills, grouped by category, marked `applied` or `learning`
- `about.ts` — profile, education timeline and bio
- `contact.ts` — email, social links and resume
- `locations.ts` — the five places in the village
- `seo.ts` — page titles and descriptions

## Local development

1. Install dependencies
   - npm install
2. Start dev server
   - npm run dev
3. Run the tests
   - npm test
4. Build for production
   - npm run build
5. Preview build
   - npm run preview

## Routes

| Path | Page |
| --- | --- |
| `/` | Title screen: **Enter the Village** or **Recruiter Mode** |
| `/portfolio` | Classic home (Recruiter Mode) |
| `/about`, `/projects`, `/contact` | Classic pages |
| `/play` | Hearthvale village (lazy-loaded) |

All of them work on refresh and as direct links (see below).

## SEO and pre-rendering

`npm run build` builds the app, then renders every Recruiter Mode page to
static HTML (`scripts/prerender.mjs`): each gets its own title, description,
canonical URL, Open Graph/Twitter tags and schema.org Person data, and its
real content readable without JavaScript. It also writes `robots.txt` and
`sitemap.xml`. Titles and descriptions live in `src/content/seo.ts`.

Canonical URLs, `og:url`, Twitter cards, the sitemap and structured data
always point at the official address, https://www.meteunal.dev
(`scripts/site.mjs`; set `SITE_URL` to override). Preview deployments are
additionally marked `noindex` and their `robots.txt` disallows crawling, so
they never compete with the real site.

Domains: `meteunal.dev` redirects to `www.meteunal.dev` (Vercel domain
settings), and the old `meteunalportfolio.vercel.app` address redirects
permanently to the same path on the new domain (`redirects` in `vercel.json`). `vercel.json`
serves `/about` → `about.html` and everything else (e.g. `/play`) from the
app shell.

## Accessibility

- Skip links, one `h1` per page, labelled landmarks, visible focus rings.
- In the village: screen-reader instructions, live announcements for what's
  in reach and for travel, and **Quick Travel** (Map button or `M`) to visit
  or read about any building without walking.
- Reduced motion follows the system setting, with an in-game override; it
  stops page transitions, dialog animations and the village's drifting
  leaves, clouds and sparkles.
- Music and sound effects are off by default; the **Sound** button turns them
  on and the choice is remembered. Nothing is downloaded while sound is off.
- Checked with axe-core (WCAG 2.1 AA) on every page, desktop and mobile.

## Hearthvale village

With the dev server running, open http://localhost:5173/play and walk with
WASD or the arrow keys. Stand at a door or next to a villager and press
E, Space or Enter to open that building's panel or talk; Esc closes it.
The **Map** button (or `M`) opens Quick Travel: travel to any building's door,
or open its information directly.

On phones and tablets, drag anywhere in the lower-left of the screen to walk
(the joystick appears under your thumb) and tap the **A** button to enter a
building or talk. Panels open full-screen; tap ✕ to return. Add `?at=` to start next to a location:
`arena`, `arcade`, `academy`, `house` or `post-office`
(e.g. `/play?at=arena`).

- `src/game/world/layout.ts` — where everything in the village is placed
- `src/game/assets.ts` — textures and the named sprites cut from the tilesets
- `src/game/scenes/` — loading (`BootScene`) and the village itself (`WorldScene`)
- `src/game/systems/Interactions.ts` — what the player can reach, the marker, the interact keys
- `src/game/bridge.ts` — typed events between Phaser and the React overlay
- `src/game/ui/` — React panels, NPC dialogue box, interaction prompt, map, touch controls
- `src/game/viewport.ts` — canvas sizing (render ≤2x, whole-pixel zoom)
- `src/game/world/dialogue.ts` — what each villager says
- `src/game/ambience.ts` — leaves, cloud shadows, chimney smoke, arcade glow
- `src/game/audio.ts` — optional music and sound effects
- `src/assets/game/CREDITS.md` — art and audio credits (Ninja Adventure pack, CC0)

## Contact

- Email: meteunal46@hotmail.com
- GitHub: https://github.com/catlaqtr
- LinkedIn: https://www.linkedin.com/in/mete-unal-b144b733b/
- Instagram: https://www.instagram.com/meteunal4646
- LeetCode: https://leetcode.com/u/catlaqtr/

## License

This project is for personal portfolio use.
