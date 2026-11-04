import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

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
  ]),
]);

export default eslintConfig;
