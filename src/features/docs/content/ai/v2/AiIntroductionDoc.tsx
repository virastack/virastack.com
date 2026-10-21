import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";
import { Link } from "@/i18n/routing";

export function AiIntroductionDoc() {
  const t = useTranslations("DocsAi");

  return (
    <>
      <DocsPageHeader title={t("introductionTitle")} description={t("introductionHeaderDesc")} />
      <DocsProse>
        <p>{t.rich("introductionLead", docsRichTags)}</p>

        <h2 id="what">{t("introductionHeadingWhat")}</h2>
        <ul>
          <li>{t.rich("introductionWhatNative", docsRichTags)}</li>
          <li>{t.rich("introductionWhatMap", docsRichTags)}</li>
          <li>{t.rich("introductionWhatFramework", docsRichTags)}</li>
          <li>{t.rich("introductionWhatManifest", docsRichTags)}</li>
        </ul>

        <h2 id="why">{t("introductionHeadingWhy")}</h2>
        <ul>
          <li>{t.rich("introductionWhySame", docsRichTags)}</li>
          <li>{t.rich("introductionWhyStack", docsRichTags)}</li>
          <li>{t.rich("introductionWhySafe", docsRichTags)}</li>
        </ul>

        <h2 id="quick-start">{t("introductionHeadingQuick")}</h2>
        <p>{t("introductionQuickP")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init")} />
        <p>
          {t.rich("introductionQuickStart", {
            ...docsRichTags,
            start: (chunks) => <Link href="/start/docs">{chunks}</Link>,
          })}
        </p>

        <h2 id="next-steps">{t("introductionHeadingNext")}</h2>
        <ul>
          <li>
            {t.rich("introductionNextInstall", {
              link: (chunks) => <Link href="/ai/docs/installation">{chunks}</Link>,
            })}
          </li>
          <li>
            {t.rich("introductionNextRules", {
              link: (chunks) => <Link href="/ai/docs/rules">{chunks}</Link>,
            })}
          </li>
          <li>
            {t.rich("introductionNextUpgrade", {
              link: (chunks) => <Link href="/ai/docs/upgrade">{chunks}</Link>,
            })}
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
