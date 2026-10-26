import { FeatherIcon, FormInputIcon, Link2Icon, ServerIcon, WandSparklesIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { TurkeyFlag } from "@/components/icons";
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
      icon: <TurkeyFlag className="h-4 w-6" />,
      tone: "bg-red-50 dark:bg-red-950/40",
    },
    {
      title: t("featuresCardsTitle"),
      subtitle: t("featuresCardsSubtitle"),
      description: t("featuresCardsDesc"),
      icon: <Link2Icon className="size-5" aria-hidden />,
      tone: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
    },
    {
      title: t("featuresValidationTitle"),
      subtitle: t("featuresValidationSubtitle"),
      description: t("featuresValidationDesc"),
      icon: <ServerIcon className="size-5" aria-hidden />,
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
