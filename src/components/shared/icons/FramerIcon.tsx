import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

import { Framer } from "@/components/ui/svgs/framer";
import { FramerDark } from "@/components/ui/svgs/framerDark";

export function FramerIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Framer className="size-full fill-foreground dark:hidden" aria-hidden {...props} />
      <FramerDark className="hidden size-full dark:block" aria-hidden {...props} />
    </span>
  );
}
