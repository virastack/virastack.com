import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskPresetDemo } from "@/features/docs/components/MaskPresetDemo";
import { Link } from "@/i18n/routing";

const basicCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Example() {
  const form = useForm<{ phone: string }>()
  const { phone } = useViraMask({
    form,
    schema: { phone: "phone" },
  })

  const { rawValue, ...inputProps } = phone

  return <input {...inputProps} placeholder="(555) 555-5555" />
}`;

export async function MaskUseViraMaskDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraMask()"
        description="Mask multiple fields with one hook. Schema field names match form fields."
      />
      <DocsProse>
        <h2 id="temel">Basic usage</h2>
        <ComponentPreview
          preview={<MaskPresetDemo preset="phone" placeholder="(555) 555-5555" />}
          code={basicCode}
        >
          <DocsCodeBlock code={basicCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="schema">Schema</h2>
        <p>Three forms are valid for each field:</p>
        <ul>
          <li>
            <strong>Preset string</strong>: <code>{`{ phone: "phone" }`}</code>
          </li>
          <li>
            <strong>Options object</strong>:{" "}
            <code>{`{ amount: { currency: { decimalSeparator: ",", thousandSeparator: ".", symbol: "₺" } } }`}</code>
          </li>
          <li>
            <strong>Preset + override</strong>:{" "}
            <code>{`{ card: { preset: "card", onCardTypeChange: fn } }`}</code>
          </li>
        </ul>
        <p>
          See the <Link href="/mask/docs/examples">examples</Link> page for all presets. For masks
          from scratch, see <Link href="/mask/docs/custom-mask">custom mask</Link>.
        </p>

        <h2 id="donus">Return value</h2>
        <p>
          <code>useViraMask()</code> returns a <code>MaskField</code> for each key in the schema.
          Strip <code>rawValue</code> before spreading so it never lands on the DOM —{" "}
          <code>value</code> stays in <code>inputProps</code>:{" "}
          <code>{`const { rawValue, ...inputProps } = phone`}</code>
        </p>
        <ul>
          <li>
            <code>value</code>: formatted (display) value
          </li>
          <li>
            <code>rawValue</code>: raw value stored in the form
          </li>
          <li>
            <code>ref</code>, <code>name</code>, <code>onChange</code>, <code>onBlur</code>,{" "}
            <code>onFocus</code>, <code>onKeyDown</code>
          </li>
          <li>
            <code>type</code>, <code>inputMode</code>, <code>autoComplete</code>
          </li>
          <li>
            <code>aria-invalid</code>, <code>aria-describedby</code>, <code>title</code>
          </li>
        </ul>

        <h2 id="rhf">React Hook Form</h2>
        <ul>
          <li>
            Each field is <code>register</code>ed; validation runs under{" "}
            <code>validate.maskFormat</code>.
          </li>
          <li>
            <code>setValue</code> writes the <strong>raw</strong> value to the form (
            <code>shouldValidate</code> / <code>shouldDirty</code> / <code>shouldTouch</code>).
          </li>
          <li>
            Validation runs only when <code>validate: true</code> and the value is not empty;
            details on the <Link href="/mask/docs/validation">validation</Link> page.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
