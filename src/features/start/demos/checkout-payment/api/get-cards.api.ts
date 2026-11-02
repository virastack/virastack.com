import { DUMMY_CARDS } from "@/features/start/demos/checkout-payment/constants/cards.constants";
import type { SavedCard } from "@/features/start/demos/checkout-payment/schemas/card.schema";

/** No request yet: replace the body with `api.get(CARDS_PATH, { schema })` for your API. */
export async function getCards(): Promise<SavedCard[]> {
  return DUMMY_CARDS;
}
