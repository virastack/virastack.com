import { useTranslations } from "next-intl";

import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Tanstack } from "@/components/ui/svgs/tanstack";
import { Typescript } from "@/components/ui/svgs/typescript";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark, GuideStackIcon } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

export function StartIntroductionDoc() {
  const t = useTranslations("DocsStart");

  return (
    <>
      <DocsPageHeader
        title={t("introductionTitle")}
        description={t.rich("introductionDesc", {
          start: () => (
            <GuideProductMark id="start" linked={false}>
              Start
            </GuideProductMark>
          ),
        })}
      />
      <DocsProse>
        <p>
          {t.rich("introductionP1", {
            nextjs: (chunks) => (
              <GuideStackIcon icon={<NextjsIconDark className="dark:invert" aria-hidden />}>
                {chunks}
              </GuideStackIcon>
            ),
            tanstack: (chunks) => (
              <GuideStackIcon icon={<Tanstack aria-hidden />}>{chunks}</GuideStackIcon>
            ),
            typescript: (chunks) => (
              <GuideStackIcon icon={<Typescript aria-hidden />}>{chunks}</GuideStackIcon>
            ),
          })}
        </p>
        <p>
          {t.rich("introductionP2", {
            mask: (chunks) => (
              <GuideProductMark id="mask" linked={false}>
                {chunks}
              </GuideProductMark>
            ),
            password: (chunks) => (
              <GuideProductMark id="password" linked={false}>
                {chunks}
              </GuideProductMark>
            ),
          })}
        </p>

        <h2 id="neden">
          {t.rich("introductionWhyHeading", {
            start: () => (
              <GuideProductMark id="start" linked={false} tone="heading">
                Start
              </GuideProductMark>
            ),
          })}
        </h2>
        <ul>
          <li>
            {t.rich("introductionWhyCli", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich("introductionWhyProd", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich("introductionWhyAgent", {
              bold: (chunks) => <strong>{chunks}</strong>,
              ai: (chunks) => (
                <GuideProductMark id="ai" linked={false}>
                  {chunks}
                </GuideProductMark>
              ),
            })}
          </li>
        </ul>

        <h2 id="sablonda-neler-var">{t("introductionHeadingWhatsIn")}</h2>
        <p>
          {t.rich("introductionWhatsInP", {
            templates: (chunks) => <Link href="/start/docs/templates#stack">{chunks}</Link>,
            i18n: (chunks) => <Link href="/start/docs/i18n">{chunks}</Link>,
          })}
        </p>
        <p>{t("introductionOutOfScope")}</p>

        <h2 id="baslarken">{t("introductionHeadingGettingStarted")}</h2>
        <p>
          {t.rich("introductionGettingStartedP", {
            installation: (chunks) => <Link href="/start/docs/installation">{chunks}</Link>,
            cli: (chunks) => <Link href="/start/docs/cli">{chunks}</Link>,
            templates: (chunks) => <Link href="/start/docs/templates">{chunks}</Link>,
          })}
        </p>
      </DocsProse>
    </>
  );
}
