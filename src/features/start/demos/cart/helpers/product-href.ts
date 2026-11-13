import { PRODUCTS_ROUTE } from "@/features/start/demos/cart/constants/cart.constants";

export function getProductHref(productId: number) {
  return `${PRODUCTS_ROUTE}/${productId}`;
}
