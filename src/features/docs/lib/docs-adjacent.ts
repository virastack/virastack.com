import type { DocsNavItem, DocsNavSection } from "@/features/docs/types/docs.types";

export function flattenDocsNav(sections: DocsNavSection[]): DocsNavItem[] {
  return sections.flatMap((section) => section.items);
}

/** Prev/next pager skips static external links (e.g. llms.txt). */
export function getDocsAdjacentPages(
  sections: DocsNavSection[],
  slug: string,
): { prev: DocsNavItem | null; next: DocsNavItem | null } {
  const items = flattenDocsNav(sections).filter((item) => !item.external);
  const index = items.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: items[index - 1] ?? null,
    next: items[index + 1] ?? null,
  };
}
