import { z } from "zod";

/** Products plus Academy, which is a site section rather than a product. */
export const SEARCH_SECTION_IDS = [
  "academy",
  "start",
  "ai",
  "mask",
  "password",
  "address",
  "guide",
] as const;

export const SEARCH_KINDS = ["landing", "docs", "track", "lesson", "project"] as const;

export const searchDocumentSchema = z.object({
  id: z.string(),
  sectionId: z.enum(SEARCH_SECTION_IDS),
  href: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  kind: z.enum(SEARCH_KINDS),
});

/** Academy tracks, lessons and docs pages from `/api/search/[locale]`. */
export const searchDocumentsSchema = z.array(searchDocumentSchema);
