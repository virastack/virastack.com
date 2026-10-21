/** ViraStack AI v2 rule catalog. Paths mirror the `globs` in the ai repo's `templates/rules/*.mdc`. */
export const aiRules = [
  { id: "core", paths: [], only: null },
  { id: "architecture", paths: [], only: null },
  {
    id: "react",
    paths: ["src/**/*.tsx", "src/hooks/**/*.ts", "src/features/**/hooks/**/*.ts"],
    only: null,
  },
  { id: "typescript", paths: ["src/**/*.{ts,tsx}"], only: null },
  {
    id: "ui",
    paths: ["src/components/**/*.tsx", "src/features/**/components/**/*.tsx"],
    only: null,
  },
  {
    id: "forms",
    paths: [
      "src/features/**/components/*Form*.tsx",
      "src/features/**/schemas/**/*.ts",
      "src/schemas/**/*.ts",
    ],
    only: null,
  },
  { id: "api", paths: ["src/lib/api.ts", "src/features/**/api/**/*.ts"], only: null },
  {
    id: "server-state",
    paths: [
      "src/features/**/api/**/*.ts",
      "src/features/**/hooks/**/*.ts",
      "src/hooks/**/*.ts",
      "src/lib/query-client.ts",
      "src/providers/**/*.{ts,tsx}",
    ],
    only: null,
  },
  {
    id: "client-state",
    paths: ["src/stores/**/*.ts", "src/features/**/stores/**/*.ts"],
    only: null,
  },
  {
    id: "i18n",
    paths: [
      "messages/**/*.json",
      "src/i18n/**/*.ts",
      "project.inlang/settings.json",
      "src/components/**/*.tsx",
      "src/features/**/components/**/*.tsx",
    ],
    only: "i18n",
  },
  {
    id: "performance",
    paths: [
      "src/app/**/*.tsx",
      "src/routes/**/*.tsx",
      "src/components/**/*.tsx",
      "src/features/**/components/**/*.tsx",
    ],
    only: null,
  },
  {
    id: "testing",
    paths: ["src/**/*.test.{ts,tsx}", "src/test/**/*.{ts,tsx}", "vitest.config.ts"],
    only: null,
  },
  {
    id: "nextjs",
    paths: ["src/app/**/*.{ts,tsx}", "src/proxy.ts", "next.config.ts"],
    only: "nextjs",
  },
  {
    id: "tanstack-start",
    paths: ["src/routes/**/*.{ts,tsx}", "src/router.tsx", "src/start.ts"],
    only: "tanstack",
  },
] as const;

export type AiRuleId = (typeof aiRules)[number]["id"];
