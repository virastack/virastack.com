"use client";

import { TypeIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeaturesSection, type FeatureItem } from "@/components/shared/FeaturesSection";
import { ClaudeAiIcon } from "@/components/ui/svgs/claudeAiIcon";
import { Html5 } from "@/components/ui/svgs/html5";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { guideCardTags } from "@/features/guide/components/GuideRichText";

const logoTone = "bg-muted";

export function GuideLearn() {
  const t = useTranslations("Guide");
  const cardTags = guideCardTags();

  const features: FeatureItem[] = [
    {
      title: t("learnContentTitle"),
      subtitle: t("learnContentSubtitle"),
      description: t.rich("learnContentDesc", cardTags),
      icon: <Html5 className="size-5" aria-hidden />,
      tone: logoTone,
    },
    {
      title: t("learnStackTitle"),
      subtitle: t("learnStackSubtitle"),
      description: t.rich("learnStackDesc", cardTags),
      icon: (
        <>
          <ReactLight className="size-5 dark:hidden" aria-hidden />
          <ReactDark className="hidden size-5 dark:block" aria-hidden />
        </>
      ),
      tone: logoTone,
    },
    {
      title: t("learnStyleTitle"),
      subtitle: t("learnStyleSubtitle"),
      description: t.rich("learnStyleDesc", cardTags),
      icon: <Tailwindcss className="h-4 w-6" aria-hidden />,
      tone: logoTone,
    },
    {
      title: t("learnTypeTitle"),
      subtitle: t("learnTypeSubtitle"),
      description: t.rich("learnTypeDesc", cardTags),
      icon: <TypeIcon className="size-5" aria-hidden />,
      tone: logoTone,
    },
    {
      title: t("learnUiTitle"),
      subtitle: t("learnUiSubtitle"),
      description: t.rich("learnUiDesc", cardTags),
      icon: <ShadcnUi className="size-5 text-foreground" aria-hidden />,
      tone: logoTone,
    },
    {
      title: t("learnAiTitle"),
      subtitle: t("learnAiSubtitle"),
      description: t.rich("learnAiDesc", cardTags),
      icon: <ClaudeAiIcon className="size-5" aria-hidden />,
      tone: logoTone,
    },
  ];

  return <FeaturesSection title={t("learnTitle")} features={features} />;
}
