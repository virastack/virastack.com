import { BadgeCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** The teal tick that marks a built-in validation (checksums, date rules) across Mask examples. */
export function MaskCheckIcon({ className }: { className?: string }) {
  return (
    <BadgeCheckIcon
      className={cn(
        "size-4 shrink-0 fill-teal-600 stroke-teal-600 dark:fill-teal-400 dark:stroke-teal-400 [&_path:last-child]:fill-none [&_path:last-child]:stroke-white",
        className,
      )}
      aria-hidden
    />
  );
}
