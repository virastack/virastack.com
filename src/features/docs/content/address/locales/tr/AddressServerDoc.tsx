import type { ReactNode } from "react";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const resolveCode = `import { resolveAddress } from "@virastack/address/server"

const { ok, value, issues } = await resolveAddress({
  // ad, harf farkı önemsiz; ya da plaka kodu: 34, "34", "06"
  province: "istanbul",
  district: "fatih",
  neighbourhood: "aksaray mah.",
})

if (!ok) return { errors: issues }
value.postalCode // "34096": sunucuda türetildi, client'tan alınmadı`;

const issueCode = `type AddressIssue =
  | { level: "province"; reason: "missing" | "unknown" }
  | { level: "district"; reason: "missing" | "unknown" }
  | { level: "neighbourhood"; reason: "missing" | "unknown" }

await resolveAddress({ provinceCode: 34, district: "ÇANKAYA" })
// ok: false
// issues: [{ level: "district", reason: "unknown" }]
// value.province: "İSTANBUL", value.district: null`;

const actionCode = `// app/actions/address.ts
"use server"

import { resolveAddress } from "@virastack/address/server"

export async function saveAddress(formData: FormData) {
  const { ok, value, issues } = await resolveAddress({
    province: String(formData.get("province") ?? ""),
    district: String(formData.get("district") ?? ""),
    neighbourhood: String(formData.get("neighbourhood") ?? ""),
  })
  if (!ok) return { errors: issues }

  await db.address.create({ data: value })
}`;

const formCode = `"use client"

import { useViraAddress } from "@virastack/address"
import { saveAddress } from "@/app/actions/address"

export function AddressForm() {
  const address = useViraAddress()

  return (
    <form action={saveAddress}>
      <select {...address.getProvinceProps()} />
      <select {...address.getDistrictProps()} />
      <select {...address.getNeighbourhoodProps()} />
      <input {...address.getPostalCodeProps()} />
      <button type="submit">Kaydet</button>
    </form>
  )
}`;

const helpersCode = `import {
  districtsOf,
  findProvince,
  postalCodeFor,
} from "@virastack/address/server"

await postalCodeFor({
  province: 34,
  district: "FATİH",
  neighbourhood: "AKSARAY MAH.",
}) // "34096"

districtsOf("06")          // ["AKYURT", "ALTINDAĞ", ...]
findProvince("kırşehir")   // { code: 40, name: "KIRŞEHİR", ... }`;

const helpers: [string, ReactNode][] = [
  [
    "resolveAddress(input)",
    <>
      Adresi doğrular, posta kodunu türetir: <code>{"{ ok, value, issues }"}</code>
    </>,
  ],
  [
    "postalCodeFor(input)",
    <>
      Yalnızca posta kodu; eşleşme yoksa <code>null</code>
    </>,
  ],
  ["districtsOf(province)", "Bir ilin ilçe adları, Türkçe sıralı"],
  ["findProvince(input)", "Plaka kodu ya da adla il arar"],
  ["provinces", "81 il, ilçe adlarıyla"],
];

export function AddressServerDoc() {
  return (
    <>
      <DocsPageHeader
        title="Sunucu doğrulaması"
        description="Gönderilen adresi @virastack/address/server ile veri setine karşı yeniden kontrol edin; posta kodunu sunucuda türetin."
      />
      <DocsProse>
        <h2 id="resolve">resolveAddress()</h2>
        <p>
          İstemci istediği posta kodunu gönderebilir. <code>resolveAddress</code>&#32;adresi veri
          setinde arar ve posta kodunu kendisi türetir; gönderilen posta koduna hiç bakmaz.
        </p>
        <DocsCodeBlock code={resolveCode} lang="ts" />
        <p>
          Adlar büyük/küçük harf ve Türkçe karakter farkı gözetmeden, baştaki ve sondaki boşluklar
          atılarak eşleşir; <code>value</code>&#32;veri setindeki yazımı döndürür.{" "}
          <code>provinceCode</code>&#32;ve <code>province</code>&#32;birlikte gelirse önce kod
          kullanılır; boş gelen bir kod alanı adın kullanılmasını engellemez.
        </p>

        <h2 id="sorunlar">Sorunlar</h2>
        <p>
          Adres eksik ya da bilinmiyorsa <code>ok</code>&#32;<code>false</code>&#32;olur ve{" "}
          <code>issues</code>&#32;sorunlu seviyeyi söyler:
        </p>
        <DocsCodeBlock code={issueCode} lang="ts" />
        <p>
          Kontrol yukarıdan aşağı ilerler ve ilk sorunda durur, bu yüzden <code>issues</code> en
          fazla bir sorun taşır. Doğru olan kısım <code>value</code>&#32;içinde kalır: ilçe
          bilinmiyorsa il yine doludur, form adresin geri kalanını gösterebilir. Hata mesajları ve
          çevirileri sizdedir.
        </p>

        <h2 id="server-action">Server Action</h2>
        <DocsCodeBlock code={actionCode} lang="ts" />
        <DocsCodeBlock code={formCode} />
        <p>
          Native select&apos;te il seçeneğinin değeri plaka kodudur;{" "}
          <code>formData.get(&quot;province&quot;)</code>&#32;<code>&quot;34&quot;</code>&#32;gelir
          ve <code>resolveAddress</code>&#32;bunu kod olarak tanır. Gizli posta kodu input&apos;u
          yalnızca arayüz içindir; sunucu onu kullanmaz.
        </p>

        <h2 id="yardimcilar">Diğer yardımcılar</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Dışa aktarım</th>
                <th>Ne yapar</th>
              </tr>
            </thead>
            <tbody>
              {helpers.map(([name, description]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DocsCodeBlock code={helpersCode} lang="ts" />

        <h2 id="nextjs">SSR ve Next.js</h2>
        <ul>
          <li>
            Yalnızca <code>@virastack/address</code>&#32;içinde <code>&quot;use client&quot;</code>
            &#32;vardır. Server Component, Server Action ve route handler&apos;lar{" "}
            <code>/server</code>&#32;veya <code>/data</code>&#32;import eder.
          </li>
          <li>
            Sunucu bir ilin mahallelerini ilk ihtiyaçta yükler ve süreç boyunca önbellekte tutar;
            aynı il için sonraki istekler, aynı anda gelenler dahil, yeniden yüklemez. Serverless
            ortamlarda her instance kendi önbelleğini tutar.
          </li>
          <li>
            Prop getter&apos;ların <code>id</code>&apos;leri <code>useId</code>&apos;den gelir;
            server&apos;da ve client&apos;ta aynı id üretilir.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
