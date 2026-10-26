import {
  passwordExampleCode,
  type PasswordExampleCodeId,
} from "@/features/docs/content/password/examples/example-code.generated";
import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/password/docs";

type DocsPasswordTranslate = (key: string) => string;

export type PasswordExampleVariant =
  "basic" | "custom-icons" | "custom-text" | "disabled" | "prop-merge" | "programmatic";

/** Examples rendered by their own component; code comes from example-code.generated.ts. */
export type PasswordExampleComponentId = Exclude<
  PasswordExampleCodeId,
  "password-input" | "password-policy"
>;

export type PasswordExampleMeta = {
  /** URL segment under /examples/ */
  id: string;
  title: string;
  description: string;
  notes: string[];
  code: string;
} & (
  | { variant: PasswordExampleVariant; component?: undefined }
  | { component: PasswordExampleComponentId; variant?: undefined }
);

const PASSWORD_EXAMPLE_COMPONENT_IDS = [
  "show-hide",
  "strength-meter",
  "confirm",
  "react-hook-form-zod",
  "server-action",
  "forbidden",
  "pwned",
  "mask-signup",
] as const satisfies readonly PasswordExampleComponentId[];

const PASSWORD_EXAMPLE_IDS = [
  ...PASSWORD_EXAMPLE_COMPONENT_IDS,
  "basic",
  "custom-icons",
  "custom-text",
  "disabled",
  "prop-merge",
  "programmatic",
] as const;

function getComponentExamples(t: DocsPasswordTranslate): PasswordExampleMeta[] {
  return [
    {
      id: "show-hide",
      component: "show-hide",
      title: t("exampleShowHideTitle"),
      description: t("exampleShowHideDescription"),
      notes: [t("exampleShowHideNote0"), t("exampleShowHideNote1"), t("exampleShowHideNote2")],
      code: passwordExampleCode["show-hide"],
    },
    {
      id: "strength-meter",
      component: "strength-meter",
      title: t("exampleStrengthTitle"),
      description: t("exampleStrengthDescription"),
      notes: [t("exampleStrengthNote0"), t("exampleStrengthNote1"), t("exampleStrengthNote2")],
      code: passwordExampleCode["strength-meter"],
    },
    {
      id: "confirm",
      component: "confirm",
      title: t("exampleConfirmTitle"),
      description: t("exampleConfirmDescription"),
      notes: [t("exampleConfirmNote0"), t("exampleConfirmNote1"), t("exampleConfirmNote2")],
      code: passwordExampleCode.confirm,
    },
    {
      id: "react-hook-form-zod",
      component: "react-hook-form-zod",
      title: t("exampleRhfZodTitle"),
      description: t("exampleRhfZodDescription"),
      notes: [t("exampleRhfZodNote0"), t("exampleRhfZodNote1"), t("exampleRhfZodNote2")],
      code: passwordExampleCode["react-hook-form-zod"],
    },
    {
      id: "server-action",
      component: "server-action",
      title: t("exampleServerTitle"),
      description: t("exampleServerDescription"),
      notes: [t("exampleServerNote0"), t("exampleServerNote1"), t("exampleServerNote2")],
      code: passwordExampleCode["server-action"],
    },
    {
      id: "forbidden",
      component: "forbidden",
      title: t("exampleForbiddenTitle"),
      description: t("exampleForbiddenDescription"),
      notes: [t("exampleForbiddenNote0"), t("exampleForbiddenNote1"), t("exampleForbiddenNote2")],
      code: passwordExampleCode.forbidden,
    },
    {
      id: "pwned",
      component: "pwned",
      title: t("examplePwnedTitle"),
      description: t("examplePwnedDescription"),
      notes: [t("examplePwnedNote0"), t("examplePwnedNote1"), t("examplePwnedNote2")],
      code: passwordExampleCode.pwned,
    },
    {
      id: "mask-signup",
      component: "mask-signup",
      title: t("exampleMaskSignupTitle"),
      description: t("exampleMaskSignupDescription"),
      notes: [
        t("exampleMaskSignupNote0"),
        t("exampleMaskSignupNote1"),
        t("exampleMaskSignupNote2"),
      ],
      code: passwordExampleCode["mask-signup"],
    },
  ];
}

