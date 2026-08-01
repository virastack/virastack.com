"use client";

import { useEffect, useState } from "react";

import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Confetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";

import type { ProductId } from "@/types/product.types";
import { products } from "@/config/products.config";

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

const PRODUCT_NAME_KEYS = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const;

const PRODUCT_DESC_KEYS = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  guide: "guideDesc",
} as const;

export function Step7Final() {
  const t = useTranslations("Guide");
  const tNav = useTranslations("Navigation");
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
    <section className="flex flex-col justify-center gap-6 sm:mb-[30vh]">
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

      <h2 className="text-3xl font-bold tracking-tight">{t("step7Title")}</h2>

      <p className="text-lg leading-relaxed text-muted-foreground">{t("step7Body")}</p>

      <p className="text-lg leading-relaxed text-muted-foreground">
        {t.rich("step7BodyVira", {
          brand: (chunks) => (
            <span className="inline-flex items-center gap-1.5 align-baseline font-medium text-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-icon.webp" alt="" className="size-[1em] shrink-0" aria-hidden />
              {chunks}
            </span>
          ),
        })}
      </p>

      <ul className="list-disc space-y-2.5 pl-5 text-lg leading-relaxed text-muted-foreground">
        {products.map((product) => {
          const id = product.id as ProductId;
          return (
            <li key={id}>
              <GuideProductMark id={id} linked={false} showBrand>
                {tNav(PRODUCT_NAME_KEYS[id])}
              </GuideProductMark>
              <span aria-hidden> - </span>
              <span>{tNav(PRODUCT_DESC_KEYS[id])}</span>
            </li>
          );
        })}
      </ul>

      <Button size="lg" className="w-fit self-end" nativeButton={false} render={<Link href="/" />}>
        <span>{t("step7Cta")}</span>
        <ChevronRightIcon data-icon="inline-end" />
      </Button>
    </section>
  );
}
