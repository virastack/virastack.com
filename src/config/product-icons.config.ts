import type { LucideIcon } from "lucide-react";

import type { BrandPaletteId } from "@/config/brand-palettes.config";
import { ecosystem } from "@/config/ecosystem.config";

import { fromEntries } from "@/lib/object";

/** Product icons (header menu, search, ecosystem cards), derived from `ecosystem.config.ts`. */
export const productIcons: Record<BrandPaletteId, LucideIcon> = fromEntries(
  ecosystem.map((entry) => [entry.id, entry.icon]),
);

/** Lucide icon slugs (`https://lucide.dev/icons/<slug>`). */
export const productIconSlugs: Record<BrandPaletteId, string> = fromEntries(
  ecosystem.map((entry) => [entry.id, entry.iconSlug]),
);
