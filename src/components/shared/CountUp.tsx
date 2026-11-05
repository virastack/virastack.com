"use client";

import { useEffect, useRef } from "react";

import { animate, useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

type CountUpProps = {
  /** The real figure. The animation only plays on top of it, and it is the final frame. */
  value: number;
  /** Count-up length in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 up to `value` once after hydration. The markup holds the real number but
 * stays hidden until the count starts, so the final figure never flashes before it. If
 * scripts do not run, a CSS fallback shows the number after 2.5 s, so it is never lost.
 * Reduced motion skips the count and shows the figure right away.
 */
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const format = new Intl.NumberFormat(locale);
    const reveal = () => node.classList.remove("invisible", "animate-count-up-fallback");

    if (reduceMotion) {
      reveal();
      return;
    }

    node.textContent = format.format(0);
    reveal();
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (current) => {
        node.textContent = format.format(Math.round(current));
      },
    });

    return () => controls.stop();
  }, [value, duration, locale, reduceMotion]);

  return (
    <span ref={ref} className={cn("invisible animate-count-up-fallback tabular-nums", className)}>
      {new Intl.NumberFormat(locale).format(value)}
    </span>
  );
}
