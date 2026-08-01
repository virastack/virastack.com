import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

import { Nuqs } from "@/components/ui/svgs/nuqs";
import { NuqsDark } from "@/components/ui/svgs/nuqsDark";

export function NuqsIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Nuqs className="size-full dark:hidden" aria-hidden {...props} />
      <NuqsDark className="hidden size-full dark:block" aria-hidden {...props} />
    </span>
  );
}
