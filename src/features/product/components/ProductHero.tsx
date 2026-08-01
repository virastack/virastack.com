"use client";

import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Product } from "@/types/product.types";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { NpxInstallCommand } from "@/components/shared/NpxInstallCommand";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const;

const productDescKeys = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  guide: "guideDesc",
} as const;

type ProductHeroProps = {
  product: Product;
};

export function ProductHero({ product }: ProductHeroProps) {
  const t = useTranslations("Products");
  const primary =
    product.id === "guide"
      ? { href: "/guide/play" as const, label: t("startExperience") }
      : product.id === "ai"
        ? { href: "#demo" as const, label: t("seeTheDemo") }
        : { href: `${product.href}/docs` as const, label: t("readTheDocs") };
  const heroPadding =
    product.id === "ai" ||
    product.id === "mask" ||
    product.id === "password" ||
    product.id === "guide"
      ? "pt-36 pb-16"
      : "pt-36 pb-28";

  return (
    <section
      className={cn(
        "mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center",
        heroPadding,
      )}
    >
      <h1 className="mb-2 text-center text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
        <span className="font-black text-primary">{siteConfig.name}</span>{" "}
        <span className={cn("font-medium italic", product.colorClass)}>
          {t(productNameKeys[product.id])}
        </span>
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
        {t.rich(productDescKeys[product.id], {
          bold: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
          italic: (chunks) => <em className="italic">{chunks}</em>,
        })}
      </p>

      <Reveal
        mode="mount"
        delay={0.1}
        className={cn(
          "mt-2 flex items-center justify-center",
          product.id === "start" ? "flex-col gap-4" : "flex-wrap gap-2",
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            size="lg"
            nativeButton={false}
            render={
              primary.href.startsWith("#") ? (
                <a href={primary.href} />
              ) : (
                <Link href={primary.href} />
              )
            }
          >
            <span>{primary.label}</span>
            <ChevronRightIcon
              data-icon="inline-end"
              className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
            />
          </Button>
          <GithubRepoButton href={product.github} label={`virastack/${product.id}`} />
        </div>

        {product.id === "start" ? <NpxInstallCommand /> : null}
      </Reveal>
    </section>
  );
}
