import type { Country, MaskSpec, PresetName } from "@virastack/mask";

import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/mask/docs";

type DocsMaskTranslate = ((key: string) => string) & {
  /** Prefer for code snippets, ICU treats `{`/`}` as placeholders. */
  raw?: (key: string) => unknown;
};

/** Code strings must use raw messages; otherwise next-intl ICU eats `{ ... }`. */
function translateCode(t: DocsMaskTranslate, key: string): string {
  if (typeof t.raw === "function") {
    return String(t.raw(key));
  }
  return t(key);
}

export type MaskExampleGroup = "payment" | "identity" | "contact" | "misc";

/** Live preview shown next to a customization snippet. */
export type MaskCustomizationPreview =
  | "currencyFrom"
  | "dateRange"
  | "dateUs"
  | "numberRange"
  | "numberTR"
  | "currencyTR"
  | "phoneTR"
  | "ibanTR";

export type MaskExampleMeta = {
  /** URL segment under /examples/ */
  id: string;
  title: string;
  description: string;
  placeholder?: string;
  /** Single-field preset demos */
  preset?: PresetName;
  /** National layout for `phone` / `iban` */
  country?: Country;
  group: MaskExampleGroup;
  /** Pattern shown in the details list */
  maskPattern?: string;
  /** Example form value shown in the details list */
  formValue?: string;
  notes: string[];
  customizations: {
    title: string;
    description: string;
    code: string;
    /** Stable key for the snippet. */
    codeKey: string;
    preview?: MaskCustomizationPreview;
  }[];
  /** Error keys the preset can return */
  errorKeys: string[];
  /** Built-in validation worth highlighting (checksums, date rules): short title and what it checks. */
  check?: { title: string; description: string };
};

type MaskExampleDef = {
  id: string;
  preset?: PresetName;
  country?: Country;
  group: MaskExampleGroup;
  maskPattern?: string;
  formValue?: string;
  placeholder?: string;
  titleKey: string;
  descriptionKey: string;
  noteKeys: string[];
  customizationKeys: {
    titleKey: string;
    descriptionKey: string;
    codeKey: string;
    preview?: MaskCustomizationPreview;
  }[];
  errorKeys?: string[];
  /** Message key prefix for the built-in validation callout (`<key>Title`, `<key>Description`). */
  checkKey?: string;
};

