import { copyFileSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * MapLibre v6 loads its worker as a separate ES module that imports a sibling
 * `maplibre-gl-shared.mjs`. The bundler hashes chunk names, so neither file is
 * reachable next to the main bundle. Copying both under `public/vendor/` serves
 * them from our own origin instead of a third-party CDN (and keeps the CSP tight).
 * The version folder keeps a long browser cache safe across upgrades.
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const pkgPath = require.resolve("maplibre-gl/package.json", { paths: [ROOT] });
const { version } = JSON.parse(readFileSync(pkgPath, "utf8"));
const sourceDir = join(dirname(pkgPath), "dist");
const vendorRoot = join(ROOT, "public/vendor/maplibre-gl");
const targetDir = join(vendorRoot, version);

rmSync(vendorRoot, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });

for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(join(sourceDir, file), join(targetDir, file));
}

process.stdout.write(`MapLibre worker ${version} → public/vendor/maplibre-gl/${version}\n`);
