import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const ariaCode = `<input id="virapassword-input-:r0:" type="password" aria-describedby="…-strength" />
<button
  type="button"
  aria-label="Toggle password visibility"
  aria-pressed="false"
  aria-controls="virapassword-input-:r0:"
/>`;

const labelCode = `useViraPassword({ btnProps: { "aria-label": t("togglePassword") } })`;

const liveCode = `const { inputProps, strength, strengthProps } = useViraPassword({ policy })

<input {...inputProps} />
<p {...strengthProps}>{strength?.level}</p>
// role="status" aria-live="polite" aria-atomic="true"
// the input gets aria-describedby pointing at it`;

export function PasswordAccessibilityDoc() {
  return (
    <>
      <DocsPageHeader
        title="Accessibility"
        description="ARIA, focus after a click, a live region for strength and Caps Lock."
      />
      <DocsProse>
        <h2 id="aria">ARIA attributes</h2>
        <DocsCodeBlock code={ariaCode} lang="html" />
        <ul>
          <li>
            <code>type=&quot;button&quot;</code>: the toggle never submits the form.
          </li>
          <li>
            <code>aria-pressed</code> tells screen readers whether the password is shown;{" "}
            <code>aria-controls</code>&#32;links the button to the input.
          </li>
          <li>The label is in English; translate it through btnProps:</li>
        </ul>
        <DocsCodeBlock code={labelCode} lang="tsx" />

        <h2 id="odak">Focus</h2>
        <ul>
          <li>A mouse or touch press returns focus and the caret to the input.</li>
          <li>Enter or Space on the focused button keeps focus on the button.</li>
          <li>
            Safari skips buttons on Tab unless &quot;Tab to all controls&quot; is on; Option+Tab
            reaches them. That&apos;s a browser setting, not a bug.
          </li>
        </ul>

        <h2 id="canli">Live region</h2>
        <p>
          Spread <code>strengthProps</code>&#32;on the element that shows strength. Announce a short
          level, not every rule, so typing isn&apos;t noisy.
        </p>
        <DocsCodeBlock code={liveCode} lang="tsx" />

        <h2 id="caps">Caps Lock</h2>
        <p>
          <code>capsLock</code>&#32;is true while Caps Lock is on and the input has focus. Show a
          text hint; colour alone isn&apos;t enough.
        </p>

        <h2 id="ids">Stable IDs</h2>
        <p>
          Without <code>id</code>, the input gets one from <code>useId()</code>, which matches
          between server and client. Pass <code>id</code>&#32;when a label or test needs a fixed
          value.
        </p>
      </DocsProse>
    </>
  );
}
