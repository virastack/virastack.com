import type { CSSProperties, ReactNode } from "react";

import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { OutlineWordmark } from "@/components/shared/OutlineWordmark";

type BrandLockupProps = {
  /** Sets `--f`, the wordmark font-size. Defaults to the size every hero shares. */
  sizeClassName?: string;
  /** Product name size relative to the wordmark. */
  nameScale?: number;
  /** Fill the wordmark (animated by the caller). When explicitly `false` it also lifts a little. */
  filled?: boolean;
  /** Extra classes for the lockup container (e.g. spacing to its neighbours). */
  className?: string;
  /** Cross-axis alignment of the lockup. */
  alignClassName?: string;
  /** Heading level of the product name; use `div` where the page already has an `<h1>`. */
  as?: "h1" | "div";
  /** Screen-reader and crawler text of the heading; defaults to the brand name. */
  srTitle?: string;
  /** Shown in the product name's slot, centred under the wordmark (e.g. product dots). */
  slot?: ReactNode;
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
  as: Name = "h1",
  srTitle,
  slot,
  children,
}: BrandLockupProps) {
  return (
    <div
      className={cn("relative flex w-full flex-col", alignClassName, sizeClassName, className)}
      style={{ "--s": nameScale } as CSSProperties}
    >
      <OutlineWordmark
        filled={filled}
        className={cn(
          "text-(length:--f)",
          filled === false && "-translate-y-[calc(var(--f)*0.12)]",
        )}
      />
      <Name
        className="relative min-h-[1.05em] leading-[1.05] font-black tracking-tight"
        style={{
          fontSize: "calc(var(--f) * var(--s))",
          marginTop: "calc(var(--f) * (var(--s) * -0.096 - 0.657))",
        }}
      >
        <span className="sr-only">{srTitle ?? siteConfig.name} </span>
        {children}
      </Name>
      {slot ? (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ bottom: "calc(var(--f) * 0.12)" }}
        >
          {slot}
        </div>
      ) : null}
    </div>
  );
}
