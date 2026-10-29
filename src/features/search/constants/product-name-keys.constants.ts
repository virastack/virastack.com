import type { ProductId } from "@/types/product.types";

export const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  address: "addressName",
  guide: "guideName",
} as const satisfies Record<ProductId, string>;
