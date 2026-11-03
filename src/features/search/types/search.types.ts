import type { ProductId } from "@/types/product.types";

/** Products plus Academy, which is a site section rather than a product. */
export type SearchSectionId = ProductId | "academy";

export type SearchKind = "landing" | "docs" | "track" | "lesson" | "project";

export type SearchDocument = {
  id: string;
  sectionId: SearchSectionId;
  href: string;
  title: string;
  description: string;
  body: string;
  kind: SearchKind;
};
