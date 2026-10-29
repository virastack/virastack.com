import type { ReactNode } from "react";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const basicCode = `const {
  provinces, districts, neighbourhoods,
  setProvince, setDistrict, setNeighbourhood,
  value, loading,
} = useViraAddress()

return (
  <>
    <select
      value={value.provinceCode ?? ""}
      onChange={(e) => setProvince(e.target.value)}
    >
      <option value="">Select a province</option>
      {provinces.map((p) => (
        <option key={p.value} value={p.value}>{p.label}</option>
      ))}
    </select>

    <select
      value={value.district ?? ""}
      onChange={(e) => setDistrict(e.target.value)}
      disabled={!districts.length}
    >
      <option value="">Select a district</option>
      {districts.map((d) => (
        <option key={d.value} value={d.value}>{d.label}</option>
      ))}
    </select>

    <select
      value={value.neighbourhood ?? ""}
      onChange={(e) => setNeighbourhood(e.target.value)}
      disabled={!neighbourhoods.length}
    >
      <option value="">
        {loading.neighbourhoods ? "Loading…" : "Select a neighbourhood"}
      </option>
      {neighbourhoods.map((n) => (
        <option key={n.value} value={n.value}>{n.label}</option>
      ))}
    </select>
  </>
)`;

const valueCode = `{
  provinceCode: "34",       // plate code, as a string
  province: "İSTANBUL",
  district: "FATİH",
  neighbourhood: "AKSARAY MAH.",
  postalCode: "34096",      // first postal code of the neighbourhood
  postalCodes: ["34096"],   // all of them; a few hundred have several
}`;

const sourceCode = `import { useViraAddress, type AddressSource } from "@virastack/address"

const aksaray = {
  name: "AKSARAY MAH.",
  postalCode: "34096",
  postalCodes: ["34096"],
}

const source: AddressSource = {
  provinces: [
    { code: 34, name: "İSTANBUL", districts: ["FATİH", "KADIKÖY"] },
  ],
  neighbourhoods: async (code) => new Map([["FATİH", [aksaray]]]),
}

const address = useViraAddress({ source })`;

const options: [string, ReactNode, ReactNode][] = [
  [
    "source",
    "the bundled dataset",
    "Where the lists come from. Swap it for a test fixture or your own API.",
  ],
  [
    "defaultValue",
    "—",
    <>
      <code>{"{ provinceCode, district, neighbourhood }"}</code>&#32;to start from. With a{" "}
      <code>form</code>, read from the form when omitted.
    </>,
  ],
  [
    "formatLabel",
    <code key="default">formatName</code>,
    <>
      Turns a raw name into a label; the second argument is the level.{" "}
      <code>{"(name) => name"}</code>&#32;keeps the dataset&apos;s upper case.
    </>,
  ],
  [
    "onChange",
    "—",
    <>
      Called with the whole <code>value</code>&#32;on every change, not on the first render.
    </>,
  ],
  [
    "form",
    "—",
    <>
      A form to keep in sync, such as React Hook Form&apos;s <code>useForm()</code>.
    </>,
  ],
  [
    "names",
    <>
      <code>province</code>, <code>district</code>, <code>neighbourhood</code>,{" "}
      <code>postalCode</code>
    </>,
    <>
      Field names in the form and on the inputs the prop getters return. <code>provinceCode</code>
      &#32;is only written when you name it.
    </>,
  ],
  [
    "shouldValidate",
    <code key="default">true</code>,
    "Revalidate the form fields as the address changes.",
  ],
];

const returns: [string, ReactNode][] = [
  ["value", "The selected address; see above."],
  [
    "provinces, districts, neighbourhoods",
    <>
      Ready-made <code>{"{ value, label }"}</code>&#32;lists for a select. Neighbourhood options
      also carry <code>postalCode</code>&#32;and <code>postalCodes</code>.
    </>,
  ],
  [
    "setProvince(code), setDistrict(name), setNeighbourhood(name)",
    <>
      Picks a level; <code>null</code>&#32;or <code>&quot;&quot;</code>&#32;clears it. A higher
      level clears the ones below.
    </>,
  ],
  ["reset()", "Clears every level."],
  [
    "loading.neighbourhoods",
    <>
      <code>true</code>&#32;while the picked province&apos;s neighbourhoods load.
    </>,
  ],
  [
    "error",
    "The last load error. Cleared when another province is picked; picking the failed one again retries.",
  ],
  [
    "getProvinceProps(), getDistrictProps(), getNeighbourhoodProps()",
    <>
      Props to spread on a plain <code>&lt;select&gt;</code>; <code>disabled</code>&#32;is worked
      out from the chain. Other components pick a flavour with <code>as</code>.
    </>,
  ],
  ["getPostalCodeProps()", "A hidden input that carries the derived postal code."],
];

export function AddressUseViraAddressDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraAddress()"
        description="The hook API: options, the return value, the value object and bringing your own data."
      />
      <DocsProse>
        <h2 id="temel">Basic usage</h2>
        <p>
          The hook returns three lists and three setters. Every list item is{" "}
          <code>{"{ value, label }"}</code>: <code>value</code>&#32;is the name as the dataset
          spells it (<code>FATİH</code>), <code>label</code>&#32;is the display form (
          <code>Fatih</code>). For provinces, <code>value</code>&#32;is the plate code (
          <code>&quot;34&quot;</code>).
        </p>
        <DocsCodeBlock code={basicCode} />
        <p>
          The <Link href="/address/docs/ui-libraries">prop getters</Link>&#32;do the same wiring in
          one line. <code>setProvince</code>&#32;accepts the plate code as a number or a string.
        </p>

        <h2 id="value">value</h2>
        <p>Everything your form needs, in one object:</p>
        <DocsCodeBlock code={valueCode} lang="ts" />
        <p>
          Levels that are not picked yet are <code>null</code>, and <code>postalCodes</code>&#32;is
          an empty array. Names are upper case, as the dataset stores them; show the{" "}
          <code>label</code>&#32;from the lists, or run them through{" "}
          <Link href="/address/docs/helpers">formatName</Link>.
        </p>

        <h2 id="secenekler">Options</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Default</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              {options.map(([name, fallback, description]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>{fallback}</td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <code>form</code>, <code>names</code>&#32;and <code>shouldValidate</code>&#32;are covered
          on the <Link href="/address/docs/react-hook-form">React Hook Form</Link>&#32;page.
        </p>

        <h2 id="donus">Return value</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {returns.map(([name, description]) => (
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

        <h2 id="kaynak">Your own data source</h2>
        <p>
          By default the lists come from the bundled dataset. Pass a <code>source</code>&#32;to use
          a small fixture in tests, or to read the lists from your own API:
        </p>
        <DocsCodeBlock code={sourceCode} />
        <p>
          The hook only reads neighbourhoods when the province changes, so passing a new{" "}
          <code>source</code>&#32;object on every render does not reload anything. If you only want
          the neighbourhoods to come from elsewhere, <code>setLoader</code>&#32;is shorter; see the{" "}
          <Link href="/address/docs/data">dataset</Link>.
        </p>
      </DocsProse>
    </>
  );
}
