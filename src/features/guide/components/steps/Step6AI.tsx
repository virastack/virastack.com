"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUpIcon, ChevronDownIcon, ImageIcon, MicIcon, PaperclipIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Map, MapControls, type MapRef } from "@/components/ui/map";
import { Skeleton } from "@/components/ui/skeleton";
import { GuideStepCta } from "@/features/guide/components/GuideStepCta";
import type { GuideStepProps } from "@/features/guide/types/guide.types";

const MAP_HEIGHT = "h-[420px]";

export function Step6AI({ onNext, isCompleted, isStyled }: GuideStepProps) {
  const t = useTranslations("Guide");
  const prompt = t("step6Prompt");
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "ready">("idle");
  const [isSending, setIsSending] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef | null>(null);
  const didScrollRef = useRef(false);

  const isTyping = typed.length < prompt.length;
  const showSkeleton = phase === "loading";
  const showMap = phase === "ready";
  const canSend = typed.length === prompt.length && !isSending && phase === "idle";

  useEffect(() => {
    let index = 0;
    let sendTimer = 0;
    let mapTimer = 0;
    let scrollTimer = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setTyped(prompt.slice(0, index));
      if (index < prompt.length) return;

      window.clearInterval(interval);

      // Prompt done → send → skeleton 1s → map.
      sendTimer = window.setTimeout(() => {
        setIsSending(true);
        setPhase("loading");

        scrollTimer = window.setTimeout(() => {
          if (didScrollRef.current) return;
          didScrollRef.current = true;
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }, 80);

        mapTimer = window.setTimeout(() => {
          setPhase("ready");
        }, 1000);
      }, 320);
    }, 28);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(sendTimer);
      window.clearTimeout(mapTimer);
      window.clearTimeout(scrollTimer);
    };
  }, [prompt]);

  useEffect(() => {
    if (!showMap) return;

    const timers = [50, 200, 500].map((ms) =>
      window.setTimeout(() => mapRef.current?.resize(), ms),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [showMap]);

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{t("step6Title")}</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">{t("step6Body")}</p>
      </div>

      <div className="mx-auto w-full max-w-lg">
        <div
          className={cn(
            "rounded-lg border border-border bg-background",
            "ring-1 ring-border ring-offset-4 ring-offset-background",
            "shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]",
          )}
        >
          <div
            className="min-h-[5.5rem] px-3.5 pt-3 pb-2 text-[13px] leading-relaxed text-foreground/90 sm:text-sm"
            aria-live="polite"
          >
            {typed ? (
              <span className="whitespace-pre-wrap">{typed}</span>
            ) : (
              <span className="text-muted-foreground/70">{t("promptPlaceholder")}</span>
            )}
            {isTyping ? (
              <span
                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-foreground align-text-bottom"
                aria-hidden
              />
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5">
            <div className="flex items-center gap-0.5">
              <span
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground"
                aria-hidden
              >
                <PaperclipIcon className="size-3.5" />
              </span>
              <span
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground"
                aria-hidden
              >
                <ImageIcon className="size-3.5" />
              </span>
              <span
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground"
                aria-hidden
              >
                <MicIcon className="size-3.5" />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border border-border/80",
                  "bg-muted/50 px-2 py-1 text-[11px] text-muted-foreground",
                )}
              >
                {t("promptModel")}
                <ChevronDownIcon className="size-3 opacity-70" aria-hidden />
              </span>

              <span
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-full transition-all duration-300",
                  canSend || isSending || phase !== "idle"
                    ? "scale-100 bg-foreground text-background"
                    : "scale-95 bg-muted text-muted-foreground/50",
                  isSending && phase === "loading" && "animate-pulse",
                )}
                aria-hidden
              >
                <ArrowUpIcon className="size-3.5" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div ref={mapSectionRef} className="space-y-6">
        {showSkeleton ? <Skeleton className={cn(MAP_HEIGHT, "w-full rounded-xl")} /> : null}

        {showMap ? (
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-xl border border-border",
              MAP_HEIGHT,
            )}
          >
            <Map ref={mapRef} center={[28.9784, 41.0082]} zoom={7}>
              <MapControls position="top-right" showZoom showCompass showLocate showFullscreen />
            </Map>
          </div>
        ) : null}

        <p
          className={cn(
            "text-lg text-muted-foreground",
            !showMap && "pointer-events-none invisible",
          )}
        >
          <GuideStepCta
            label={t("step6Cta")}
            onClick={onNext}
            disabled={isCompleted}
            isStyled={isStyled}
          />
        </p>
      </div>
    </section>
  );
}
