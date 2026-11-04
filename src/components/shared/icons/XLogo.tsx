import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

import { X as XLight } from "@/components/ui/svgs/x";
import { XDark } from "@/components/ui/svgs/xDark";

/** X (formerly Twitter) brand mark: light/dark variants from @svgl. */
export function XLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <XLight className="size-full dark:hidden" aria-hidden {...props} />
      <XDark className="hidden size-full dark:block" aria-hidden {...props} />
    </span>
  );
}
