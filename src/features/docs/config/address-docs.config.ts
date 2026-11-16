import type { Translator } from "@/types/messages.types";

import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/address/docs";

type DocsAddressTranslate = Translator<"DocsAddress">;

export function getAddressDocsNav(t: DocsAddressTranslate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        { slug: "llms.txt", title: "llms.txt", href: "/address/llms.txt", external: true },
        {
          slug: "llms-full.txt",
          title: "llms-full.txt",
          href: "/address/llms-full.txt",
          external: true,
        },
      ],
    },
    {
      title: t("navUsage"),
      items: [
        { slug: "use-vira-address", title: "useViraAddress()", href: `${BASE}/use-vira-address` },
        { slug: "react-hook-form", title: "React Hook Form", href: `${BASE}/react-hook-form` },
        { slug: "postal-code", title: t("navPostalCode"), href: `${BASE}/postal-code` },
        { slug: "ui-libraries", title: t("navUiLibraries"), href: `${BASE}/ui-libraries` },
      ],
    },
    {
      title: t("navServer"),
      items: [
        { slug: "server", title: t("navServerValidation"), href: `${BASE}/server` },
        { slug: "data", title: t("navDataset"), href: `${BASE}/data` },
      ],
    },
    {
      title: t("navReference"),
      items: [
        { slug: "helpers", title: t("navHelpers"), href: `${BASE}/helpers` },
        { slug: "types", title: t("navTypes"), href: `${BASE}/types` },
      ],
    },
  ];
}

export function getAddressDocsPage(
  slug: string,
  t: DocsAddressTranslate,
): DocsPageMeta | undefined {
  const page = (slug: string, title: string, description: string): DocsPageMeta => ({
    slug,
    title,
    description,
  });

  const pages: Record<string, DocsPageMeta> = {
    introduction: page("introduction", t("introductionTitle"), t("introductionDescription")),
    "use-vira-address": page(
      "use-vira-address",
      "useViraAddress()",
      t("useViraAddressDescription"),
    ),
    "react-hook-form": page("react-hook-form", "React Hook Form", t("reactHookFormDescription")),
    "postal-code": page("postal-code", t("postalCodeTitle"), t("postalCodeDescription")),
    "ui-libraries": page("ui-libraries", t("uiLibrariesTitle"), t("uiLibrariesDescription")),
    server: page("server", t("serverTitle"), t("serverDescription")),
    data: page("data", t("dataTitle"), t("dataDescription")),
    helpers: page("helpers", t("helpersTitle"), t("helpersDescription")),
    types: page("types", t("navTypes"), t("typesDescription")),
  };

  return pages[slug];
}

export const addressDocsSlugs = [
  "introduction",
  "use-vira-address",
  "react-hook-form",
  "postal-code",
  "ui-libraries",
  "server",
  "data",
  "helpers",
  "types",
] as const;

const addressDocsSlugSet: Record<string, true> = Object.fromEntries(
  addressDocsSlugs.map((slug) => [slug, true as const]),
);

export function isAddressDocsSlug(slug: string): boolean {
  return slug in addressDocsSlugSet;
}
