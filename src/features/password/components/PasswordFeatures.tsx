import {
  AccessibilityIcon,
  EyeIcon,
  LayersIcon,
  LockIcon,
  MergeIcon,
  PuzzleIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";

export function PasswordFeatures() {
  const t = useTranslations("Password");

  const features: FeatureItem[] = [
    {
      title: t("featuresA11yTitle"),
      subtitle: t("featuresA11ySubtitle"),
      description: t("featuresA11yDesc"),
      icon: <AccessibilityIcon className="size-5" aria-hidden />,
      tone: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300",
    },
    {
      title: t("featuresHeadlessTitle"),
      subtitle: t("featuresHeadlessSubtitle"),
      description: t("featuresHeadlessDesc"),
      icon: <PuzzleIcon className="size-5" aria-hidden />,
      tone: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-300",
    },
    {
      title: t("featuresDefaultsTitle"),
      subtitle: t("featuresDefaultsSubtitle"),
      description: t("featuresDefaultsDesc"),
      icon: <EyeIcon className="size-5" aria-hidden />,
      tone: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300",
    },
    {
      title: t("featuresMergeTitle"),
      subtitle: t("featuresMergeSubtitle"),
      description: t("featuresMergeDesc"),
      icon: <MergeIcon className="size-5" aria-hidden />,
      tone: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300",
    },
    {
      title: t("featuresSyncTitle"),
      subtitle: t("featuresSyncSubtitle"),
      description: t("featuresSyncDesc"),
      icon: <LockIcon className="size-5" aria-hidden />,
      tone: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    },
    {
      title: t("featuresUiTitle"),
      subtitle: t("featuresUiSubtitle"),
      description: t("featuresUiDesc"),
      icon: <LayersIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
  ];

  return <FeaturesSection title={t("featuresTitle")} features={features} />;
}
