import { isValidElement, type ComponentProps, type ReactNode } from "react";

import type { MDXComponents } from "mdx/types";

import type { HighlightLanguage } from "@/lib/highlight-code";

import { AcademyBadge } from "@/components/shared/AcademyBadge";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const HIGHLIGHT_LANGUAGES = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "bash",
  "json",
  "css",
  "html",
] as const satisfies readonly HighlightLanguage[];

function toHighlightLanguage(className: string | undefined): HighlightLanguage | undefined {
  const lang = className?.replace(/^language-/, "");
  return HIGHLIGHT_LANGUAGES.find((item) => item === lang);
}

/**
 * A fenced block with a known language becomes the highlighted DocsCodeBlock; any other
 * `<pre>` (no language, or one we do not highlight) stays a plain `<pre>`.
 */
function DocsMdxPre({ children, ...props }: ComponentProps<"pre">) {
  if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    const lang = toHighlightLanguage(children.props.className);
    const code = children.props.children;
    if (lang && typeof code === "string") {
      // MDX keeps the newline before the closing fence; the TSX docs never had it.
      return <DocsCodeBlock code={code.replace(/\n$/, "")} lang={lang} />;
    }
  }
  return <pre {...props}>{children}</pre>;
}

/** Site paths go through the locale-aware Link; outside links open in a new tab. */
function DocsMdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

/** Elements and components available to every docs MDX file without an import. */
export const docsMdxComponents: MDXComponents = {
  a: DocsMdxLink,
  pre: DocsMdxPre,
  AcademyBadge,
  DocsCodeBlock,
  DocsPageHeader,
  DocsProse,
};
