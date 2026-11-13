"use client";

import { useQuery } from "@tanstack/react-query";

import { categoriesQueryOptions } from "@/features/start/demos/products/api/product.queries";
import { useServerData } from "@/features/start/demos/products/hooks/use-server-data";
import type { ProductCategory } from "@/features/start/demos/products/schemas/product.schema";

/** `initial` is the list the server fetched at `updatedAt`; without it, the client asks for it. */
export function useCategories(initial?: ProductCategory[] | null, updatedAt?: number) {
  const options = categoriesQueryOptions();
  useServerData(options.queryKey, initial, updatedAt);

  return useQuery(options);
}