const MASK_EXAMPLE_DEFS: MaskExampleDef[] = [
  {
    id: "credit-card",
    checkKey: "exampleCreditCardCheck",
    group: "payment",
    titleKey: "exampleCreditCardTitle",
    descriptionKey: "exampleCreditCardDescription",
    noteKeys: ["exampleCreditCardNote0", "exampleCreditCardNote1", "exampleCreditCardNote2"],
    customizationKeys: [],
  },
  {
    id: "card",
    checkKey: "exampleCardCheck",
    preset: "card",
    group: "payment",
    maskPattern: "9999 9999 9999 9999 · Amex 9999 999999 99999",
    formValue: "4111111111111111",
    placeholder: "0000 0000 0000 0000",
    titleKey: "exampleCardTitle",
    descriptionKey: "exampleCardDescription",
    noteKeys: ["exampleCardNote0", "exampleCardNote1"],
    customizationKeys: [
      {
        titleKey: "exampleCardCustomization0Title",
        descriptionKey: "exampleCardCustomization0Description",
        codeKey: "exampleCardCustomization0Code",
      },
      {
        titleKey: "exampleCardCustomization1Title",
        descriptionKey: "exampleCardCustomization1Description",
        codeKey: "exampleCardCustomization1Code",
      },
    ],
    errorKeys: ["card.incomplete", "card.invalid"],
  },
  {
    id: "expiry",
    checkKey: "exampleExpiryCheck",
    preset: "expiry",
    group: "payment",
    maskPattern: "99/99",
    formValue: "1228",
    placeholder: "12/28",
    titleKey: "exampleExpiryTitle",
    descriptionKey: "exampleExpiryDescription",
    noteKeys: ["exampleExpiryNote0"],
    customizationKeys: [],
    errorKeys: ["expiry.incomplete", "expiry.invalid", "expiry.min"],
  },
  {
    id: "cvv",
    preset: "cvv",
    group: "payment",
    maskPattern: "999 · Amex 9999",
    formValue: "123",
    placeholder: "123",
    titleKey: "exampleCvvTitle",
    descriptionKey: "exampleCvvDescription",
    noteKeys: ["exampleCvvNote0", "exampleCvvNote1"],
    customizationKeys: [
      {
        titleKey: "exampleCvvCustomization0Title",
        descriptionKey: "exampleCvvCustomization0Description",
        codeKey: "exampleCvvCustomization0Code",
      },
    ],
    errorKeys: ["cvv.incomplete"],
  },
  {
    id: "currency",
    preset: "currency",
    group: "payment",
    formValue: "1234.56",
    placeholder: "1,234.56",
    titleKey: "exampleCurrencyTitle",
    descriptionKey: "exampleCurrencyDescription",
    noteKeys: ["exampleCurrencyNote0", "exampleCurrencyNote1"],
    customizationKeys: [
      {
        titleKey: "exampleCurrencyTRCustomizationTitle",
        descriptionKey: "exampleCurrencyTRCustomizationDescription",
        codeKey: "exampleCurrencyTRCustomizationCode",
        preview: "currencyTR",
      },
      {
        titleKey: "exampleCurrencyCustomization0Title",
        descriptionKey: "exampleCurrencyCustomization0Description",
        codeKey: "exampleCurrencyCustomization0Code",
        preview: "currencyFrom",
      },
      {
        titleKey: "exampleCurrencyCustomization1Title",
        descriptionKey: "exampleCurrencyCustomization1Description",
        codeKey: "exampleCurrencyCustomization1Code",
      },
      {
        titleKey: "exampleCurrencyCustomization2Title",
        descriptionKey: "exampleCurrencyCustomization2Description",
        codeKey: "exampleCurrencyCustomization2Code",
      },
    ],
    errorKeys: ["currency.min", "currency.max"],
  },
  {
    id: "tckn",
    checkKey: "exampleTcknCheck",
    preset: "tckn",
    group: "identity",
    maskPattern: "99999999999",
    formValue: "10000000146",
    placeholder: "10000000146",
    titleKey: "exampleTcknTitle",
    descriptionKey: "exampleTcknDescription",
    noteKeys: [],
    customizationKeys: [],
    errorKeys: ["tckn.incomplete", "tckn.invalid"],
  },
  {
    id: "vkn",
    checkKey: "exampleVknCheck",
    preset: "vkn",
    group: "identity",
    maskPattern: "9999999999",
    formValue: "1234567890",
    placeholder: "1234567890",
    titleKey: "exampleVknTitle",
    descriptionKey: "exampleVknDescription",
    noteKeys: [],
    customizationKeys: [],
    errorKeys: ["vkn.incomplete", "vkn.invalid"],
  },
  {
    id: "iban",
    checkKey: "exampleIbanCheck",
    preset: "iban",
    group: "identity",
    maskPattern: "aa99 **** **** ***[* **** …]",
    formValue: "GB82WEST12345698765432",
    placeholder: "GB82 WEST 1234 5698 7654 32",
    titleKey: "exampleIbanTitle",
    descriptionKey: "exampleIbanDescription",
    noteKeys: ["exampleIbanNote0"],
    customizationKeys: [
      {
        titleKey: "exampleIbanCustomization0Title",
        descriptionKey: "exampleIbanCustomization0Description",
        codeKey: "exampleIbanCustomization0Code",
        preview: "ibanTR",
      },
    ],
    errorKeys: ["iban.incomplete", "iban.invalid"],
  },
  {
    id: "phone",
    preset: "phone",
    group: "contact",
    maskPattern: "{+}9999999[99999999] · +90 → {+}99 (999) 999 99 99",
    formValue: "+905551234567",
    placeholder: "+90 (555) 123 45 67",
    titleKey: "examplePhoneTitle",
    descriptionKey: "examplePhoneDescription",
    noteKeys: ["examplePhoneNote0"],
    customizationKeys: [
      {
        titleKey: "examplePhoneCustomization0Title",
        descriptionKey: "examplePhoneCustomization0Description",
        codeKey: "examplePhoneCustomization0Code",
        preview: "phoneTR",
      },
      {
        titleKey: "examplePhoneCustomization1Title",
        descriptionKey: "examplePhoneCustomization1Description",
        codeKey: "examplePhoneCustomization1Code",
      },
    ],
    errorKeys: ["phone.incomplete"],
  },
  {
    id: "number",
    preset: "number",
    group: "misc",
    formValue: "1234",
    placeholder: "1,234",
    titleKey: "exampleNumberTitle",
    descriptionKey: "exampleNumberDescription",
    noteKeys: ["exampleNumberNote0"],
    customizationKeys: [
      {
        titleKey: "exampleNumberCustomization0Title",
        descriptionKey: "exampleNumberCustomization0Description",
        codeKey: "exampleNumberCustomization0Code",
        preview: "numberRange",
      },
      {
        titleKey: "exampleNumberCustomization1Title",
        descriptionKey: "exampleNumberCustomization1Description",
        codeKey: "exampleNumberCustomization1Code",
        preview: "numberTR",
      },
    ],
    errorKeys: ["number.min", "number.max"],
  },
  {
    id: "date",
    checkKey: "exampleDateCheck",
    preset: "date",
    group: "misc",
    maskPattern: "99/99/9999",
    formValue: "2026-07-29",
    placeholder: "29/07/2026",
    titleKey: "exampleDateTitle",
    descriptionKey: "exampleDateDescription",
    noteKeys: ["exampleDateNote0", "exampleDateNote1"],
    customizationKeys: [
      {
        titleKey: "exampleDateCustomization0Title",
        descriptionKey: "exampleDateCustomization0Description",
        codeKey: "exampleDateCustomization0Code",
      },
      {
        titleKey: "exampleDateCustomization1Title",
        descriptionKey: "exampleDateCustomization1Description",
        codeKey: "exampleDateCustomization1Code",
        preview: "dateRange",
      },
      {
        titleKey: "exampleDateCustomization2Title",
        descriptionKey: "exampleDateCustomization2Description",
        codeKey: "exampleDateCustomization2Code",
        preview: "dateUs",
      },
    ],
    errorKeys: [
      "date.incomplete",
      "date.invalid",
      "date.min",
      "date.max",
      "date.minAge",
      "date.beforeFrom",
    ],
  },
  {
    id: "password",
    group: "misc",
    titleKey: "examplePasswordTitle",
    descriptionKey: "examplePasswordDescription",
    noteKeys: ["examplePasswordNote0", "examplePasswordNote1"],
    customizationKeys: [],
  },
  {
    id: "custom",
    group: "misc",
    maskPattern: "99 a[aa] 99[99]",
    formValue: "34ABC123",
    placeholder: "34 ABC 123",
    titleKey: "exampleCustomTitle",
    descriptionKey: "exampleCustomDescription",
    noteKeys: ["exampleCustomNote0", "exampleCustomNote1"],
    customizationKeys: [
      {
        titleKey: "exampleCustomCustomization0Title",
        descriptionKey: "exampleCustomCustomization0Description",
        codeKey: "exampleCustomCustomization0Code",
      },
    ],
    errorKeys: ["plate.incomplete"],
  },
];

