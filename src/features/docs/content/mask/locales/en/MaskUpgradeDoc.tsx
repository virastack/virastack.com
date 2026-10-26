import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPromptBlock } from "@/features/docs/components/DocsPromptBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MASK_UPGRADE_PROMPT } from "@/features/docs/content/mask/mask-upgrade-prompt";
import { Link } from "@/i18n/routing";

const signatureCode = `- const { phone } = useViraMask({ form, schema: { phone: "phone" } })
+ const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } })`;

const rawCode = `- const { rawValue, ...inputProps } = phone
- <input {...inputProps} />
+ <input {...phone} />
+ const raw = form.watch("phone") // "5551234567"`;

const resolverCode = `useForm({ resolver: maskResolver(masks, zodResolver(schema)) })`;

type Row = [string, string];

const presetRows: Row[] = [
  [
    "phone (US layout)",
    '{ preset: "phone", country: "TR" } → (555) 123 45 67; "phone" → E.164 (+905551234567). For a US layout: { mask: "(999) 999-9999" }',
  ],
  [
    "iban (Turkey only, value without TR)",
    '{ preset: "iban", country: "TR" } (value includes TR); "iban" for any country',
  ],
  [
    "currency (US separators, no symbol)",
    'The same as "currency" (1,234.56); Turkish lira { preset: "currency", country: "TR" } (₺1.234,56); others currency: "USD" or from',
  ],
  ["date (value 01022020)", "The value is ISO: 2020-02-01"],
  ["taxNumber", "vkn"],
  ["numeric", "number"],
  [
    "email, url, username, alpha, password, text, zipCode",
    "Removed; validate them in your schema or use definePreset",
  ],
];

const optionRows: Row[] = [
  ["resolveMask", "mask: (value, ctx) => string"],
  ["cvv scanned the schema for a card", 'cvv: { preset: "cvv", from: "card" }'],
  [
    'validator: "tckn" / validate: true',
    'Built into the preset; add more with validate: (value) => true | "my.key"',
  ],
  ["errorMessage", "Returns an error key (tckn.invalid); map it to a message yourself"],
  [
    "currency: { decimalSeparator, thousandSeparator, symbol }",
    "currency: { code, locale, scale }",
  ],
  ['dateFormat: "DMY"', 'date: { format: "DD/MM/YYYY" }'],
  ["allowedChars, forbiddenChars", '{ mask: "hhhh", tokens: { h: /[0-9a-f]/i } }'],
  ["displayPrefix", "{TR}99 … (a fixed part kept in the value)"],
  ["placeholderChar", "Removed (it never worked)"],
  ["onCardTypeChange", 'getCardType(form.watch("card"))'],
];

const helperRows: Row[] = [
  [
    "validateTCKN, validateVKN, validateLuhn, validateIBAN",
    "isValidTCKN, isValidVKN, isValidLuhn / isValidCard, isValidIBAN",
  ],
  ["applyMask, unmask, formatCurrency…", "createMask(spec).format() / .parse()"],
  ["mergeRefs", "Removed; ref is a prop in React 19"],
];

function UpgradeTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table>
        <thead>
          <tr>
            <th>v1</th>
            <th>v2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([before, after]) => (
            <tr key={before}>
              <td>
                <code>{before}</code>
              </td>
              <td>{after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MaskUpgradeDoc() {
  return (
    <>
      <DocsPageHeader
        title="Upgrading from v1 to v2"
        description="v2 is a rewrite. The hook signature, the preset list and some values changed."
      />
      <DocsProse>
        <h2 id="prompt">One step with an AI agent</h2>
        <p>
          Copy the prompt and give it to an agent such as <AcademyBadge kind="claudeCode" />,{" "}
          <AcademyBadge kind="cursor" /> or <AcademyBadge kind="codex" /> in your project. It finds
          every usage, moves it to v2, runs the type checker and tests, and lists the data whose
          shape changed (ISO dates, <code>TR</code> in Turkish IBANs) for you to confirm.
        </p>
        <DocsPromptBlock
          prompt={MASK_UPGRADE_PROMPT}
          label="v1 → v2 upgrade prompt"
          copyLabel="Copy"
        />
        <p>Prefer doing it by hand? The tables below describe the same steps.</p>
        <p>
          The v1 docs are <Link href="/mask/docs/v1">archived</Link>. Requirements:{" "}
          <AcademyBadge kind="react" label="React 18.2+" />,{" "}
          <AcademyBadge kind="react-hook-form" label="React Hook Form 7.55+" />,{" "}
          <AcademyBadge kind="nodejs" label="Node 20+" />.
        </p>

        <h2 id="imza">Hook signature</h2>
        <DocsCodeBlock code={signatureCode} lang="tsx" />
        <p>
          Schema keys must be field names of your form (or set <code>name</code>). A typo is now a
          compile error.
        </p>

        <h2 id="raw">rawValue is gone</h2>
        <p>The form already holds the raw value. Spread the returned object directly.</p>
        <DocsCodeBlock code={rawCode} lang="tsx" />

        <h2 id="presetler">Presets</h2>
        <UpgradeTable rows={presetRows} />

        <h2 id="secenekler">Options</h2>
        <UpgradeTable rows={optionRows} />

        <h2 id="dogrulama">Validation with a resolver</h2>
        <p>
          In v1, mask validation silently stopped when a resolver was set. In v2, wrap the resolver:
        </p>
        <DocsCodeBlock code={resolverCode} lang="ts" />

        <h2 id="yardimcilar">Helpers</h2>
        <UpgradeTable rows={helperRows} />
      </DocsProse>
    </>
  );
}
