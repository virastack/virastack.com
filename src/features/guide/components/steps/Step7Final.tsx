"use client";

import { useEffect, useState } from "react";

import { ChevronRightIcon, PartyPopperIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Confetti from "react-confetti";
import { createPortal } from "react-dom";
import { useWindowSize } from "usehooks-ts";

import type { ProductId } from "@/types/product.types";
import { brandPalettes } from "@/config/brand-palettes.config";
import { siteConfig } from "@/config/site.config";

import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

const CONFETTI_COLORS = brandPalettes.map((palette) => palette.hex);

const ECOSYSTEM_PRODUCTS = [
  "start",
  "ai",
  "mask",
  "password",
  "address",
] as const satisfies readonly ProductId[];

const PRODUCT_NAME_KEYS = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  address: "addressName",
} as const;

const PRODUCT_DESC_KEYS = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  address: "addressDesc",
} as const;

export function Step7Final() {
  const t = useTranslations("Guide");
  const tNav = useTranslations("Navigation");
  const tAcademy = useTranslations("Academy");
  const { width = 0, height = 0 } = useWindowSize({ initializeWithValue: false });
  const [recycle, setRecycle] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setRecycle(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const ready = width > 0 && height > 0;
  const sideHeight = height * 0.45;
  const sideY = height * 0.25;

  return (
    <section className="flex flex-col gap-6">
      {/*
       * The step animates with a transform, which would make these fixed canvases relative
       * to it and stretch the page until the animation ends, so they live under the body.
       */}
      {ready
        ? createPortal(
            <>
              <Confetti
                width={width}
                height={height}
                recycle={recycle}
                numberOfPieces={350}
                gravity={0.12}
                friction={0.98}
                tweenDuration={3000}
                colors={CONFETTI_COLORS}
                confettiSource={{ x: 0, y: sideY, w: 12, h: sideHeight }}
                initialVelocityX={{ min: 10, max: 22 }}
                initialVelocityY={{ min: -14, max: 6 }}
                style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: "none" }}
              />
              <Confetti
                width={width}
                height={height}
                recycle={recycle}
                numberOfPieces={350}
                gravity={0.12}
                friction={0.98}
                tweenDuration={3000}
                colors={CONFETTI_COLORS}
                confettiSource={{ x: width - 12, y: sideY, w: 12, h: sideHeight }}
                initialVelocityX={{ min: -22, max: -10 }}
                initialVelocityY={{ min: -14, max: 6 }}
                style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: "none" }}
              />
            </>,
            document.body,
          )
        : null}

      <div className="space-y-4">
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-balance">
          {t("step7Title")}
          <PartyPopperIcon className="size-8 shrink-0 text-brand-guide" aria-hidden />
        </h2>
        <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
          {t("step7Body")}
        </p>
      </div>

      <div className="space-y-4">
        <dl className="space-y-3 leading-relaxed text-muted-foreground">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
            <dt className="shrink-0 text-lg sm:w-48">
              <span className="mx-0.5 inline whitespace-nowrap">
                <span className="font-semibold text-primary">{siteConfig.name}</span>{" "}
                <span className="font-bold text-brand-academy">{tAcademy("name")}</span>
              </span>
            </dt>
            <dd className="text-base">{t("step7AcademyDesc")}</dd>
          </div>
          {ECOSYSTEM_PRODUCTS.map((id) => (
            <div key={id} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <dt className="shrink-0 text-lg sm:w-48">
                <GuideProductMark id={id} linked={false} showBrand>
                  {tNav(PRODUCT_NAME_KEYS[id])}
                </GuideProductMark>
              </dt>
              <dd className="text-base">{tNav(PRODUCT_DESC_KEYS[id])}</dd>
            </div>
          ))}
        </dl>
        <Button size="lg" className="w-fit" nativeButton={false} render={<Link href="/" />}>
          <span>{t("step7Cta")}</span>
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
}
