"use client";

import type { ReactNode } from "react";

import {
  BoxesIcon,
  FolderTreeIcon,
  GaugeIcon,
  LayersIcon,
  ShieldCheckIcon,
  SplitIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { featureCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { guideCardTags } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

type RuleItem = {
  title: string;
  subtitle: string;
  description: ReactNode;
  icon: ReactNode;
  tone: string;
};

export function AiInjectedRules() {
  const t = useTranslations("Ai");
  const cardTags = guideCardTags();

  const rules: RuleItem[] = [
    {
      title: t("rulesArchTitle"),
      subtitle: t("rulesArchSubtitle"),
      description: t.rich("rulesArchDesc", cardTags),
      icon: <FolderTreeIcon className="size-5" aria-hidden />,
      tone: "bg-brand-ai/10 text-brand-ai",
    },
    {
      title: t("rulesDataTitle"),
      subtitle: t("rulesDataSubtitle"),
      description: t.rich("rulesDataDesc", cardTags),
      icon: <SplitIcon className="size-5" aria-hidden />,
      tone: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
    },
    {
      title: t("rulesUiTitle"),
      subtitle: t("rulesUiSubtitle"),
      description: t.rich("rulesUiDesc", cardTags),
      icon: <LayersIcon className="size-5" aria-hidden />,
      tone: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-300",
    },
    {
      title: t("rulesQualityTitle"),
      subtitle: t("rulesQualitySubtitle"),
      description: t.rich("rulesQualityDesc", cardTags),
      icon: <ShieldCheckIcon className="size-5" aria-hidden />,
      tone: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    },
    {
      title: t("rulesPerfTitle"),
      subtitle: t("rulesPerfSubtitle"),
      description: t.rich("rulesPerfDesc", cardTags),
      icon: <GaugeIcon className="size-5" aria-hidden />,
      tone: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
    },
    {
      title: t("rulesFwTitle"),
      subtitle: t("rulesFwSubtitle"),
      description: t.rich("rulesFwDesc", cardTags),
      icon: <BoxesIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
  ];

  return (
    <section
      id="rules"
      className="mx-auto max-w-5xl scroll-mt-4 px-6 py-16 md:scroll-mt-14 xl:scroll-mt-28"
    >
      <RevealGroup className="mb-12 text-center">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("rulesTitle")}</h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground">
            {t.rich("rulesDesc", cardTags)}
          </p>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule) => (
          <RevealItem key={rule.title} className={featureCardClassName}>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 ease-out group-hover:scale-105",
                  rule.tone,
                )}
              >
                {rule.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-balance text-foreground md:text-lg">
                  {rule.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">{rule.subtitle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {rule.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <RevealGroup className="mt-10 text-center">
        <RevealItem>
          <p className="text-sm text-muted-foreground">
            {t.rich("rulesAll", {
              docs: (chunks) => (
                <Link
                  href="/ai/docs/rules"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
