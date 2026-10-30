import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { TanstackLogo } from "@/components/shared/TanstackLogo";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";
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
                <GuideStackIcon icon={<TanstackLogo />}>{chunks}</GuideStackIcon>
              ),
            })}
          </li>
          <li>
            {t.rich("installationQAgents", {
              ...docsRichTags,
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
              addressPkg: (chunks) => <code>{chunks}</code>,
            })}
          </li>
        </ol>

        <h2 id="sonrasi">{t("installationHeadingAfter")}</h2>
        <p>{t("installationAfterOrder")}</p>
        <ol>
          <li>{t("installationOrderInstall")}</li>
          <li>
            {t.rich("installationOrderNext", {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </li>
          <li>
            {t.rich("installationOrderAi", {
              ai: (chunks) => (
                <GuideProductMark id="ai" linked={false}>
                  {chunks}
                </GuideProductMark>
              ),
              code: (chunks) => <code>{chunks}</code>,
              docs: (chunks) => <Link href="/ai/docs/installed-files">{chunks}</Link>,
            })}
          </li>
          <li>{t("installationOrderSkills")}</li>
          <li>
            {t.rich("installationOrderCommit", {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </li>
        </ol>

        <h3 id="skills">{t("installationHeadingSkills")}</h3>
        <p>
          {t.rich("installationSkillsP", {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </p>
        <ul>
          <li>
            {t.rich("installationSkillEmil", {
              code: (chunks) => <code>{chunks}</code>,
              link: (chunks) => (
                <a href="https://github.com/emilkowalski/skills" target="_blank" rel="noreferrer">
                  {chunks}
                </a>
              ),
            })}
          </li>
          <li>
            {t.rich("installationSkillBetterUi", {
              code: (chunks) => <code>{chunks}</code>,
              link: (chunks) => (
                <a href="https://github.com/jakubkrehel/skills" target="_blank" rel="noreferrer">
                  {chunks}
                </a>
              ),
            })}
          </li>
          <li>
            {t.rich("installationSkillBetterA11y", {
              code: (chunks) => <code>{chunks}</code>,
              link: (chunks) => (
                <a href="https://github.com/jakubkrehel/skills" target="_blank" rel="noreferrer">
                  {chunks}
                </a>
              ),
            })}
          </li>
        </ul>
        <p>
          {t.rich("installationSkillsOffline", {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        <h3 id="prettierignore">{t("installationHeadingPrettier")}</h3>
        <p>
          {t.rich("installationPrettierP", {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        <h3 id="calistir">{t("installationHeadingRun")}</h3>
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
