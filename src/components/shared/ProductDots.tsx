"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

import { brandPalettes } from "@/config/brand-palettes.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { Link } from "@/i18n/routing";

/** Time each product stays highlighted during the intro sequence. */
const STEP_MS = 650;

type ProductDotsProps = {
  /** Accessible name of the dot navigation (translated by the caller). */
  label: string;
  /** Highlight each product once, in order, when the dots scroll into view. */
  autoplay?: boolean;
  /** `start` aligns dots and caption to the left (footer); `center` for showcases. */
  align?: "start" | "center";
  className?: string;
};

/**
 * One dot per ecosystem product, in brand order. Each dot links to its product;
 * hover / focus (or the optional intro sequence) reveals the product lockup below.
 */
export function ProductDots({
  label,
  autoplay = false,
  align = "start",
  className,
}: ProductDotsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const [introIndex, setIntroIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!autoplay || !inView || reduceMotion) return;

    const timers = brandPalettes.map((_, index) =>
      window.setTimeout(() => setIntroIndex(index), index * STEP_MS),
    );
    timers.push(window.setTimeout(() => setIntroIndex(null), brandPalettes.length * STEP_MS));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [autoplay, inView, reduceMotion]);

  const activeIndex = hoverIndex ?? introIndex;
  const active = activeIndex === null ? null : brandPalettes[activeIndex];

  return (
    <nav
      ref={ref}
      aria-label={label}
      className={cn(
        "flex flex-col gap-1",
        align === "center" ? "items-center" : "items-start",
        className,
      )}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <ul className={cn("-mx-1.5 flex items-center", align === "center" && "mx-0")}>
        {brandPalettes.map((palette, index) => {
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;

          return (
            <li key={palette.id}>
              <Link
                href={palette.href}
                aria-label={`${siteConfig.name} ${palette.productName}`}
                className="flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onMouseEnter={() => setHoverIndex(index)}
                onFocus={() => setHoverIndex(index)}
                onBlur={() => setHoverIndex(null)}
              >
                <motion.span
                  aria-hidden
                  className={cn("block size-2.5 rounded-full", palette.bgClass)}
                  animate={{
                    scale: isActive ? 1.5 : 1,
                    opacity: isDimmed ? 0.35 : 1,
                  }}
                  transition={
                    reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 24 }
                  }
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div aria-hidden className="h-5 text-sm">
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.span
              key={active.id}
              className="block whitespace-nowrap"
              initial={reduceMotion ? false : { opacity: 0, y: 4, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4, filter: "blur(2px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <span className="font-semibold text-foreground">{siteConfig.name}</span>{" "}
              <span className={cn("font-medium italic", active.textClass)}>
                {active.productName}
              </span>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}
