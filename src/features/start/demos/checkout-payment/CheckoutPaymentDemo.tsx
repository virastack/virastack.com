"use client";

import { useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { CheckoutPayment } from "@/features/start/demos/checkout-payment/components/CheckoutPayment";
import { makeQueryClient } from "@/features/start/demos/users/lib/query-client";

/** The live checkout-payment module: a copy of `start/registry/checkout-payment`. */
export function CheckoutPaymentDemo() {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutPayment />
    </QueryClientProvider>
  );
}
