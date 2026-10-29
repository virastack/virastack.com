import { BadgeCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** The Mask-colored tick that marks a built-in validation (checksums, date rules) across Mask examples. */
export function MaskCheckIcon({ className }: { className?: string }) {
  return (
    <BadgeCheckIcon
      className={cn(
        "size-4 shrink-0 fill-brand-mask stroke-brand-mask [&_path:last-child]:fill-none [&_path:last-child]:stroke-white",
        className,
      )}
      aria-hidden
    />
  );
}
