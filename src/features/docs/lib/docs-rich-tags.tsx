import type { ReactNode } from "react";

/** Shared `t.rich` tags for docs prose: `<code>` and `<bold>`. */
export const docsRichTags = {
  code: (chunks: ReactNode) => <code>{chunks}</code>,
  bold: (chunks: ReactNode) => <strong>{chunks}</strong>,
};
