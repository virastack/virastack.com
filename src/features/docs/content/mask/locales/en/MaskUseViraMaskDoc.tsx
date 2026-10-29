import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCurrencyFromDemo } from "@/features/docs/components/MaskCurrencyFromDemo";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";
import { Link } from "@/i18n/routing";

const basicCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Example() {
  const form = useForm<{ phone: string }>()
  const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } })

  return <input {...phone} placeholder="(555) 123 45 67" />
}
// form.watch("phone") → "5551234567"`;

const schemaCode = `useViraMask(form, {
  // a preset name
  tckn: "tckn",
  // a preset with overrides
  birthDate: { preset: "date", date: { max: "today", minAge: 18 } },
  // React Hook Form rules pass through
  phone: { preset: "phone", country: "TR", rules: { required: "required" } },
  // nested field: quote the key or set name
  "address.zip": { mask: "99999" },
  zip2: { name: "address.zip2", mask: "99999" },
  // write the masked text into the form
  iban: { preset: "iban", country: "TR", output: "masked" },
  // when the mask is full
  card: { preset: "card", onComplete: () => form.setFocus("expiry") },
})`;

const fromCode = `const form = useForm({ defaultValues: { currency: "TRY", price: "1234.56" } })

const { price } = useViraMask(form, {
  price: { preset: "currency", from: "currency" },
})

<select {...form.register("currency")}>…</select>
<input {...price} />`;

export function MaskUseViraMaskDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraMask()"
        description="Mask several fields with one hook. The form keeps the raw value; the input shows the mask."
      />
      <DocsProse>
        <h2 id="temel">Basic usage</h2>
        <p>
          The first argument is what <code>useForm()</code>&#32;returns, the second is the schema.
          Types come from the form; you don&apos;t write them again.
        </p>
        <ComponentPreview
          preview={
            <MaskFieldDemo
              config={{ preset: "phone", country: "TR" }}
              placeholder="(555) 123 45 67"
            />
          }
          code={basicCode}
        >
          <DocsCodeBlock code={basicCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="schema">Schema</h2>
        <p>
          Keys are field paths of your form. An unknown field, an unknown preset or a wrong option
          is a compile error.
        </p>
        <DocsCodeBlock code={schemaCode} lang="tsx" />
        <ul>
          <li>
            <code>rules</code>: <code>required</code>, <code>minLength</code>, <code>deps</code>,{" "}
            <code>setValueAs</code>, <code>disabled</code>, <code>onChange</code> and the other{" "}
            <code>register</code> rules.
          </li>
          <li>
            <code>country</code>: the Turkish layout for <code>phone</code>, <code>iban</code>,{" "}
            <code>currency</code> and <code>number</code> (<code>&quot;TR&quot;</code> for now). The
            defaults are global.
          </li>
          <li>
            <code>output</code>: <code>&quot;raw&quot;</code> (default) or{" "}
            <code>&quot;masked&quot;</code>.
          </li>
          <li>
            <code>onComplete</code>: runs once when the mask is full. You decide where focus goes.
          </li>
        </ul>

        <h2 id="from">Linked fields (from)</h2>
        <p>
          A mask can depend on another field. The link is explicit and typed: <code>from</code> must
          be a real field of the form.
        </p>
        <ul>
          <li>
            <code>cvv</code> → <code>card</code>: 4 digits for Amex, 3 otherwise.
          </li>
          <li>
            <code>currency</code> → a select: symbol and separators follow the currency.
          </li>
          <li>
            <code>date</code>&#32;→ a start date: the end can&apos;t be before it (
            <code>date.beforeFrom</code>).
          </li>
        </ul>
        <ComponentPreview preview={<MaskCurrencyFromDemo />} code={fromCode}>
          <DocsCodeBlock code={fromCode} lang="tsx" />
        </ComponentPreview>
        <p>
          When the linked field changes the mask is re-applied: if the card turns from Amex to Visa,
          the CVV is trimmed to 3 digits on screen and in the form.
        </p>

        <h2 id="donus">Return value</h2>
        <p>
          Each key returns an object you spread on an input. Every key in it is a valid input prop;
          nothing unknown reaches the DOM.
        </p>
        <ul>
          <li>
            <code>name</code>, <code>ref</code>, <code>defaultValue</code>
          </li>
          <li>
            <code>onChange</code>, <code>onBlur</code>, <code>onCompositionEnd</code>
          </li>
          <li>
            <code>type</code>, <code>inputMode</code>, <code>autoComplete</code>
          </li>
          <li>
            <code>disabled</code> (when set in rules), <code>aria-invalid</code> (when there is an
            error)
          </li>
        </ul>
        <p>
          The input is uncontrolled (<code>defaultValue</code>); don&apos;t pass <code>value</code>.
          Read the raw value with <code>form.watch(&quot;phone&quot;)</code>.
        </p>

        <h2 id="rhf">React Hook Form compatibility</h2>
        <ul>
          <li>
            <code>reset()</code> and <code>setValue()</code> update the input. Pass raw values (ISO
            for dates: <code>2026-07-29</code>).
          </li>
          <li>
            <code>watch</code>, <code>getValues</code>, <code>formState</code>,{" "}
            <code>Controller</code> and <code>useFieldArray</code> work alongside it.
          </li>
          <li>
            Mask validation is added as the <code>validate.mask</code> rule; your own{" "}
            <code>validate</code> rules are kept.
          </li>
          <li>
            With a resolver (<AcademyBadge kind="zod" />, Valibot), wrap it with{" "}
            <Link href="/mask/docs/validation#resolver">maskResolver</Link>.
          </li>
          <li>Formatting waits until IME composition (Chinese, Japanese, dead keys) ends.</li>
        </ul>
      </DocsProse>
    </>
  );
}
