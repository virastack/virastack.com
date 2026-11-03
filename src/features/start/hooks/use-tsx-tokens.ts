import { useEffect, useState } from "react";

import type { ThemedToken } from "shiki/core";

import { tokenizeTsx } from "@/features/start/helpers/highlight-tsx";

/** Highlighted lines once Shiki has loaded; plain text until then and if it fails. */
export function useTsxTokens(code: string) {
  const [result, setResult] = useState<{ code: string; tokens: ThemedToken[][] } | null>(null);

  useEffect(() => {
    let isCurrent = true;
    tokenizeTsx(code)
      .then((tokens) => {
        if (isCurrent) setResult({ code, tokens });
      })
      .catch(() => {});

    return () => {
      isCurrent = false;
    };
  }, [code]);

  // Tokens of an older code would show stale text, so they wait for their own code.
  return result?.code === code ? result.tokens : null;
}
