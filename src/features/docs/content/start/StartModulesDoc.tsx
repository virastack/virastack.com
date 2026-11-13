import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { readyFeatures } from "@/config/start-modules.config";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/shared/CodeBlockCommand";
import { GuideProductMark } from "@/components/shared/GuideRichText";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";
import { Link } from "@/i18n/routing";

const catalogLink = (chunks: ReactNode) => <Link href="/start/features">{chunks}</Link>;

/** Prose only: each module's page already shows its code, so this page shows only `add` and `remove`. */
export function StartModulesDoc() {
  const t = useTranslations("DocsStart");
  const tCatalog = useTranslations("StartFeatureCatalog");
  const tags = {
    ...docsRichTags,
    catalog: catalogLink,
    ai: (chunks: ReactNode) => (
      <GuideProductMark id="ai" linked={false}>
        {chunks}
      </GuideProductMark>
    ),
  };

  return (
    <>
      <DocsPageHeader title={t("modulesTitle")} description={t("modulesHeaderDesc")} />
      <DocsProse>
        <h2 id="nedir">{t("modulesHeadingWhat")}</h2>
        <p>{t.rich("modulesWhatP1", tags)}</p>
        <p>{t("modulesWhatP2")}</p>

        <h2 id="hazir">{t("modulesHeadingList")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("modulesColName")}</th>
                <th>{t("modulesColDesc")}</th>
              </tr>
            </thead>
            <tbody>
              {readyFeatures.map(({ id }) => (
                <tr key={id}>
                  <td>
                    <Link href={`/start/features/${id}`}>
                      <code>{id}</code>
                    </Link>
                  </td>
                  <td>{tCatalog(`items.${id}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>{t.rich("modulesListNote", tags)}</p>

        <h2 id="requirements">{t("modulesHeadingRequirements")}</h2>
        <ul>
          <li>{t.rich("modulesReqStart", tags)}</li>
          <li>{t.rich("modulesReqTemplates", tags)}</li>
          <li>{t("modulesReqNetwork")}</li>
        </ul>

        <h2 id="ekle">{t("modulesHeadingAdd")}</h2>
        <p>{t("modulesAddP")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add users")} />
        <p>{t("modulesAddSteps")}</p>
        <ul>
          <li>{t.rich("modulesAddFiles", tags)}</li>
          <li>{t.rich("modulesAddDeps", tags)}</li>
          <li>{t.rich("modulesAddMessages", tags)}</li>
          <li>{t.rich("modulesAddTests", tags)}</li>
          <li>{t.rich("modulesAddOutput", tags)}</li>
        </ul>
        <p>{t.rich("modulesAddNoPage", tags)}</p>
        <p>{t("modulesAddConflict")}</p>

        <h2 id="sayfa">{t("modulesHeadingPage")}</h2>
        <p>{t.rich("modulesPageP", tags)}</p>
        <h3 id="with-an-agent">{t("modulesHeadingPageAgent")}</h3>
        <p>{t.rich("modulesPageAgentP", tags)}</p>
        <h3 id="by-hand">{t("modulesHeadingPageHand")}</h3>
        <p>{t.rich("modulesPageHandP", tags)}</p>
        <ul>
          <li>{t.rich("modulesPageHandNext", tags)}</li>
          <li>{t.rich("modulesPageHandTanstack", tags)}</li>
        </ul>
        <p>{t.rich("modulesPageHandUrl", tags)}</p>

        <h2 id="checkout">{t("modulesHeadingCheckout")}</h2>
        <p>{t.rich("modulesCheckoutP1", tags)}</p>
        <p>{t.rich("modulesCheckoutP2", tags)}</p>
        <p>{t.rich("modulesCheckoutP3", tags)}</p>

        <h2 id="api">{t("modulesHeadingApi")}</h2>
        <p>{t.rich("modulesApiP1", tags)}</p>
        <p>{t.rich("modulesApiP2", tags)}</p>

        <h2 id="kaldir">{t("modulesHeadingRemove")}</h2>
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest remove users")} />
        <p>{t("modulesRemoveP")}</p>
        <p>{t.rich("modulesRemoveChanged", tags)}</p>
        <p>{t.rich("modulesRemovePage", tags)}</p>
      </DocsProse>
    </>
  );
}
