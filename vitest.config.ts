import path from "node:path";

import { defineConfig } from "vitest/config";

/** These drive a real `next start`, so they need a production build. */
const HTTP_TESTS = [
  "src/test/academy-markdown.test.ts",
  "src/test/routes.test.ts",
  "src/test/sitemap.test.ts",
];

export default defineConfig({
  resolve: {
    alias: { "@": path.join(import.meta.dirname, "src") },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: HTTP_TESTS,
          environment: "jsdom",
          setupFiles: ["src/test/setup.ts"],
          css: false,
        },
      },
      {
        extends: true,
        test: {
          name: "http",
          include: HTTP_TESTS,
          globalSetup: ["src/test/server.setup.ts"],
          // 520 sitemap URLs need room.
          testTimeout: 120_000,
          hookTimeout: 180_000,
        },
      },
    ],
  },
});
