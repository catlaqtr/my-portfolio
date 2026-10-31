# Archived projects

These projects were removed from the live portfolio so it showcases only
ArcClash and AnimeGuess. Nothing here is bundled or deployed.

| Project | Live demo | Source |
| --- | --- | --- |
| Throne of Dust | https://throneofdust-frontend.vercel.app/ | https://github.com/catlaqtr/throneofdustmain |
| SeaStrike Battleship | https://seastrikebattleship.vercel.app/ | https://github.com/catlaqtr/TheBattleShip |
| CookEase | https://cookease-fawn.vercel.app/ | https://github.com/catlaqtr/cookease |
| GameHub+ | https://gamehub-plus.vercel.app/ | https://github.com/catlaqtr/gamehub-plus |
| Anime Finder | https://anime-finder-six.vercel.app/ | https://github.com/catlaqtr/anime-finder |
| MovieWatch+ | https://moviewatch-plus.vercel.app/ | https://github.com/catlaqtr/moviewatch-plus |
| Task Tracker | https://task-tracker-smoky-two.vercel.app/ | https://github.com/catlaqtr/task-tracker |

## Restoring a project

1. Copy its entry from the last version that had all nine projects:

   ```bash
   git show 7d7c3f4:src/content/projects.ts
   ```

2. Paste it into the `projects` array in `src/content/projects.ts`.
3. Move its screenshot back so the `image` path resolves, e.g.

   ```bash
   git mv archive/screenshots/cookease.webp public/
   ```

`screenshots/` holds the original PNGs and the 1600px WebP versions the
site used.
