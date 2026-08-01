import {
  CreditCardIcon,
  FeatherIcon,
  FormInputIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";

export function MaskFeatures() {
  const t = useTranslations("Mask");

  const features: FeatureItem[] = [
    {
      title: t("featuresRhfTitle"),
      subtitle: t("featuresRhfSubtitle"),
      description: t("featuresRhfDesc"),
      icon: <FormInputIcon className="size-5" aria-hidden />,
      tone: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300",
    },
    {
      title: t("featuresPresetsTitle"),
      subtitle: t("featuresPresetsSubtitle"),
      description: t("featuresPresetsDesc"),
      icon: <SparklesIcon className="size-5" aria-hidden />,
      tone: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
    },
    {
      title: t("featuresCardsTitle"),
      subtitle: t("featuresCardsSubtitle"),
      description: t("featuresCardsDesc"),
      icon: <CreditCardIcon className="size-5" aria-hidden />,
      tone: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
    },
    {
      title: t("featuresValidationTitle"),
      subtitle: t("featuresValidationSubtitle"),
      description: t("featuresValidationDesc"),
      icon: <ShieldCheckIcon className="size-5" aria-hidden />,
      tone: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
    },
    {
      title: t("featuresCustomTitle"),
      subtitle: t("featuresCustomSubtitle"),
      description: t("featuresCustomDesc"),
      icon: <WandSparklesIcon className="size-5" aria-hidden />,
      tone: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-300",
    },
    {
      title: t("featuresLightTitle"),
      subtitle: t("featuresLightSubtitle"),
      description: t("featuresLightDesc"),
      icon: <FeatherIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
  ];

  return <FeaturesSection title={t("featuresTitle")} features={features} />;
}
