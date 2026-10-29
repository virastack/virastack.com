import type { ReactNode } from "react";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

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
      <button type="submit">Save</button>
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
      Validates the address and derives its postal code: <code>{"{ ok, value, issues }"}</code>
    </>,
  ],
  [
    "postalCodeFor(input)",
    <>
      Just the postal code; <code>null</code>&#32;when nothing matches
    </>,
  ],
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
          address up in the dataset and derives the postal code itself; it never reads the one that
          was submitted.
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

        <h2 id="server-action">Server Action</h2>
        <DocsCodeBlock code={actionCode} lang="ts" />
        <DocsCodeBlock code={formCode} />
        <p>
          In a native select, a province option&apos;s value is its plate code, so{" "}
          <code>formData.get(&quot;province&quot;)</code>&#32;arrives as <code>&quot;34&quot;</code>
          &#32;and <code>resolveAddress</code>&#32;reads it as a code. The hidden postal code input
          is only for the UI; the server ignores it.
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
