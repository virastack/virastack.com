import type { Product, ProductId } from "@/types/product.types";

/**
 * ViraStack ecosystem products: brand colors and paths from VIRASTACK_ARCHITECTURE.md §4.1.
 */
export const products: readonly Product[] = [
  {
    id: "start",
    href: "/start",
    github: "https://github.com/virastack/start",
    colorClass: "text-teal-500",
  },
  {
    id: "ai",
    href: "/ai",
    github: "https://github.com/virastack/ai",
    colorClass: "text-fuchsia-500",
  },
  {
    id: "mask",
    href: "/mask",
    github: "https://github.com/virastack/mask",
    colorClass: "text-indigo-500",
  },
  {
    id: "password",
    href: "/password",
    github: "https://github.com/virastack/password",
    colorClass: "text-rose-500",
  },
  {
    id: "guide",
    href: "/guide",
    github: "https://github.com/virastack/guide",
    colorClass: "text-amber-400",
  },
] as const;

const productIds = new Set<string>(products.map((product) => product.id));

export function isProductId(value: string): value is ProductId {
  return productIds.has(value);
}

export function getProduct(id: ProductId): Product {
  const product = products.find((item) => item.id === id);
  if (!product) {
    throw new Error(`Unknown product: ${id}`);
  }
  return product;
}

/** Resolves the ecosystem product for `/mask`, `/mask/docs`, etc. */
export function getProductByPathname(pathname: string): Product | undefined {
  return products.find(
    (product) => pathname === product.href || pathname.startsWith(`${product.href}/`),
  );
}
