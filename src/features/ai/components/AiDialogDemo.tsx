"use client";

import { useEffect, useState } from "react";

import { ArrowUpIcon, CheckIcon, ChevronDownIcon, FileCodeIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Reveal } from "@/components/shared/Reveal";

type Phase = "typing" | "thinking" | "ready";

export function AiDialogDemo() {
  const t = useTranslations("Ai");
  const prompt = t("demoPrompt");
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  const isTyping = phase === "typing" && typed.length < prompt.length;
  const canSend = typed.length === prompt.length && phase === "typing";

  useEffect(() => {
    let index = 0;
    let thinkTimer = 0;
    let readyTimer = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setTyped(prompt.slice(0, index));
      if (index < prompt.length) return;

      window.clearInterval(interval);
      thinkTimer = window.setTimeout(() => {
        setPhase("thinking");
        readyTimer = window.setTimeout(() => {
          setPhase("ready");
        }, 900);
      }, 280);
    }, 26);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(thinkTimer);
      window.clearTimeout(readyTimer);
    };
  }, [prompt]);

  return (
    <section id="demo" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
      <Reveal className="mb-10 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("demoTitle")}</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("demoDesc")}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto w-full max-w-xl">
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
              <span className="text-muted-foreground/70">{t("demoPlaceholder")}</span>
            )}
            {isTyping ? (
              <span
                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-foreground align-text-bottom"
                aria-hidden
              />
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-2 px-2.5 pb-2.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border border-border/80",
                "bg-muted/50 px-2 py-1 text-[11px] text-muted-foreground",
              )}
            >
              {t("demoModel")}
              <ChevronDownIcon className="size-3 opacity-70" aria-hidden />
            </span>
            <span
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-full transition-all duration-300",
                canSend || phase !== "typing"
                  ? "scale-100 bg-foreground text-background"
                  : "scale-95 bg-muted text-muted-foreground/50",
                phase === "thinking" && "animate-pulse",
              )}
              aria-hidden
            >
              <ArrowUpIcon className="size-3.5" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </Reveal>

      {(phase === "thinking" || phase === "ready") && (
        <div className="mx-auto mt-6 max-w-xl">
          {phase === "thinking" ? (
            <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-fuchsia-500" aria-hidden />
              {t("demoThinking")}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-50/80 px-4 py-3 dark:bg-rose-950/30">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  <XIcon className="size-3.5" strokeWidth={2.5} aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                    {t("demoRejectTitle")}
                  </p>
                  <p className="font-mono text-xs leading-relaxed text-rose-700/80 dark:text-rose-300/80">
                    {t("demoRejectCode")}
                  </p>
                  <p className="text-sm leading-relaxed text-rose-700/90 dark:text-rose-300/90">
                    {t("demoRejectBody")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-50/80 px-4 py-3 dark:bg-emerald-950/30">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    {t("demoAcceptTitle")}
                  </p>
                  <p className="text-sm leading-relaxed text-emerald-800/90 dark:text-emerald-300/90">
                    {t("demoAcceptBody")}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-emerald-700/80 dark:text-emerald-300/80">
                    <FileCodeIcon className="size-3.5 shrink-0" aria-hidden />
                    {t("demoAcceptPath")}
                  </p>
                </div>
              </div>

              <p className="pt-1 text-center text-sm text-muted-foreground">{t("demoFootnote")}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
