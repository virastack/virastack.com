import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { Link } from "@/i18n/routing";

const iconsCode = `import { Home, Star } from "lucide-react"
import { useViraPassword } from "@virastack/password"

const { inputProps, btnProps } = useViraPassword({
  icons: {
    show: <Star />,
    hide: <Home />,
  },
})`;

const textCode = `const { inputProps, btnProps } = useViraPassword({
  icons: {
    show: "Show",
    hide: "Hide",
  },
})`;

const propsCode = `const { inputProps, btnProps } = useViraPassword({
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
})`;

const stateCode = `// Input + button disabled; toggle / setVisible no-op
useViraPassword({ disabled: true })

// Input readOnly; button disabled; toggle / setVisible no-op
useViraPassword({ readOnly: true })`;

export async function PasswordCustomizationDoc() {
  return (
    <>
      <DocsPageHeader
        title="Customization"
        description="Icons, text, styling, and locked states: fit your design system with the headless API."
      />
      <DocsProse>
        <h2 id="icons">Icons & text</h2>
        <p>
          The <code>icons</code> field accepts <code>ReactNode</code>: SVG, components, or plain
          text. <code>show</code> renders when the password is hidden; <code>hide</code> when
          visible.
        </p>
        <ComponentPreview preview={<PasswordDemo variant="custom-icons" />} code={iconsCode}>
          <DocsCodeBlock code={iconsCode} lang="tsx" />
        </ComponentPreview>
        <p>Text example:</p>
        <ComponentPreview preview={<PasswordDemo variant="custom-text" />} code={textCode}>
          <DocsCodeBlock code={textCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Default icons can also be imported from the{" "}
          <Link href="/password/docs/helpers">helpers</Link> page. More examples:{" "}
          <Link href="/password/docs/examples/custom-icons">custom icons</Link>,{" "}
          <Link href="/password/docs/examples/custom-text">custom text</Link>.
        </p>

        <h2 id="props">inputProps & btnProps</h2>
        <p>name, autoComplete, className, and extra handlers merge through options:</p>
        <ComponentPreview preview={<PasswordDemo variant="prop-merge" />} code={propsCode}>
          <DocsCodeBlock code={propsCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Merge rules are on the{" "}
          <Link href="/password/docs/use-vira-password">useViraPassword()</Link> page. Example:{" "}
          <Link href="/password/docs/examples/prop-merge">Prop merge</Link>.
        </p>

        <h2 id="state">disabled & readOnly</h2>
        <p>
          In both cases visibility cannot change: the button is disabled, and <code>toggle</code> /{" "}
          <code>setVisible</code> are no-ops.
        </p>
        <ComponentPreview preview={<PasswordDemo variant="disabled" />} code={stateCode}>
          <DocsCodeBlock code={stateCode} lang="tsx" />
        </ComponentPreview>
      </DocsProse>
    </>
  );
}
