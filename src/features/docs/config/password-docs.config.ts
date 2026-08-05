import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/password/docs";

type DocsPasswordTranslate = (key: string) => string;

export type PasswordExampleVariant =
  "basic" | "custom-icons" | "custom-text" | "disabled" | "prop-merge" | "programmatic";

export type PasswordExampleMeta = {
  /** URL segment under /examples/ */
  id: string;
  title: string;
  description: string;
  notes: string[];
  code: string;
  variant: PasswordExampleVariant;
};

const PASSWORD_EXAMPLE_IDS = [
  "basic",
  "custom-icons",
  "custom-text",
  "disabled",
  "prop-merge",
  "programmatic",
] as const;

export function getPasswordExamples(t: DocsPasswordTranslate): PasswordExampleMeta[] {
  return [
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

export function getPasswordDocsNav(t: DocsPasswordTranslate): DocsNavSection[] {
  const examples = getPasswordExamples(t);
  const exampleNavItems = [
    { slug: "examples", title: t("navExamplesAll"), href: `${BASE}/examples` },
    ...[...examples]
      .sort((a, b) => a.title.localeCompare(b.title))
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
          href: "/password/llms.txt",
          external: true,
        },
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
        {
          slug: "accessibility",
          title: "Accessibility",
          href: `${BASE}/accessibility`,
        },
        {
          slug: "customization",
          title: "Customization",
          href: `${BASE}/customization`,
        },
        { slug: "helpers", title: "Helpers", href: `${BASE}/helpers` },
        { slug: "types", title: "Types", href: `${BASE}/types` },
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

export function getPasswordDocsPage(
  slug: string,
  t: DocsPasswordTranslate,
): DocsPageMeta | undefined {
  const examples = getPasswordExamples(t);
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
    "use-vira-password": {
      slug: "use-vira-password",
      title: "useViraPassword()",
      description: t("useViraPasswordDescription"),
      headings: [
        { id: "temel", title: t("useViraPasswordHeadingBasic") },
        { id: "options", title: "Options" },
        { id: "donus", title: t("useViraPasswordHeadingReturn") },
        { id: "merge", title: "Prop merging" },
      ],
    },
    accessibility: {
      slug: "accessibility",
      title: "Accessibility",
      description: t("accessibilityDescription"),
      headings: [
        { id: "aria", title: t("accessibilityHeadingAria") },
        { id: "button", title: "type=button" },
        { id: "ids", title: t("accessibilityHeadingIds") },
      ],
    },
    customization: {
      slug: "customization",
      title: "Customization",
      description: t("customizationDescription"),
      headings: [
        { id: "icons", title: t("customizationHeadingIcons") },
        { id: "props", title: "inputProps & btnProps" },
        { id: "state", title: "disabled & readOnly" },
      ],
    },
    helpers: {
      slug: "helpers",
      title: "Helpers",
      description: t("helpersDescription"),
      headings: [
        { id: "core", title: t("helpersHeadingCore") },
        { id: "icons", title: t("helpersHeadingIcons") },
        { id: "merge", title: "mergeProps" },
      ],
    },
    types: {
      slug: "types",
      title: "Types",
      description: t("typesDescription"),
      headings: [
        { id: "options", title: "UseViraPasswordOptions" },
        { id: "result", title: "UseViraPasswordResult" },
      ],
    },
    "ui-libraries": {
      slug: "ui-libraries",
      title: t("uiLibrariesTitle"),
      description: t("uiLibrariesDescription"),
      headings: [
        { id: "pattern", title: t("uiLibrariesHeadingPattern") },
        { id: "shadcn", title: "shadcn/ui" },
        { id: "ant-design", title: "Ant Design" },
        { id: "chakra", title: "Chakra UI" },
      ],
    },
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
  "use-vira-password",
  "accessibility",
  "customization",
  "helpers",
  "types",
  "ui-libraries",
  "examples",
  ...passwordExampleSlugs,
] as const;

const passwordDocsSlugSet: Record<string, true> = Object.fromEntries(
  passwordDocsSlugs.map((slug) => [slug, true as const]),
);
