import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { Link } from "@/i18n/routing";

const basicCode = `import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps } = useViraPassword()

  return (
    <div className="relative">
      <input {...inputProps} placeholder="Your password" />
      <button {...btnProps} />
    </div>
  )
}`;

export async function PasswordUseViraPasswordDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraPassword()"
        description="Manage input type and the visibility button with a single hook. Props spread directly."
      />
      <DocsProse>
        <h2 id="temel">Basic usage</h2>
        <ComponentPreview preview={<PasswordDemo variant="basic" />} code={basicCode}>
          <DocsCodeBlock code={basicCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="options">Options</h2>
        <p>
          <code>useViraPassword(options?)</code> accepts optional settings:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>defaultVisible</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Initial visibility</td>
              </tr>
              <tr>
                <td>
                  <code>icons</code>
                </td>
                <td>Eye / EyeOff</td>
                <td>
                  <code>{`{ show, hide }`}</code> custom icons
                </td>
              </tr>
              <tr>
                <td>
                  <code>disabled</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Locks input and button</td>
              </tr>
              <tr>
                <td>
                  <code>readOnly</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Input readOnly; button disabled</td>
              </tr>
              <tr>
                <td>
                  <code>id</code>
                </td>
                <td>
                  <code>useId()</code>
                </td>
                <td>
                  Input id; button matches via <code>aria-controls</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>inputProps</code>
                </td>
                <td>—</td>
                <td>Merge with base input props</td>
              </tr>
              <tr>
                <td>
                  <code>btnProps</code>
                </td>
                <td>—</td>
                <td>Merge with base button props</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For icons and styling, see <Link href="/password/docs/customization">customization</Link>;
          for ARIA, see <Link href="/password/docs/accessibility">accessibility</Link>.
        </p>

        <h2 id="donus">Return value</h2>
        <ul>
          <li>
            <code>inputProps</code>: <code>{`<input {...inputProps} />`}</code>
          </li>
          <li>
            <code>btnProps</code>: <code>{`<button {...btnProps} />`}</code> (icon as{" "}
            <code>children</code>)
          </li>
          <li>
            <code>isVisible</code>: current visibility
          </li>
          <li>
            <code>toggle()</code>: toggles visibility
          </li>
          <li>
            <code>setVisible(visible)</code>: sets visibility
          </li>
        </ul>

        <h2 id="merge">Prop merging</h2>
        <p>
          User props are applied after base props. Most keys can be overridden; these fields are
          merged:
        </p>
        <ul>
          <li>
            <code>on*</code> event handlers are called in order (base first, then user)
          </li>
          <li>
            <code>className</code> strings are joined with a space
          </li>
        </ul>
        <p>
          <Link href="/password/docs/helpers">mergeProps</Link> is exported for manual merging.
        </p>
      </DocsProse>
    </>
  );
}