function buildMaskExample(def: MaskExampleDef, t: DocsMaskTranslate): MaskExampleMeta {
  return {
    id: def.id,
    title: t(def.titleKey),
    description: t(def.descriptionKey),
    placeholder: def.placeholder,
    preset: def.preset,
    country: def.country,
    group: def.group,
    maskPattern: def.maskPattern,
    formValue: def.formValue,
    notes: def.noteKeys.map((key) => t(key)),
    customizations: def.customizationKeys.map((keys) => ({
      title: t(keys.titleKey),
      description: t(keys.descriptionKey),
      code: translateCode(t, keys.codeKey),
      codeKey: keys.codeKey,
      preview: keys.preview,
    })),
    errorKeys: def.errorKeys ?? [],
    check: def.checkKey
      ? { title: t(`${def.checkKey}Title`), description: t(`${def.checkKey}Description`) }
      : undefined,
  };
}

/** The mask spec a single-field example renders, e.g. `{ preset: "phone", country: "TR" }`. */
export function getMaskExampleSpec(example: MaskExampleMeta): MaskSpec | undefined {
  if (!example.preset) return undefined;
  const { country } = example;
  if (!country) return example.preset;
  switch (example.preset) {
    case "phone":
      return { preset: "phone", country };
    case "iban":
      return { preset: "iban", country };
    case "currency":
      return { preset: "currency", country };
    case "number":
      return { preset: "number", country };
    default:
      return example.preset;
  }
}

/** Short label for an example card, e.g. `phone · TR`. */
export function getMaskExampleLabel(example: MaskExampleMeta): string | undefined {
  if (!example.preset) return undefined;
  return example.country ? `${example.preset} · ${example.country}` : example.preset;
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
    { id: "misc" as const, title: t("groupMisc") },
  ];
}

