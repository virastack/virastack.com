export type BrandPaletteId = "academy" | "start" | "ai" | "mask" | "password" | "guide";

export type BrandPalette = {
  id: BrandPaletteId;
  /** Product short name shown italic next to ViraStack. */
  productName: string;
  /** Route of the product on virastack.com. */
  href: `/${BrandPaletteId}`;
  /** Tailwind shade shown in naming / colors. */
  shade: string;
  /** Hex of the active brand shade (OG images, color docs). */
  hex: string;
  /** Tailwind `text-*` class used to style the product name. */
  textClass: string;
  /** Active brand swatch `bg-*` / arbitrary class. */
  bgClass: string;
};

/**
 * Ecosystem product colors in canonical order: learn (Academy), build (Start, AI,
 * Mask, Password), then the big picture (Guide). The same order drives the
 * brand page, the product dots, and the intro video.
 */
export const brandPalettes: readonly BrandPalette[] = [
  {
    id: "academy",
    productName: "Academy",
    href: "/academy",
    shade: "green-500",
    hex: "#00c950",
    textClass: "text-green-500",
    bgClass: "bg-green-500",
  },
  {
    id: "start",
    productName: "Start",
    href: "/start",
    shade: "teal-500",
    hex: "#00baa6",
    textClass: "text-teal-500",
    bgClass: "bg-[#00baa6]",
  },
  {
    id: "ai",
    productName: "AI",
    href: "/ai",
    shade: "fuchsia-500",
    hex: "#e131fa",
    textClass: "text-fuchsia-500",
    bgClass: "bg-[#e131fa]",
  },
  {
    id: "mask",
    productName: "Mask",
    href: "/mask",
    shade: "indigo-500",
    hex: "#605efe",
    textClass: "text-indigo-500",
    bgClass: "bg-[#605efe]",
  },
  {
    id: "password",
    productName: "Password",
    href: "/password",
    shade: "rose-500",
    hex: "#ff2056",
    textClass: "text-rose-500",
    bgClass: "bg-[#ff2056]",
  },
  {
    id: "guide",
    productName: "Guide",
    href: "/guide",
    shade: "amber-400",
    hex: "#ffb900",
    textClass: "text-amber-400",
    bgClass: "bg-[#ffb900]",
  },
] as const;
