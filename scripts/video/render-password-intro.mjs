/**
 * Renders scripts/video/password-intro.html to public/password/password-intro.mp4.
 *
 * The page is deterministic: `window.__seek(ms)` paints one frame and
 * `window.__total` is the length in seconds, so the video is a pure function of
 * the timeline and can be re-rendered any time.
 *
 * Needs Chromium (resolved from the sibling `password` repo's Playwright) and
 * ffmpeg on PATH:
 *   node scripts/video/render-password-intro.mjs [--fps 30] [--frames <dir>]
 */
import { execFileSync } from "node:child_process";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const out = path.join(root, "public/password");

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};

const fps = Number(arg("fps", 30));
const framesDir = arg("frames", path.join(os.tmpdir(), "password-intro-frames"));

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
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
    createReadStream(file)
      .on("error", () => res.writeHead(404).end())
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
  deviceScaleFactor: 2,
});
await page.goto(`http://127.0.0.1:${port}/scripts/video/password-intro.html?render=1`, {
  waitUntil: "load",
});
await page.evaluate(() => document.fonts.ready);

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
  "scale=1280:720:flags=lanczos",
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
  path.join(out, "password-intro.mp4"),
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
  path.join(out, "password-intro-poster.webp"),
]);

const { size } = await fs.stat(path.join(out, "password-intro.mp4"));
process.stdout.write(`public/password/password-intro.mp4 · ${(size / 1024).toFixed(0)} KB\n`);
