import { getInitialProduct } from "@/features/start/demos/products/api/get-initial-product.api";
import { ProductDetail } from "@/features/start/demos/products/components/ProductDetail";

/** The products module's product page, opened from the list demo's cards. */
export async function ProductDetailDemo({ params }: { params: Promise<{ id: string }> }) {
  const initialProduct = await getInitialProduct(params);

  return <ProductDetail initialProduct={initialProduct} />;
}
