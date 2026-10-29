import type { ReactNode } from "react";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const gettersCode = `const {
  getProvinceProps,
  getDistrictProps,
  getNeighbourhoodProps,
  getPostalCodeProps,
} = useViraAddress()

<select {...getProvinceProps()} />
<select {...getDistrictProps()} />
<select {...getNeighbourhoodProps()} />
<input {...getPostalCodeProps()} />`;

const overrideCode = `<select {...getProvinceProps({ placeholder: "Select a province" })} />
<select {...getDistrictProps()} disabled={false} />
<select {...getNeighbourhoodProps({ name: "area", id: "area" })} />`;

const headlessCode = `<MySelect {...getProvinceProps({ as: "headless" })} />
<MySelect {...getDistrictProps({ as: "headless" })} />
<MySelect {...getNeighbourhoodProps({ as: "headless" })} />`;

const shadcnCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const { provinces, getProvinceProps } = useViraAddress()

<Select {...getProvinceProps({ as: "shadcn" })} items={provinces}>
  <SelectTrigger>
    <SelectValue placeholder="Select a province" />
  </SelectTrigger>
  <SelectContent>
    {provinces.map((p) => (
      <SelectItem key={p.value} value={p.value}>
        {p.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`;

const antdCode = `import { Select } from "antd"

<Select {...getProvinceProps({ as: "antd" })} />
<Select {...getDistrictProps({ as: "antd" })} />
<Select {...getNeighbourhoodProps({ as: "antd" })} />`;

const customCode = `import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

const { provinces, setProvince, value } = useViraAddress()

<Autocomplete
  options={provinces}
  value={provinces.find((p) => p.value === value.provinceCode) ?? null}
  onChange={(_, option) => setProvince(option?.value ?? null)}
  renderInput={(params) => <TextField {...params} label="Province" />}
/>`;

const searchCode = `import { toSearchKey } from "@virastack/address"

// a search for "kadikoy" finds "Kadıköy"
const hits = neighbourhoods.filter((n) =>
  toSearchKey(n.label).includes(toSearchKey(query)),
)`;

const getterProps: [string, ReactNode][] = [
  [
    "options",
    <>
      A <code>{"{ value, label }"}</code>&#32;list
    </>,
  ],
  [
    "value",
    <>
      The selected value; <code>&quot;&quot;</code>&#32;when nothing is picked
    </>,
  ],
  ["onChange", "Takes a bare value or a change event"],
  ["disabled", "Worked out from the chain"],
  [
    "loading, aria-busy",
    <>
      <code>true</code>&#32;on the neighbourhood level while it loads
    </>,
  ],
  [
    "name, id",
    <>
      From the <code>names</code>&#32;option or the level name; <code>id</code>&#32;comes from{" "}
      <code>useId</code>
    </>,
  ],
  [
    "placeholder",
    <>
      <code>&quot;İl seçiniz&quot;</code>, <code>&quot;İlçe seçiniz&quot;</code>,{" "}
      <code>&quot;Mahalle seçiniz&quot;</code>&#32;(Turkish for &quot;select a province&quot; and so
      on)
    </>,
  ],
];

export function AddressUiLibrariesDoc() {
  return (
    <>
      <DocsPageHeader
        title="UI libraries"
        description="Prop getters fill a plain select in one line and work out the disabled state from the chain, with flavours for shadcn/ui, Ant Design and your own component."
      />
      <DocsProse>
        <h2 id="getterlar">Prop getters</h2>
        <p>
          <code>getProvinceProps()</code>, <code>getDistrictProps()</code>&#32;and{" "}
          <code>getNeighbourhoodProps()</code>&#32;fill a plain <code>&lt;select&gt;</code>&#32;in
          one line:
        </p>
        <DocsCodeBlock code={gettersCode} />
        <p>
          The options are rendered for you; the empty first option is the placeholder and lets the
          user clear the level again. The getters also set <code>value</code>, <code>onChange</code>
          , <code>disabled</code>, <code>aria-busy</code>, <code>name</code>
          &#32;and <code>id</code>. The hidden postal code input carries the value into a plain form
          submit.
        </p>
        <p>
          <code>disabled</code>&#32;follows the chain: the district waits for a province, and the
          neighbourhood waits for a district and its data. Override anything through the options, or
          by setting the prop after the spread:
        </p>
        <DocsCodeBlock code={overrideCode} />
        <p>
          The default placeholders are in Turkish, because the people filling in the form are in
          Türkiye. Pass <code>placeholder</code>&#32;to use your own wording. For other components,
          pick a flavour with <code>as</code>: <code>headless</code>, <code>shadcn</code>&#32;or{" "}
          <code>antd</code>.
        </p>

        <h2 id="headless">headless</h2>
        <p>
          For your own select component: an <code>options</code>&#32;list plus{" "}
          <code>onChange(value)</code>.
        </p>
        <DocsCodeBlock code={headlessCode} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {getterProps.map(([name, description]) => (
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

        <h2 id="shadcn">shadcn/ui</h2>
        <DocsCodeBlock code={shadcnCode} />
        <p>
          For <AcademyBadge kind="shadcn" />, <code>value</code>, <code>onValueChange</code>
          &#32;and <code>disabled</code>&#32;go on <code>Select</code>; the items are yours. An
          empty value shows the <code>SelectValue</code>&#32;placeholder. <code>items</code>&#32;is
          needed on the Base UI version of shadcn/ui to show the selected label, and is harmless on
          the Radix version.
        </p>

        <h2 id="ant-design">Ant Design</h2>
        <DocsCodeBlock code={antdCode} />
        <p>
          With <AcademyBadge kind="ant-design" />, <code>options</code>, <code>loading</code>
          &#32;and search come ready. Ant Design&apos;s own filter lowercases <code>İ</code>
          &#32;into <code>i̇</code>, so a search for <code>istanbul</code>&#32;would miss{" "}
          <code>İstanbul</code>; this flavour passes a Turkish-aware <code>filterOption</code>
          &#32;instead. An empty value is sent as <code>undefined</code>, so the placeholder shows.
        </p>

        <h2 id="listeler">Lists and setters</h2>
        <p>
          If your component&apos;s props match none of the flavours, use the lists and setters
          directly. <AcademyBadge kind="mui" /> <code>Autocomplete</code>:
        </p>
        <DocsCodeBlock code={customCode} />
        <p>
          Writing your own search? <Link href="/address/docs/helpers">toSearchKey</Link>&#32;ignores
          case and Turkish characters:
        </p>
        <DocsCodeBlock code={searchCode} lang="ts" />

        <h2 id="uzun-listeler">Long lists</h2>
        <p>
          A district can hold several hundred neighbourhoods and villages; the largest,{" "}
          <strong>Artvin</strong>&apos;s Yusufeli district, has 674. Use a searchable select there,
          and virtualise the list if it renders thousands of rows.
        </p>
      </DocsProse>
    </>
  );
}
