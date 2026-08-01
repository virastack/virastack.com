import { getTranslations } from "next-intl/server";

import type { ProductId } from "@/types/product.types";
import { products } from "@/config/products.config";
import { siteNavLinks } from "@/config/site-nav.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { GithubIcon, XLogo } from "@/components/icons";
import { Link } from "@/i18n/routing";

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const satisfies Record<ProductId, string>;

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Navigation");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/30 md:mt-[120px]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-fit text-lg leading-none font-black tracking-tight text-primary"
          >
            {siteConfig.brandMark}
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("tagline")}</p>
          <div className="mt-2 flex items-center gap-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label={t("github")}
            >
              <GithubIcon className="size-3.5" />
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label={t("twitter")}
            >
              <XLogo className="size-3.5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t("products")}
          </h2>
          <ul className="flex flex-col gap-2">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={product.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  <span className="font-medium">{siteConfig.name}</span>{" "}
                  <span className={cn("font-medium italic", product.colorClass)}>
                    {t(productNameKeys[product.id])}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t("explore")}
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-foreground/80">
            {siteNavLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p suppressHydrationWarning>{t("copyright", { year, brand: siteConfig.name })}</p>
          <p>{t("license")}</p>
        </div>
      </div>
    </footer>
  );
}
