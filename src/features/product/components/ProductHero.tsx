"use client";

import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Product } from "@/types/product.types";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { NpxInstallCommand } from "@/components/shared/NpxInstallCommand";
import { Reveal } from "@/components/shared/Reveal";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
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

const AI_INSTALL_COMMAND = "npx @virastack/ai init";

type ProductHeroProps = {
  product: Product;
};

export function ProductHero({ product }: ProductHeroProps) {
  const t = useTranslations("Products");
  const tAi = useTranslations("Ai");
  const primary =
    product.id === "guide"
      ? { href: "/guide/play" as const, label: t("startExperience") }
      : { href: `${product.href}/docs` as const, label: t("readTheDocs") };
  const showInstallCommand = product.id === "start" || product.id === "ai";

  return (
    <section
      className={cn(
        "mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center",
        showInstallCommand ? "pt-36 pb-28" : "pt-36 pb-16",
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
          showInstallCommand ? "flex-col gap-4" : "flex-wrap gap-2",
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
        {product.id === "ai" ? (
          <>
            <NpxInstallCommand command={AI_INSTALL_COMMAND} />
            <p className="max-w-md text-sm leading-relaxed text-balance text-muted-foreground">
              {tAi.rich("heroNewProject", {
                start: (chunks) => (
                  <GuideProductMark id="start" linked>
                    {chunks}
                  </GuideProductMark>
                ),
              })}
            </p>
          </>
        ) : null}
      </Reveal>
    </section>
  );
}
