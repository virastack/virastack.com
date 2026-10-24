import { cn } from "@/lib/utils";

import { TanstackDark } from "@/components/ui/svgs/tanstackDark";
import { TanstackLight } from "@/components/ui/svgs/tanstackLight";

type TanstackLogoProps = {
  className?: string;
};

/** TanStack logo that follows the active theme. */
export function TanstackLogo({ className }: TanstackLogoProps) {
  return (
    <span className={cn("inline-flex size-full", className)} aria-hidden>
      <TanstackLight className="size-full dark:hidden" />
      <TanstackDark className="hidden size-full dark:block" />
    </span>
  );
}
