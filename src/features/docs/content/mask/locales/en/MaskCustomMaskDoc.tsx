import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCustomDemo } from "@/features/docs/content/mask/MaskCustomDemo";

const customCode = `const form = useForm({ defaultValues: { code: "" } })

const { code } = useViraMask({
  form,
  schema: {
    code: {
      mask: "aaa-999",
      transform: "uppercase",
    },
  },
})

const { rawValue, ...inputProps } = code

<input {...inputProps} placeholder="ABC-123" />`;

const resolveMaskCode = `{
  mask: "9999 9999 9999 9999",
  resolveMask: (value) => {
    const digits = value.replace(/\\D/g, "")
    if (digits.startsWith("34") || digits.startsWith("37")) {
      return "9999 999999 99999" // Amex
    }
    return undefined
  },
}`;

export async function MaskCustomMaskDoc() {
  return (
    <>
      <DocsPageHeader
        title="Custom mask"
        description="When presets are not enough, use your own mask string and MaskOptions fields."
      />
      <DocsProse>
        <h2 id="sozdizimi">Syntax</h2>
        <p>Special tokens in the mask string:</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>9</code>
                </td>
                <td>Digit (0–9)</td>
              </tr>
              <tr>
                <td>
                  <code>a</code> / <code>A</code>
                </td>
                <td>
                  Letter (a–z). Use <code>transform</code> for case
                </td>
              </tr>
              <tr>
                <td>
                  <code>*</code>
                </td>
                <td>Any character</td>
              </tr>
              <tr>
                <td>Other</td>
                <td>
                  Literal separator (<code> </code>, <code>/</code>, <code>(</code>, <code>)</code>
                  …)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ComponentPreview preview={<MaskCustomDemo />} code={customCode}>
          <DocsCodeBlock code={customCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="options">MaskOptions</h2>
        <p>Commonly used fields:</p>
        <ul>
          <li>
            <code>mask</code>: pattern string
          </li>
          <li>
            <code>transform</code>: <code>uppercase</code> | <code>lowercase</code>
          </li>
          <li>
            <code>allowedChars</code> / <code>forbiddenChars</code>
          </li>
          <li>
            <code>displayPrefix</code>: shown but not written to raw value (e.g. <code>TR</code> on
            IBAN)
          </li>
          <li>
            <code>currency</code>, <code>dateFormat</code>, <code>alphaFormat</code>,{" "}
            <code>usernameFormat</code>
          </li>
          <li>
            <code>type</code>, <code>inputMode</code>, <code>autoComplete</code>
          </li>
          <li>
            <code>preset</code>: override on top of a preset
          </li>
        </ul>

        <h2 id="resolve">resolveMask</h2>
        <p>
          For dynamic masks, <code>resolveMask(value, allValues, schema)</code> returns a new mask
          string (or <code>undefined</code>). Card (Amex) and CVV presets use this: they update the
          mask based on sibling fields.
        </p>
        <DocsCodeBlock code={resolveMaskCode} lang="ts" />
      </DocsProse>
    </>
  );
}
