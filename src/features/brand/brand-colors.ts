export type BrandPalette = {
  id: string;
  /** Product short name shown italic next to ViraStack, or null for core brand. */
  productName: string | null;
  /** Tailwind shade or light-mode hex shown in naming / colors. */
  shade: string;
  /** Hex for product colors; null for primary (uses shade + darkHex). */
  hex: string | null;
  /** Dark-theme hex for primary. */
  darkHex: string | null;
  /** Tailwind `text-*` class used to style the product name. */
  textClass: string;
  /** Active brand swatch `bg-*` / arbitrary class. */
  bgClass: string;
};

export const brandPalettes: readonly BrandPalette[] = [
  {
    id: "virastack",
    productName: null,
    shade: "#161616",
    hex: null,
    darkHex: "#e5e5e5",
    textClass: "text-primary",
    bgClass: "bg-primary",
  },
  {
    id: "start",
    productName: "Start",
    shade: "teal-500",
    hex: "#00baa6",
    darkHex: null,
    textClass: "text-teal-500",
    bgClass: "bg-[#00baa6]",
  },
  {
    id: "ai",
    productName: "AI",
    shade: "fuchsia-500",
    hex: "#e131fa",
    darkHex: null,
    textClass: "text-fuchsia-500",
    bgClass: "bg-[#e131fa]",
  },
  {
    id: "mask",
    productName: "Mask",
    shade: "indigo-500",
    hex: "#605efe",
    darkHex: null,
    textClass: "text-indigo-500",
    bgClass: "bg-[#605efe]",
  },
  {
    id: "password",
    productName: "Password",
    shade: "rose-500",
    hex: "#ff2056",
    darkHex: null,
    textClass: "text-rose-500",
    bgClass: "bg-[#ff2056]",
  },
  {
    id: "guide",
    productName: "Guide",
    shade: "amber-400",
    hex: "#ffb900",
    darkHex: null,
    textClass: "text-amber-400",
    bgClass: "bg-[#ffb900]",
  },
] as const;
