import { useCallback, useSyncExternalStore } from "react";

import { searchDocumentsSchema } from "@/features/search/schemas/search-document.schema";
import type { SearchDocument } from "@/features/search/types/search.types";

const EMPTY: SearchDocument[] = [];

const loaded = new Map<string, SearchDocument[]>();
const pending = new Set<string>();
const listeners = new Set<() => void>();

async function load(locale: string) {
  if (loaded.has(locale) || pending.has(locale)) return;

  pending.add(locale);
  try {
    const response = await fetch(`/api/search/academy/${locale}`);
    if (!response.ok) return;

    const documents = searchDocumentsSchema.safeParse(await response.json());
    if (!documents.success) return;

    loaded.set(locale, documents.data);
    listeners.forEach((listener) => listener());
  } catch {
    // Search keeps working without lessons; the next open tries again.
  } finally {
    pending.delete(locale);
  }
}

/** Academy tracks and lessons; empty until the first fetch for the locale resolves. */
export function useAcademySearchDocuments(locale: string): SearchDocument[] {
  const subscribe = useCallback(
    (listener: () => void) => {
      listeners.add(listener);
      void load(locale);
      return () => {
        listeners.delete(listener);
      };
    },
    [locale],
  );

  return useSyncExternalStore(
    subscribe,
    () => loaded.get(locale) ?? EMPTY,
    () => EMPTY,
  );
}
