import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { Link } from "@/i18n/routing";

const iconsCode = `import { Home, Star } from "lucide-react"
import { useViraPassword } from "@virastack/password"

const { inputProps, btnProps } = useViraPassword({
  icons: { show: <Star />, hide: <Home /> },
})`;

const textCode = `useViraPassword({ icons: { show: "Show", hide: "Hide" } })`;

const propsCode = `useViraPassword({
  id: "signup-password",
  inputProps: { name: "password", className: "pr-10" },
  btnProps: {
    className: "absolute inset-y-0 right-2 my-auto",
    onClick: () => analytics.track("password_toggled"),
  },
})`;

const hideCode = `useViraPassword({
  hideOnSubmit: true, // default: hide on form submit and reset
  hideOnBlur: true,   // hide when focus leaves the field or the tab is hidden
})`;

const autoCompleteCode = `useViraPassword() // current-password (login)
useViraPassword({ policy }) // new-password (sign-up)
useViraPassword({ autoComplete: "one-time-code" })
useViraPassword({ autoComplete: false }) // no attribute`;

const stateCode = `useViraPassword({ disabled: true }) // input and button disabled
useViraPassword({ readOnly: true }) // read-only input, disabled button`;

export function PasswordCustomizationDoc() {
  return (
    <>
      <DocsPageHeader
        title="Customization"
        description="Icons, text, props, automatic hiding, autoComplete and locked states."
      />
      <DocsProse>
        <h2 id="icons">Icons & text</h2>
        <p>
          <code>icons</code> takes any <code>ReactNode</code>: <code>show</code> renders while the
          password is hidden, <code>hide</code> while it is visible.
        </p>
        <ComponentPreview preview={<PasswordDemo variant="custom-icons" />} code={iconsCode}>
          <DocsCodeBlock code={iconsCode} lang="tsx" />
        </ComponentPreview>
        <ComponentPreview preview={<PasswordDemo variant="custom-text" />} code={textCode}>
          <DocsCodeBlock code={textCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="props">inputProps & btnProps</h2>
        <ComponentPreview preview={<PasswordDemo variant="prop-merge" />} code={propsCode}>
          <DocsCodeBlock code={propsCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Merge rules: <Link href="/password/docs/use-vira-password">useViraPassword()</Link>.
        </p>

        <h2 id="gizleme">Automatic hiding</h2>
        <p>
          Hiding on submit lets password managers see a password field when they save. Automatic
          hiding works even while the field is disabled.
        </p>
        <DocsCodeBlock code={hideCode} lang="tsx" />

        <h2 id="autocomplete">autoComplete</h2>
        <DocsCodeBlock code={autoCompleteCode} lang="tsx" />

        <h2 id="state">disabled & readOnly</h2>
        <ComponentPreview preview={<PasswordDemo variant="disabled" />} code={stateCode}>
          <DocsCodeBlock code={stateCode} lang="tsx" />
        </ComponentPreview>
      </DocsProse>
    </>
  );
}
