import { codeToHtml, type BundledLanguage, type BundledTheme } from "shiki";

const ACADEMY_CODE_THEMES = {
  light: "github-light",
  dark: "one-dark-pro",
} as const satisfies Record<"light" | "dark", BundledTheme>;

const ACADEMY_HIGHLIGHT_LANGS = {
  tsx: "tsx",
  ts: "ts",
  jsx: "jsx",
  js: "js",
  javascript: "javascript",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  json: "json",
  css: "css",
  html: "html",
  markdown: "markdown",
  md: "markdown",
  text: "text",
  plaintext: "text",
  txt: "text",
  plain: "text",
} as const satisfies Record<string, BundledLanguage | "text">;

function isAcademyHighlightLang(
  language: string,
): language is keyof typeof ACADEMY_HIGHLIGHT_LANGS {
  return Object.hasOwn(ACADEMY_HIGHLIGHT_LANGS, language);
}

/**
 * Highlight an academy code sample with Shiki dual themes
 * (`github-light` / `one-dark-pro`). Unknown fences stay plaintext.
 */
export async function highlightAcademyCode(code: string, language: string): Promise<string> {
  const key = language.toLowerCase();
  const lang = isAcademyHighlightLang(key) ? ACADEMY_HIGHLIGHT_LANGS[key] : "text";

  return codeToHtml(code, {
    lang,
    themes: ACADEMY_CODE_THEMES,
    defaultColor: false,
  });
}
