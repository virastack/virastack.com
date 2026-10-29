import { getTranslations } from "next-intl/server";

import type { ProductId } from "@/types/product.types";
import { siteConfig } from "@/config/site.config";

type DocsTitleKind = "page" | "introduction" | "example";

const productTitleKeys = {
  start: "productStart",
  ai: "productAi",
  mask: "productMask",
  password: "productPassword",
  address: "productAddress",
  guide: "productGuide",
} as const satisfies Record<ProductId, string>;

/** Product page `<title>`: the lockup and what the product does, e.g. "ViraStack Mask: Input masks for React Hook Form". */
export async function getProductSeoName(locale: string, product: ProductId): Promise<string> {
  const t = await getTranslations({ locale, namespace: "Seo" });

  return t(productTitleKeys[product]);
}

/**
 * Absolute `<title>` for docs and example pages: the page name, then the product
 * lockup (plus the version on archived docs). The keyword sentence stays on the
 * product page, so docs pages do not all repeat it. Callers return this as
 * `absolute`, since the root `%s · ViraStack` template would repeat the brand.
 */
export async function buildDocsSeoTitle({
  locale,
  productLabel,
  pageTitle,
  kind = "page",
  versionLabel,
}: {
  locale: string;
  /** Short product name, e.g. "Mask". */
  productLabel: string;
  pageTitle: string;
  kind?: DocsTitleKind;
  /** Only for archived docs, e.g. "v1.1". */
  versionLabel?: string;
}): Promise<string> {
  const t = await getTranslations({ locale, namespace: "Seo" });
  const lockup = [siteConfig.name, productLabel, versionLabel].filter(Boolean).join(" ");

  switch (kind) {
    case "introduction":
      return t("docsTitle", { product: lockup });
    case "example":
      return `${pageTitle} · ${t("examples")} · ${lockup}`;
    case "page":
      return `${pageTitle} · ${lockup}`;
  }
}
