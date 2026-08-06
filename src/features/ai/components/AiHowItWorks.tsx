"use client";

import { useTranslations } from "next-intl";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";

export function AiHowItWorks() {
  const t = useTranslations("Ai");

  const steps = [
    { title: t("how1Title"), body: t("how1Body") },
    { title: t("how2Title"), body: t("how2Body") },
    { title: t("how3Title"), body: t("how3Body") },
  ] as const;

  return (
    <section id="how" className="mx-auto max-w-3xl scroll-mt-4 px-6 py-16 md:scroll-mt-28">
      <RevealGroup className="mb-12 text-center">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("howTitle")}</h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("howDesc")}
          </p>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="space-y-0">
        {steps.map((step, index) => (
          <RevealItem
            key={step.title}
            className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-10 last:pb-0"
          >
            <div className="relative flex flex-col items-center">
              <span className="z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background font-mono text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">
                {index + 1}
              </span>
              {index < steps.length - 1 ? (
                <span className="absolute top-10 bottom-0 w-px bg-border" aria-hidden />
              ) : null}
            </div>
            <div className="min-w-0 pt-1.5">
              <h3 className="text-base font-semibold text-foreground md:text-lg">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
