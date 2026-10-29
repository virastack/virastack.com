"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { brandPalettes } from "@/config/brand-palettes.config";

import { cn } from "@/lib/utils";

import { BrandLockup } from "@/components/shared/BrandLockup";
import { PageGlow } from "@/components/shared/PageGlow";

/** Solid teal wordmark before it turns into an outline. */
const HOLD_MS = 700;
/** Matches the wordmark's colour transition. */
const OUTLINE_MS = 500;
/** Time each product name stays on screen; long enough to read. */
const STEP_MS = 2000;

/**
 * Intro played once: teal wordmark -> outline -> each product name in brand
 * order -> teal wordmark again. The resting state (server render, reduced motion)
 * is the final one, a solid teal wordmark.
 */
export function HeroBrand() {
  const reduceMotion = useReducedMotion();
  const [outlined, setOutlined] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const timers: number[] = [];
    const at = (ms: number, run: () => void) => timers.push(window.setTimeout(run, ms));
    const namesStart = HOLD_MS + OUTLINE_MS;

    at(HOLD_MS, () => setOutlined(true));
    brandPalettes.forEach((_, i) => at(namesStart + i * STEP_MS, () => setIndex(i)));
    at(namesStart + brandPalettes.length * STEP_MS, () => {
      setIndex(null);
      setOutlined(false);
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  const active = index === null ? null : brandPalettes[index];

  return (
    <>
      {/* Absolute: anchors to the page's <main>, so it sits outside the hero's flex flow. */}
      <PageGlow colorClass={active?.textClass ?? "text-teal-500"} />
      <BrandLockup filled={!outlined} className="-mt-10 -mb-5">
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.span
              key={active.id}
              aria-hidden
              className={cn("block whitespace-nowrap", active.textClass)}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {active.productName}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </BrandLockup>
    </>
  );
}
