"use client";

import type { ReactNode } from "react";

import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Product } from "@/types/product.types";

import { parseGithubLink } from "@/lib/github";
import { cn } from "@/lib/utils";

import { BrandLockup } from "@/components/shared/BrandLockup";
import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { NpxInstallCommand } from "@/components/shared/NpxInstallCommand";
import { Reveal } from "@/components/shared/Reveal";
import { TurkeyOnlyNotice } from "@/components/shared/TurkeyOnlyNotice";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  address: "addressName",
  guide: "guideName",
} as const;

const productDescKeys = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  address: "addressDesc",
  guide: "guideDesc",
} as const;

/** Copy-to-clipboard line under the hero buttons; Guide has nothing to install. */
const installCommands: Partial<Record<Product["id"], string>> = {
  start: "npx virastack@latest",
  ai: "npx @virastack/ai init",
  mask: "npm install @virastack/mask",
  password: "npm install @virastack/password",
  address: "npm install @virastack/address",
};

type ProductHeroProps = {
  product: Product;
  /** Live demo of the product, set beside the copy from `lg` up. */
  aside?: ReactNode;
};

export function ProductHero({ product, aside }: ProductHeroProps) {
  const t = useTranslations("Products");
  const tAi = useTranslations("Ai");
  const primary =
    product.id === "guide"
      ? { href: "/guide/play" as const, label: t("startExperience") }
      : { href: `${product.href}/docs` as const, label: t("readTheDocs") };
  const installCommand = installCommands[product.id];
  const github = parseGithubLink(product.github);

  const copy = (
    <div
      className={cn(
        "flex flex-col gap-6",
        aside ? "items-center text-center lg:items-start lg:text-left" : "items-center",
      )}
    >
      <BrandLockup
        nameScale={aside ? 0.8 : undefined}
        alignClassName={aside ? "items-center lg:items-start" : "items-center"}
      >
        <span className={product.colorClass}>{t(productNameKeys[product.id])}</span>
      </BrandLockup>

      <p className="max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
        {t.rich(productDescKeys[product.id], {
          bold: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
          italic: (chunks) => <em className="italic">{chunks}</em>,
        })}
      </p>

      {product.id === "address" ? <TurkeyOnlyNotice variant="inline" /> : null}

      <Reveal
        mode="mount"
        delay={0.1}
        className={cn(
          "mt-2 flex gap-4",
          installCommand ? "flex-col" : "flex-wrap",
          aside ? "items-center lg:items-start" : "items-center",
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-2",
            aside ? "justify-center lg:justify-start" : "justify-center",
          )}
        >
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
          <GithubRepoButton
            href={product.github}
            label={github.pkg ? `${github.slug.split("/")[0]}/${github.pkg}` : github.slug}
          />
        </div>

        {installCommand ? <NpxInstallCommand command={installCommand} /> : null}

        {product.id === "ai" ? (
          <p className="max-w-md text-sm leading-relaxed text-balance text-muted-foreground">
            {tAi.rich("heroNewProject", {
              start: (chunks) => (
                <GuideProductMark id="start" linked>
                  {chunks}
                </GuideProductMark>
              ),
            })}
          </p>
        ) : null}
      </Reveal>
    </div>
  );

  if (!aside) {
    return (
      <section
        className={cn(
          "mx-auto max-w-3xl px-6 text-center",
          installCommand ? "pt-36 pb-28" : "pt-36 pb-16",
        )}
      >
        {copy}
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pt-32 pb-16">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-14">
        {copy}
        <div className="w-full">{aside}</div>
      </div>
    </section>
  );
}
