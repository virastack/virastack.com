/** ViraStack AI v2 rule catalog. Paths mirror the `paths` in the ai repo's `templates/rules/*.md`. */
export const aiRules = [
  { id: "core", paths: [], only: null },
  { id: "architecture", paths: [], only: null },
  {
    id: "typescript",
    paths: ["src/**/*.ts", "src/**/*.tsx"],
    only: null,
  },
  {
    id: "react",
    paths: ["src/**/*.tsx", "src/hooks/**/*.ts", "src/features/**/hooks/**/*.ts"],
    only: null,
  },
  {
    id: "nextjs",
    paths: [
      "src/app/**/*.ts",
      "src/app/**/*.tsx",
      "src/proxy.ts",
      "next.config.ts",
      "src/features/**/actions/**/*.ts",
    ],
    only: "nextjs",
  },
  {
    id: "tanstack-start",
    paths: [
      "src/routes/**/*.ts",
      "src/routes/**/*.tsx",
      "src/router.tsx",
      "src/start.ts",
      "src/features/**/api/**/*.ts",
    ],
    only: "tanstack",
  },
  {
    id: "ui",
    paths: [
      "src/components/**/*.tsx",
      "src/features/**/components/**/*.tsx",
      "src/styles/**/*.css",
    ],
    only: null,
  },
  {
    id: "forms",
    paths: [
      "src/**/components/**/*Form*.tsx",
      "src/features/**/schemas/**/*.ts",
      "src/schemas/**/*.ts",
    ],
    only: null,
  },
  {
    id: "api",
    paths: ["src/lib/api.ts", "src/features/**/api/**/*.ts"],
    only: null,
  },
  {
    id: "server-state",
    paths: [
      "src/features/**/api/**/*.ts",
      "src/features/**/hooks/**/*.ts",
      "src/hooks/**/*.ts",
      "src/lib/query-client.ts",
      "src/providers/**/*.ts",
      "src/providers/**/*.tsx",
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
      "src/messages/**/*.json",
      "src/i18n/**/*.ts",
      "project.inlang/settings.json",
      "src/components/**/*.tsx",
      "src/features/**/components/**/*.tsx",
      "src/app/**/*.tsx",
      "src/routes/**/*.tsx",
    ],
    only: "i18n",
  },
  {
    id: "testing",
    paths: [
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "src/test/**/*.ts",
      "src/test/**/*.tsx",
      "vitest.config.ts",
    ],
    only: null,
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
] as const;

export type AiRuleId = (typeof aiRules)[number]["id"];
