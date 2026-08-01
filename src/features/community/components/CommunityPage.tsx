"use client";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { SiteSectionHero } from "@/components/shared/SiteSectionHero";

export function CommunityPage() {
  const t = useTranslations("CommunityPage");

  return (
    <SiteSectionHero
      title={t("title")}
      description={t("description")}
      githubHref={siteConfig.links.github}
      githubLabel="virastack"
    />
  );
}
