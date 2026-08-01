import { useTranslations } from "next-intl";

import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

export function StartScriptsDoc() {
  const t = useTranslations("DocsStart");

  return (
    <>
      <DocsPageHeader title={t("scriptsTitle")} description={t("scriptsHeaderDesc")} />
      <DocsProse>
        <p>{t("scriptsIntro")}</p>

        <h2 id="gunluk">{t("scriptsHeadingDaily")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("scriptsColCommand")}</th>
                <th>{t("scriptsColWhen")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>pnpm dev</code>
                </td>
                <td>{t("scriptsDev")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm build</code>
                </td>
                <td>{t("scriptsBuild")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm start</code>
                </td>
                <td>{t("scriptsStart")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="kalite">{t("scriptsHeadingQuality")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("scriptsColCommand")}</th>
                <th>{t("scriptsColWhen")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>pnpm lint</code>
                </td>
                <td>{t("scriptsLint")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm lint:fix</code>
                </td>
                <td>{t("scriptsLintFix")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm lint:ci</code>
                </td>
                <td>{t("scriptsLintCi")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm format</code>
                </td>
                <td>{t("scriptsFormat")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm format:check</code>
                </td>
                <td>{t("scriptsFormatCheck")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm typecheck</code>
                </td>
                <td>{t("scriptsTypecheck")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm knip</code>
                </td>
                <td>{t("scriptsKnip")}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{t("scriptsQualityTip")}</p>

        <h2 id="framework">{t("scriptsHeadingFramework")}</h2>
        <p>{t("scriptsFrameworkP")}</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("scriptsColCommand")}</th>
                <th>{t("scriptsColTemplate")}</th>
                <th>{t("scriptsColWhen")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>pnpm analyze</code>
                </td>
                <td>
                  <code>nextjs</code>
                </td>
                <td>{t("scriptsAnalyze")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm generate-routes</code>
                </td>
                <td>
                  <code>tanstack</code>
                </td>
                <td>{t("scriptsGenerateRoutes")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm preview</code>
                </td>
                <td>
                  <code>tanstack</code>
                </td>
                <td>{t("scriptsPreview")}</td>
              </tr>
              <tr>
                <td>
                  <code>pnpm clean</code>
                </td>
                <td>
                  <code>tanstack</code>
                </td>
                <td>{t("scriptsClean")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="ci">{t("scriptsHeadingCi")}</h2>
        <p>{t("scriptsCiP")}</p>
        <pre>
          <code>typecheck → lint:ci → knip → build</code>
        </pre>
        <p>
          {t.rich("scriptsCiTip", {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </p>
      </DocsProse>
    </>
  );
}
