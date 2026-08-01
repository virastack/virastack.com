import type { MaskPreset } from "@virastack/mask";

import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/mask/docs";

type DocsMaskTranslate = (key: string) => string;

export type MaskExampleMeta = {
  /** URL segment under /examples/ */
  id: string;
  title: string;
  description: string;
  placeholder?: string;
  /** Single-field preset demos */
  preset?: MaskPreset;
  group: "payment" | "identity" | "contact" | "text" | "misc";
  maskPattern?: string;
  notes: string[];
  customizations: { title: string; description: string; code: string }[];
  /** Built-in validator key shown in docs (if any) */
  validator?: string;
};

type MaskExampleDef = {
  id: string;
  preset?: MaskPreset;
  group: MaskExampleMeta["group"];
  maskPattern?: string;
  validator?: string;
  placeholder?: string;
  titleKey: string;
  descriptionKey: string;
  placeholderKey?: string;
  noteKeys: string[];
  customizationKeys: { titleKey: string; descriptionKey: string; codeKey: string }[];
};

const MASK_EXAMPLE_DEFS: MaskExampleDef[] = [
  {
    id: "credit-card",
    group: "payment",
    titleKey: "exampleCreditCardTitle",
    descriptionKey: "exampleCreditCardDescription",
    noteKeys: ["exampleCreditCardNote0", "exampleCreditCardNote1", "exampleCreditCardNote2"],
    customizationKeys: [],
  },
  {
    id: "card",
    preset: "card",
    group: "payment",
    maskPattern: "9999 9999 9999 9999",
    validator: "luhn",
    placeholder: "0000 0000 0000 0000",
    titleKey: "exampleCardTitle",
    descriptionKey: "exampleCardDescription",
    noteKeys: ["exampleCardNote0", "exampleCardNote1", "exampleCardNote2"],
    customizationKeys: [
      {
        titleKey: "exampleCardCustomization0Title",
        descriptionKey: "exampleCardCustomization0Description",
        codeKey: "exampleCardCustomization0Code",
      },
    ],
  },
  {
    id: "expiry",
    preset: "expiry",
    group: "payment",
    maskPattern: "99/99",
    validator: "expiry",
    placeholder: "12/28",
    titleKey: "exampleExpiryTitle",
    descriptionKey: "exampleExpiryDescription",
    noteKeys: ["exampleExpiryNote0"],
    customizationKeys: [],
  },
  {
    id: "cvv",
    preset: "cvv",
    group: "payment",
    maskPattern: "999",
    placeholder: "123",
    titleKey: "exampleCvvTitle",
    descriptionKey: "exampleCvvDescription",
    noteKeys: ["exampleCvvNote0", "exampleCvvNote1", "exampleCvvNote2"],
    customizationKeys: [
      {
        titleKey: "exampleCvvCustomization0Title",
        descriptionKey: "exampleCvvCustomization0Description",
        codeKey: "exampleCvvCustomization0Code",
      },
    ],
  },
  {
    id: "currency",
    preset: "currency",
    group: "payment",
    placeholder: "1.234,56",
    titleKey: "exampleCurrencyTitle",
    descriptionKey: "exampleCurrencyDescription",
    noteKeys: ["exampleCurrencyNote0", "exampleCurrencyNote1"],
    customizationKeys: [
      {
        titleKey: "exampleCurrencyCustomization0Title",
        descriptionKey: "exampleCurrencyCustomization0Description",
        codeKey: "exampleCurrencyCustomization0Code",
      },
    ],
  },
  {
    id: "iban",
    preset: "iban",
    group: "identity",
    maskPattern: "99 9999 9999 9999 9999 9999 99",
    validator: "iban",
    placeholder: "00 0000 0000 0000 0000 0000 00",
    titleKey: "exampleIbanTitle",
    descriptionKey: "exampleIbanDescription",
    noteKeys: ["exampleIbanNote0"],
    customizationKeys: [],
  },
  {
    id: "tckn",
    preset: "tckn",
    group: "identity",
    maskPattern: "99999999999",
    validator: "tckn",
    placeholder: "12345678950",
    titleKey: "exampleTcknTitle",
    descriptionKey: "exampleTcknDescription",
    noteKeys: [],
    customizationKeys: [],
  },
  {
    id: "taxNumber",
    preset: "taxNumber",
    group: "identity",
    maskPattern: "9999999999",
    validator: "vkn",
    placeholder: "1234567890",
    titleKey: "exampleTaxNumberTitle",
    descriptionKey: "exampleTaxNumberDescription",
    noteKeys: [],
    customizationKeys: [],
  },
  {
    id: "phone",
    preset: "phone",
    group: "contact",
    maskPattern: "(999) 999 99 99",
    placeholder: "(555) 555 55 55",
    titleKey: "examplePhoneTitle",
    descriptionKey: "examplePhoneDescription",
    noteKeys: ["examplePhoneNote0"],
    customizationKeys: [
      {
        titleKey: "examplePhoneCustomization0Title",
        descriptionKey: "examplePhoneCustomization0Description",
        codeKey: "examplePhoneCustomization0Code",
      },
    ],
  },
  {
    id: "email",
    preset: "email",
    group: "contact",
    validator: "email",
    placeholder: "hello@virastack.com",
    titleKey: "exampleEmailTitle",
    descriptionKey: "exampleEmailDescription",
    noteKeys: ["exampleEmailNote0"],
    customizationKeys: [],
  },
  {
    id: "url",
    preset: "url",
    group: "contact",
    validator: "url",
    placeholder: "https://virastack.com",
    titleKey: "exampleUrlTitle",
    descriptionKey: "exampleUrlDescription",
    noteKeys: ["exampleUrlNote0"],
    customizationKeys: [],
  },
  {
    id: "zipCode",
    preset: "zipCode",
    group: "contact",
    maskPattern: "99999",
    placeholder: "54100",
    titleKey: "exampleZipCodeTitle",
    descriptionKey: "exampleZipCodeDescription",
    noteKeys: [],
    customizationKeys: [],
  },
  {
    id: "alpha",
    preset: "alpha",
    group: "text",
    placeholder: "Ömer Gülçiçek",
    titleKey: "exampleAlphaTitle",
    descriptionKey: "exampleAlphaDescription",
    noteKeys: ["exampleAlphaNote0", "exampleAlphaNote1"],
    customizationKeys: [],
  },
  {
    id: "username",
    preset: "username",
    group: "text",
    placeholder: "omer-gulcicek",
    titleKey: "exampleUsernameTitle",
    descriptionKey: "exampleUsernameDescription",
    noteKeys: ["exampleUsernameNote0"],
    customizationKeys: [],
  },
  {
    id: "text",
    preset: "text",
    group: "text",
    titleKey: "exampleTextTitle",
    descriptionKey: "exampleTextDescription",
    placeholderKey: "exampleTextPlaceholder",
    noteKeys: [],
    customizationKeys: [],
  },
  {
    id: "password",
    preset: "password",
    group: "text",
    placeholder: "••••••••",
    titleKey: "examplePasswordTitle",
    descriptionKey: "examplePasswordDescription",
    noteKeys: [],
    customizationKeys: [],
  },
  {
    id: "numeric",
    preset: "numeric",
    group: "misc",
    placeholder: "123456",
    titleKey: "exampleNumericTitle",
    descriptionKey: "exampleNumericDescription",
    noteKeys: [],
    customizationKeys: [],
  },
  {
    id: "date",
    preset: "date",
    group: "misc",
    maskPattern: "99/99/9999",
    validator: "date",
    placeholder: "29/07/2026",
    titleKey: "exampleDateTitle",
    descriptionKey: "exampleDateDescription",
    noteKeys: ["exampleDateNote0"],
    customizationKeys: [
      {
        titleKey: "exampleDateCustomization0Title",
        descriptionKey: "exampleDateCustomization0Description",
        codeKey: "exampleDateCustomization0Code",
      },
    ],
  },
];

