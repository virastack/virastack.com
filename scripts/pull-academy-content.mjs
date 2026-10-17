import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = join(ROOT, ".content/academy");
const REPO = process.env.ACADEMY_CONTENT_REPO ?? "https://github.com/virastack/academy.git";
const REF = process.env.ACADEMY_CONTENT_REF ?? "main";

mkdirSync(dirname(TARGET), { recursive: true });

if (existsSync(TARGET)) {
  rmSync(TARGET, { recursive: true, force: true });
}

process.stdout.write(`Cloning ${REPO}#${REF} → .content/academy\n`);
execFileSync(
  "git",
  ["clone", "--depth", "1", "--branch", REF, REPO, TARGET],
  { stdio: "inherit" },
);
process.stdout.write("Academy content ready.\n");
