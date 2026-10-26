import {
  passwordExampleSketch,
  type PasswordExampleCodeId,
} from "@/features/docs/content/password/examples/example-code.generated";
import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/password/docs";

type DocsPasswordTranslate = (key: string) => string;

export type PasswordExampleComponentId = PasswordExampleCodeId;

export type PasswordExampleMeta = {
  /** URL segment under /examples/ */
  id: PasswordExampleComponentId;
  title: string;
  description: string;
  notes: string[];
  /** The code shown next to the preview; the preview renders the same file. */
  code: string;
};

const PASSWORD_EXAMPLE_IDS = [
  "show-hide",
  "strength-meter",
  "confirm",
  "react-hook-form-zod",
  "server-action",
  "forbidden",
  "pwned",
  "mask-signup",
  "basic",
  "custom-icons",
  "custom-text",
  "disabled",
  "prop-merge",
  "programmatic",
] as const satisfies readonly PasswordExampleComponentId[];

export function getPasswordExamples(t: DocsPasswordTranslate): PasswordExampleMeta[] {
  const example = (
    id: PasswordExampleComponentId,
    title: string,
    description: string,
    notes: string[],
  ): PasswordExampleMeta => ({ id, title, description, notes, code: passwordExampleSketch[id][0] });

  return [
    example("show-hide", t("exampleShowHideTitle"), t("exampleShowHideDescription"), [
      t("exampleShowHideNote0"),
      t("exampleShowHideNote1"),
      t("exampleShowHideNote2"),
    ]),
    example("strength-meter", t("exampleStrengthTitle"), t("exampleStrengthDescription"), [
      t("exampleStrengthNote0"),
      t("exampleStrengthNote1"),
      t("exampleStrengthNote2"),
    ]),
    example("confirm", t("exampleConfirmTitle"), t("exampleConfirmDescription"), [
      t("exampleConfirmNote0"),
      t("exampleConfirmNote1"),
      t("exampleConfirmNote2"),
    ]),
    example("react-hook-form-zod", t("exampleRhfZodTitle"), t("exampleRhfZodDescription"), [
      t("exampleRhfZodNote0"),
      t("exampleRhfZodNote1"),
      t("exampleRhfZodNote2"),
    ]),
    example("server-action", t("exampleServerTitle"), t("exampleServerDescription"), [
      t("exampleServerNote0"),
      t("exampleServerNote1"),
      t("exampleServerNote2"),
    ]),
    example("forbidden", t("exampleForbiddenTitle"), t("exampleForbiddenDescription"), [
      t("exampleForbiddenNote0"),
      t("exampleForbiddenNote1"),
      t("exampleForbiddenNote2"),
    ]),
    example("pwned", t("examplePwnedTitle"), t("examplePwnedDescription"), [
      t("examplePwnedNote0"),
      t("examplePwnedNote1"),
      t("examplePwnedNote2"),
    ]),
    example("mask-signup", t("exampleMaskSignupTitle"), t("exampleMaskSignupDescription"), [
      t("exampleMaskSignupNote0"),
      t("exampleMaskSignupNote1"),
      t("exampleMaskSignupNote2"),
    ]),
    example("basic", t("exampleBasicTitle"), t("exampleBasicDescription"), [
      t("exampleBasicNote0"),
      t("exampleBasicNote1"),
      t("exampleBasicNote2"),
    ]),
    example("custom-icons", t("exampleCustomIconsTitle"), t("exampleCustomIconsDescription"), [
      t("exampleCustomIconsNote0"),
      t("exampleCustomIconsNote1"),
      t("exampleCustomIconsNote2"),
    ]),
    example("custom-text", t("exampleCustomTextTitle"), t("exampleCustomTextDescription"), [
      t("exampleCustomTextNote0"),
      t("exampleCustomTextNote1"),
      t("exampleCustomTextNote2"),
    ]),
    example("disabled", t("exampleDisabledTitle"), t("exampleDisabledDescription"), [
      t("exampleDisabledNote0"),
      t("exampleDisabledNote1"),
      t("exampleDisabledNote2"),
    ]),
    example("prop-merge", t("examplePropMergeTitle"), t("examplePropMergeDescription"), [
      t("examplePropMergeNote0"),
      t("examplePropMergeNote1"),
      t("examplePropMergeNote2"),
    ]),
    example("programmatic", t("exampleProgrammaticTitle"), t("exampleProgrammaticDescription"), [
      t("exampleProgrammaticNote0"),
      t("exampleProgrammaticNote1"),
      t("exampleProgrammaticNote2"),
      t("exampleProgrammaticNote3"),
    ]),
  ];
}

