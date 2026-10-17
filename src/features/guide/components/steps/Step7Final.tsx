"use client";

import { useEffect, useState } from "react";

import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Confetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";

import type { ProductId } from "@/types/product.types";
import { siteConfig } from "@/config/site.config";

import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

const CONFETTI_COLORS = [
  "#14b8a6", // teal: Start
  "#d946ef", // fuchsia: AI
  "#6366f1", // indigo: Mask
  "#f43f5e", // rose: Password
  "#fbbf24", // amber: Guide
];

const ECOSYSTEM_PRODUCTS = [
  "start",
  "ai",
  "mask",
  "password",
] as const satisfies readonly ProductId[];

const PRODUCT_NAME_KEYS = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
} as const;

const PRODUCT_DESC_KEYS = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
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
      {ready ? (
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
        </>
      ) : null}

      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-balance">{t("step7Title")}</h2>
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
                <span className="font-medium text-green-500 italic">{tAcademy("name")}</span>
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
