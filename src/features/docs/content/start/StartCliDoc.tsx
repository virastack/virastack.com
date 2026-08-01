import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

export function StartCliDoc() {
  const t = useTranslations("DocsStart");

  return (
    <>
      <DocsPageHeader title={t("cliTitle")} description={t("cliHeaderDesc")} />
      <DocsProse>
        <h2 id="kullanim">{t("cliHeadingUsage")}</h2>
        <p>{t("cliUsageP")}</p>

        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest")} />

        <h2 id="bayraklar">{t("cliHeadingFlags")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("cliFlagCol")}</th>
                <th>{t("cliDescCol")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>init [name]</code>
                </td>
                <td>{t("cliCmdInit")}</td>
              </tr>
              <tr>
                <td>
                  <code>add &lt;tool&gt;</code>
                </td>
                <td>
                  {t.rich("cliCmdAdd", {
                    list: (chunks) => <code>{chunks}</code>,
                  })}
                </td>
              </tr>
              <tr>
                <td>
                  <code>--name &lt;name&gt;</code>
                </td>
                <td>
                  {t.rich("cliFlagName", {
                    dot: (chunks) => <code>{chunks}</code>,
                  })}
                </td>
              </tr>
              <tr>
                <td>
                  <code>--template &lt;name&gt;</code>
                </td>
                <td>
                  <code>nextjs</code> / <code>tanstack</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>--tools &lt;list&gt;</code>
                </td>
                <td>
                  {t.rich("cliFlagTools", {
                    list: (chunks) => <code>{chunks}</code>,
                  })}
                </td>
              </tr>
              <tr>
                <td>
                  <code>--i18n</code> / <code>--no-i18n</code>
                </td>
                <td>{t("cliFlagI18n")}</td>
              </tr>
              <tr>
                <td>
                  <code>--yes</code>, <code>-y</code>
                </td>
                <td>{t("cliFlagYes")}</td>
              </tr>
              <tr>
                <td>
                  <code>--skip-install</code>
                </td>
                <td>{t("cliFlagSkip")}</td>
              </tr>
              <tr>
                <td>
                  <code>--tr</code>
                </td>
                <td>
                  <span className="mr-1.5" aria-hidden>
                    🇹🇷
                  </span>
                  {t("cliFlagTr")}
                </td>
              </tr>
              <tr>
                <td>
                  <code>--telemetry-disable</code>
                </td>
                <td>{t("cliFlagTelemetry")}</td>
              </tr>
              <tr>
                <td>
                  <code>-v</code>, <code>--version</code>
                </td>
                <td>{t("cliFlagVersion")}</td>
              </tr>
              <tr>
                <td>
                  <code>-h</code>, <code>--help</code>
                </td>
                <td>{t("cliFlagHelp")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          {t.rich("cliTip", {
            tr: (chunks) => <code>{chunks}</code>,
            yes: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        <CodeBlockCommand
          {...convertNpmCommand("npx virastack@latest --template nextjs --i18n --yes")}
        />

        <h2 id="add">{t("cliHeadingAdd")}</h2>
        <p>
          {t.rich("cliAddP1", {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add mask")} />
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add password")} />
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add ai")} />

        <p>{t("cliAddP2")}</p>
        <ul>
          <li>
            {t.rich("cliAddMask", {
              tool: (chunks) => <code>{chunks}</code>,
              pkg: (chunks) => <code>{chunks}</code>,
            })}
          </li>
          <li>
            {t.rich("cliAddPassword", {
              tool: (chunks) => <code>{chunks}</code>,
              pkg: (chunks) => <code>{chunks}</code>,
            })}
          </li>
          <li>
            {t.rich("cliAddAi", {
              tool: (chunks) => <code>{chunks}</code>,
              pkg: (chunks) => <code>{chunks}</code>,
            })}
          </li>
        </ul>
        <p>
          {t.rich("cliAddTip", {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        <h2 id="telemetry">{t("cliHeadingTelemetry")}</h2>
        <p>{t("cliTelemetryP1")}</p>
        <p>{t("cliTelemetryP2")}</p>

        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest --telemetry-disable")} />
      </DocsProse>
    </>
  );
}
