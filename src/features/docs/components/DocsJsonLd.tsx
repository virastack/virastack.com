import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildBreadcrumbJsonLd, buildDocsArticleJsonLd } from "@/lib/json-ld";

import { JsonLd } from "@/components/shared/JsonLd";

type DocsJsonLdProps = {
  locale: string;
  /** Short product name, e.g. "Mask". */
  productLabel: string;
  productHref: string;
  section: "docs" | "examples";
  /** Locale-independent path of the section's index page. */
  sectionPath: string;
  pageTitle: string;
  description: string;
  /** Locale-independent path of the page itself. */
  path: string;
};

/** Breadcrumbs and a TechArticle for one docs or example page. */
export async function DocsJsonLd({
  locale,
  productLabel,
  productHref,
  section,
  sectionPath,
  pageTitle,
  description,
  path,
}: DocsJsonLdProps) {
  const t = await getTranslations({ locale, namespace: "Seo" });
  const isSectionIndex = path === sectionPath;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd({
          locale,
          items: [
            { name: siteConfig.name, path: "/" },
            { name: `${siteConfig.name} ${productLabel}`, path: productHref },
            {
              name: section === "docs" ? t("docs") : t("examples"),
              ...(isSectionIndex ? {} : { path: sectionPath }),
            },
            ...(isSectionIndex ? [] : [{ name: pageTitle }]),
          ],
        })}
      />
      <JsonLd data={buildDocsArticleJsonLd({ locale, headline: pageTitle, description, path })} />
    </>
  );
}
