"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const loadSiteSearchDialog = () =>
  import("@/features/search/components/SiteSearchDialog").then((mod) => mod.SiteSearchDialog);

const SiteSearchDialog = dynamic(loadSiteSearchDialog, { ssr: false });

function isMacPlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

function subscribeNoop() {
  return () => {};
}

function useIsMac() {
  return useSyncExternalStore(subscribeNoop, isMacPlatform, () => true);
}

/**
 * Header search trigger and ⌘K shortcut. The palette loads on first open (and is
 * prefetched on hover/focus), then stays mounted so close animations still run.
 */
export function SiteSearch() {
  const t = useTranslations("Search");
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setRequested(true);
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const prefetch = () => {
    void loadSiteSearchDialog();
  };

  const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        aria-label={`${t("open")} ${shortcutLabel}`}
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        className={cn(
          "inline-flex h-8 w-auto items-center gap-2 rounded-md border-transparent bg-transparent px-2 text-xs text-muted-foreground transition-colors sm:w-44 sm:border sm:border-input sm:px-2.5 sm:shadow-xs",
          "hover:bg-muted/50 hover:text-foreground",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        )}
      >
        <span className="hidden min-w-0 flex-1 truncate text-left sm:inline">{t("open")}</span>
        <kbd className="pointer-events-none inline-flex h-5 shrink-0 items-center rounded border border-border bg-muted px-1 font-mono text-[10px] text-muted-foreground">
          {shortcutLabel}
        </kbd>
      </button>

      {requested ? (
        <SiteSearchDialog open={open} onOpenChange={setOpen} shortcutLabel={shortcutLabel} />
      ) : null}
    </>
  );
}
