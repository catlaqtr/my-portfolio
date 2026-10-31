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

- ArcClash — Java 21 / Spring Boot deck-drafting game (in development)
- AnimeGuess — anime image/audio guessing game

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

## Hearthvale village (prototype)

With the dev server running, open http://localhost:5173/play and walk with
WASD or the arrow keys. Add `?at=` to start next to a location:
`arena`, `arcade`, `academy`, `house` or `post-office`
(e.g. `/play?at=arena`).

- `src/game/world/layout.ts` — where everything in the village is placed
- `src/game/assets.ts` — textures and the named sprites cut from the tilesets
- `src/game/scenes/` — loading (`BootScene`) and the village itself (`WorldScene`)
- `src/assets/game/CREDITS.md` — art credits (Ninja Adventure pack, CC0)

## Contact

- Email: meteunal46@hotmail.com
- GitHub: https://github.com/catlaqtr
- LinkedIn: https://www.linkedin.com/in/mete-unal-b144b733b/
- Instagram: https://www.instagram.com/meteunal4646
- LeetCode: https://leetcode.com/u/catlaqtr/

## License

This project is for personal portfolio use.
