"use client";

import { useTranslations } from "next-intl";

import {
  academySubNavItems,
  isAcademySubNavItemActive,
  type AcademySubNavId,
} from "@/config/academy-subnav.config";

import { SectionSubHeader } from "@/components/layout/SectionSubHeader";
import { usePathname } from "@/i18n/routing";

const subNavLabelKeys = {
  home: "subNavHome",
  sources: "subNavSources",
  contribute: "subNavContribute",
} as const satisfies Record<AcademySubNavId, string>;

export function AcademySubHeader() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <SectionSubHeader
      ariaLabel={t("academy")}
      items={academySubNavItems.map((item) => ({
        id: item.id,
        href: item.href,
        label: t(subNavLabelKeys[item.id]),
        active: isAcademySubNavItemActive(pathname, item),
      }))}
    />
  );
}
