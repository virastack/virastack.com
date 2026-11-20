"use client";

import type { ReactNode } from "react";

import { CheckIcon, CircleXIcon, CopyIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

type CopyBlockProps = {
  /** The text put on the clipboard. */
  text: string;
  /** Names the whole block for assistive technology, such as "Copy HEX value". */
  label: string;
  className?: string;
  children: ReactNode;
};

/**
 * A whole row or card that copies `text` when pressed. A small copy icon shows at its end on hover
 * and focus; after a copy it becomes a check (or a cross, if the copy failed) for a moment.
 */
export function CopyBlock({ text, label, className, children }: CopyBlockProps) {
  const t = useTranslations("BrandPage");
  const { state, copy } = useCopyToClipboard();
  const note = state === "done" ? t("copied") : state === "error" ? t("copyFailed") : "";

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={label}
      className={cn(
        "group relative flex w-full cursor-pointer items-center gap-3 text-left transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
    >
      {children}
      <span aria-hidden className="ml-auto flex size-4 shrink-0 items-center justify-center">
        {state === "done" ? (
          <CheckIcon className="size-4 animate-in text-foreground duration-150 fade-in-0 zoom-in-50" />
        ) : state === "error" ? (
          <CircleXIcon className="size-4 animate-in text-destructive duration-150 fade-in-0 zoom-in-50" />
        ) : (
          <CopyIcon className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
        )}
      </span>
      <span role="status" className="sr-only">
        {note}
      </span>
    </button>
  );
}
