import { existsSync, readdirSync } from "node:fs";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const PARENT_IMPORT = {
  group: ["../*"],
  message: "Use a path alias (@/...) instead of a parent-relative import.",
};

// One-way imports: shared folders, then features, then routes (same rule as the Start templates).
const SHARED_FILES = [
  "src/{components,config,constants,helpers,hooks,i18n,lib,providers,schemas,stores,styles,test,types}/**/*.{ts,tsx}",
  "src/env.ts",
  "src/proxy.ts",
];
const SHARED_IMPORT = {
  group: ["@/features/*", "@/app/*"],
  message: "Shared folders must not import features or routes, so a feature can be deleted safely.",
};
const ROUTE_IMPORT = {
  group: ["@/app/*"],
  message: "Features must not import routes. Compose features at the route level.",
};

// Feature boundaries: a feature may import itself, never another feature.
const featuresDir = new URL("./src/features", import.meta.url);
const features = existsSync(featuresDir)
  ? readdirSync(featuresDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

const boundaries = [
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": ["error", { patterns: [PARENT_IMPORT] }] },
  },
  ...features.map((feature) => ({
    files: [`src/features/${feature}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            PARENT_IMPORT,
            ROUTE_IMPORT,
            {
              group: ["@/features/*", `!@/features/${feature}`, `!@/features/${feature}/**`],
              message:
                "Features must not import each other. Move shared code to src/ (components, lib, hooks, ...).",
            },
          ],
        },
      ],
    },
  })),
  {
    files: SHARED_FILES,
    rules: { "no-restricted-imports": ["error", { patterns: [PARENT_IMPORT, SHARED_IMPORT] }] },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  ...boundaries,
  // Parse outside data with Zod instead of asserting its type; `as const` stays allowed.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: [
      // shadcn components stay as generated.
      "src/components/ui/**",
      // Low-level wrappers may assert once so callers do not have to.
      "src/lib/**",
      "src/**/*.test.{ts,tsx}",
      // Copied from the Start registry by `npm run sync:preview`; fixed there.
      "src/features/start/demos/**",
    ],
    rules: {
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Academy content is cloned at build time (see scripts/pull-academy-content.mjs).
    ".content/**",
    // Third-party files copied from node_modules (see scripts/vendor-maplibre-worker.mjs).
    "public/vendor/**",
    // Copied from the Start templates by `npm run sync:preview` there.
    "src/features/start/demos/users/ui/**",
    // Remotion release videos are a separate project with their own dependencies.
    "videos/**",
  ]),
]);

export default eslintConfig;
