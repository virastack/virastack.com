"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { CopyStateIcon } from "@/components/copy-button";

const COMMAND = "npx virastack@latest";

type NpxInstallCommandProps = {
  className?: string;
};

export function NpxInstallCommand({ className }: NpxInstallCommandProps) {
  const t = useTranslations("Common");
  const { state, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(COMMAND)}
      className={cn(
        "group/npx relative inline-flex !cursor-copy items-center justify-center font-mono text-sm text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      aria-label={t("copyCommand", { command: COMMAND })}
    >
      <span>{COMMAND}</span>
      <span
        className={cn(
          "absolute top-1/2 left-full ml-2 inline-flex size-6 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity group-hover/npx:opacity-100 group-focus-visible/npx:opacity-100 [&_svg]:size-3.5",
          state !== "idle" && "opacity-100",
        )}
        aria-hidden
      >
        <CopyStateIcon state={state} />
      </span>
    </button>
  );
}
