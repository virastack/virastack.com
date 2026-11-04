import Markdown from "react-markdown";

import { AcademyBadge } from "@/features/academy/components/AcademyBadge";
import { isAcademyBadgeKind } from "@/features/academy/constants/badge.constants";

const BADGE_PREFIX = "badge:";

/**
 * Note copy is trusted Markdown limited to lists, `code`, **bold**, *italic* and
 * technology badges, written as links: `[Next.js](badge:nextjs)`.
 */
export function ReleaseRichText({ children }: { children: string }) {
  return (
    <Markdown
      allowedElements={["p", "ul", "li", "strong", "em", "code", "a"]}
      urlTransform={(url) => url}
      components={{
        ul: ({ children: items }) => <ul className="list-disc space-y-2 pl-5">{items}</ul>,
        strong: ({ children: text }) => (
          <strong className="font-semibold text-foreground">{text}</strong>
        ),
        em: ({ children: text }) => <em className="italic">{text}</em>,
        code: ({ children: text }) => (
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">
            {text}
          </code>
        ),
        a: ({ href = "", children: text }) => {
          const kind = href.slice(BADGE_PREFIX.length);
          return isAcademyBadgeKind(kind) ? <AcademyBadge kind={kind} /> : text;
        },
      }}
    >
      {children}
    </Markdown>
  );
}
