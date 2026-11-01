import type { Product, ProductId } from "@/types/product.types";

/** Stays out of production until `virastack add` ships with Start 2.1.0. */
export const isFeatureCatalogLive = process.env.NODE_ENV !== "production";

export type ProductSubNavId = "home" | "getStarted" | "examples" | "builder" | "features";

export type ProductSubNavItem = {
  id: ProductSubNavId;
  href: string;
  /** Shows the "new" badge. A launch marker: remove it about a month after launch. */
  isNew?: boolean;
};

const docsProductIds = new Set<ProductId>(["start", "ai", "mask", "password", "address"]);

export function getProductSubNavItems(product: Product): ProductSubNavItem[] {
  if (product.id === "guide") {
    return [];
  }

  const items: ProductSubNavItem[] = [{ id: "home", href: product.href }];

  if (docsProductIds.has(product.id)) {
    items.push({ id: "getStarted", href: `${product.href}/docs` });
  }

  if (product.id === "mask" || product.id === "password") {
    items.push({ id: "examples", href: `${product.href}/examples` });
  } else if (product.id === "start") {
    items.push({ id: "builder", href: "/start/builder" });
    if (isFeatureCatalogLive) {
      items.push({ id: "features", href: "/start/features", isNew: true });
    }
  }

  return items;
}

export function isProductSubNavItemActive(pathname: string, item: ProductSubNavItem): boolean {
  if (item.id === "home") {
    return pathname === item.href;
  }

  if (item.id === "getStarted") {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  if (item.id === "examples" || item.id === "builder" || item.id === "features") {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  return false;
}
