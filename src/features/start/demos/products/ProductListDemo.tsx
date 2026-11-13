import type { SearchParams } from "nuqs/server";

import { getInitialProducts } from "@/features/start/demos/products/api/get-initial-products.api";
import { ProductList } from "@/features/start/demos/products/components/ProductList";

/**
 * The products module's list: a copy of `start/registry/products`. It uses the module's optional
 * server step, fetching the first batches for every request, never at build time.
 */
export async function ProductListDemo({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const initialProducts = await getInitialProducts(searchParams);

  // The providers come from the preview layout, shared with the product page.
  return <ProductList initialProducts={initialProducts} />;
}
