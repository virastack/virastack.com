import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/address/docs";

type DocsAddressTranslate = (key: string) => string;

export function getAddressDocsNav(t: DocsAddressTranslate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [{ slug: "introduction", title: t("navIntroduction"), href: BASE }],
    },
    {
      title: t("navUsage"),
      items: [
        { slug: "use-vira-address", title: "useViraAddress()", href: `${BASE}/use-vira-address` },
        { slug: "react-hook-form", title: "React Hook Form", href: `${BASE}/react-hook-form` },
        { slug: "ui-libraries", title: t("navUiLibraries"), href: `${BASE}/ui-libraries` },
      ],
    },
    {
      title: t("navServerAndData"),
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
  const page = (
    slug: string,
    title: string,
    description: string,
    headings: [id: string, title: string][],
  ): DocsPageMeta => ({
    slug,
    title,
    description,
    headings: headings.map(([id, headingTitle]) => ({ id, title: headingTitle })),
  });

  const pages: Record<string, DocsPageMeta> = {
    introduction: page("introduction", t("introductionTitle"), t("introductionDescription"), [
      ["baslarken", t("introductionHeadingGettingStarted")],
      ["giris-noktalari", t("introductionHeadingEntries")],
      ["gereksinimler", t("introductionHeadingRequirements")],
      ["neden", t("introductionHeadingWhy")],
      ["kapsam", t("introductionHeadingScope")],
    ]),
    "use-vira-address": page(
      "use-vira-address",
      "useViraAddress()",
      t("useViraAddressDescription"),
      [
        ["temel", t("useViraAddressHeadingBasic")],
        ["value", "value"],
        ["secenekler", t("useViraAddressHeadingOptions")],
        ["donus", t("useViraAddressHeadingReturn")],
        ["kaynak", t("useViraAddressHeadingSource")],
      ],
    ),
    "react-hook-form": page("react-hook-form", "React Hook Form", t("reactHookFormDescription"), [
      ["temel", t("reactHookFormHeadingBasic")],
      ["names", "names"],
      ["form-provider", "FormProvider"],
      ["duzenleme", t("reactHookFormHeadingEdit")],
      ["zod", t("reactHookFormHeadingZod")],
      ["diger", t("reactHookFormHeadingOther")],
    ]),
    "ui-libraries": page("ui-libraries", t("uiLibrariesTitle"), t("uiLibrariesDescription"), [
      ["getterlar", t("uiLibrariesHeadingGetters")],
      ["headless", "headless"],
      ["shadcn", "shadcn/ui"],
      ["ant-design", "Ant Design"],
      ["listeler", t("uiLibrariesHeadingCustom")],
      ["uzun-listeler", t("uiLibrariesHeadingLongLists")],
    ]),
    server: page("server", t("serverTitle"), t("serverDescription"), [
      ["resolve", "resolveAddress()"],
      ["sorunlar", t("serverHeadingIssues")],
      ["server-action", "Server Action"],
      ["yardimcilar", t("serverHeadingHelpers")],
      ["nextjs", t("serverHeadingNext")],
    ]),
    data: page("data", t("dataTitle"), t("dataDescription"), [
      ["api", "API"],
      ["maliyet", t("dataHeadingCost")],
      ["loader", t("dataHeadingLoader")],
      ["kaynak", t("dataHeadingSource")],
    ]),
    helpers: page("helpers", t("helpersTitle"), t("helpersDescription"), [
      ["format-name", "formatName"],
      ["search-key", "toSearchKey"],
      ["compare-names", "compareNames"],
    ]),
    types: page("types", t("navTypes"), t("typesDescription"), [
      ["hook", t("typesHeadingHook")],
      ["form", t("typesHeadingForm")],
      ["deger", t("typesHeadingValue")],
      ["server", "/server"],
      ["data", "/data"],
    ]),
  };

  return pages[slug];
}

export const addressDocsSlugs = [
  "introduction",
  "use-vira-address",
  "react-hook-form",
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