export const maskExampleSlugs = MASK_EXAMPLE_DEFS.map((example) => `examples/${example.id}`);

export function getMaskDocsNav(t: DocsMaskTranslate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        { slug: "upgrade", title: t("navUpgrade"), href: `${BASE}/upgrade` },
        {
          slug: "llms.txt",
          title: "llms.txt",
          href: "/mask/llms.txt",
          external: true,
        },
        {
          slug: "llms-full.txt",
          title: "llms-full.txt",
          href: "/mask/llms-full.txt",
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
        { slug: "server", title: t("navServer"), href: `${BASE}/server` },
        { slug: "helpers", title: t("navHelpers"), href: `${BASE}/helpers` },
        { slug: "types", title: t("navTypes"), href: `${BASE}/types` },
        {
          slug: "ui-libraries",
          title: t("navUiLibraries"),
          href: `${BASE}/ui-libraries`,
        },
      ],
    },
  ];
}

export function getMaskExamplesNav(t: DocsMaskTranslate): DocsNavSection[] {
  const examples = getMaskExamples(t);

  return [
    {
      title: t("navExamples"),
      items: [
        { slug: "index", title: t("navExamplesAll"), href: "/mask/examples" },
        ...[...examples]
          .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
          .map((example) => ({
            slug: example.id,
            title: example.title,
            href: `/mask/examples/${example.id}`,
          })),
      ],
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
        { id: "karsilastirma", title: t("introductionHeadingComparison") },
        { id: "kapsam", title: t("introductionHeadingScope") },
      ],
    },
    upgrade: {
      slug: "upgrade",
      title: t("upgradeTitle"),
      description: t("upgradeDescription"),
      headings: [
        { id: "prompt", title: t("upgradeHeadingPrompt") },
        { id: "imza", title: t("upgradeHeadingSignature") },
        { id: "raw", title: t("upgradeHeadingRaw") },
        { id: "presetler", title: t("upgradeHeadingPresets") },
        { id: "secenekler", title: t("upgradeHeadingOptions") },
        { id: "dogrulama", title: t("upgradeHeadingValidation") },
        { id: "yardimcilar", title: t("upgradeHeadingHelpers") },
      ],
    },
    "use-vira-mask": {
      slug: "use-vira-mask",
      title: t("useViraMaskTitle"),
      description: t("useViraMaskDescription"),
      headings: [
        { id: "temel", title: t("useViraMaskHeadingBasic") },
        { id: "schema", title: t("useViraMaskHeadingSchema") },
        { id: "from", title: t("useViraMaskHeadingFrom") },
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
        { id: "dinamik", title: t("customMaskHeadingDynamic") },
        { id: "sayi-tarih", title: t("customMaskHeadingNumberDate") },
        { id: "preset", title: t("customMaskHeadingPreset") },
      ],
    },
    validation: {
      slug: "validation",
      title: t("validationTitle"),
      description: t("validationDescription"),
      headings: [
        { id: "anahtarlar", title: t("validationHeadingKeys") },
        { id: "ozel", title: t("validationHeadingCustom") },
        { id: "resolver", title: t("validationHeadingResolver") },
      ],
    },
    server: {
      slug: "server",
      title: t("serverTitle"),
      description: t("serverDescription"),
      headings: [
        { id: "giris", title: t("serverHeadingEntry") },
        { id: "server-action", title: t("serverHeadingAction") },
        { id: "standard-schema", title: t("serverHeadingStandardSchema") },
      ],
    },
    helpers: {
      slug: "helpers",
      title: t("helpersTitle"),
      description: t("helpersDescription"),
      headings: [
        { id: "create-mask", title: t("helpersHeadingCreateMask") },
        { id: "validators", title: t("helpersHeadingValidators") },
        { id: "money", title: t("helpersHeadingMoney") },
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
            ...(example.id === "card" || example.id === "credit-card"
              ? [{ id: "kart-aglari", title: t("cardNetworksHeading") }]
              : []),
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
  "upgrade",
  "use-vira-mask",
  "custom-mask",
  "validation",
  "server",
  "helpers",
  "types",
  "ui-libraries",
] as const;

export const maskExampleIds = MASK_EXAMPLE_DEFS.map((example) => example.id);

const maskDocsSlugSet: Record<string, true> = Object.fromEntries(
  maskDocsSlugs.map((slug) => [slug, true as const]),
);
