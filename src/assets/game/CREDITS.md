# Game art credits

The village art is a curated subset of the
[Ninja Adventure Asset Pack](https://pixel-boy.itch.io/ninja-adventure-asset-pack)
by [Pixel-boy](https://pixel-boy.itch.io/) and
[AAA](https://www.instagram.com/challenger.aaa/), released under
CC0 1.0 (see `LICENSE.txt`). Attribution isn't required, but it's appreciated.

Only the files the game uses are kept here. The complete pack was committed
in `43119f4` and can be restored with:

```bash
git checkout 43119f4 -- "src/assets/Ninja Adventure - Asset Pack"
```

Interface pieces (dialogue frame, portrait box, key and gamepad icons,
joystick, arrow) also come from the pack's `Ui` folder, as does the pixel
font in `src/assets/fonts/`.

The fountain and the fire bowls are drawn in code (`src/game/pixelSprites.ts`)
using the pack's own palette.
