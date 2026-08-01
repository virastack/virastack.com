import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

import { BaseUi } from "@/components/ui/svgs/baseUi";
import { BaseUiDark } from "@/components/ui/svgs/baseUiDark";

export function BaseUiIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <BaseUi className="size-full fill-foreground dark:hidden" aria-hidden {...props} />
      <BaseUiDark className="hidden size-full dark:block" aria-hidden {...props} />
    </span>
  );
}
