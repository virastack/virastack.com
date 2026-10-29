import type { Product, ProductId } from "@/types/product.types";
import { getBrandPalette } from "@/config/brand-palettes.config";
import { ecosystem } from "@/config/ecosystem.config";

/** Ecosystem products (Academy is a site section, not a product), from `ecosystem.config.ts`. */
export const products: readonly Product[] = ecosystem
  .filter((entry): entry is typeof entry & { id: ProductId } => entry.id !== "academy")
  .map((entry) => ({
    id: entry.id,
    href: entry.href as Product["href"],
    github: entry.github,
    colorClass: getBrandPalette(entry.id).textClass,
  }));

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
