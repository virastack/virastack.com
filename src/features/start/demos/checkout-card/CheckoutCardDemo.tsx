"use client";

import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { CheckoutCard } from "@/features/start/demos/checkout-card/components/CheckoutCard";
import { makeQueryClient } from "@/features/start/demos/users/lib/query-client";

/** The live checkout-card module: a copy of `start/registry/checkout-card`. */
export function CheckoutCardDemo() {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutCard />
    </QueryClientProvider>
  );
}
