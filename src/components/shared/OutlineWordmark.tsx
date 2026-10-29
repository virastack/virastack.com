import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

type OutlineWordmarkProps = {
  /** Fill the letters with the neutral foreground colour and drop the bottom fade, instead of the outline. Animates. */
  filled?: boolean;
  /** Font-size (and any layout) classes; the outline styling itself lives here. */
  className?: string;
};

/**
 * Decorative outlined brand name that fades out towards the bottom (unless `filled`).
 *
 * The fill is the page background and `paint-order: stroke fill` hides the inner
 * contours that variable fonts overlap (visible as crossing lines in t, k, a),
 * so the stroke is doubled to keep its visible weight. Horizontal padding keeps
 * the mask from clipping the last glyph under the negative tracking.
 */
export function OutlineWordmark({ filled = false, className }: OutlineWordmarkProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none block [mask-image:linear-gradient(to_bottom,black_10%,rgb(0_0_0/var(--wordmark-fade))_80%)] px-[0.08em] leading-[0.95] font-bold tracking-tight whitespace-nowrap transition-[color,translate,-webkit-text-stroke-color,--wordmark-fade] duration-500 select-none [-webkit-text-stroke-width:2px] [paint-order:stroke_fill] sm:[-webkit-text-stroke-width:3px]",
        filled
          ? "text-foreground [--wordmark-fade:1] [-webkit-text-stroke-color:currentColor]"
          : "text-background [--wordmark-fade:0] [-webkit-text-stroke-color:var(--foreground)]",
        className,
      )}
    >
      {siteConfig.name}
    </span>
  );
}
