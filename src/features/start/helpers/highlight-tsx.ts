import type { HighlighterCore, ThemedToken } from "shiki/core";

let highlighter: Promise<HighlighterCore> | undefined;

/**
 * Shiki with only TSX and the docs' two themes, loaded the first time a block needs it, so the
 * page does not ship the full bundle. The JavaScript engine avoids loading the Oniguruma WASM.
 */
function getHighlighter() {
  highlighter ??= Promise.all([import("shiki/core"), import("shiki/engine/javascript")]).then(
    ([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
        langs: [import("shiki/langs/tsx.mjs")],
        engine: createJavaScriptRegexEngine(),
      }),
  );

  return highlighter;
}

/** Tokens carry `--shiki-light` and `--shiki-dark`, so CSS picks the color for the theme. */
export async function tokenizeTsx(code: string): Promise<ThemedToken[][]> {
  const shiki = await getHighlighter();

  return shiki.codeToTokens(code, {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  }).tokens;
}
