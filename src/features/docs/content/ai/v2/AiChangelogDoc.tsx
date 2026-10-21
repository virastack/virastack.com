import { useTranslations } from "next-intl";

import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";
import { Link } from "@/i18n/routing";

const CHANGELOG_URL = "https://github.com/virastack/ai/blob/main/CHANGELOG.md";

export function AiChangelogDoc() {
  const t = useTranslations("DocsAi");

  return (
    <>
      <DocsPageHeader title={t("changelogTitle")} description={t("changelogHeaderDesc")} />
      <DocsProse>
        <h2 id="v2-0-0">{t("changelogHeadingV2")}</h2>

        <h3>{t("changelogBreaking")}</h3>
        <ul>
          <li>{t.rich("changelogBreakingLayout", docsRichTags)}</li>
          <li>
            {t.rich("changelogBreakingRenamed", {
              ...docsRichTags,
              upgrade: (chunks) => <Link href="/ai/docs/upgrade#renamed-rules">{chunks}</Link>,
            })}
          </li>
          <li>{t.rich("changelogBreakingAgents", docsRichTags)}</li>
          <li>{t.rich("changelogBreakingApiError", docsRichTags)}</li>
        </ul>

        <h3>{t("changelogAdded")}</h3>
        <ul>
          <li>{t.rich("changelogAddedFlags", docsRichTags)}</li>
          <li>{t.rich("changelogAddedManifest", docsRichTags)}</li>
          <li>{t.rich("changelogAddedMigration", docsRichTags)}</li>
          <li>{t.rich("changelogAddedPackageManager", docsRichTags)}</li>
          <li>{t.rich("changelogAddedConditional", docsRichTags)}</li>
        </ul>

        <h3>{t("changelogChanged")}</h3>
        <ul>
          <li>{t.rich("changelogChangedRules", docsRichTags)}</li>
          <li>{t.rich("changelogChangedNext", docsRichTags)}</li>
          <li>{t.rich("changelogChangedTanstack", docsRichTags)}</li>
          <li>{t.rich("changelogChangedQuery", docsRichTags)}</li>
          <li>{t.rich("changelogChangedZustand", docsRichTags)}</li>
          <li>{t.rich("changelogChangedTesting", docsRichTags)}</li>
          <li>{t.rich("changelogChangedPerformance", docsRichTags)}</li>
        </ul>

        <h3>{t("changelogRemoved")}</h3>
        <ul>
          <li>{t.rich("changelogRemovedItems", docsRichTags)}</li>
        </ul>

        <h2 id="v1">{t("changelogHeadingV1")}</h2>
        <ul>
          <li>{t.rich("changelogV132", docsRichTags)}</li>
          <li>{t.rich("changelogV131", docsRichTags)}</li>
          <li>{t.rich("changelogV130", docsRichTags)}</li>
          <li>{t.rich("changelogV12", docsRichTags)}</li>
          <li>{t.rich("changelogV11", docsRichTags)}</li>
          <li>{t.rich("changelogV10", docsRichTags)}</li>
        </ul>
        <p>
          {t.rich("changelogFull", {
            link: (chunks) => (
              <a href={CHANGELOG_URL} target="_blank" rel="noreferrer">
                {chunks}
              </a>
            ),
          })}
        </p>
      </DocsProse>
    </>
  );
}
