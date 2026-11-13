import { CART_PATH } from "@/features/start/demos/cart/constants/cart.constants";
import { withTotals } from "@/features/start/demos/cart/helpers/cart-totals";
import { cartResponseSchema } from "@/features/start/demos/cart/schemas/cart.schema";
import type { Cart } from "@/features/start/demos/cart/schemas/cart.schema";
import { api } from "@/features/start/demos/users/lib/api";

export async function getCart(signal?: AbortSignal): Promise<Cart> {
  const cart = await api.get(CART_PATH, { schema: cartResponseSchema, signal });
  // DummyJSON has no coupons and no cart totals. Your API sends both with the cart.
  return withTotals({ ...cart, coupon: null });
}
