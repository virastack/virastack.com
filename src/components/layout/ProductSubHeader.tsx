"use client";

import { useTranslations } from "next-intl";

import type { Product } from "@/types/product.types";
import {
  getProductSubNavItems,
  isProductSubNavItemActive,
  type ProductSubNavId,
} from "@/config/product-subnav.config";

import { SectionSubHeader } from "@/components/layout/SectionSubHeader";
import { usePathname } from "@/i18n/routing";

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

  return (
    <SectionSubHeader
      ariaLabel={t("subNav")}
      items={items.map((item) => ({
        id: item.id,
        href: item.href,
        label: t(subNavLabelKeys[item.id]),
        active: isProductSubNavItemActive(pathname, item),
      }))}
    />
  );
}