export function getPasswordExample(
  id: string,
  t: DocsPasswordTranslate,
): PasswordExampleMeta | undefined {
  return getPasswordExamples(t).find((example) => example.id === id);
}

export const passwordExampleSlugs = PASSWORD_EXAMPLE_IDS.map((id) => `examples/${id}`);
export const passwordExampleIds = [...PASSWORD_EXAMPLE_IDS];

export function getPasswordDocsNav(t: DocsPasswordTranslate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        { slug: "upgrade", title: t("navUpgrade"), href: `${BASE}/upgrade` },
        { slug: "llms.txt", title: "llms.txt", href: "/password/llms.txt", external: true },
        {
          slug: "llms-full.txt",
          title: "llms-full.txt",
          href: "/password/llms-full.txt",
          external: true,
        },
      ],
    },
    {
      title: t("navUsage"),
      items: [
        {
          slug: "use-vira-password",
          title: "useViraPassword()",
          href: `${BASE}/use-vira-password`,
        },
        { slug: "strength", title: t("navStrength"), href: `${BASE}/strength` },
        { slug: "confirm", title: t("navConfirm"), href: `${BASE}/confirm` },
        { slug: "react-hook-form", title: "React Hook Form", href: `${BASE}/react-hook-form` },
        { slug: "accessibility", title: t("navAccessibility"), href: `${BASE}/accessibility` },
        { slug: "customization", title: t("navCustomization"), href: `${BASE}/customization` },
      ],
    },
    {
      title: t("navServer"),
      items: [
        { slug: "server", title: t("navServerValidation"), href: `${BASE}/server` },
        { slug: "pwned", title: t("navPwned"), href: `${BASE}/pwned` },
      ],
    },
    {
      title: t("navReference"),
      items: [
        { slug: "helpers", title: t("navHelpers"), href: `${BASE}/helpers` },
        { slug: "types", title: t("navTypes"), href: `${BASE}/types` },
        { slug: "ui-libraries", title: t("navUiLibraries"), href: `${BASE}/ui-libraries` },
        { slug: "comparison", title: t("navComparison"), href: `${BASE}/comparison` },
      ],
    },
  ];
}

export function getPasswordExamplesNav(t: DocsPasswordTranslate): DocsNavSection[] {
  const examples = getPasswordExamples(t);

  return [
    {
      title: t("navExamples"),
      items: [
        { slug: "index", title: t("navExamplesAll"), href: "/password/examples" },
        ...[...examples]
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((example) => ({
            slug: example.id,
            title: example.title,
            href: `/password/examples/${example.id}`,
          })),
      ],
    },
  ];
}

