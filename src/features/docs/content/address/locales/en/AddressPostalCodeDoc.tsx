import type { ReactNode } from "react";

import { AddressDemo } from "@/components/shared/AddressDemo";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const inputCode = `"use client"

import { useViraAddress } from "@virastack/address"

export function AddressFields() {
  const {
    getProvinceProps,
    getDistrictProps,
    getNeighbourhoodProps,
    getPostalCodeInputProps,
    postalCodeStatus,
  } = useViraAddress()

  return (
    <>
      <input {...getPostalCodeInputProps()} />
      {postalCodeStatus === "unknown" && <p>No such postal code.</p>}

      <select {...getProvinceProps()} />
      <select {...getDistrictProps()} />
      <select {...getNeighbourhoodProps()} />
    </>
  )
}`;

const setterCode = `const { setPostalCode, value } = useViraAddress()

await setPostalCode("34710") // "exact"
value
// { province: "İSTANBUL", district: "KADIKÖY",
//   neighbourhood: "CAFERAĞA MAH.", postalCode: "34710", ... }

await setPostalCode("34096") // "partial"
value
// { province: "İSTANBUL", district: "FATİH",
//   neighbourhood: null, postalCode: "34096", ... }

await setPostalCode("34999") // "unknown": the address stays as it was
await setPostalCode(null)    // null: drops the lookup, keeps the address`;

const shadcnCode = `import { Input } from "@/components/ui/input"

<Input
  {...address.getPostalCodeInputProps({ placeholder: "34710" })}
  aria-describedby="postal-code-hint"
/>`;

const statuses: [string, ReactNode][] = [
  ["exact", "One neighbourhood under the code: province, district and neighbourhood are filled."],
  [
    "partial",
    <>
      Province and district are filled; the neighbourhood list is narrowed to the code and the user
      picks one. A neighbourhood already picked under the code is kept.
    </>,
  ],
  [
    "unknown",
    <>
      Not a code in the dataset. The address does not change and the input gets{" "}
      <code>aria-invalid</code>.
    </>,
  ],
  ["loading", "The code's province is loading. Only that one province is read."],
  [
    "null",
    "No lookup is active: no code was typed, or the province or district was changed by hand.",
  ],
];

export function AddressPostalCodeDoc() {
  return (
    <>
      <DocsPageHeader
        title="From a postal code"
        description="Type a postal code and the selects fill in: all three levels for a code with one neighbourhood, province and district for a shared one."
      />
      <DocsProse>
        <p>
          Instead of picking from the selects, the address can also be filled from a postal code.
          Add a postal code input and the selects fill themselves once a code is typed. Pick a
          neighbourhood and the same input shows the derived code, so both directions work together.
        </p>

        <h2 id="input">The postal code input</h2>
        <ComponentPreview
          preview={<AddressDemo showValue />}
          previewClassName="max-w-2xl"
          code={inputCode}
        >
          <DocsCodeBlock code={inputCode} lang="tsx" />
        </ComponentPreview>
        <p>
          <code>getPostalCodeInputProps()</code>&#32;spreads onto a plain <code>&lt;input&gt;</code>
          : <code>inputMode=&quot;numeric&quot;</code>,{" "}
          <code>autoComplete=&quot;postal-code&quot;</code>, a <code>maxLength</code>&#32;of 5,{" "}
          <code>value</code>&#32;and <code>onChange</code>. Anything that is not a digit is dropped,
          and the lookup runs once five digits are in. While the code is being edited with fewer
          digits, the address stays where it is.
        </p>
        <p>
          With <code>names.postalCode</code>&#32;set, the input carries that name. Don&apos;t also
          render the hidden <code>getPostalCodeProps()</code>&#32;input in the same form; both would
          submit the same field.
        </p>

        <h2 id="kesinlik">How certain is it?</h2>
        <p>
          Every postal code belongs to one district, and its first two digits are the
          province&apos;s plate code. But a code often covers several neighbourhoods: only 205 of
          2,777 codes have exactly one, while <code>54100</code>&#32;in Sakarya is shared by 81. So
          the lookup fills in what the code can say for certain, and <code>postalCodeStatus</code>
          &#32;tells you what it found:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>postalCodeStatus</th>
                <th>What happened</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map(([name, description]) => (
                <tr key={name}>
                  <td>
                    <code>{name === "null" ? name : `"${name}"`}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The data build checks that every code stays within one district and starts with its plate
          code; a refresh that breaks either rule does not ship.
        </p>

        <h2 id="davranis">Behaviour</h2>
        <ul>
          <li>
            Picking a province or district by hand drops the lookup: the neighbourhood list is
            complete again and the input shows the code derived from the pick.
          </li>
          <li>
            Picking a neighbourhood from the narrowed list keeps the lookup. For a neighbourhood
            with several codes, <code>value.postalCode</code>&#32;is the one the user typed, not the
            first.
          </li>
          <li>
            If another pick is made or a new code typed while a code is loading, the older response
            never lands on top of the newer one.
          </li>
          <li>
            A province already loaded for the selects is not downloaded again; the lookup reads the
            same data.
          </li>
          <li>
            With a <code>form</code>, every level filled is written with <code>shouldDirty</code>;
            for <code>&quot;partial&quot;</code>&#32;the neighbourhood is empty and the postal code
            filled. <code>form.reset()</code>&#32;drops the lookup too.
          </li>
        </ul>

        <h2 id="set-postal-code">setPostalCode()</h2>
        <p>
          Start a lookup yourself, without the input, for a code from a saved address or a location.
          The promise resolves with what the code matched:
        </p>
        <DocsCodeBlock code={setterCode} lang="ts" />
        <p>
          Pass the code as text: <code>01040</code>&#32;as a number is <code>1040</code>, and the
          leading zero cannot be brought back. Spaces are dropped, so{" "}
          <code>&quot;34 710&quot;</code>&#32;works.
        </p>

        <h2 id="ui">UI libraries</h2>
        <p>
          The props are standard input props, and <code>onChange</code>&#32;takes either an event or
          a bare value. shadcn/ui&apos;s and Ant Design&apos;s <code>Input</code>&#32;take them as
          they are:
        </p>
        <DocsCodeBlock code={shadcnCode} lang="tsx" />

        <h2 id="sunucu">On the server</h2>
        <p>
          The same lookup runs on the server with <code>resolvePostalCode</code>, and{" "}
          <code>resolveAddress</code>&#32;checks a submitted postal code against the neighbourhood.
          See <Link href="/address/docs/server">server validation</Link>. For the raw result without
          React, use <code>findPostalCode</code>&#32;from the{" "}
          <Link href="/address/docs/data">dataset</Link>.
        </p>
      </DocsProse>
    </>
  );
}