export function getPasswordExamples(t: DocsPasswordTranslate): PasswordExampleMeta[] {
  return [
    ...getComponentExamples(t),
    {
      id: "basic",
      title: t("exampleBasicTitle"),
      description: t("exampleBasicDescription"),
      variant: "basic",
      notes: [t("exampleBasicNote0"), t("exampleBasicNote1"), t("exampleBasicNote2")],
      code: `import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps } = useViraPassword()

  return (
    <div className="relative">
      <input {...inputProps} placeholder="${t("demoPlaceholderPassword")}" />
      <button {...btnProps} />
    </div>
  )
}`,
    },
    {
      id: "custom-icons",
      title: t("exampleCustomIconsTitle"),
      description: t("exampleCustomIconsDescription"),
      variant: "custom-icons",
      notes: [
        t("exampleCustomIconsNote0"),
        t("exampleCustomIconsNote1"),
        t("exampleCustomIconsNote2"),
      ],
      code: `import { Home, Star } from "lucide-react"
import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps } = useViraPassword({
    icons: {
      show: <Star />,
      hide: <Home />,
    },
  })

  return (
    <div className="relative">
      <input {...inputProps} placeholder="${t("demoPlaceholderPassword")}" />
      <button {...btnProps} />
    </div>
  )
}`,
    },
    {
      id: "custom-text",
      title: t("exampleCustomTextTitle"),
      description: t("exampleCustomTextDescription"),
      variant: "custom-text",
      notes: [
        t("exampleCustomTextNote0"),
        t("exampleCustomTextNote1"),
        t("exampleCustomTextNote2"),
      ],
      code: `import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps } = useViraPassword({
    icons: {
      show: "${t("demoShow")}",
      hide: "${t("demoHide")}",
    },
  })

  return (
    <div className="relative">
      <input {...inputProps} placeholder="${t("demoPlaceholderPassword")}" />
      <button {...btnProps} />
    </div>
  )
}`,
    },
    {
      id: "disabled",
      title: t("exampleDisabledTitle"),
      description: t("exampleDisabledDescription"),
      variant: "disabled",
      notes: [t("exampleDisabledNote0"), t("exampleDisabledNote1"), t("exampleDisabledNote2")],
      code: `import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps } = useViraPassword({
    disabled: true,
    // ${t("exampleDisabledCodeComment")}
  })

  return (
    <div className="relative">
      <input {...inputProps} placeholder="${t("demoPlaceholderPassword")}" defaultValue="${t("exampleDisabledDefaultValue")}" />
      <button {...btnProps} />
    </div>
  )
}`,
    },
    {
      id: "prop-merge",
      title: t("examplePropMergeTitle"),
      description: t("examplePropMergeDescription"),
      variant: "prop-merge",
      notes: [t("examplePropMergeNote0"), t("examplePropMergeNote1"), t("examplePropMergeNote2")],
      code: `import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps } = useViraPassword({
    id: "signup-password",
    inputProps: {
      name: "password",
      autoComplete: "new-password",
      className: "pr-10",
    },
    btnProps: {
      className: "absolute inset-y-0 right-2 my-auto",
      onClick: () => analytics.track("password_toggled"),
    },
  })

  return (
    <div className="relative">
      <input {...inputProps} placeholder="${t("demoPlaceholderNewPassword")}" />
      <button {...btnProps} />
    </div>
  )
}`,
    },
    {
      id: "programmatic",
      title: t("exampleProgrammaticTitle"),
      description: t("exampleProgrammaticDescription"),
      variant: "programmatic",
      notes: [
        t("exampleProgrammaticNote0"),
        t("exampleProgrammaticNote1"),
        t("exampleProgrammaticNote2"),
        t("exampleProgrammaticNote3"),
      ],
      code: `import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps, isVisible, setVisible } = useViraPassword({
    defaultVisible: false,
  })

  return (
    <div>
      <div className="relative">
        <input
          {...inputProps}
          placeholder="${t("demoPlaceholderPassword")}"
          onBlur={() => setVisible(false)}
        />
        <button {...btnProps} />
      </div>
      <p>{isVisible ? "${t("demoStatusVisibleCapitalized")}" : "${t("demoStatusHiddenCapitalized")}"}</p>
    </div>
  )
}`,
    },
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
            ...(example.component ? [{ id: "tam-kod", title: t("exampleHeadingFullCode") }] : []),
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
