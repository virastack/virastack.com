import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const ariaMarkup = `<input
  id="virapassword-input-…"
  type="password"
/>
<button
  type="button"
  aria-label="Toggle password visibility"
  aria-pressed="false"
  aria-controls="virapassword-input-…"
>
  <!-- EyeIcon -->
</button>`;

export function PasswordAccessibilityDoc() {
  return (
    <>
      <DocsPageHeader
        title="Accessibility"
        description="Ready-made ARIA for screen reader and keyboard users; no extra configuration needed."
      />
      <DocsProse>
        <p>
          The hook produces accessible attributes for the button and input. Markup close to the
          default output:
        </p>
        <DocsCodeBlock code={ariaMarkup} lang="html" />

        <h2 id="aria">ARIA attributes</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Where</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>aria-label</code>
                </td>
                <td>button</td>
                <td>
                  Default: <code>Toggle password visibility</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>aria-pressed</code>
                </td>
                <td>button</td>
                <td>Toggle state (visible = true)</td>
              </tr>
              <tr>
                <td>
                  <code>aria-controls</code>
                </td>
                <td>button</td>
                <td>
                  <code>id</code> of the controlled input
                </td>
              </tr>
              <tr>
                <td>
                  <code>aria-invalid</code> / <code>aria-describedby</code>
                </td>
                <td>input (optional)</td>
                <td>
                  Can be added manually with <code>getInputAriaAttributes</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Core helpers are on the <Link href="/password/docs/helpers">helpers</Link> page.
        </p>

        <h2 id="button">type=button</h2>
        <p>
          The toggle always gets <code>type=&quot;button&quot;</code>. This prevents accidental form
          submission: the value is preserved even when you use your own button component (do not
          override it).
        </p>

        <h2 id="ids">Stable IDs</h2>
        <ul>
          <li>
            If no <code>id</code> is provided, React <code>useId()</code> generates{" "}
            <code>virapassword-input-…</code>.
          </li>
          <li>
            The button&apos;s <code>aria-controls</code> links to the same id: multiple password
            fields on one page work safely.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
