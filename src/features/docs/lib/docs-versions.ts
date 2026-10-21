import type { DocsProductConfig } from "@/features/docs/config/docs-products";
import { docsPagePath } from "@/features/docs/lib/docs-github-issue";

export type DocsVersionLink = {
  id: string;
  label: string;
  latest: boolean;
  href: string;
};

/**
 * Per-version links for the selector: same page in the target version when it exists,
 * otherwise that version's index.
 */
export function getDocsVersionLinks(docs: DocsProductConfig, slug: string): DocsVersionLink[] {
  return docs.versions.map((version) => {
    const content = version.latest ? docs : docs.archives[version.id];
    const href = content?.isSlug(slug) ? docsPagePath(content.indexHref, slug) : content?.indexHref;

    return {
      id: version.id,
      label: version.label,
      latest: version.latest,
      href: href ?? docs.indexHref,
    };
  });
}
