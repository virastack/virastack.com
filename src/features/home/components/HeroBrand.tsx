"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { brandPalettes, getBrandPalette } from "@/config/brand-palettes.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { BrandLockup } from "@/components/shared/BrandLockup";
import { PageGlow } from "@/components/shared/PageGlow";
import { ProductDots } from "@/components/shared/ProductDots";

/** Solid wordmark before it turns into an outline. */
const HOLD_MS = 500;
/** Matches the wordmark's colour transition. */
const OUTLINE_MS = 500;
/** Time each product name stays on screen; long enough to read. */
const STEP_MS = 1200;

const NAMES_START_MS = HOLD_MS + OUTLINE_MS;
const INTRO_MS = NAMES_START_MS + brandPalettes.length * STEP_MS;
/** Pause after the wordmark settles before the product dots appear. */
const DOTS_DELAY_MS = 500;

/**
 * Intro played once: solid wordmark -> outline -> each product name in brand
 * order -> solid wordmark with the product dots. The resting state (server render,
 * reduced motion) is the final one.
 */
export function HeroBrand() {
  const t = useTranslations("Footer");
  const tHome = useTranslations("Home");
  const reduceMotion = useReducedMotion();
  const [outlined, setOutlined] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const timers: number[] = [];
    const at = (ms: number, run: () => void) => timers.push(window.setTimeout(run, ms));

    at(HOLD_MS, () => setOutlined(true));
    brandPalettes.forEach((_, i) => at(NAMES_START_MS + i * STEP_MS, () => setIndex(i)));
    at(INTRO_MS, () => {
      setIndex(null);
      setOutlined(false);
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  const active = index === null ? null : brandPalettes[index];

  return (
    <>
      {/* Absolute: anchors to the page's <main>, so it sits outside the hero's flex flow. */}
      <PageGlow colorClass={active?.textClass ?? getBrandPalette("start").textClass} />
      <BrandLockup
        filled={!outlined}
        srTitle={`${siteConfig.name} – ${tHome("heroSrTitle")}`}
        className="-mt-8 -mb-5"
        slot={
          /* Fades in once the names are done; no-JS and reduced motion show it at once. */
          <div
            className="animate-reveal-late motion-reduce:animate-none"
            style={{ animationDelay: `${INTRO_MS + DOTS_DELAY_MS}ms` }}
          >
            <ProductDots label={t("productDots")} align="center" showBrand={false} />
          </div>
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <m.span
              key={active.id}
              aria-hidden
              className={cn("block whitespace-nowrap", active.textClass)}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {active.productName}
            </m.span>
          ) : null}
        </AnimatePresence>
      </BrandLockup>
    </>
  );
}
