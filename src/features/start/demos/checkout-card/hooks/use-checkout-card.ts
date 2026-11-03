"use client";

import { useCards } from "@/features/start/demos/checkout-card/hooks/use-cards";
import { useCardSelectionStore } from "@/features/start/demos/checkout-card/stores/card-selection.store";

/** What the module gives the next checkout step: the chosen card, with no card number or CVV. */
export function useCheckoutCard() {
  const { data: cards = [] } = useCards();
  const selectedToken = useCardSelectionStore((state) => state.selectedToken);

  return { card: cards.find(({ cardToken }) => cardToken === selectedToken) ?? cards[0] ?? null };
}
