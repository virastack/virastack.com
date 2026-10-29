import { ecosystem, type EcosystemId } from "@/config/ecosystem.config";

export type BrandPaletteId = EcosystemId;

export type BrandPalette = {
  id: BrandPaletteId;
  /** Product short name shown bold next to ViraStack. */
  productName: string;
  /** Route of the product on virastack.com. */
  href: `/${BrandPaletteId}`;
  /** Tailwind shade of the fixed swatch, shown in naming / colors. */
  shade: string;
  /** Tailwind shade used for text and icons on a light background. */
  lightShade: string;
  /** Tailwind shade used for text and icons on a dark background. */
  darkShade: string;
  /** Hex of the active brand shade (dots, glows, OG images, READMEs). */
  hex: string;
  /** Readable hex for text and icons on a light background. */
  lightHex: string;
  /** Readable hex for text and icons on a dark background. */
  darkHex: string;
  /** Adaptive `text-*` class (light/dark aware) used to style the product name. */
  textClass: string;
  /** Fixed brand swatch `bg-*` class (same in both themes). */
  bgClass: string;
};

/**
 * Written out in full: Tailwind only generates classes it finds as literal strings, so a
 * template like `bg-brand-${id}-solid` would leave the swatches without a background.
 */
const BRAND_CLASSES = {
  academy: { textClass: "text-brand-academy", bgClass: "bg-brand-academy-solid" },
  start: { textClass: "text-brand-start", bgClass: "bg-brand-start-solid" },
  ai: { textClass: "text-brand-ai", bgClass: "bg-brand-ai-solid" },
  mask: { textClass: "text-brand-mask", bgClass: "bg-brand-mask-solid" },
  password: { textClass: "text-brand-password", bgClass: "bg-brand-password-solid" },
  address: { textClass: "text-brand-address", bgClass: "bg-brand-address-solid" },
  guide: { textClass: "text-brand-guide", bgClass: "bg-brand-guide-solid" },
} as const satisfies Record<EcosystemId, Pick<BrandPalette, "textClass" | "bgClass">>;

/**
 * Product colors, derived from `ecosystem.config.ts` (the single source of truth). Hex
 * values become CSS variables (`--brand-<id>`, `--brand-<id>-solid`) through
 * `brandColorsCss`, which Tailwind exposes as `text-brand-<id>` / `bg-brand-<id>-solid`.
 */
export const brandPalettes: readonly BrandPalette[] = ecosystem.map((entry) => ({
  id: entry.id,
  productName: entry.name,
  href: entry.href,
  ...entry.color,
  ...BRAND_CLASSES[entry.id],
}));

/**
 * ViraStack's own turquoise (from Turkuaz CSS). It colors the logo mark only: the
 * wordmark stays neutral and no product may use this hue.
 */
export const virastackColor = {
  id: "virastack",
  shade: "teal-500",
  lightShade: "teal-600",
  darkShade: "teal-500",
  hex: "#00baa6",
  lightHex: "#009689",
  darkHex: "#00baa6",
  textClass: "text-brand-virastack",
  bgClass: "bg-brand-virastack-solid",
} as const;

export function getBrandPalette(id: BrandPaletteId): BrandPalette {
  const palette = brandPalettes.find((item) => item.id === id);
  if (!palette) {
    throw new Error(`Unknown brand palette: ${id}`);
  }
  return palette;
}

/** CSS custom properties for every product color; injected once in the root layout. */
const brandColors = [...brandPalettes, virastackColor];

export const brandColorsCss = [
  `:root{${brandColors.map((p) => `--brand-${p.id}:${p.lightHex};--brand-${p.id}-solid:${p.hex};`).join("")}}`,
  `.dark{${brandColors.map((p) => `--brand-${p.id}:${p.darkHex};`).join("")}}`,
].join("");
