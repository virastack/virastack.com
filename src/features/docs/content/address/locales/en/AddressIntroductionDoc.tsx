import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { AddressDemo } from "@/components/shared/AddressDemo";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { TurkeyOnlyNotice } from "@/components/shared/TurkeyOnlyNotice";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

const quickStartCode = `"use client"

import { useViraAddress } from "@virastack/address"

export function AddressFields() {
  const {
    getProvinceProps,
    getDistrictProps,
    getNeighbourhoodProps,
    value,
  } = useViraAddress()

  return (
    <>
      <select {...getProvinceProps()} />
      <select {...getDistrictProps()} />
      <select {...getNeighbourhoodProps()} />
      <p>Postal code: {value.postalCode ?? "—"}</p>
    </>
  )
}`;

const terms: [string, string, string][] = [
  ["Province", "il", "81 of them. Each has a plate code from 1 to 81, e.g. 34 for İstanbul."],
  ["District", "ilçe", "973 in total, nested under a province."],
  [
    "Neighbourhood",
    "mahalle",
    "72,466 in total. In rural districts these are mostly villages (köy).",
  ],
  ["Postal code", "posta kodu", "Five digits, issued by PTT, Türkiye's postal service."],
];

const entries: [string, string, string][] = [
  [
    "@virastack/address",
    "useViraAddress, formatName, toSearchKey, compareNames, defaultSource",
    "client",
  ],
  [
    "@virastack/address/server",
    "resolveAddress, postalCodeFor, districtsOf, findProvince, provinces",
    "server",
  ],
  [
    "@virastack/address/data",
    "provinces, districts, province, neighbourhoods, setLoader, source",
    "client + server",
  ],
];

export function AddressIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Introduction"
        description="A headless React hook for Turkish addresses: province, district and neighbourhood picked in a chain, the postal code derived from the pick, server validation and the PTT dataset."
      />
      <TurkeyOnlyNotice />
      <DocsProse>
        <p>
          A Turkish address is picked in three steps, each depending on the one before: the
          province, then a district inside it, then a neighbourhood inside that. The postal code
          belongs to the neighbourhood. <code>useViraAddress()</code>&#32;runs that chain for you,
          loads the data a province at a time and works out the postal code. The markup and the
          styling stay yours.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>In these docs</th>
                <th>In Turkish</th>
                <th>What it is</th>
              </tr>
            </thead>
            <tbody>
              {terms.map(([term, turkish, description]) => (
                <tr key={term}>
                  <td>{term}</td>
                  <td>
                    <em>{turkish}</em>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="baslarken">Getting started</h2>
        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/address")} />
        <ComponentPreview
          preview={<AddressDemo showValue />}
          previewClassName="max-w-2xl"
          code={quickStartCode}
        >
          <DocsCodeBlock code={quickStartCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Picking a province lists its districts. Picking a district lists its neighbourhoods, which
          are fetched for that province the first time it is needed. Picking a neighbourhood fills
          in <code>value.postalCode</code>. Changing any level clears everything below it.
        </p>
        <p>
          The demo above runs the same hook on <AcademyBadge kind="shadcn" />
          &#32;selects; see <Link href="/address/docs/ui-libraries">UI libraries</Link>&#32;for
          other components.
        </p>

        <h2 id="giris-noktalari">Entry points</h2>
        <p>
          Only the root entry carries <code>&quot;use client&quot;</code>. <code>/server</code>
          &#32;and <code>/data</code>&#32;never import React, so they run in Server Components,
          Server Actions, route handlers and plain Node scripts.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Import</th>
                <th>Exports</th>
                <th>Runs on</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([entry, exports, runs]) => (
                <tr key={entry}>
                  <td>
                    <code>{entry}</code>
                  </td>
                  <td>{exports}</td>
                  <td>{runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="gereksinimler">Requirements</h2>
        <ul>
          <li>
            <AcademyBadge kind="react" label="React 18.2+" />
            &#32;for the hook (React 19 is supported). <code>/server</code>&#32;and{" "}
            <code>/data</code>&#32;work without React.
          </li>
          <li>
            <AcademyBadge kind="nodejs" label="Node.js 20+" />
          </li>
          <li>No runtime dependencies; the dataset ships inside the package.</li>
          <li>
            <AcademyBadge kind="react-hook-form" />
            &#32;is optional. The hook imports nothing from it and takes your form through the{" "}
            <code>form</code>&#32;option.
          </li>
        </ul>

        <h2 id="neden">
          Why{" "}
          <GuideProductMark id="address" linked={false} tone="heading">
            Address
          </GuideProductMark>
          ?
        </h2>
        <ul>
          <li>
            <strong>Chained selection</strong>: Province, district, neighbourhood. Changing a level
            clears the ones below it, in the hook and in your form.
          </li>
          <li>
            <strong>Derived postal code</strong>: Users never type it; it comes from the
            neighbourhood. For the few hundred neighbourhoods with several codes,{" "}
            <code>postalCodes</code>&#32;lists them all.
          </li>
          <li>
            <strong>Up-to-date data</strong>: An automated check compares the dataset against PTT
            every month. When something changes, a patch release ships; the API stays the same.
          </li>
          <li>
            <strong>Loaded on demand</strong>: Province and district names ship with the package; a
            province&apos;s neighbourhoods download only when it is picked. A typical visit costs
            about 10 kB.
          </li>
          <li>
            <strong>Headless</strong>: Nothing is rendered for you. A native select,{" "}
            <AcademyBadge kind="shadcn" />, <AcademyBadge kind="ant-design" />
            &#32;or your own component all work.
          </li>
          <li>
            <strong>Turkish-aware</strong>: Sorting, casing and search handle the dotted{" "}
            <code>İ</code>&#32;and the dotless <code>ı</code>&#32;correctly.
          </li>
          <li>
            <strong>Validated on the server</strong>: A postal code sent by the client is never
            trusted; <code>resolveAddress</code>&#32;checks the address against the dataset and
            derives the code itself.
          </li>
        </ul>

        <h2 id="kapsam">Scope</h2>
        <ul>
          <li>
            <Link href="/address/docs/use-vira-address">useViraAddress()</Link>,{" "}
            <Link href="/address/docs/react-hook-form">React Hook Form</Link> and{" "}
            <Link href="/address/docs/ui-libraries">UI libraries</Link>
          </li>
          <li>
            <Link href="/address/docs/server">Server validation</Link> and the{" "}
            <Link href="/address/docs/data">dataset</Link>
          </li>
          <li>
            <Link href="/address/docs/helpers">Turkish helpers</Link> and{" "}
            <Link href="/address/docs/types">types</Link>
          </li>
        </ul>
        <p>
          Out of scope: street, building and door numbers (they are not in the dataset; collect them
          as free text), addresses outside Türkiye, maps and geocoding, and a ready-made select
          component.
        </p>
      </DocsProse>
    </>
  );
}
