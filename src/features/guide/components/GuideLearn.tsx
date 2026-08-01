"use client";

import {
  BotIcon,
  ComponentIcon,
  FileTextIcon,
  LayersIcon,
  PaletteIcon,
  TypeIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";

export function GuideLearn() {
  const t = useTranslations("Guide");

  const features: FeatureItem[] = [
    {
      title: t("learnContentTitle"),
      subtitle: t("learnContentSubtitle"),
      description: t("learnContentDesc"),
      icon: <FileTextIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
    {
      title: t("learnStackTitle"),
      subtitle: t("learnStackSubtitle"),
      description: t("learnStackDesc"),
      icon: <LayersIcon className="size-5" aria-hidden />,
      tone: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
    },
    {
      title: t("learnStyleTitle"),
      subtitle: t("learnStyleSubtitle"),
      description: t("learnStyleDesc"),
      icon: <PaletteIcon className="size-5" aria-hidden />,
      tone: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300",
    },
    {
      title: t("learnTypeTitle"),
      subtitle: t("learnTypeSubtitle"),
      description: t("learnTypeDesc"),
      icon: <TypeIcon className="size-5" aria-hidden />,
      tone: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
    },
    {
      title: t("learnUiTitle"),
      subtitle: t("learnUiSubtitle"),
      description: t("learnUiDesc"),
      icon: <ComponentIcon className="size-5" aria-hidden />,
      tone: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300",
    },
    {
      title: t("learnAiTitle"),
      subtitle: t("learnAiSubtitle"),
      description: t("learnAiDesc"),
      icon: <BotIcon className="size-5" aria-hidden />,
      tone: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-300",
    },
  ];

  return <FeaturesSection title={t("learnTitle")} features={features} />;
}
