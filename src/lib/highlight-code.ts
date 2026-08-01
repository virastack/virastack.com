import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type HighlightLanguage = "tsx" | "ts" | "jsx" | "js" | "bash" | "json" | "css" | "html";

export type HighlightCodeOptions = {
  lang?: HighlightLanguage;
  /** When true, emits `showLineNumbers` meta for rehype-pretty-code. */
  showLineNumbers?: boolean;
};

/**
 * Count non-trailing-empty lines in a code string.
 */
export function countCodeLines(code: string): number {
  const normalized = code.replace(/\n$/, "");
  if (normalized.length === 0) return 0;
  return normalized.split("\n").length;
}

/**
 * Syntax-highlight a code string with rehype-pretty-code.
 * Dual themes: github-light + github-dark (toggled via CSS + `.dark`).
 */
export async function highlightCode(
  code: string,
  langOrOptions: HighlightLanguage | HighlightCodeOptions = "tsx",
): Promise<string> {
  const options: HighlightCodeOptions =
    typeof langOrOptions === "string" ? { lang: langOrOptions } : langOrOptions;

  const lang = options.lang ?? "tsx";
  const meta = options.showLineNumbers ? " showLineNumbers" : "";
  const body = code.replace(/\n$/, "");

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
      keepBackground: false,
      defaultLang: lang,
    })
    .use(rehypeStringify)
    .process(`\`\`\`${lang}${meta}\n${body}\n\`\`\``);

  return String(file);
}
