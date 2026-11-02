"use client";

import { useCards } from "@/features/start/demos/checkout-payment/hooks/use-cards";
import { useCardSelectionStore } from "@/features/start/demos/checkout-payment/stores/card-selection.store";

/** What the module gives the next checkout step: the chosen card, with no card number or CVV. */
export function useCheckoutPayment() {
  const { data: cards = [] } = useCards();
  const selectedId = useCardSelectionStore((state) => state.selectedId);

  return { card: cards.find(({ id }) => id === selectedId) ?? cards[0] ?? null };
}
