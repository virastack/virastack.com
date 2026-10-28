import { notFound } from "next/navigation";

/**
 * Nothing legitimately resolves here: every unmatched path under a locale is a 404.
 * The route sits outside the `(site)` group on purpose, so `not-found.tsx` renders
 * without a streaming boundary above it and the 404 status survives.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function CatchAllPage() {
  notFound();
}
