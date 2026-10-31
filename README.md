# Mete Ünal — Portfolio

A modern dark-themed portfolio built with React, TypeScript, Tailwind CSS, and Vite. It showcases my projects, skills, and contact links, with smooth scroll‑reveal animations.

## Features

- Dark by default (no toggle) with glassy navbar and gradient accents
- Projects page showcasing ArcClash and AnimeGuess
- Animated scroll reveals (Framer Motion)
- About page with categorized skills and LeetCode stats
- Contact page and global footer with Email, GitHub, LinkedIn, Instagram, and LeetCode
- Resume download from `/Mete_Unal_Coop_Resume_Updated.pdf`
- **Hearthvale** (`/play`, prototype): an explorable pixel-art village built with Phaser 4

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
- `locations.ts` — the five places in the (upcoming) pixel-art village mode

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

`vercel.json` rewrites unknown paths to `index.html` so these work on refresh.

## Hearthvale village

With the dev server running, open http://localhost:5173/play and walk with
WASD or the arrow keys. Stand at a door or next to a villager and press
E, Space or Enter to open that building's panel or talk; Esc closes it.
The **Map** button lists every place for quick access.

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
- `src/assets/game/CREDITS.md` — art credits (Ninja Adventure pack, CC0)

## Contact

- Email: meteunal46@hotmail.com
- GitHub: https://github.com/catlaqtr
- LinkedIn: https://www.linkedin.com/in/mete-unal-b144b733b/
- Instagram: https://www.instagram.com/meteunal4646
- LeetCode: https://leetcode.com/u/catlaqtr/

## License

This project is for personal portfolio use.
