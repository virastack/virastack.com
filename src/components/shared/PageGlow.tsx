import { cn } from "@/lib/utils";

type PageGlowProps = {
  /** Tailwind `text-*` class; the glow is painted in that colour via `currentColor`. */
  colorClass: string;
};

/**
 * Wide, faint radial glow in the top-right corner of the page. The colour
 * transitions, so callers can swap `colorClass` to animate between products.
 *
 * Anchors to the nearest positioned ancestor; give `<main>` `relative isolate`
 * so the glow stays behind the page content.
 */
export function PageGlow({ colorClass }: PageGlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-160 animate-in bg-current [mask-image:radial-gradient(ellipse_60%_100%_at_100%_0%,black,rgb(0_0_0/0.55)_35%,rgb(0_0_0/0.2)_65%,transparent)] opacity-15 transition-colors duration-1000 fade-in motion-reduce:animate-none dark:opacity-20",
        colorClass,
      )}
    />
  );
}
