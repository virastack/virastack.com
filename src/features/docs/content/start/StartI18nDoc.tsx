import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Tanstack } from "@/components/ui/svgs/tanstack";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideStackIcon } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

const rich = {
  bold: (chunks: ReactNode) => <strong>{chunks}</strong>,
  code: (chunks: ReactNode) => <code>{chunks}</code>,
  file: (chunks: ReactNode) => <code>{chunks}</code>,
};

export function StartI18nDoc() {
  const t = useTranslations("DocsStart");

  return (
    <>
      <DocsPageHeader title={t("i18nTitle")} description={t("i18nHeaderDesc")} />
      <DocsProse>
        <h2 id="ne-zaman">{t("i18nHeadingWhen")}</h2>
        <p>
          {t.rich("i18nWhenP", {
            ...rich,
            templates: (chunks) => <Link href="/start/docs/templates">{chunks}</Link>,
          })}
        </p>

        <h2 id="nextjs">
          {t.rich("i18nHeadingNext", {
            nextjs: (chunks) => (
              <GuideStackIcon icon={<NextjsIconDark className="dark:invert" aria-hidden />}>
                {chunks}
              </GuideStackIcon>
            ),
          })}
        </h2>
        <p>{t.rich("i18nNextP", rich)}</p>
        <ul>
          <li>{t.rich("i18nNextLocales", rich)}</li>
          <li>{t.rich("i18nNextMessages", rich)}</li>
          <li>{t.rich("i18nNextPrefix", rich)}</li>
        </ul>
        <p>
          {t.rich("i18nNextDocs", {
            link: (chunks) => (
              <a href="https://next-intl.dev" target="_blank" rel="noreferrer">
                {chunks}
              </a>
            ),
          })}
        </p>

        <h2 id="tanstack">
          {t.rich("i18nHeadingTanstack", {
            tanstack: (chunks) => (
              <GuideStackIcon icon={<Tanstack aria-hidden />}>{chunks}</GuideStackIcon>
            ),
          })}
        </h2>
        <p>{t.rich("i18nTanstackP", rich)}</p>
        <ul>
          <li>{t.rich("i18nTanstackSource", rich)}</li>
          <li>{t.rich("i18nTanstackMessages", rich)}</li>
          <li>{t.rich("i18nTanstackVite", rich)}</li>
        </ul>
        <p>
          {t.rich("i18nTanstackDocs", {
            link: (chunks) => (
              <a
                href="https://inlang.com/m/gerre34r/library-inlang-paraglideJs"
                target="_blank"
                rel="noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </p>

        <h2 id="varsayilan">{t("i18nHeadingDefault")}</h2>
        <p>{t("i18nDefaultP")}</p>
        <ol>
          <li>{t.rich("i18nDefaultStep1", rich)}</li>
          <li>{t.rich("i18nDefaultStep2", rich)}</li>
          <li>{t.rich("i18nDefaultStep3", rich)}</li>
        </ol>
        <p>{t.rich("i18nDefaultTip", rich)}</p>
      </DocsProse>
    </>
  );
}
