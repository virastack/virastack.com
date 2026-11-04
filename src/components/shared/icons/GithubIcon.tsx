import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

import { GithubDark } from "@/components/ui/svgs/githubDark";
import { GithubLight } from "@/components/ui/svgs/githubLight";

export function GithubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <GithubLight className="size-full dark:hidden" aria-hidden {...props} />
      <GithubDark className="hidden size-full dark:block" aria-hidden {...props} />
    </span>
  );
}
