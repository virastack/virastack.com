import {
  BotIcon,
  FolderTreeIcon,
  ShieldIcon,
  SplitIcon,
  TerminalIcon,
  WorkflowIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";
import { guideCardTags } from "@/features/guide/components/GuideRichText";

export function StartFeatures() {
  const t = useTranslations("Start");
  const cardTags = guideCardTags();

  const features: FeatureItem[] = [
    {
      title: t("featuresAiTitle"),
      subtitle: t("featuresAiSubtitle"),
      description: t.rich("featuresAiDesc", cardTags),
      icon: <BotIcon className="size-5" aria-hidden />,
      tone: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-300",
    },
    {
      title: t("featuresFsdTitle"),
      subtitle: t("featuresFsdSubtitle"),
      description: t.rich("featuresFsdDesc", cardTags),
      icon: <FolderTreeIcon className="size-5" aria-hidden />,
      tone: "bg-brand-start/10 text-brand-start",
    },
    {
      title: t("featuresStackTitle"),
      subtitle: t("featuresStackSubtitle"),
      description: t.rich("featuresStackDesc", cardTags),
      icon: <WorkflowIcon className="size-5" aria-hidden />,
      tone: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
    },
    {
      title: t("featuresCliTitle"),
      subtitle: t("featuresCliSubtitle"),
      description: t.rich("featuresCliDesc", cardTags),
      icon: <TerminalIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
    {
      title: t("featuresStateTitle"),
      subtitle: t("featuresStateSubtitle"),
      description: t.rich("featuresStateDesc", cardTags),
      icon: <SplitIcon className="size-5" aria-hidden />,
      tone: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-300",
    },
    {
      title: t("featuresTypesTitle"),
      subtitle: t("featuresTypesSubtitle"),
      description: t.rich("featuresTypesDesc", cardTags),
      icon: <ShieldIcon className="size-5" aria-hidden />,
      tone: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    },
  ];

  return <FeaturesSection title={t("featuresTitle")} features={features} />;
}
