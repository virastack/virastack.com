import { CARDS_PATH } from "@/features/start/demos/checkout-card/constants/cards.constants";
import { savedCardResponseSchema } from "@/features/start/demos/checkout-card/schemas/card.schema";
import type { SavedCard } from "@/features/start/demos/checkout-card/schemas/card.schema";
import { api } from "@/features/start/demos/users/lib/api";

/**
 * Sends the token and display details only. The request is real, but DummyJSON only answers
 * 201 Created, so the result is built here. iyzico answers with the stored card, bank name
 * included; with your API, return its answer.
 */
export async function saveCard(card: Omit<SavedCard, "cardBankName">): Promise<SavedCard> {
  await api.post(CARDS_PATH, card, { schema: savedCardResponseSchema });

  return { ...card, cardBankName: null };
}
