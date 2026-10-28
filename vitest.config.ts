import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": path.join(import.meta.dirname, "src") },
  },
  test: {
    include: ["src/**/*.test.ts"],
    globalSetup: ["src/test/server.setup.ts"],
    // The suite drives a real `next start`; 520 sitemap URLs need room.
    testTimeout: 120_000,
    hookTimeout: 180_000,
  },
});
