import { Children, type ReactNode } from "react";

import { AcademyBadge } from "@/features/academy/components/academy-badge";

function renderBadge(kind: string, chunks: ReactNode) {
  return <AcademyBadge kind={kind} label={Children.toArray(chunks).join("")} />;
}

/**
 * Shared `t.rich` tags for docs prose: `<code>`, `<bold>` and icon badges for
 * tools, frameworks and libraries (e.g. `<nextjs>Next.js</nextjs>`).
 */
export const docsRichTags = {
  code: (chunks: ReactNode) => <code>{chunks}</code>,
  bold: (chunks: ReactNode) => <strong>{chunks}</strong>,
  claudecode: (chunks: ReactNode) => renderBadge("claudeCode", chunks),
  cursor: (chunks: ReactNode) => renderBadge("cursor", chunks),
  codex: (chunks: ReactNode) => renderBadge("codex", chunks),
  copilot: (chunks: ReactNode) => renderBadge("copilot", chunks),
  geminicli: (chunks: ReactNode) => renderBadge("geminiCli", chunks),
  nextjs: (chunks: ReactNode) => renderBadge("nextjs", chunks),
  tanstackstart: (chunks: ReactNode) => renderBadge("tanstack-start", chunks),
  tanstackquery: (chunks: ReactNode) => renderBadge("tanstack-query", chunks),
  react: (chunks: ReactNode) => renderBadge("react", chunks),
  typescript: (chunks: ReactNode) => renderBadge("typescript", chunks),
  zustand: (chunks: ReactNode) => renderBadge("zustand", chunks),
  zod: (chunks: ReactNode) => renderBadge("zod", chunks),
  tailwind: (chunks: ReactNode) => renderBadge("tailwind", chunks),
  vitest: (chunks: ReactNode) => renderBadge("vitest", chunks),
  virastack: (chunks: ReactNode) => renderBadge("virastack", chunks),
};
