import type { LucideIcon } from "lucide-react";

import type { BrandPaletteId } from "@/config/brand-palettes.config";
import { ecosystem } from "@/config/ecosystem.config";

/** Product icons (header menu, search, ecosystem cards), derived from `ecosystem.config.ts`. */
export const productIcons = Object.fromEntries(
  ecosystem.map((entry) => [entry.id, entry.icon]),
) as Record<BrandPaletteId, LucideIcon>;

/** Lucide icon slugs (`https://lucide.dev/icons/<slug>`). */
export const productIconSlugs = Object.fromEntries(
  ecosystem.map((entry) => [entry.id, entry.iconSlug]),
) as Record<BrandPaletteId, string>;
