import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { AddressDemo } from "@/components/shared/AddressDemo";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { TurkeyOnlyNotice } from "@/components/shared/TurkeyOnlyNotice";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { StatusIcon } from "@/features/docs/components/StatusIcon";
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
    "useViraAddress, formatAddress, formatName, toSearchKey, compareNames, normalizePostalCode, defaultSource",
    "client",
  ],
  [
    "@virastack/address/server",
    "resolveAddress, resolvePostalCode, postalCodeFor, formatAddress, districtsOf, findProvince, provinces",
    "server",
  ],
  [
    "@virastack/address/data",
    "provinces, districts, province, neighbourhoods, findPostalCode, setLoader, source",
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
          in <code>value.postalCode</code>. Changing any level clears everything below it. Typing a
          postal code works the other way round and fills in the selects.
        </p>
        <p>
          The demo above runs the same hook on <AcademyBadge kind="shadcn" />
          &#32;selects; see <Link href="/address/docs/ui-libraries">UI libraries</Link>&#32;for
          other components.
        </p>

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
            <strong>Postal code both ways</strong>: Picking a neighbourhood fills in its code, and
            typing a code fills in the selects: all three when the code has one neighbourhood,
            province and district otherwise. See{" "}
            <Link href="/address/docs/postal-code">from a postal code</Link>.
          </li>
          <li>
            <strong>One-line address</strong>: <code>formatAddress</code>&#32;turns the pick into
            &quot;Alandüzü Mah. Adapazarı/Sakarya&quot;, optionally with the postal code.
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
            trusted; <code>resolveAddress</code>&#32;checks the address against the dataset, derives
            the code itself and refuses a submitted code that does not match.
          </li>
        </ul>

        <h2 id="karsilastirma">Comparison</h2>
        <p>
          Both packages compared here are data packages: you write the selects, the chaining and the
          validation. The difference is the hook, the postal code, loading on demand and the server.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="[&_code]:whitespace-nowrap [&_td:not(:first-child)]:text-center [&_th:not(:first-child)]:text-center">
            <thead>
              <tr>
                <th>Feature</th>
                <th>
                  <GuideProductMark id="address" linked={false}>
                    Address
                  </GuideProductMark>
                </th>
                <th>turkey-neighbourhoods</th>
                <th>turkey-location-data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>React hook (chained selects)</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>Province, district and neighbourhood data</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
              </tr>
              <tr>
                <td>Neighbourhoods in the package</td>
                <td>
                  <code>72,466</code>
                </td>
                <td>
                  <code>73,305</code>
                </td>
                <td>
                  <code>49,662</code>
                </td>
              </tr>
              <tr>
                <td>Postal code from the neighbourhood</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>Runs in the browser</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>Loads neighbourhoods per province on demand</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>Address validation on the server</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
              </tr>
              <tr>
                <td>Turkish-aware case, sorting and search</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
              </tr>
              <tr>
                <td>Distances between cities</td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>Runtime dependencies</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <code>fs</code>
                </td>
              </tr>
              <tr>
                <td>Size (same form, first load, min+gzip)</td>
                <td>
                  <code>8.6 KB</code>
                </td>
                <td>
                  <code>434.5 KB</code>
                </td>
                <td>Does not build for the browser</td>
              </tr>
              <tr>
                <td>Latest release</td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>0.0.0</code>
                    <span className="text-xs text-muted-foreground">Not published</span>
                  </span>
                </td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>4.0.3</code>
                    <span className="text-xs text-muted-foreground">Mar 2024</span>
                  </span>
                </td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>1.1.1</code>
                    <span className="text-xs text-muted-foreground">May 2025</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          <StatusIcon status="yes" decorative /> yes · <StatusIcon status="partial" decorative />{" "}
          partial or manual · <StatusIcon status="no" decorative /> no. Checked on 29 October 2026
          against the npm packages (<code>turkey-neighbourhoods 4.0.3</code>,{" "}
          <code>turkey-location-data 1.1.1</code>) and a local build of{" "}
          <code>@virastack/address</code>.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>How size was measured:</strong> The same form (chained province, district and
          neighbourhood selects) was written with each package and built with esbuild in production
          mode, minified, tree-shaken and code split. The size is the gzip difference in the JS
          loaded on first visit over the same form built without a data package, so{" "}
          <AcademyBadge kind="react" />, present on both sides, is not counted. With Address, a
          province’s neighbourhoods load when it is picked: 4.8 KB median, 29.6 KB at most.
          turkey-location-data reads its data with Node’s <code>fs</code> module, so it does not
          build for the browser. Partial server validation means the address can be checked by hand
          against the exported lists.
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
