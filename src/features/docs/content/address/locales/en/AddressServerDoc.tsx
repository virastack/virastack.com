import type { ReactNode } from "react";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const resolveCode = `import { resolveAddress } from "@virastack/address/server"

const { ok, value, issues } = await resolveAddress({
  // a name in any casing, or a plate code: 34, "34", "06"
  province: "istanbul",
  district: "fatih",
  neighbourhood: "aksaray mah.",
})

if (!ok) return { errors: issues }
value.postalCode // "34096": derived here, not taken from the client`;

const issueCode = `type AddressIssue =
  | { level: "province"; reason: "missing" | "unknown" }
  | { level: "district"; reason: "missing" | "unknown" }
  | { level: "neighbourhood"; reason: "missing" | "unknown" }
  | { level: "postalCode"; reason: "missing" | "unknown" | "mismatch" }

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
    postalCode: String(formData.get("postalCode") ?? ""),
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
      <button type="submit">Save</button>
    </form>
  )
}`;

const postalCodeCode = `import { resolvePostalCode } from "@virastack/address/server"

const { ok, value, neighbourhoods } = await resolvePostalCode("34096")
// ok: false
// issues: [{ level: "neighbourhood", reason: "missing" }]
// value: { province: "İSTANBUL", district: "FATİH",
//          neighbourhood: null, postalCode: "34096", ... }
// neighbourhoods: ["AKSARAY MAH.", "HASEKİ SULTAN MAH."]

await resolvePostalCode("34710")
// ok: true, value.neighbourhood: "CAFERAĞA MAH."

await resolvePostalCode("34999")
// ok: false, issues: [{ level: "postalCode", reason: "unknown" }]`;

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
      Validates the address and derives its postal code: <code>{"{ ok, value, issues }"}</code>
    </>,
  ],
  [
    "postalCodeFor(input)",
    <>
      Just the postal code; <code>null</code>&#32;when nothing matches
    </>,
  ],
  [
    "resolvePostalCode(code)",
    <>
      The address behind a postal code: <code>{"{ ok, value, issues, neighbourhoods }"}</code>
    </>,
  ],
  ["formatAddress(value, options)", "Puts the address on one line"],
  ["normalizePostalCode(input)", "A five digit postal code or null; spaces dropped"],
  ["districtsOf(province)", "A province's district names, in Turkish alphabetical order"],
  ["findProvince(input)", "Finds a province by plate code or name"],
  ["provinces", "All 81 provinces with their district names"],
];

export function AddressServerDoc() {
  return (
    <>
      <DocsPageHeader
        title="Server validation"
        description="Re-check a submitted address against the dataset with @virastack/address/server, and derive the postal code on the server."
      />
      <DocsProse>
        <h2 id="resolve">resolveAddress()</h2>
        <p>
          A client can send any postal code it likes. <code>resolveAddress</code>&#32;looks the
          address up in the dataset and derives the postal code itself. If a <code>postalCode</code>
          &#32;is sent too, it must be one of the neighbourhood&apos;s codes; for a neighbourhood
          with several, the one sent is kept.
        </p>
        <DocsCodeBlock code={resolveCode} lang="ts" />
        <p>
          Names match regardless of case and Turkish characters, with surrounding spaces trimmed,
          and <code>value</code>&#32;comes back in the dataset&apos;s spelling. When both{" "}
          <code>provinceCode</code>&#32;and <code>province</code>&#32;are sent, the code wins; an
          empty code field does not stop the name from being used.
        </p>

        <h2 id="sorunlar">Issues</h2>
        <p>
          When part of the address is missing or unknown, <code>ok</code>&#32;is <code>false</code>
          &#32;and <code>issues</code>&#32;names the level:
        </p>
        <DocsCodeBlock code={issueCode} lang="ts" />
        <p>
          The check runs top-down and stops at the first problem, so <code>issues</code>&#32;holds
          at most one entry. Whatever was valid stays in <code>value</code>: if the district is
          unknown, the province is still filled in, so the form can keep showing it. Error messages
          and their translations are up to you.
        </p>
        <p>
          A submitted <code>postalCode</code>&#32;that is not the neighbourhood&apos;s gives{" "}
          <code>{'{ level: "postalCode", reason: "mismatch" }'}</code>, and <code>value</code>
          &#32;still carries the neighbourhood&apos;s real code. A postal code that is not sent, or
          sent empty, is not checked but derived.
        </p>

        <h2 id="posta-kodu">resolvePostalCode()</h2>
        <p>
          Finds the address a postal code belongs to, on the server: for example to offer a{" "}
          <Link href="/address/docs/postal-code">postal code lookup</Link>&#32;from a route handler.
          It returns as much of the address as the code can say in <code>value</code>, and the
          candidates in <code>neighbourhoods</code>:
        </p>
        <DocsCodeBlock code={postalCodeCode} lang="ts" />
        <p>
          <code>ok</code>&#32;is <code>true</code>&#32;only when the code has one neighbourhood,
          since only then is the address complete. An empty code gives <code>missing</code>; a code
          that is not five digits or not in the dataset gives <code>unknown</code>.
        </p>

        <h2 id="server-action">Server Action</h2>
        <DocsCodeBlock code={actionCode} lang="ts" />
        <DocsCodeBlock code={formCode} />
        <p>
          In a native select, a province option&apos;s value is its plate code, so{" "}
          <code>formData.get(&quot;province&quot;)</code>&#32;arrives as <code>&quot;34&quot;</code>
          &#32;and <code>resolveAddress</code>&#32;reads it as a code. The hidden postal code
          input&apos;s value is submitted too; the server does not trust it but checks it against
          the neighbourhood.
        </p>

        <h2 id="yardimcilar">Other helpers</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Export</th>
                <th>What it does</th>
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

        <h2 id="nextjs">SSR and Next.js</h2>
        <ul>
          <li>
            Only <code>@virastack/address</code>&#32;carries <code>&quot;use client&quot;</code>.
            Server Components, Server Actions and route handlers import <code>/server</code>&#32;or{" "}
            <code>/data</code>.
          </li>
          <li>
            The server loads a province&apos;s neighbourhoods the first time they are needed and
            keeps them for the life of the process; later requests for the same province, including
            concurrent ones, do not load it again. On serverless platforms each instance keeps its
            own cache.
          </li>
          <li>
            The prop getters&apos; <code>id</code>s come from <code>useId</code>, so the server and
            the client produce the same ids.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
