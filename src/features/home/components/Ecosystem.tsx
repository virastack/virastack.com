import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ProductId } from "@/types/product.types";
import { products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { featureCardChevronClassName, featureCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Link } from "@/i18n/routing";

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const satisfies Record<ProductId, string>;

const productDescKeys = {
  start: "ecosystemStartDesc",
  ai: "ecosystemAiDesc",
  mask: "ecosystemMaskDesc",
  password: "ecosystemPasswordDesc",
  guide: "ecosystemGuideDesc",
} as const satisfies Record<ProductId, string>;

export function Ecosystem() {
  const t = useTranslations("Home");
  const tNav = useTranslations("Navigation");

  const [start, ...rest] = products;

  return (
    <section id="ecosystem" className="mx-auto max-w-5xl px-6 py-16">
      <RevealGroup className="mb-16 text-center">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            {t("ecosystemTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-balance text-muted-foreground">
            {t("ecosystemDesc")}
          </p>
        </RevealItem>
      </RevealGroup>

      <div className="flex flex-col gap-6">
        {start ? (
          <RevealGroup>
            <RevealItem>
              <Link
                href={start.href}
                className={cn(
                  featureCardClassName,
                  "h-full transition-colors hover:bg-accent/30 sm:flex-row sm:items-center sm:justify-between sm:gap-8",
                )}
              >
                <div className="flex min-w-0 flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 md:gap-3">
                    <h3 className="text-base font-semibold text-balance md:text-xl">
                      <span className="text-foreground">{siteConfig.name}</span>{" "}
                      <span className={cn("font-medium italic", start.colorClass)}>
                        {tNav(productNameKeys.start)}
                      </span>
                    </h3>
                    <ChevronRight
                      className={cn(featureCardChevronClassName, "sm:hidden")}
                      aria-hidden
                    />
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
                    {t(productDescKeys.start)}
                  </p>
                </div>
                <ChevronRight
                  className={cn(featureCardChevronClassName, "hidden sm:block")}
                  aria-hidden
                />
              </Link>
            </RevealItem>
          </RevealGroup>
        ) : null}

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest.map((product) => (
            <RevealItem key={product.id}>
              <Link
                href={product.href}
                className={cn(featureCardClassName, "h-full transition-colors hover:bg-accent/30")}
              >
                <div className="flex items-center justify-between gap-2 md:gap-3">
                  <h3 className="text-base font-semibold text-balance md:text-lg">
                    <span className="text-foreground">{siteConfig.name}</span>{" "}
                    <span className={cn("font-medium italic", product.colorClass)}>
                      {tNav(productNameKeys[product.id])}
                    </span>
                  </h3>
                  <ChevronRight className={featureCardChevronClassName} aria-hidden />
                </div>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {t(productDescKeys[product.id])}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
