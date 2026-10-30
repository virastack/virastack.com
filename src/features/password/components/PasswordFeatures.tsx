import {
  AccessibilityIcon,
  GaugeIcon,
  LanguagesIcon,
  PuzzleIcon,
  ServerIcon,
  ShieldAlertIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";
import { guideCardTags } from "@/features/guide/components/GuideRichText";

export function PasswordFeatures() {
  const t = useTranslations("Password");
  const cardTags = guideCardTags();

  const features: FeatureItem[] = [
    {
      title: t("featuresStrengthTitle"),
      subtitle: t("featuresStrengthSubtitle"),
      description: t.rich("featuresStrengthDesc", cardTags),
      icon: <GaugeIcon className="size-5" aria-hidden />,
      tone: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300",
    },
    {
      title: t("featuresPwnedTitle"),
      subtitle: t("featuresPwnedSubtitle"),
      description: t.rich("featuresPwnedDesc", cardTags),
      icon: <ShieldAlertIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
    {
      title: t("featuresA11yTitle"),
      subtitle: t("featuresA11ySubtitle"),
      description: t.rich("featuresA11yDesc", cardTags),
      icon: <AccessibilityIcon className="size-5" aria-hidden />,
      tone: "bg-brand-password/10 text-brand-password",
    },
    {
      title: t("featuresServerTitle"),
      subtitle: t("featuresServerSubtitle"),
      description: t.rich("featuresServerDesc", cardTags),
      icon: <ServerIcon className="size-5" aria-hidden />,
      tone: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    },
    {
      title: t("featuresHeadlessTitle"),
      subtitle: t("featuresHeadlessSubtitle"),
      description: t.rich("featuresHeadlessDesc", cardTags),
      icon: <PuzzleIcon className="size-5" aria-hidden />,
      tone: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
    },
    {
      title: t("featuresI18nTitle"),
      subtitle: t("featuresI18nSubtitle"),
      description: t.rich("featuresI18nDesc", cardTags),
      icon: <LanguagesIcon className="size-5" aria-hidden />,
      tone: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
    },
  ];

  return <FeaturesSection title={t("featuresTitle")} features={features} />;
}
