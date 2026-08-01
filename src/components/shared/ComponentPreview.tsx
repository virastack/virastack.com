"use client";

import { useState, type ReactNode } from "react";

import { CodeIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/copy-button";

/** ~3 code lines (padding + line-height); 3rd line sits in the fade. */
const COLLAPSED_HEIGHT = 88;

type ComponentPreviewProps = {
  preview: ReactNode;
  /** Raw source for the copy button. */
  code: string;
  /** Server-rendered highlighted markup (e.g. `<DocsCodeBlock />`). */
  children: ReactNode;
  className?: string;
};

/**
 * shadcn-style docs preview: live UI on top, 3-line code peek with gradient,
 * expands on “View Code” with ease-out height animation (skills: enter 300ms / exit 150ms).
 */
export function ComponentPreview({ preview, code, children, className }: ComponentPreviewProps) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative my-6 overflow-hidden rounded-xl border border-border", className)}>
      <div className="flex min-h-[160px] items-center justify-center bg-background p-8 text-foreground sm:p-10">
        <div className="w-full max-w-sm">{preview}</div>
      </div>

      <div className="relative border-t border-border bg-code">
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : COLLAPSED_HEIGHT }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: expanded ? 0.3 : 0.15,
                  ease: [0.23, 1, 0.32, 1],
                }
          }
          className="overflow-hidden will-change-[height]"
        >
          <div
            className={cn(
              "[&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-4",
              // Keep horizontal swipe/scroll; hide the visible scrollbar.
              "[&_.docs-code]:[scrollbar-width:none] [&_.docs-code]:overflow-x-auto [&_.docs-code]:[-ms-overflow-style:none]",
              "[&_.docs-code::-webkit-scrollbar]:hidden",
              "[&_pre]:[scrollbar-width:none] [&_pre]:overflow-x-auto [&_pre]:[-ms-overflow-style:none]",
              "[&_pre::-webkit-scrollbar]:hidden",
              // Room for the absolute View/Hide Code control at the bottom.
              expanded ? "pb-10 [&_pre]:pr-12" : "[&_pre]:pr-4",
            )}
          >
            {children}
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {!expanded ? (
            <motion.div
              key="fade"
              initial={false}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }
              }
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[4.5rem]"
              aria-hidden
            >
              <div className="absolute inset-0 bg-linear-to-t from-code from-30% via-code/70 to-transparent" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="copy"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.96,
                      transition: { duration: 0.15, ease: "easeOut" },
                    }
              }
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="absolute top-3 right-3 z-10"
            >
              <CopyButton text={code} variant="outline" size="icon-sm" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-3">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-[transform,background-color] duration-150 ease-out hover:bg-muted active:scale-[0.96]"
          >
            {!expanded ? <CodeIcon className="size-3.5" aria-hidden /> : null}
            {expanded ? "Hide Code" : "View Code"}
          </button>
        </div>
      </div>
    </div>
  );
}
