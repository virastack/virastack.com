import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const sharedCode = `// lib/checkout-masks.ts — "use client" yok
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
// önce maskeler ayrıştırılır ve doğrulanır, sonra şema çalışır
// result.data → z.output<typeof schema>`;

export function MaskServerDoc() {
  return (
    <>
      <DocsPageHeader
        title="Sunucu"
        description="@virastack/mask/server ile aynı şemayı Server Component ve Server Action içinde kullanın."
      />
      <DocsProse>
        <h2 id="giris">Sunucu girişi</h2>
        <p>
          Kök paket (<code>@virastack/mask</code>) hook içerdiği için{" "}
          <code>&quot;use client&quot;</code> ile gelir. Server Component, Server Action ve
          paylaşılan şema dosyalarında <code>@virastack/mask/server</code> kullanın:{" "}
          <code>createMask</code>, <code>definePreset</code>, doğrulayıcılar,{" "}
          <code>toMinorUnits</code> ve <code>parseMasked</code> buradadır.
        </p>
        <DocsCodeBlock code={sharedCode} lang="ts" />
        <DocsCodeBlock code={rscCode} lang="tsx" />

        <h2 id="server-action">Server Action</h2>
        <p>
          <code>parseMasked</code> FormData, URLSearchParams ya da düz nesne alır. Maskeli metni
          (form JavaScript&apos;siz gönderildiyse) ya da ham değeri ayrıştırır, doğrular ve{" "}
          <code>address.zip</code> gibi adları iç içe nesneye çevirir.
        </p>
        <DocsCodeBlock code={actionCode} lang="ts" />

        <h2 id="standard-schema">Standard Schema</h2>
        <p>
          Üçüncü argüman olarak <AcademyBadge kind="zod" />, Valibot, ArkType gibi herhangi bir
          Standard Schema verin. Paket bunlara bağımlı değildir; yalnızca ortak arayüzü kullanır.
          Şema verildiğinde sonuç bir Promise&apos;tir.
        </p>
        <DocsCodeBlock code={standardCode} lang="ts" />
      </DocsProse>
    </>
  );
}
