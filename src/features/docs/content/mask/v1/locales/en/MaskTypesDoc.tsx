import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const presetTypeCode = `type MaskPreset =
  | "card" | "expiry" | "cvv" | "tckn" | "phone"
  | "email" | "url" | "username" | "alpha" | "password"
  | "text" | "currency" | "iban" | "numeric" | "date"
  | "taxNumber" | "zipCode"`;

const optionsTypeCode = `interface MaskOptions {
  mask?: string
  transform?: "uppercase" | "lowercase"
  allowedChars?: RegExp
  forbiddenChars?: RegExp
  currency?: CurrencyOptions
  displayPrefix?: string
  preset?: MaskPreset
  validate?: boolean
  validator?:
    | ((value: string) => boolean)
    | "luhn" | "tckn" | "email" | "iban"
    | "expiry" | "date" | "url" | "vkn"
  errorMessage?: string
  dateFormat?: "DMY" | "MDY" | "YMD"
  resolveMask?: (
    value: string,
    allValues?: FieldValues,
    schema?: MaskSchema<FieldValues>,
  ) => string | undefined
  onCardTypeChange?: (
    type: "visa" | "mastercard" | "amex" | "troy" | "unknown",
  ) => void
  // + type, inputMode, autoComplete, alphaFormat, usernameFormat…
}`;

export async function MaskTypesDoc() {
  return (
    <>
      <DocsPageHeader title="Types" description="TypeScript types exported from the package." />
      <DocsProse>
        <h2 id="preset">MaskPreset</h2>
        <DocsCodeBlock code={presetTypeCode} lang="ts" />

        <h2 id="options">MaskOptions</h2>
        <p>Notable fields:</p>
        <DocsCodeBlock code={optionsTypeCode} lang="ts" />
        <p>
          <code>CurrencyOptions</code>: <code>precision</code>, <code>decimalSeparator</code>,{" "}
          <code>thousandSeparator</code>, <code>symbol</code>, <code>symbolPosition</code>.
        </p>

        <h2 id="schema">Schema & fields</h2>
        <ul>
          <li>
            <code>MaskSchema&lt;T&gt;</code>: form field name → preset string | MaskOptions
          </li>
          <li>
            <code>UseViraMaskProps</code>: <code>{`{ form, schema }`}</code>
          </li>
          <li>
            <code>MaskField</code>: props spread onto a single input
          </li>
          <li>
            <code>MaskFields&lt;TSchema&gt;</code>: hook return type
          </li>
          <li>
            <code>PRESETS</code>: <code>Record&lt;MaskPreset, MaskOptions&gt;</code>
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
