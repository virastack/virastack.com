/**
 * Fold a source name for comparisons. ASCII “I” stays an “i”, so English
 * names like “AI SDK” match; Turkish “İ” is folded first.
 */
export function normalizeAcademySourceKey(name: string): string {
  return name.trim().replaceAll("İ", "i").replaceAll("I", "i").toLocaleLowerCase("en");
}

/**
 * Tool and standard names treated as official documentation, including when a
 * citation is tagged as an article on that project’s own site.
 */
export const ACADEMY_OFFICIAL_SOURCE_NAMES = new Set([
  "ai sdk",
  "azure devops",
  "biome",
  "bulletproof-react",
  "claude",
  "claude code",
  "cloudscape design system",
  "commitlint",
  "conventional commits 1.0.0",
  "cursor",
  "eslint",
  "eslint-plugin-boundaries",
  "eslint-plugin-import",
  "feature-sliced design",
  "figma",
  "html standard",
  "husky",
  "jest-dom",
  "jira",
  "linear",
  "lint-staged",
  "mdn",
  "model context protocol",
  "module federation",
  "msw",
  "next-intl",
  "nx",
  "next.js",
  "nextjs",
  "node.js",
  "nodejs",
  "npm",
  "oxc",
  "pgvector",
  "playwright",
  "playwright mcp",
  "pnpm",
  "prettier",
  "react",
  "react router",
  "react testing library",
  "react-i18next",
  "react-router",
  "shadcn",
  "shadcn/ui",
  "tanstack query",
  "tanstack router",
  "tanstack start",
  "testing library",
  "turborepo",
  "typescript-eslint",
  "user-event",
  "vitest",
  "wai-aria 1.2",
]);

/**
 * Companies, standards bodies, and universities. They stay institutions even
 * when the citation points at their own documentation.
 */
export const ACADEMY_INSTITUTION_SOURCE_NAMES = new Set([
  "acm",
  "anthropic",
  "atlassian",
  "creative commons",
  "eth zurich",
  "eth zürih",
  "github",
  "google",
  "meta",
  "ncsc",
  "openai",
  "owasp",
  "vercel",
  "w3c",
]);
