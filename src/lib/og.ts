import type { Metadata } from "next";

import type { ProductId } from "@/types/product.types";
import { isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { brandPalettes } from "@/features/brand/brand-colors";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLORS = {
  background: "#f7f7f2",
  foreground: "#161616",
  muted: "#6b6b6b",
  brandBar: "#161616",
} as const;

export type OgImageParams = {
  /** Page / product headline shown large (e.g. "Start", "About"). */
  title?: string;
  description?: string;
  /** Product accent + italic product name under ViraStack. */
  product?: ProductId;
  /** Footer path after virastack.com (e.g. "/start"). */
  path?: string;
};

export function getOgAccent(product?: string | null): string {
  if (!product || !isProductId(product)) {
    return OG_COLORS.brandBar;
  }

  const palette = brandPalettes.find((item) => item.id === product);
  return palette?.hex ?? OG_COLORS.brandBar;
}

export function getOgProductName(product?: string | null): string | null {
  if (!product || !isProductId(product)) {
    return null;
  }

  return brandPalettes.find((item) => item.id === product)?.productName ?? null;
}

/** Relative OG image URL resolved via `metadataBase`. */
export function buildOgImagePath(params: OgImageParams = {}): string {
  const search = new URLSearchParams();

  if (params.title) search.set("title", params.title);
  if (params.description) search.set("description", params.description);
  if (params.product) search.set("product", params.product);
  if (params.path) search.set("path", params.path);

  const query = search.toString();
  return query ? `/og?${query}` : "/og";
}

export function buildOgImages(
  params: OgImageParams = {},
  alt = siteConfig.name,
): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
  return [
    {
      url: buildOgImagePath(params),
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      alt,
    },
  ];
}

/** Open Graph + Twitter image fields for page metadata. */
export function buildOgImageMetadata(
  params: OgImageParams = {},
): Pick<Metadata, "openGraph" | "twitter"> {
  const images = buildOgImages(params);
  const twitterImage = buildOgImagePath(params);

  return {
    openGraph: { images },
    twitter: { images: [twitterImage] },
  };
}
