import {
  FeatherIcon,
  FormInputIcon,
  ServerIcon,
  ShieldCheckIcon,
  WandSparklesIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";
import { guideCardTags } from "@/features/guide/components/GuideRichText";

export function MaskFeatures() {
  const t = useTranslations("Mask");
  const cardTags = guideCardTags();

  const features: FeatureItem[] = [
    {
      title: t("featuresPresetsTitle"),
      subtitle: t("featuresPresetsSubtitle"),
      description: t.rich("featuresPresetsDesc", cardTags),
      icon: (
        <span className="text-xl leading-none" aria-hidden>
          🇹🇷
        </span>
      ),
      tone: "bg-red-50 dark:bg-red-950/40",
    },
    {
      title: t("featuresRhfTitle"),
      subtitle: t("featuresRhfSubtitle"),
      description: t.rich("featuresRhfDesc", cardTags),
      icon: <FormInputIcon className="size-5" aria-hidden />,
      tone: "bg-brand-mask/10 text-brand-mask",
    },
    {
      title: t("featuresRulesTitle"),
      subtitle: t("featuresRulesSubtitle"),
      description: t.rich("featuresRulesDesc", cardTags),
      icon: <ShieldCheckIcon className="size-5" aria-hidden />,
      tone: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    {
      title: t("featuresValidationTitle"),
      subtitle: t("featuresValidationSubtitle"),
      description: t.rich("featuresValidationDesc", cardTags),
      icon: <ServerIcon className="size-5" aria-hidden />,
      tone: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",
    },
    {
      title: t("featuresCustomTitle"),
      subtitle: t("featuresCustomSubtitle"),
      description: t.rich("featuresCustomDesc", cardTags),
      icon: <WandSparklesIcon className="size-5" aria-hidden />,
      tone: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/40 dark:text-fuchsia-300",
    },
    {
      title: t("featuresLightTitle"),
      subtitle: t("featuresLightSubtitle"),
      description: t.rich("featuresLightDesc", cardTags),
      icon: <FeatherIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
  ];

  return <FeaturesSection title={t("featuresTitle")} features={features} />;
}
