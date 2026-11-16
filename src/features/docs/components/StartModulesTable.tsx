import { useTranslations } from "next-intl";

import { readyFeatures } from "@/config/start-modules.config";

import { Link } from "@/i18n/routing";

/** The ready modules, read from the catalog config so a new module shows up on its own. */
export function StartModulesTable() {
  const t = useTranslations("DocsStart");
  const tCatalog = useTranslations("StartFeatureCatalog");

  return (
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
  );
}
