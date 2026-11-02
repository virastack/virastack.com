"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { QueryClientProvider } from "@tanstack/react-query";

import { makeQueryClient } from "@/features/start/demos/users/lib/query-client";
import { Skeleton } from "@/features/start/demos/users/ui/skeleton";

// Client only, so the site's first load does not carry the address data.
const CheckoutAddress = dynamic(
  () =>
    import("@/features/start/demos/checkout-address/components/CheckoutAddress").then(
      (module) => module.CheckoutAddress,
    ),
  { ssr: false, loading: () => <Skeleton className="h-64 w-full" /> },
);

/** The live checkout-address module: a copy of `start/registry/checkout-address`. */
export function CheckoutAddressDemo() {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutAddress />
    </QueryClientProvider>
  );
}