export function getPasswordDocsPage(
  slug: string,
  t: DocsPasswordTranslate,
): DocsPageMeta | undefined {
  const examples = getPasswordExamples(t);
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
      ["peer", t("introductionHeadingPeer")],
      ["neden", t("introductionHeadingWhy")],
      ["kapsam", t("introductionHeadingScope")],
    ]),
    upgrade: page("upgrade", t("upgradeTitle"), t("upgradeDescription"), [
      ["ozet", t("upgradeHeadingSummary")],
      ["varsayilanlar", t("upgradeHeadingDefaults")],
      ["yeni", t("upgradeHeadingNew")],
      ["paket", t("upgradeHeadingPackage")],
    ]),
    "use-vira-password": page(
      "use-vira-password",
      "useViraPassword()",
      t("useViraPasswordDescription"),
      [
        ["temel", t("useViraPasswordHeadingBasic")],
        ["options", "Options"],
        ["donus", t("useViraPasswordHeadingReturn")],
        ["merge", "Prop merging"],
      ],
    ),
    strength: page("strength", t("strengthTitle"), t("strengthDescription"), [
      ["policy", "definePolicy()"],
      ["sablonlar", t("strengthHeadingPresets")],
      ["sonuc", t("strengthHeadingResult")],
      ["hook", t("strengthHeadingHook")],
      ["forbidden", "forbidden"],
      ["unicode", "Unicode"],
      ["yapistirma", t("strengthHeadingPaste")],
    ]),
    confirm: page("confirm", t("confirmTitle"), t("confirmDescription"), [
      ["temel", t("confirmHeadingBasic")],
      ["rule", "rule"],
      ["gorunurluk", t("confirmHeadingVisibility")],
    ]),
    "react-hook-form": page("react-hook-form", "React Hook Form", t("rhfDescription"), [
      ["register", "register()"],
      ["value", "useWatch()"],
      ["rule", "rule & deps"],
      ["controller", "Controller"],
      ["zod", t("rhfHeadingZod")],
      ["mask", t("rhfHeadingMask")],
    ]),
    server: page("server", t("serverTitle"), t("serverDescription"), [
      ["giris", t("serverHeadingEntry")],
      ["server-action", "Server Action"],
      ["hash", t("serverHeadingHash")],
      ["nextjs", t("serverHeadingNext")],
    ]),
    pwned: page("pwned", t("pwnedTitle"), t("pwnedDescription"), [
      ["kullanim", t("pwnedHeadingUsage")],
      ["sonuc", t("pwnedHeadingResult")],
      ["gizlilik", t("pwnedHeadingPrivacy")],
    ]),
    accessibility: page("accessibility", t("navAccessibility"), t("accessibilityDescription"), [
      ["aria", t("accessibilityHeadingAria")],
      ["odak", t("accessibilityHeadingFocus")],
      ["canli", t("accessibilityHeadingLive")],
      ["caps", "Caps Lock"],
      ["ids", t("accessibilityHeadingIds")],
    ]),
    customization: page("customization", t("navCustomization"), t("customizationDescription"), [
      ["icons", t("customizationHeadingIcons")],
      ["props", "inputProps & btnProps"],
      ["gizleme", t("customizationHeadingAutoHide")],
      ["autocomplete", "autoComplete"],
      ["state", "disabled & readOnly"],
    ]),
    helpers: page("helpers", t("navHelpers"), t("helpersDescription"), [
      ["core", t("helpersHeadingCore")],
      ["icons", t("helpersHeadingIcons")],
      ["merge", "mergeProps"],
      ["refs", "composeRefs"],
    ]),
    types: page("types", t("navTypes"), t("typesDescription"), [
      ["options", "UseViraPasswordOptions"],
      ["result", "UseViraPasswordResult"],
      ["strength", "/strength"],
      ["server", "/server"],
      ["pwned", "/pwned"],
    ]),
    "ui-libraries": page("ui-libraries", t("uiLibrariesTitle"), t("uiLibrariesDescription"), [
      ["pattern", t("uiLibrariesHeadingPattern")],
      ["shadcn", "shadcn/ui"],
      ["ant-design", "Ant Design"],
      ["chakra", "Chakra UI"],
    ]),
    comparison: page("comparison", t("comparisonTitle"), t("comparisonDescription"), [
      ["tablo", t("comparisonHeadingTable")],
      ["notlar", t("comparisonHeadingNotes")],
    ]),
    examples: {
      slug: "examples",
      title: t("examplesTitle"),
      description: t("examplesDescription"),
      headings: [{ id: "tum", title: t("examplesHeadingAll") }],
    },
    ...Object.fromEntries(
      examples.map((example) => [
        `examples/${example.id}`,
        {
          slug: `examples/${example.id}`,
          title: example.title,
          description: example.description,
          headings: [
            { id: "onizleme", title: t("exampleHeadingPreview") },
            { id: "detaylar", title: t("exampleHeadingDetails") },
          ],
        } satisfies DocsPageMeta,
      ]),
    ),
  };

  return pages[slug];
}

export function isPasswordDocsSlug(slug: string): boolean {
  return slug in passwordDocsSlugSet;
}

export const passwordDocsSlugs = [
  "introduction",
  "upgrade",
  "use-vira-password",
  "strength",
  "confirm",
  "react-hook-form",
  "accessibility",
  "customization",
  "server",
  "pwned",
  "helpers",
  "types",
  "ui-libraries",
  "comparison",
] as const;

const passwordDocsSlugSet: Record<string, true> = Object.fromEntries(
  passwordDocsSlugs.map((slug) => [slug, true as const]),
);
