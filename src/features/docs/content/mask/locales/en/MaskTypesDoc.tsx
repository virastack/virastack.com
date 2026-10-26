import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const presetCode = `type PresetName =
  | "phone" | "iban" // + country: "TR"
  | "card" | "cvv" | "expiry"
  | "tckn" | "vkn"
  | "currency" | "number" // + country: "TR"
  | "date"

type ErrorKey = \`\${string}.\${string}\` // "tckn.invalid"`;

const optionsCode = `// mask, number, currency and date exclude each other
type MaskOptions =
  | { mask: string | string[] | ((value: string, ctx: MaskContext) => string)
      tokens?: Record<string, RegExp | { pattern: RegExp; transform?: (char: string) => string }>
      transform?: "uppercase" | "lowercase"
      normalize?: (value: string) => string
      eager?: boolean }
  | { number: { locale?: string; min?: number; max?: number; scale?: number; signed?: boolean } }
  | { currency: string | { code?: string; locale?: string; min?: number; max?: number; scale?: number } }
  | { date: { format?: DateFormat; min?: DateLimit; max?: DateLimit; minAge?: number } }

// on all of them:
// validate?: (value: string, ctx: MaskContext) => boolean | ErrorKey
// inputMode?, autoComplete?, type?: "text" | "tel"`;

const schemaCode = `type ViraFieldConfig<T> =
  | PresetName
  | Preset
  | ({ name?: Path<T>; from?: Path<T>; rules?: RegisterOptions<T>
       output?: "raw" | "masked"; onComplete?: (value: string) => void }
     & ({ preset: PresetName | Preset } | MaskOptions))

// a key that is not a form path needs name
function useViraMask<T, K extends string>(
  form: UseFormReturn<T>,
  schema: { [P in K]: P extends Path<T> ? ViraFieldConfig<T> : ViraFieldConfig<T> & { name: Path<T> } },
): { readonly [P in K]: MaskField }

interface MaskField {
  name: string
  ref: RefCallback<HTMLInputElement>
  defaultValue: string
  onChange, onBlur, onCompositionEnd
  type: "text" | "tel"
  inputMode: InputMode
  autoComplete?: string
  disabled?: boolean
  "aria-invalid"?: true
}

interface Mask {
  format(value: unknown, ctx?: MaskContext): string
  parse(input: string, ctx?: MaskContext): string
  validate(value: unknown, ctx?: MaskContext): ErrorKey | undefined
  isComplete(value: string, ctx?: MaskContext): boolean
}`;

export function MaskTypesDoc() {
  return (
    <>
      <DocsPageHeader title="Types" description="Exported TypeScript types." />
      <DocsProse>
        <p>
          The package has no <code>any</code>. Field names, <code>from</code>, <code>name</code> and{" "}
          <code>rules</code> come from the form type (or a <AcademyBadge kind="zod" />{" "}
          resolver&apos;s input type).
        </p>

        <h2 id="preset">PresetName</h2>
        <DocsCodeBlock code={presetCode} lang="ts" />

        <h2 id="options">MaskOptions</h2>
        <DocsCodeBlock code={optionsCode} lang="ts" />

        <h2 id="schema">Schema &amp; fields</h2>
        <DocsCodeBlock code={schemaCode} lang="ts" />
      </DocsProse>
    </>
  );
}
