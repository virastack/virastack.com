import { spawn, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const PORT = Number(process.env.TEST_PORT ?? 3210);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROOT = path.join(import.meta.dirname, "..", "..");

let server: ChildProcess | undefined;

async function waitForReady(isDead: () => boolean, log: () => string, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (isDead()) throw new Error(`next start exited before serving:\n${log()}`);

    try {
      await fetch(BASE_URL, { signal: AbortSignal.timeout(2000) });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error(`No answer on ${BASE_URL} within ${timeoutMs}ms:\n${log()}`);
}

/**
 * Serves the production build for the HTTP suite. `TEST_BASE_URL` points the tests
 * at a server that is already running instead, which keeps the local loop fast;
 * CI builds first and lets this start its own.
 */
export async function setup() {
  if (process.env.TEST_BASE_URL) return;

  if (!existsSync(path.join(ROOT, ".next", "BUILD_ID"))) {
    throw new Error("No production build found. Run `pnpm build` before `pnpm test`.");
  }

  process.env.TEST_BASE_URL = BASE_URL;
  server = spawn("node_modules/.bin/next", ["start", "--port", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let log = "";
  let dead = false;
  const record = (chunk: unknown) => (log += String(chunk));
  server.stdout?.on("data", record);
  server.stderr?.on("data", record);
  server.on("exit", () => (dead = true));

  await waitForReady(
    () => dead,
    () => log.slice(-2000),
  );
}

export async function teardown() {
  server?.kill("SIGTERM");
}
