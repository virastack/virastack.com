import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

const hideCode = `useViraPassword({
  hideOnSubmit: true, // default: hide on form submit and reset
  hideOnBlur: true,   // hide when focus leaves the field or the tab is hidden
})`;

const autoCompleteCode = `useViraPassword() // current-password (login)
useViraPassword({ policy }) // new-password (sign-up)
useViraPassword({ autoComplete: "one-time-code" })
useViraPassword({ autoComplete: false }) // no attribute`;

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
          <code>icons</code> takes any <code>ReactNode</code>: <code>show</code>&#32;renders while
          the password is hidden, <code>hide</code>&#32;while it is visible.
        </p>
        <PasswordExamplePreview id="custom-icons" />
        <PasswordExamplePreview id="custom-text" />

        <h2 id="props">inputProps & btnProps</h2>
        <PasswordExamplePreview id="prop-merge" />
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
        <PasswordExamplePreview id="disabled" />
      </DocsProse>
    </>
  );
}
