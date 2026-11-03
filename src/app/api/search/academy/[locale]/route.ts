import { buildAcademySearchDocuments } from "@/features/search/helpers/build-academy-search-documents";
import { routing } from "@/i18n/routing";

type RouteContext = {
  params: Promise<{ locale: string }>;
};

/**
 * Academy tracks and lessons for the search palette. Lessons live on disk, so the
 * client palette fetches this on first open instead of carrying them on every page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { locale } = await params;

  return Response.json(buildAcademySearchDocuments(locale));
}
