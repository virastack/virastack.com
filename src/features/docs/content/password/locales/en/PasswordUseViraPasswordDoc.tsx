import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

type Row = [name: string, fallback: string, description: string];

const optionRows: Row[] = [
  ["defaultVisible", "false", "Initial visibility (uncontrolled)"],
  ["visible", "-", "Controlled visibility"],
  ["onVisibleChange", "-", "(visible) => void; also called on automatic hiding"],
  ["hideOnSubmit", "true", "Hide when the form is submitted or reset"],
  ["hideOnBlur", "false", "Hide when focus leaves the field or the tab is hidden"],
  [
    "autoComplete",
    "current-password",
    "new-password with policy or matchWith; false leaves it out",
  ],
  ["policy", "-", "A policy from definePolicy(); enables strength and issues"],
  ["forbidden", "-", "Values the password must not contain (email, name)"],
  ["matchWith", "-", "The password a confirm field repeats; enables matches"],
  ["value", "-", "Current value, e.g. from useWatch()"],
  ["icons", "Eye / EyeOff", "{ show, hide } as ReactNode"],
  ["disabled", "false", "Locks the input and the toggle"],
  ["readOnly", "false", "Read-only input, disabled toggle"],
  ["id", "useId()", "Input id; the button's aria-controls"],
  ["inputProps", "-", 'Merged into the input props, e.g. register("password")'],
  ["btnProps", "-", "Merged into the button props"],
];

const returnRows: [string, string][] = [
  ["inputProps", "<input {...inputProps} />; attributes only, no ref or handlers"],
  ["btnProps", "<button {...btnProps} />, icon as children"],
  ["isVisible", "Current visibility"],
  ["toggle() / setVisible(v)", "Change visibility (no-op while disabled or readOnly)"],
  ["capsLock", "Caps Lock is on while the input has focus"],
  ["strength", "evaluate() result for the current value, or null without a policy"],
  ["strengthProps", "Live region props for the element that shows strength"],
  ["matches", "true / false with matchWith; null while empty"],
  ["issues", "Error keys: policy issues, then password.mismatch"],
  ["rule", "{ validate } for React Hook Form; returns the first key"],
];

const mergeCode = `useViraPassword({
  inputProps: { onBlur: () => track("blur"), className: "pr-10" },
})
// onBlur: the hook's handler runs first, then yours
// className, aria-describedby: joined with a space
// ref (your own): passed through`;

function PropTable({ rows, head }: { rows: string[][]; head: string[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table>
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, ...rest]) => (
            <tr key={name}>
              <td>
                <code>{name}</code>
              </td>
              {rest.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PasswordUseViraPasswordDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraPassword()"
        description="One hook for the input and its toggle; strength and confirmation are options of the same hook."
      />
      <DocsProse>
        <h2 id="temel">Basic usage</h2>
        <PasswordExamplePreview id="show-hide" />

        <h2 id="options">Options</h2>
        <PropTable head={["Option", "Default", "Description"]} rows={optionRows} />
        <p>
          Strength: <Link href="/password/docs/strength">strength</Link>. Confirm field:{" "}
          <Link href="/password/docs/confirm">confirm password</Link>.
        </p>

        <h2 id="donus">Return value</h2>
        <PropTable head={["Field", "Description"]} rows={returnRows} />

        <h2 id="merge">Prop merging</h2>
        <p>
          Your <code>inputProps</code> and <code>btnProps</code> are applied after the hook&apos;s,
          so most keys can be overridden. These are combined instead:
        </p>
        <DocsCodeBlock code={mergeCode} lang="tsx" />
        <p>
          The returned <code>inputProps</code> holds attributes only, so it can be spread before or
          after <code>register()</code> or a{" "}
          <Link href="/password/docs/react-hook-form">ViraStack Mask</Link> field without replacing
          their ref or handlers.
        </p>
      </DocsProse>
    </>
  );
}