function buildMaskExample(def: MaskExampleDef, t: DocsMaskTranslate): MaskExampleMeta {
  return {
    id: def.id,
    title: t(def.titleKey),
    description: t(def.descriptionKey),
    placeholder: def.placeholderKey ? t(def.placeholderKey) : def.placeholder,
    preset: def.preset,
    group: def.group,
    maskPattern: def.maskPattern,
    notes: def.noteKeys.map((key) => t(key)),
    customizations: def.customizationKeys.map((keys) => ({
      title: t(keys.titleKey),
      description: t(keys.descriptionKey),
      code: t(keys.codeKey),
    })),
    validator: def.validator,
  };
}

export function getMaskExamples(t: DocsMaskTranslate): MaskExampleMeta[] {
  return MASK_EXAMPLE_DEFS.map((def) => buildMaskExample(def, t));
}

export function getMaskExample(id: string, t: DocsMaskTranslate): MaskExampleMeta | undefined {
  const def = MASK_EXAMPLE_DEFS.find((example) => example.id === id);
  return def ? buildMaskExample(def, t) : undefined;
}

export function getMaskExampleGroups(t: DocsMaskTranslate) {
  return [
    { id: "payment" as const, title: t("groupPayment") },
    { id: "identity" as const, title: t("groupIdentity") },
    { id: "contact" as const, title: t("groupContact") },
    { id: "text" as const, title: t("groupText") },
    { id: "misc" as const, title: t("groupMisc") },
  ];
}

export const maskExampleSlugs = MASK_EXAMPLE_DEFS.map((example) => `examples/${example.id}`);

