import type { Product, ProductId } from "@/types/product.types";

export type ProductSubNavId = "home" | "getStarted" | "examples" | "builder";

export type ProductSubNavItem = {
  id: ProductSubNavId;
  href: string;
};

const docsProductIds = new Set<ProductId>(["start", "ai", "mask", "password"]);

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

  if (item.id === "examples" || item.id === "builder") {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  return false;
}
