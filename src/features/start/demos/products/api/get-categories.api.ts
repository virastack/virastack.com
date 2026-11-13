import { PRODUCTS_PATH } from "@/features/start/demos/products/constants/products.constants";
import { productCategorySchema } from "@/features/start/demos/products/schemas/product.schema";
import type { ProductCategory } from "@/features/start/demos/products/schemas/product.schema";
import { api } from "@/features/start/demos/users/lib/api";

export function getCategories(signal?: AbortSignal): Promise<ProductCategory[]> {
  return api.get(`${PRODUCTS_PATH}/categories`, { schema: productCategorySchema.array(), signal });
}
