import { countCodeLines, highlightCode, type HighlightLanguage } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";

/** Line numbers appear when the snippet has more lines than this. */
const LINE_NUMBER_THRESHOLD = 10;

type DocsCodeBlockProps = {
  code: string;
  lang?: HighlightLanguage;
  className?: string;
  /**
   * Force line numbers on/off. When omitted, numbers show automatically
   * if the code has more than {@link LINE_NUMBER_THRESHOLD} lines.
   */
  showLineNumbers?: boolean;
};

/**
 * Server-rendered syntax-highlighted code block (rehype-pretty-code).
 * Shared across product docs (Start, Mask, …).
 */
export async function DocsCodeBlock({
  code,
  lang = "tsx",
  className,
  showLineNumbers,
}: DocsCodeBlockProps) {
  const withLineNumbers = showLineNumbers ?? countCodeLines(code) > LINE_NUMBER_THRESHOLD;

  const html = await highlightCode(code, {
    lang,
    showLineNumbers: withLineNumbers,
  });

  return (
    <div
      className={cn("docs-code overflow-x-auto rounded-xl bg-code text-sm", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
