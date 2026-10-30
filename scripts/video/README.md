# Product videos

Silent product loops, rendered from a scripted HTML timeline. The mp4 is never edited: change the
source, render again. The same source gives the page loop and the full version (archive, social).

| Video       | Source                                 | Renderer                 | Lives in                                   |
| :---------- | :------------------------------------- | :----------------------- | :----------------------------------------- |
| Start intro | `start-intro.html` (+ `tech-logos.js`) | `render-start-intro.mjs` | `public/start/`                            |
| AI intro    | `ai-intro.html` (+ `tech-logos.js`)    | `render-ai-intro.mjs`    | `public/ai/` (not wired into the page yet) |

The notes below are about the Start intro, the template the other videos follow. The AI intro uses the same chrome and flags (`--no-opener`, `--still`) with the product colour `#c800de`. It has two
steps: Interactive CLI (a tall terminal on the left shows the whole run; on the right one shared pool holds the
rules and files both projects get, and a Next.js and a TanStack Start card each add their own rule, every chip
landing right after the line that creates its file) and Before & After (one feature tree; six checks take the focus
one after another, each with a wrong line and the ViraStack AI version; every pair is taken from the rule it names).
The wrong example never carries the product name; highlights are background colour only.

## Render

Needs Chromium through Playwright (`node_modules`, or the file in `$PLAYWRIGHT_MODULE`) and `ffmpeg`.

```bash
node scripts/video/build-tech-logos.mjs                      # only when a tech logo changed
node scripts/video/render-start-intro.mjs --no-opener        # product page version → public/start
node scripts/video/render-start-intro.mjs --out ~/Desktop/start-full   # full version, with the lockup opener
node scripts/video/render-start-intro.mjs --no-opener --still 0,12000,24000 --out /tmp/stills
```

- `--still` writes PNGs of those video times (ms) and stops. Use it to check a change in seconds
  instead of rendering ~900 frames (about 2 minutes).
- A render writes `start-intro.<hash>.mp4` and `start-intro-poster.<hash>.webp` and deletes the previous
  pair in the same folder. **Put the printed hash into `src/features/start/components/StartDemoVideo.tsx`.**
  The hash is in the name because the files are cached for a year (`immutable`, `next.config.ts`); a
  re-render must get a new URL.

## How the page works

`start-intro.html` is deterministic: `window.__seek(ms)` paints one frame, `window.__total` is the
length in seconds, `window.__poster` the poster time. Nothing runs on its own clock.

- All scene times live in `T` (ms, relative to the opener). Terminal content is a function of `ms`:
  `term1()` (Run, Prompts, Setup), `term2()` (Ready). The prompt order, texts and spinner lines come
  from `start/src/i18n.js` and `start/src/commands/init.js`; keep them in sync if the CLI changes.
- Scenes in `T`: Run → Prompts → Setup → Stack → AI rules → Ready (terminal, then the finished site).
  The viewer sees four steps (`STEPS_UI`): **Interactive CLI** (Run, Prompts and Setup are one terminal),
  **Tech Stack**, **AI Rules & Skills**, **Ready to build**. The counter, dots and bottom-right label follow it.
  Avoid the word "prompt" in labels: next to an AI product it reads as an LLM prompt.
- `OPEN` is the hero lockup (solid wordmark → outline → product name, same recipe as `HeroBrand`).
  `?opener=0` (`--no-opener`) sets it to 0.
- Logos come from `src/components/ui/svgs` through `build-tech-logos.mjs`, never redrawn by hand.
  Keys are in its `LOGOS` map. MSW has no logo in the project and stays text only.

## Rules the video follows

- **Format:** 1280×720 CSS px page, rendered at 1.5× → 1920×1080, 30 fps, H.264 (crf 24), no audio.
  The page shows it at about 850 px wide; mobile never loads it.
- **Theme:** light only, matching the site cards (`#fff`, `#e5e5e5` borders, `#161616` text).
- **Language:** English only, as little text as possible. Titles and descriptions belong to the page
  (i18n), not to the video.
- **Brand:** the logo is not baked in; the top-left corner is the text `ViraStack` (semibold, `#161616`)
  and the product name (bold, product colour `#00a63e`), never italic. Hero lockup uses the same recipe
  as `OutlineWordmark` / `BrandLockup`. Product colours come from `ecosystem.config.ts`.
- **Fixed chrome on every scene:** top-left name, top-right step counter (`01 / 04`), bottom-left
  `virastack.com/<product>`, bottom-centre progress dots, bottom-right step label.
- **Terminal:** fixed size, never grows; lines fill quickly and scroll up when full. No big black
  boxes. Real commands only (`npx virastack`, `npm run dev`, no `@latest`); project `acme-app`.
- **Showcase cards** (Next.js / TanStack Start, Claude Code / Cursor, ViraStack tools) introduce, they do
  not select: no ticks, no dimming.
- **Stack scene:** only enough of the tree to show `features/` and what lives inside one feature.
  Do not explain the architecture (that is ViraStack AI's story).
- **Finale:** the finished site, placeholders only, no copy. Calm hero (grey skeleton for the h1 and
  description, one soft green glow); the three cards below stay as they are.
- **Honest content:** texts come from the repo. `Ready in 412ms` is a sample value. Do not invent CLI
  output or logos that do not exist in the project.

## Page integration (performance)

`ProductDemoVideo` loads nothing until the section is close: `preload="none"`, poster set from JS
~400 px before it scrolls in, playback follows viewport and tab visibility, phones (`hidden md:block`)
never fetch it, and reduced motion, data saver or a 2g connection get the poster with controls.
Files are named after their content hash and served with `Cache-Control: public, max-age=31536000, immutable`.

## Next time

- Change text, timing or a scene in `start-intro.html`, check with `--still`, then render.
- A new product video: copy the Start page and keep the rules above, so the archive stays one family.
- Not done yet: larger text for the page size (terminal and chips render at about 10 px on the page),
  a short fade at the loop seam, a shorter AI rules scene, the Password video on the same hash naming.
