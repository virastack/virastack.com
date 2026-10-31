/**
 * Renders scripts/video/start-intro.html to public/start/start-intro.<hash>.mp4 (+ poster).
 * Notes and editing rules: scripts/video/README.md.
 *
 * The page is deterministic: `window.__seek(ms)` paints one frame and
 * `window.__total` is the length in seconds, so the video is a pure function of
 * the timeline and can be re-rendered any time.
 *
 * Needs Chromium (Playwright from node_modules, or the file in $PLAYWRIGHT_MODULE) and
 * ffmpeg on PATH:
 *   node scripts/video/render-start-intro.mjs [--no-opener] [--fps 30] [--frames <dir>] [--out <dir>]
 *   node scripts/video/render-start-intro.mjs --still 4000,12000 [--no-opener] [--out <dir>]
 *
 * --no-opener  skip the hero lockup (what the product page uses)
 * --still      only write PNGs of those video times (ms) to <out>, for a quick look
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const out = path.resolve(arg("out", path.join(root, "public/start")));
const fps = Number(arg("fps", 30));
const opener = !process.argv.includes("--no-opener");
const stills = arg("still", "").split(",").filter(Boolean).map(Number);
const framesDir = arg("frames", path.join(os.tmpdir(), "start-intro-frames"));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
};

async function resolvePlaywright() {
  const candidates = [
    ...(process.env.PLAYWRIGHT_MODULE ? [process.env.PLAYWRIGHT_MODULE] : []),
    path.join(root, "node_modules/playwright/index.mjs"),
    path.resolve(root, "../password/node_modules/playwright/index.mjs"),
  ];
  for (const file of candidates) {
    try {
      await fs.access(file);
      return import(file);
    } catch {}
  }
  throw new Error(`Playwright not found. Looked in:\n  ${candidates.join("\n  ")}`);
}

/** Serves the repo over http so the page keeps a normal origin (fonts, svg). */
function serve() {
  const server = createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(req.url.split("?")[0]));
    if (!file.startsWith(root)) return res.writeHead(403).end();
    createReadStream(file)
      .on("open", () =>
        res.writeHead(200, {
          "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
        }),
      )
      .on("error", () => {
        console.warn(`not found: ${req.url}`);
        res.writeHead(404).end();
      })
      .pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

const { chromium } = await resolvePlaywright();
const server = await serve();
const { port } = server.address();

await fs.rm(framesDir, { recursive: true, force: true });
await fs.mkdir(framesDir, { recursive: true });
await fs.mkdir(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: stills.length ? 1 : 1.5,
});
await page.goto(
  `http://127.0.0.1:${port}/scripts/video/start-intro.html?render=1${opener ? "" : "&opener=0"}`,
  { waitUntil: "load" },
);
await page.evaluate(() => document.fonts.ready);

if (stills.length) {
  for (const ms of stills) {
    await page.evaluate((t) => window.__seek(t), ms);
    await page.screenshot({ path: path.join(out, `still-${ms}.png`) });
  }
  await browser.close();
  server.close();
  process.stdout.write(`${stills.length} still(s) → ${out}\n`);
  process.exit(0);
}

const total = await page.evaluate(() => window.__total);
const posterAt = await page.evaluate(() => window.__poster);
const count = Math.round(total * fps);
process.stdout.write(`timeline ${total.toFixed(2)}s · ${count} frames @ ${fps}fps\n`);

let posterFrame = 1;
for (let i = 0; i < count; i++) {
  const t = (i * 1000) / fps;
  if (Math.abs(t / 1000 - posterAt) < 0.5 / fps) posterFrame = i + 1;
  await page.evaluate((ms) => window.__seek(ms), t);
  await page.screenshot({ path: path.join(framesDir, `f${String(i + 1).padStart(5, "0")}.png`) });
  if (i % 60 === 0) process.stdout.write(`\r  frame ${i + 1}/${count}`);
}
process.stdout.write(`\r  frame ${count}/${count}\n`);

await browser.close();
server.close();

const ff = (args) =>
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

ff([
  "-framerate",
  String(fps),
  "-i",
  path.join(framesDir, "f%05d.png"),
  "-vf",
  "scale=1920:1080:flags=lanczos",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "24",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "-an",
  path.join(out, "start-intro.mp4"),
]);

execFileSync("cwebp", [
  "-quiet",
  "-q",
  "68",
  "-resize",
  "1280",
  "720",
  path.join(framesDir, `f${String(posterFrame).padStart(5, "0")}.png`),
  "-o",
  path.join(out, "start-intro-poster.webp"),
]);

/*
 * The site caches these for a year, so the files are named after the video's hash:
 * a re-render gets a new URL and the previous pair is deleted.
 */
const video = path.join(out, "start-intro.mp4");
const hash = createHash("sha256")
  .update(await fs.readFile(video))
  .digest("hex")
  .slice(0, 8);
for (const name of await fs.readdir(out)) {
  if (/^start-intro(-poster)?\.[0-9a-f]{8}\.(mp4|webp)$/.test(name))
    await fs.rm(path.join(out, name));
}
await fs.rename(video, path.join(out, `start-intro.${hash}.mp4`));
await fs.rename(
  path.join(out, "start-intro-poster.webp"),
  path.join(out, `start-intro-poster.${hash}.webp`),
);

const { size } = await fs.stat(path.join(out, `start-intro.${hash}.mp4`));
process.stdout.write(
  `${path.join(out, `start-intro.${hash}.mp4`)} · ${(size / 1024).toFixed(0)} KB\n` +
    `Set the hash in src/features/start/components/StartDemoVideo.tsx: ${hash}\n`,
);
