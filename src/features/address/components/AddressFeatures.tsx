import {
  ListTreeIcon,
  MailIcon,
  PuzzleIcon,
  RefreshCwIcon,
  ServerIcon,
  ZapIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";

export function AddressFeatures() {
  const t = useTranslations("Address");

  const features: FeatureItem[] = [
    {
      title: t("featuresChainTitle"),
      subtitle: t("featuresChainSubtitle"),
      description: t("featuresChainDesc"),
      icon: <ListTreeIcon className="size-5" aria-hidden />,
      tone: "bg-brand-address/10 text-brand-address",
    },
    {
      title: t("featuresPostalCodeTitle"),
      subtitle: t("featuresPostalCodeSubtitle"),
      description: t("featuresPostalCodeDesc"),
      icon: <MailIcon className="size-5" aria-hidden />,
      tone: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300",
    },
    {
      title: t("featuresFreshTitle"),
      subtitle: t("featuresFreshSubtitle"),
      description: t("featuresFreshDesc"),
      icon: <RefreshCwIcon className="size-5" aria-hidden />,
      tone: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300",
    },
    {
      title: t("featuresLightTitle"),
      subtitle: t("featuresLightSubtitle"),
      description: t("featuresLightDesc"),
      icon: <ZapIcon className="size-5" aria-hidden />,
      tone: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-300",
    },
    {
      title: t("featuresHeadlessTitle"),
      subtitle: t("featuresHeadlessSubtitle"),
      description: t("featuresHeadlessDesc"),
      icon: <PuzzleIcon className="size-5" aria-hidden />,
      tone: "bg-stone-100 text-stone-700 dark:bg-stone-800/60 dark:text-stone-200",
    },
    {
      title: t("featuresServerTitle"),
      subtitle: t("featuresServerSubtitle"),
      description: t("featuresServerDesc"),
      icon: <ServerIcon className="size-5" aria-hidden />,
      tone: "bg-zinc-50 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200",
    },
  ];

  return <FeaturesSection title={t("featuresTitle")} features={features} />;
}
