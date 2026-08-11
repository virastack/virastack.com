"use client";

import { useTranslations } from "next-intl";

import type { Product } from "@/types/product.types";
import {
  getProductSubNavItems,
  isProductSubNavItemActive,
  type ProductSubNavId,
} from "@/config/product-subnav.config";

import { cn } from "@/lib/utils";

import { Link, usePathname } from "@/i18n/routing";

const subNavLabelKeys = {
  home: "subNavHome",
  getStarted: "subNavGetStarted",
  examples: "subNavExamples",
  builder: "subNavBuilder",
} as const satisfies Record<ProductSubNavId, string>;

type ProductSubHeaderProps = {
  product: Product;
};

export function ProductSubHeader({ product }: ProductSubHeaderProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const items = getProductSubNavItems(product);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-border/80">
      <div className="mx-auto flex h-11 max-w-7xl items-center px-4 sm:px-6">
        <nav
          className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto"
          aria-label={t("subNav")}
        >
          {items.map((item) => {
            const active = isProductSubNavItemActive(pathname, item);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "inline-flex h-8 shrink-0 items-center rounded-md px-2.5 text-sm text-foreground/80 transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  active && "bg-muted font-medium text-foreground",
                )}
              >
                {t(subNavLabelKeys[item.id])}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
