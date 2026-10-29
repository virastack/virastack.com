import {
  AccessibilityIcon,
  CopyCheckIcon,
  GaugeIcon,
  PuzzleIcon,
  ServerIcon,
  ShieldAlertIcon,
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
      tone: "bg-brand-password/10 text-brand-password",
    },
    {
      title: t("featuresHeadlessTitle"),
      subtitle: t("featuresHeadlessSubtitle"),
      description: t("featuresHeadlessDesc"),
      icon: <PuzzleIcon className="size-5" aria-hidden />,
      tone: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
    },
    {
      title: t("featuresStrengthTitle"),
      subtitle: t("featuresStrengthSubtitle"),
      description: t("featuresStrengthDesc"),
      icon: <GaugeIcon className="size-5" aria-hidden />,
      tone: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300",
    },
    {
      title: t("featuresConfirmTitle"),
      subtitle: t("featuresConfirmSubtitle"),
      description: t("featuresConfirmDesc"),
      icon: <CopyCheckIcon className="size-5" aria-hidden />,
      tone: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300",
    },
    {
      title: t("featuresServerTitle"),
      subtitle: t("featuresServerSubtitle"),
      description: t("featuresServerDesc"),
      icon: <ServerIcon className="size-5" aria-hidden />,
      tone: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    },
    {
      title: t("featuresPwnedTitle"),
      subtitle: t("featuresPwnedSubtitle"),
      description: t("featuresPwnedDesc"),
      icon: <ShieldAlertIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
  ];

  return <FeaturesSection title={t("featuresTitle")} features={features} />;
}
