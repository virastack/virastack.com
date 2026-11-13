import type { ProductsFilters } from "@/features/start/demos/products/schemas/product-list-params.schema";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductsFilters) => [...productKeys.lists(), filters] as const,
  categories: () => [...productKeys.all, "categories"] as const,
  detail: (id: number) => [...productKeys.all, "detail", id] as const,
};
