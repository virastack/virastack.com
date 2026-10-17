import { cn } from "@/lib/utils";

export const featureCardClassName =
  "group flex flex-col gap-3 p-4 md:p-6 transition-[border-color,box-shadow] duration-150 ease-out rounded-2xl border border-border ring-1 ring-border ring-offset-4 ring-offset-background hover:border-foreground/10 hover:ring-foreground/8 bg-card";

export const featureCardChevronClassName =
  "text-muted-foreground size-4 shrink-0 scale-[0.25] opacity-0 blur-[4px] transition-[transform,opacity,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none motion-reduce:transition-none";

const interactiveCardBaseClassName =
  "group flex min-w-0 flex-col gap-2 rounded-xl border p-3 ring-1 ring-offset-4 ring-offset-background transition-[border-color,background-color,box-shadow] duration-150 ease-out md:gap-3 md:p-4";

const interactiveCardLiveClassName =
  "border-border bg-card ring-border hover:border-foreground/10 hover:bg-accent/30 hover:ring-foreground/8 focus-visible:border-foreground/10 focus-visible:ring-foreground/8 focus-visible:outline-none";

const interactiveCardMutedClassName =
  "cursor-default border-dashed border-border/70 bg-muted/20 ring-border/70";

export function getInteractiveCardClassName(isMuted = false): string {
  return cn(
    interactiveCardBaseClassName,
    isMuted ? interactiveCardMutedClassName : interactiveCardLiveClassName,
  );
}

export const interactiveListRowClassName =
  "group relative rounded-xl border border-transparent ring-1 ring-transparent ring-offset-4 ring-offset-background transition-[border-color,background-color,box-shadow] duration-150 ease-out hover:z-10 hover:border-foreground/10 hover:bg-background hover:ring-foreground/8 focus-visible:z-10 focus-visible:border-foreground/10 focus-visible:ring-foreground/8 focus-visible:outline-none";

export const interactiveListRowBleedClassName =
  "-mx-2.5 w-[calc(100%+1.25rem)] px-2.5 py-2.5 md:-mx-3 md:w-[calc(100%+1.5rem)] md:px-3 md:py-3";
