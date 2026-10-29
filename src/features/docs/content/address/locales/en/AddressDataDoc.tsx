import type { ReactNode } from "react";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { TurkeyOnlyNotice } from "@/components/shared/TurkeyOnlyNotice";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const apiCode = `import {
  districts,
  findPostalCode,
  neighbourhoods,
  province,
  provinces,
  source,
} from "@virastack/address/data"

provinces.length        // 81
province(34)?.name      // "İSTANBUL"
districts(34)           // ["ADALAR", "ARNAVUTKÖY", ...]

const byDistrict = await neighbourhoods(34)
byDistrict.get("FATİH")
// [{ name: "AKSARAY MAH.", postalCode: "34096", ... }, ...]

source.date             // "2026-10-28": when the data was collected
source.neighbourhoods   // 72466

await findPostalCode("34710")
// { postalCode: "34710", province: { code: 34, ... },
//   district: "KADIKÖY", neighbourhoods: [{ name: "CAFERAĞA MAH.", ... }] }`;

const loaderCode = `import { setLoader } from "@virastack/address/data"

setLoader(async (provinceCode) => {
  const response = await fetch(\`/api/address/\${provinceCode}\`)
  return response.text()
})

setLoader(null) // back to the bundled modules`;

const payloadCode = `SEYHAN;AKKAPI MAH.:01040|ALTINŞEHİR MAH.:01170
CEYHAN;BAHÇE MAH.:01950`;

const costs: [string, ReactNode, string][] = [
  ["names", "Province and district names, once per page", "5.3 kB"],
  [
    "istanbul",
    <>
      Picking <strong>İstanbul</strong>&#32;(973 neighbourhoods)
    </>,
    "6.8 kB",
  ],
  [
    "ankara",
    <>
      Picking <strong>Ankara</strong>&#32;(1,434 neighbourhoods)
    </>,
    "8.3 kB",
  ],
  ["median", "A mid-sized province: half of the 81 are smaller", "4.6 kB"],
  ["p90", "A large province: 73 of the 81 are this size or smaller", "9.2 kB"],
  [
    "largest",
    <>
      The largest: <strong>Kastamonu</strong>&#32;(167 neighbourhoods and 4,151 villages)
    </>,
    "28.5 kB",
  ],
];

export function AddressDataDoc() {
  return (
    <>
      <DocsPageHeader
        title="Dataset"
        description="81 provinces, 973 districts and 72,466 neighbourhoods with postal codes. No React needed; each province loads only when it is needed."
      />
      <TurkeyOnlyNotice />
      <DocsProse>
        <h2 id="api">API</h2>
        <p>
          The data behind the hook ships inside the package, and{" "}
          <code>@virastack/address/data</code>&#32;exposes it without React:
        </p>
        <DocsCodeBlock code={apiCode} lang="ts" />
        <p>
          <code>provinces</code>, <code>province</code>&#32;and <code>districts</code>&#32;are
          synchronous. <code>neighbourhoods(code)</code>&#32;returns a <code>Promise</code>&#32;and
          caches the result: two calls at the same time share one load, a failed load is not
          remembered and is retried on the next call, and a code that is not a province gives an
          empty <code>Map</code>.
        </p>
        <p>
          Most neighbourhoods have a single postal code. A few hundred have several, up to eight,
          and all of them are kept: <code>postalCodes</code>&#32;is the full answer and{" "}
          <code>postalCode</code>&#32;the first one, for the common case.
        </p>
        <p>
          <code>findPostalCode(code)</code>&#32;gives a postal code&apos;s province, district and
          the neighbourhoods it covers, or <code>null</code>&#32;when it is not in the dataset. Only
          the province in the code&apos;s first two digits is loaded. Every code belongs to one
          district and starts with its plate code; the data build checks both.
        </p>

        <h2 id="maliyet">How much does it download?</h2>
        <p>
          The province and district names arrive with the page; picking a province downloads only
          that province&apos;s neighbourhoods. There is nothing to configure: every province is a
          separate file, and your bundler splits it out on its own. On the server, only the
          provinces that are asked for are held in memory.
        </p>
        <p>The sizes below are what the browser actually downloads, compressed with gzip.</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>What is downloaded</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {costs.map(([id, part, size]) => (
                <tr key={id}>
                  <td>{part}</td>
                  <td>{size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          75 of the 81 provinces are under 10 kB, so a typical visit downloads about{" "}
          <strong>10 kB</strong>: the names plus the province that was picked. Even big cities like{" "}
          <strong>İstanbul</strong>&#32;and <strong>Ankara</strong>&#32;stay under 10 kB; the
          largest files belong to rural provinces with thousands of villages. The data build fails
          if any province goes over 30 kB, so an update can never quietly make it heavier.
        </p>

        <h2 id="loader">Your own loader</h2>
        <p>To read neighbourhoods from disk, a CDN or your own endpoint, swap the loader:</p>
        <DocsCodeBlock code={loaderCode} lang="ts" />
        <p>
          A loader returns the province&apos;s encoded text: one line per district, the district
          name followed by <code>;</code>, neighbourhoods separated by <code>|</code>, a{" "}
          <code>:</code>&#32;before the postal code and a <code>,</code>&#32;between several codes.
        </p>
        <DocsCodeBlock code={payloadCode} lang="ts" />
        <p>
          <code>setLoader</code>&#32;also applies to the hook and to <code>/server</code>, since
          they all read the same data module. A new loader forgets the provinces read so far.
        </p>

        <h2 id="kaynak">Source and updates</h2>
        <p>
          The data comes from{" "}
          <a href="https://www.ptt.gov.tr/posta-kodu" target="_blank" rel="noreferrer">
            PTT
          </a>
          , Türkiye&apos;s national postal service. Names and postal codes are public reference
          data; this package only reshapes them. Check against PTT for anything where delivery is
          critical.
        </p>
        <p>
          The source lists every street, which is far more than an address form needs, so the build
          reduces it to unique neighbourhoods with their postal codes. Each province ships as one
          encoded string rather than nested JSON: it is smaller over the wire, and splitting a
          string is faster than parsing an array of objects.
        </p>
        <p>
          An automated check compares the data against PTT every month. When something changes, a
          patch release ships; the API stays the same. <code>source.date</code>&#32;tells you when
          the data was collected.
        </p>
      </DocsProse>
    </>
  );
}
