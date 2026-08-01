import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const helpersCode = `import {
  getInputType,
  getButtonAriaAttributes,
  getInputAriaAttributes,
  mergeProps,
  EyeIcon,
  EyeOffIcon,
} from "@virastack/password"

getInputType(false) // "password"
getInputType(true)  // "text"

getButtonAriaAttributes(true, "pwd-1")
// {
//   "aria-label": "Toggle password visibility",
//   "aria-pressed": true,
//   "aria-controls": "pwd-1",
//   type: "button",
// }

getInputAriaAttributes(true, "pwd-error")
// { "aria-invalid": true, "aria-describedby": "pwd-error" }`;

export function PasswordHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Helpers"
        description="Core helpers, icons, and mergeProps you can use outside the hook."
      />
      <DocsProse>
        <h2 id="core">Core helpers</h2>
        <p>Framework-agnostic functions: usable without React state:</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>getInputType(isVisible)</code>
                </td>
                <td>
                  <code>&quot;password&quot;</code> | <code>&quot;text&quot;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>getButtonAriaAttributes(isVisible, inputId, label?)</code>
                </td>
                <td>
                  <code>aria-*</code> and <code>type=&quot;button&quot;</code> for the button
                </td>
              </tr>
              <tr>
                <td>
                  <code>getInputAriaAttributes(isInvalid?, describedBy?)</code>
                </td>
                <td>
                  Optional <code>aria-invalid</code> / <code>aria-describedby</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <DocsCodeBlock code={helpersCode} lang="ts" />

        <h2 id="icons">Icons</h2>
        <p>
          Default <code>EyeIcon</code> / <code>EyeOffIcon</code> (16×16 SVG,{" "}
          <code>currentColor</code>). The hook renders them; you can import them in your own UI too.
        </p>

        <h2 id="merge">mergeProps</h2>
        <p>
          The merger used by the hook is exported: chains <code>on*</code> handlers, joins{" "}
          <code>className</code> strings, and for other keys the later value wins. Handy for manual
          merges in controlled components.
        </p>
      </DocsProse>
    </>
  );
}
