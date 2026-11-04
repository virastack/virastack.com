import { getMessages } from "next-intl/server";

import { buildAcademySearchDocuments } from "@/features/academy/lib/build-academy-search-documents";
import { buildDocsSearchDocuments } from "@/features/docs/lib/build-docs-search-documents";
import { routing } from "@/i18n/routing";

type RouteContext = {
  params: Promise<{ locale: string }>;
};

/**
 * Academy tracks and lessons, and every docs page, for the search palette. They are
 * large, so the client palette fetches them on first open instead of carrying them on
 * every page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return Response.json([
    ...buildAcademySearchDocuments(locale),
    ...buildDocsSearchDocuments(messages, locale),
  ]);
}
