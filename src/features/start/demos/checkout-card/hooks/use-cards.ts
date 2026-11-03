"use client";

import { useQuery } from "@tanstack/react-query";

import { cardsQueryOptions } from "@/features/start/demos/checkout-card/api/card.queries";

export function useCards() {
  return useQuery(cardsQueryOptions);
}
