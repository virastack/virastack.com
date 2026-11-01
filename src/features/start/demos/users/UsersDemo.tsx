"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { FavoritesCount } from "@/features/start/demos/users/components/FavoritesCount";
import { UsersDirectorySkeleton } from "@/features/start/demos/users/components/UsersDirectorySkeleton";
import { makeQueryClient } from "@/features/start/demos/users/lib/query-client";

// Client only, so the site's build never calls DummyJSON.
const UsersDirectory = dynamic(
  () =>
    import("@/features/start/demos/users/components/UsersDirectory").then(
      (module) => module.UsersDirectory,
    ),
  { ssr: false, loading: () => <UsersDirectorySkeleton /> },
);

/** The live users module: a copy of `start/registry/users`, shown without the template's page. */
export function UsersDemo() {
  const [queryClient] = useState(makeQueryClient);

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <FavoritesCount />
          </div>
          <UsersDirectory />
        </div>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