export function getMaskDocsNav(t: DocsMaskTranslate): DocsNavSection[] {
  const examples = getMaskExamples(t);
  const exampleNavItems = [
    { slug: "examples", title: t("navExamplesAll"), href: `${BASE}/examples` },
    ...[...examples]
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
      .map((example) => ({
        slug: `examples/${example.id}`,
        title: example.title,
        href: `${BASE}/examples/${example.id}`,
      })),
  ];

  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        {
          slug: "llms.txt",
          title: "llms.txt",
          href: "/mask/llms.txt",
          external: true,
        },
      ],
    },
    {
      title: t("navUsage"),
      items: [
        { slug: "use-vira-mask", title: t("navUseViraMask"), href: `${BASE}/use-vira-mask` },
        { slug: "custom-mask", title: t("navCustomMask"), href: `${BASE}/custom-mask` },
        { slug: "validation", title: t("navValidation"), href: `${BASE}/validation` },
        { slug: "helpers", title: t("navHelpers"), href: `${BASE}/helpers` },
        { slug: "types", title: t("navTypes"), href: `${BASE}/types` },
        {
          slug: "ui-libraries",
          title: t("navUiLibraries"),
          href: `${BASE}/ui-libraries`,
        },
      ],
    },
    {
      title: t("navExamples"),
      items: exampleNavItems,
    },
  ];
}

export function getMaskDocsPage(slug: string, t: DocsMaskTranslate): DocsPageMeta | undefined {
  const pages: Record<string, DocsPageMeta> = {
    introduction: {
      slug: "introduction",
      title: t("introductionTitle"),
      description: t("introductionDescription"),
      headings: [
        { id: "baslarken", title: t("introductionHeadingGettingStarted") },
        { id: "peer", title: t("introductionHeadingPeer") },
        { id: "neden", title: t("introductionHeadingWhy") },
        { id: "kapsam", title: t("introductionHeadingScope") },
      ],
    },
    "use-vira-mask": {
      slug: "use-vira-mask",
      title: t("useViraMaskTitle"),
      description: t("useViraMaskDescription"),
      headings: [
        { id: "temel", title: t("useViraMaskHeadingBasic") },
        { id: "schema", title: t("useViraMaskHeadingSchema") },
        { id: "donus", title: t("useViraMaskHeadingReturn") },
        { id: "rhf", title: t("useViraMaskHeadingRhf") },
      ],
    },
    "custom-mask": {
      slug: "custom-mask",
      title: t("customMaskTitle"),
      description: t("customMaskDescription"),
      headings: [
        { id: "sozdizimi", title: t("customMaskHeadingSyntax") },
        { id: "options", title: t("customMaskHeadingOptions") },
        { id: "resolve", title: t("customMaskHeadingResolve") },
      ],
    },
    validation: {
      slug: "validation",
      title: t("validationTitle"),
      description: t("validationDescription"),
      headings: [
        { id: "built-in", title: t("validationHeadingBuiltIn") },
        { id: "ozel", title: t("validationHeadingCustom") },
        { id: "mesaj", title: t("validationHeadingMessage") },
      ],
    },
    helpers: {
      slug: "helpers",
      title: t("helpersTitle"),
      description: t("helpersDescription"),
      headings: [
        { id: "mask", title: t("helpersHeadingMask") },
        { id: "currency", title: t("helpersHeadingCurrency") },
        { id: "card", title: t("helpersHeadingCard") },
        { id: "refs", title: t("helpersHeadingRefs") },
      ],
    },
    types: {
      slug: "types",
      title: t("typesTitle"),
      description: t("typesDescription"),
      headings: [
        { id: "preset", title: t("typesHeadingPreset") },
        { id: "options", title: t("typesHeadingOptions") },
        { id: "schema", title: t("typesHeadingSchema") },
      ],
    },
    "ui-libraries": {
      slug: "ui-libraries",
      title: t("uiLibrariesTitle"),
      description: t("uiLibrariesDescription"),
      headings: [
        { id: "pattern", title: t("uiLibrariesHeadingPattern") },
        { id: "shadcn", title: t("uiLibrariesHeadingShadcn") },
        { id: "ant-design", title: t("uiLibrariesHeadingAntDesign") },
        { id: "chakra", title: t("uiLibrariesHeadingChakra") },
      ],
    },
    examples: {
      slug: "examples",
      title: t("examplesTitle"),
      description: t("examplesDescription"),
      headings: [
        { id: "payment", title: t("groupPayment") },
        { id: "identity", title: t("groupIdentity") },
        { id: "contact", title: t("groupContact") },
        { id: "text", title: t("groupText") },
        { id: "misc", title: t("groupMisc") },
      ],
    },
    ...Object.fromEntries(
      getMaskExamples(t).map((example) => [
        `examples/${example.id}`,
        {
          slug: `examples/${example.id}`,
          title: example.title,
          description: example.description,
          headings: [
            { id: "onizleme", title: t("exampleDetailHeadingPreview") },
            { id: "detaylar", title: t("exampleDetailHeadingDetails") },
            ...(example.customizations.length > 0
              ? [{ id: "ozellestirme", title: t("exampleDetailHeadingCustomization") }]
              : []),
          ],
        } satisfies DocsPageMeta,
      ]),
    ),
  };

  return pages[slug];
}

export function isMaskDocsSlug(slug: string): boolean {
  return slug in maskDocsSlugSet;
}

export const maskDocsSlugs = [
  "introduction",
  "use-vira-mask",
  "custom-mask",
  "validation",
  "helpers",
  "types",
  "ui-libraries",
  "examples",
  ...maskExampleSlugs,
] as const;

const maskDocsSlugSet: Record<string, true> = Object.fromEntries(
  maskDocsSlugs.map((slug) => [slug, true as const]),
);
