"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cardKeys } from "@/features/start/demos/checkout-payment/api/query-keys";
import { saveCard } from "@/features/start/demos/checkout-payment/api/save-card.api";
import { tokenizeCard } from "@/features/start/demos/checkout-payment/api/tokenize-card";
import type {
  CardFormInput,
  SavedCard,
} from "@/features/start/demos/checkout-payment/schemas/card.schema";

export function useAddCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CardFormInput) => saveCard(await tokenizeCard(input)),
    // With a real API, invalidate `cardKeys.all` instead.
    onSuccess: (saved) =>
      queryClient.setQueryData<SavedCard[]>(cardKeys.all, (cards = []) => [...cards, saved]),
  });
}
