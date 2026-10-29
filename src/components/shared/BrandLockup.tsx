import type { CSSProperties, ReactNode } from "react";

import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { OutlineWordmark } from "@/components/shared/OutlineWordmark";

/**
 * While no name is shown the lockup has empty space below the wordmark (the
 * reserved `<h1>` line minus the overlap). Half of it, so the wordmark sits centred.
 * Mirrors the `<h1>` margin: f * (s * 0.954 - 0.657) / 2.
 */
const FILLED_SHIFT = "translate-y-[calc(var(--f)*(var(--s)*0.477_-_0.3285))]";

type BrandLockupProps = {
  /** Sets `--f`, the wordmark font-size. Defaults to the size every hero shares. */
  sizeClassName?: string;
  /** Product name size relative to the wordmark. */
  nameScale?: number;
  /** Fill the wordmark with the brand teal (animated by the caller). */
  filled?: boolean;
  /** Extra classes for the lockup container (e.g. spacing to its neighbours). */
  className?: string;
  /** Cross-axis alignment of the lockup. */
  alignClassName?: string;
  /** Product name; its colour comes from the caller. */
  children?: ReactNode;
};

/**
 * Outlined ViraStack wordmark with a bold product name overlapping its lower
 * quarter. Every size derives from `--f`, so the overlap stays proportional.
 * The `<h1>` always reserves one line so a name appearing later causes no shift.
 */
export function BrandLockup({
  sizeClassName = "[--f:17vw] sm:[--f:104px] lg:[--f:120px]",
  nameScale = 1.0667,
  filled,
  className,
  alignClassName = "items-center",
  children,
}: BrandLockupProps) {
  return (
    <div
      className={cn("flex w-full flex-col", alignClassName, sizeClassName, className)}
      style={{ "--s": nameScale } as CSSProperties}
    >
      <OutlineWordmark
        filled={filled}
        className={cn("text-(length:--f)", filled && FILLED_SHIFT)}
      />
      <h1
        className="relative min-h-[1.05em] leading-[1.05] font-black tracking-tight"
        style={{
          fontSize: "calc(var(--f) * var(--s))",
          marginTop: "calc(var(--f) * (var(--s) * -0.096 - 0.657))",
        }}
      >
        <span className="sr-only">{siteConfig.name} </span>
        {children}
      </h1>
    </div>
  );
}
