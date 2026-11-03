import { getBrandPalette } from "@/config/brand-palettes.config";
import { products } from "@/config/products.config";

import type { SearchSectionId } from "@/features/search/types/search.types";

export const sectionNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  address: "addressName",
  guide: "guideName",
  academy: "academyName",
} as const satisfies Record<SearchSectionId, string>;

type SearchSection = { id: SearchSectionId; colorClass: string };

/** Result order. */
export const searchSections: readonly SearchSection[] = [
  { id: "academy", colorClass: getBrandPalette("academy").textClass },
  ...products.map(({ id, colorClass }) => ({ id, colorClass })),
];

/** Filter chips: Guide has only two results, too few to earn one. */
export const searchFilterSections: readonly SearchSection[] = searchSections.filter(
  (section) => section.id !== "guide",
);
