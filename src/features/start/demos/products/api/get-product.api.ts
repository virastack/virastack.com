import { PRODUCTS_PATH } from "@/features/start/demos/products/constants/products.constants";
import { productDetailsSchema } from "@/features/start/demos/products/schemas/product.schema";
import type { ProductDetails } from "@/features/start/demos/products/schemas/product.schema";
import { api } from "@/features/start/demos/users/lib/api";

export function getProduct(id: number, signal?: AbortSignal): Promise<ProductDetails> {
  return api.get(`${PRODUCTS_PATH}/${id}`, { schema: productDetailsSchema, signal });
}
