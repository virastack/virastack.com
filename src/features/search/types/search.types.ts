import type { ProductId } from "@/types/product.types";

export type SearchKind = "landing" | "docs";

export type SearchDocument = {
  id: string;
  productId: ProductId;
  href: string;
  title: string;
  description: string;
  body: string;
  kind: SearchKind;
};
