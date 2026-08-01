import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Tanstack } from "@/components/ui/svgs/tanstack";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark, GuideStackIcon } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

export function StartInstallationDoc() {
  const t = useTranslations("DocsStart");

  return (
    <>
      <DocsPageHeader title={t("installationTitle")} description={t("installationHeaderDesc")} />
      <DocsProse>
        <h2 id="hizli-baslangic">{t("installationHeadingQuick")}</h2>
        <p>
          {t.rich("installationQuickP", {
            nodejs: (chunks) => (
              <GuideStackIcon icon={<Nodejs aria-hidden />}>{chunks}</GuideStackIcon>
            ),
          })}
        </p>

        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest")} />

        <p>
          {t.rich("installationQuickP2", {
            cli: (chunks) => <Link href="/start/docs/cli">{chunks}</Link>,
          })}
        </p>

        <h2 id="cli-sorulari">{t("installationHeadingQuestions")}</h2>
        <ol>
          <li>
            {t.rich("installationQName", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich("installationQTemplate", {
              bold: (chunks) => <strong>{chunks}</strong>,
              nextjs: (chunks) => (
                <GuideStackIcon icon={<NextjsIconDark className="dark:invert" aria-hidden />}>
                  {chunks}
                </GuideStackIcon>
              ),
              tanstack: (chunks) => (
                <GuideStackIcon icon={<Tanstack aria-hidden />}>{chunks}</GuideStackIcon>
              ),
            })}
          </li>
          <li>
            {t.rich("installationQI18n", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </li>
          <li>
            {t.rich("installationQTools", {
              bold: (chunks) => <strong>{chunks}</strong>,
              maskPkg: (chunks) => <code>{chunks}</code>,
              passwordPkg: (chunks) => <code>{chunks}</code>,
            })}
          </li>
        </ol>

        <h2 id="sonrasi">{t("installationHeadingAfter")}</h2>
        <p>
          {t.rich("installationAfterP1", {
            ai: (chunks) => (
              <GuideProductMark id="ai" linked={false}>
                {chunks}
              </GuideProductMark>
            ),
            agents: (chunks) => <code>{chunks}</code>,
            claude: (chunks) => <code>{chunks}</code>,
            cursor: (chunks) => <code>{chunks}</code>,
          })}
        </p>
        <p>
          {t.rich("installationAfterP2", {
            agentsDir: (chunks) => <code>{chunks}</code>,
          })}
        </p>
        <ul>
          <li>
            {t.rich("installationSkillEmil", {
              emil: (chunks) => <code>{chunks}</code>,
              emilLink: (chunks) => (
                <a href="https://github.com/emilkowalski/skills" target="_blank" rel="noreferrer">
                  {chunks}
                </a>
              ),
            })}
          </li>
          <li>
            {t.rich("installationSkillFeel", {
              feel: (chunks) => <code>{chunks}</code>,
              feelLink: (chunks) => (
                <a
                  href="https://github.com/jakubkrehel/make-interfaces-feel-better"
                  target="_blank"
                  rel="noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </li>
        </ul>
        <p>{t("installationAfterP3")}</p>

        <CodeBlockCommand {...convertNpmCommand("npm run dev")} />

        <p>
          {t.rich("installationAfterP4", {
            landing: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        <h2 id="fixme">{t("installationHeadingFixme")}</h2>
        <p>
          {t.rich("installationFixmeIntro", {
            fixme: (chunks) => <code>{chunks}</code>,
          })}
        </p>
        <ol>
          <li>
            {t.rich("installationFixmeStep1", {
              bold: (chunks) => <strong>{chunks}</strong>,
              file: (chunks) => <code>{chunks}</code>,
              env: (chunks) => <code>{chunks}</code>,
            })}
            <ul>
              <li>
                {t.rich("installationFixmeStep1Next", {
                  bold: (chunks) => <strong>{chunks}</strong>,
                  code: (chunks) => <code>{chunks}</code>,
                })}
              </li>
              <li>
                {t.rich("installationFixmeStep1Tanstack", {
                  bold: (chunks) => <strong>{chunks}</strong>,
                  code: (chunks) => <code>{chunks}</code>,
                })}
              </li>
            </ul>
          </li>
          <li>
            {t.rich("installationFixmeStep2", {
              bold: (chunks) => <strong>{chunks}</strong>,
              file: (chunks) => <code>{chunks}</code>,
              code: (chunks) => <code>{chunks}</code>,
            })}
          </li>
          <li>
            {t.rich("installationFixmeStep3", {
              bold: (chunks) => <strong>{chunks}</strong>,
              file: (chunks) => <code>{chunks}</code>,
              code: (chunks) => <code>{chunks}</code>,
            })}
          </li>
          <li>
            {t.rich("installationFixmeStep4", {
              bold: (chunks) => <strong>{chunks}</strong>,
              file: (chunks) => <code>{chunks}</code>,
              env: (chunks) => <code>{chunks}</code>,
              code: (chunks) => <code>{chunks}</code>,
              fixme: (chunks) => <code>{chunks}</code>,
            })}
          </li>
        </ol>
      </DocsProse>
    </>
  );
}
