"use client";

import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

const semibold = (chunks: React.ReactNode) => (
  <strong className="font-semibold">{chunks}</strong>
);

export function AiRulesHeroDescription() {
  const t = useTranslations("AIRules");

  return (
    <Balancer as="p" className="max-w-4xl text-base">
      {t.rich("hero.description", {
        discipline: semibold,
        mdc: semibold,
        ainative: semibold,
        react: semibold,
        protocols: semibold,
        production: semibold,
      })}
    </Balancer>
  );
}
