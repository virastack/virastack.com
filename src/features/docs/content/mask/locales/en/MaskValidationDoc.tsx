import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";
import { Link } from "@/i18n/routing";

const messagesCode = `const messages: Record<string, string> = {
  "tckn.invalid": "Invalid national ID",
  "phone.incomplete": "The phone number is incomplete",
  "date.minAge": "You must be at least 18",
}

const error = form.formState.errors.tckn
{error && <p>{messages[error.message ?? ""] ?? error.message}</p>}`;

const customCode = `useViraMask(form, {
  // true: valid · false: "<name>.invalid" · a string: your own key
  tckn: { preset: "tckn", validate: (value) => value !== "11111111110" || "tckn.blocked" },
  // React Hook Form rules work too
  phone: { preset: "phone", country: "TR", rules: { required: "required", validate: { mobile: (v) => v.startsWith("5") || "phone.mobile" } } },
})`;

const resolverCode = `import { zodResolver } from "@hookform/resolvers/zod"
import { maskResolver, useViraMask } from "@virastack/mask"

const masks = { tckn: "tckn", phone: { preset: "phone", country: "TR" } } as const
const schema = z.object({ tckn: z.string().min(1, "required"), phone: z.string() })

const form = useForm({ resolver: maskResolver(masks, zodResolver(schema)) })
// or pass a Standard Schema directly (no @hookform/resolvers needed)
const form2 = useForm({ resolver: maskResolver(masks, schema) })

const { tckn, phone } = useViraMask(form, masks)`;

export function MaskValidationDoc() {
  return (
    <>
      <DocsPageHeader
        title="Validation"
        description="Errors come back as keys, not messages. Add your own rules and use them with a resolver."
      />
      <DocsProse>
        <h2 id="anahtarlar">Error keys</h2>
        <p>
          Empty values are not validated; requiring a value is the job of{" "}
          <code>rules.required</code> or your schema. The error arrives as a key in{" "}
          <code>errors.field.message</code>, so translations stay with you.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>&lt;name&gt;.incomplete</code>
                </td>
                <td>The pattern is not full (phone, card, tckn…)</td>
              </tr>
              <tr>
                <td>
                  <code>&lt;name&gt;.invalid</code>
                </td>
                <td>A checksum failed (Luhn, TCKN, VKN, mod-97, a date that doesn&apos;t exist)</td>
              </tr>
              <tr>
                <td>
                  <code>&lt;name&gt;.min</code>, <code>&lt;name&gt;.max</code>
                </td>
                <td>Number, currency or date limit; a past month on expiry</td>
              </tr>
              <tr>
                <td>
                  <code>date.minAge</code>
                </td>
                <td>Age limit</td>
              </tr>
              <tr>
                <td>
                  <code>date.beforeFrom</code>
                </td>
                <td>Before the linked start date</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <code>&lt;name&gt;</code> is the preset name; <code>mask</code> for a custom pattern, or
          the name you gave <code>definePreset</code>.
        </p>
        <ComponentPreview
          preview={<MaskFieldDemo config="tckn" placeholder="10000000146" />}
          code={messagesCode}
        >
          <DocsCodeBlock code={messagesCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="ozel">Custom validation</h2>
        <p>
          <code>validate</code> runs after the built-in checks. On a preset, both apply.
        </p>
        <DocsCodeBlock code={customCode} lang="tsx" />

        <h2 id="resolver">Zod, Valibot and resolvers</h2>
        <p>
          <AcademyBadge kind="react-hook-form" /> skips <code>register</code> validation when a
          resolver is set. Wrap the resolver with <code>maskResolver</code> to get schema and mask
          errors together. Without it, you get a console warning in development.
        </p>
        <DocsCodeBlock code={resolverCode} lang="tsx" />
        <p>
          To use the same schema on the server, see the <Link href="/mask/docs/server">server</Link>{" "}
          page.
        </p>
      </DocsProse>
    </>
  );
}
