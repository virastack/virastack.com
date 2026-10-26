import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const sharedCode = `// lib/checkout-masks.ts — no "use client"
import type { MaskSchema } from "@virastack/mask/server"

export const checkoutMasks = {
  phone: { preset: "phone", country: "TR" },
  card: "card",
  cvv: { preset: "cvv", from: "card" },
  price: { preset: "currency", from: "currency" },
} as const satisfies MaskSchema`;

const actionCode = `"use server"
import { parseMasked } from "@virastack/mask/server"
import { checkoutMasks } from "@/lib/checkout-masks"

export async function checkout(formData: FormData) {
  const result = parseMasked(checkoutMasks, formData)
  if (!result.success) return { errors: result.errors } // { phone: "phone.incomplete" }

  // result.data: { phone: "5551234567", card: "4111…", price: "1234.56", currency: "TRY" }
}`;

const rscCode = `import { createMask } from "@virastack/mask/server"

const phone = createMask({ preset: "phone", country: "TR" })

export default async function Customers() {
  const customers = await getCustomers()
  return customers.map((c) => <p key={c.id}>{phone.format(c.phone)}</p>) // (555) 123 45 67
}`;

const standardCode = `import { z } from "zod"

const schema = z.object({
  phone: z.string().length(10),
  price: z.string().transform(Number),
  currency: z.enum(["TRY", "USD"]),
})

const result = await parseMasked(checkoutMasks, formData, schema)
// masks are parsed and validated first, then the schema runs
// result.data → z.output<typeof schema>`;

export function MaskServerDoc() {
  return (
    <>
      <DocsPageHeader
        title="Server"
        description="Use the same schema in Server Components and Server Actions with @virastack/mask/server."
      />
      <DocsProse>
        <h2 id="giris">Server entry</h2>
        <p>
          The root entry (<code>@virastack/mask</code>) ships the hook, so it carries{" "}
          <code>&quot;use client&quot;</code>. In Server Components, Server Actions and shared
          schema files use <code>@virastack/mask/server</code>: it has <code>createMask</code>,{" "}
          <code>definePreset</code>, the validators, <code>toMinorUnits</code> and{" "}
          <code>parseMasked</code>.
        </p>
        <DocsCodeBlock code={sharedCode} lang="ts" />
        <DocsCodeBlock code={rscCode} lang="tsx" />

        <h2 id="server-action">Server Action</h2>
        <p>
          <code>parseMasked</code> takes FormData, URLSearchParams or a plain object. It parses
          masked text (when the form posts without JavaScript) or raw values, validates them and
          turns names like <code>address.zip</code> into nested objects.
        </p>
        <DocsCodeBlock code={actionCode} lang="ts" />

        <h2 id="standard-schema">Standard Schema</h2>
        <p>
          Pass any Standard Schema (<AcademyBadge kind="zod" />, Valibot, ArkType…) as the third
          argument. The package doesn&apos;t depend on them; it only uses the shared interface. With
          a schema the result is a Promise.
        </p>
        <DocsCodeBlock code={standardCode} lang="ts" />
      </DocsProse>
    </>
  );
}
