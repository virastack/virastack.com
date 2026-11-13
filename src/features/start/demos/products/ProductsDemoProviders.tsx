"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { makeQueryClient } from "@/features/start/demos/users/lib/query-client";

/** What a Start template's layout gives every page, for the products demo's pages. */
export function ProductsDemoProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="bottom-right" closeButton />
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
