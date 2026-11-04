import type { z } from "zod";

import type {
  SEARCH_KINDS,
  SEARCH_SECTION_IDS,
  searchDocumentSchema,
} from "@/schemas/search-document.schema";

export type SearchSectionId = (typeof SEARCH_SECTION_IDS)[number];

export type SearchKind = (typeof SEARCH_KINDS)[number];

export type SearchDocument = z.infer<typeof searchDocumentSchema>;
