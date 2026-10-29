"use client";

import { domAnimation, LazyMotion } from "motion/react";

/**
 * Loads only the `domAnimation` feature set (animate, variants, exit, gestures,
 * in-view) for `m.*` components instead of the full `motion.*` bundle. `strict`
 * throws if a `motion.*` component slips back in. Layout or drag animations need
 * `domMax` here.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
