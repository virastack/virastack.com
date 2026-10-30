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

const overrideCode = `<select {...getDistrictProps({ placeholder: "Nerede?" })} />
<select {...getDistrictProps()} disabled={false} />
<select {...getProvinceProps({ name: "sehir", id: "sehir" })} />`;

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
    <SelectValue placeholder="İl seç" />
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
  renderInput={(params) => <TextField {...params} label="İl" />}
/>`;

const searchCode = `import { toSearchKey } from "@virastack/address"

// "kadikoy" araması "Kadıköy"ü bulur
const hits = neighbourhoods.filter((n) =>
  toSearchKey(n.label).includes(toSearchKey(query)),
)`;

const getterProps: [string, ReactNode][] = [
  [
    "options",
    <>
      <code>{"{ value, label }"}</code>&#32;listesi
    </>,
  ],
  [
    "value",
    <>
      Seçili değer; seçim yoksa <code>&quot;&quot;</code>
    </>,
  ],
  ["onChange", "Çıplak bir değer ya da change event'i alır"],
  ["disabled", "Zincirden hesaplanır"],
  [
    "loading, aria-busy",
    <>
      Mahalle seviyesinde, mahalleler yüklenirken <code>true</code>
    </>,
  ],
  [
    "name, id",
    <>
      <code>names</code>&#32;seçeneğinden ya da seviye adından; <code>id</code> <code>useId</code>
      &#32;ile üretilir
    </>,
  ],
  [
    "placeholder",
    <>
      <code>&quot;İl seç&quot;</code>, <code>&quot;İlçe seç&quot;</code>,{" "}
      <code>&quot;Mahalle seç&quot;</code>
    </>,
  ],
];

export function AddressUiLibrariesDoc() {
  return (
    <>
      <DocsPageHeader
        title="UI kütüphaneleri"
        description="Prop getter'lar düz bir select'i tek satırda doldurur ve disabled durumunu zincirden hesaplar; shadcn/ui, Ant Design ve kendi bileşenin için ayrı biçimler sunar."
      />
      <DocsProse>
        <h2 id="getterlar">Prop getter&apos;lar</h2>
        <p>
          <code>getProvinceProps()</code>, <code>getDistrictProps()</code>&#32;ve{" "}
          <code>getNeighbourhoodProps()</code>&#32;düz bir <code>&lt;select&gt;</code>&apos;i tek
          satırda doldurur:
        </p>
        <DocsCodeBlock code={gettersCode} />
        <p>
          Seçenekler senin yerine çizilir; boş ilk seçenek placeholder&apos;dır ve seviyeyi tekrar
          temizlemeye yarar. Getter&apos;lar ayrıca <code>value</code>, <code>onChange</code>,{" "}
          <code>disabled</code>, <code>aria-busy</code>, <code>name</code>&#32;ve <code>id</code>
          &#32;verir. Gizli posta kodu input&apos;u, değeri kütüphanesiz bir form gönderimine taşır.
        </p>
        <p>
          <code>disabled</code>&#32;zincirden gelir: ilçe, il seçilene kadar; mahalle, ilçe seçilene
          ve mahalleler yüklenene kadar kapalıdır. Her değeri seçenekle ya da prop&apos;u sonradan
          yazarak ezebilirsin:
        </p>
        <DocsCodeBlock code={overrideCode} />
        <p>
          Başka bir bileşen kullanıyorsan biçimi <code>as</code>&#32;ile seç: <code>headless</code>,{" "}
          <code>shadcn</code>&#32;veya <code>antd</code>.
        </p>

        <h2 id="headless">headless</h2>
        <p>
          Kendi select bileşenin için: <code>options</code>&#32;listesi artı{" "}
          <code>onChange(value)</code>.
        </p>
        <DocsCodeBlock code={headlessCode} />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Değer</th>
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
          <AcademyBadge kind="shadcn" />
          &#32;için <code>value</code>, <code>onValueChange</code>&#32;ve <code>disabled</code>{" "}
          <code>Select</code>&apos;e gider; öğeler sizdedir. Değer boşken <code>SelectValue</code>
          &#32;placeholder&apos;ı gösterir. <code>items</code>, shadcn/ui&apos;ın Base UI sürümünde
          seçili etiketin görünmesi için gerekir; Radix sürümünde zararsızdır.
        </p>

        <h2 id="ant-design">Ant Design</h2>
        <DocsCodeBlock code={antdCode} />
        <p>
          <AcademyBadge kind="ant-design" />
          &#32;için <code>options</code>, <code>loading</code>&#32;ve arama hazır gelir.
          Kütüphanenin kendi filtresi <code>İ</code>&#32;harfini <code>i̇</code>&#32;yaptığı için{" "}
          <code>istanbul</code>&#32;araması <code>İstanbul</code>&apos;u bulamaz; bu biçim Türkçe
          farkında bir <code>filterOption</code>&#32;verir. Değer boşken <code>undefined</code>{" "}
          gönderilir, böylece placeholder görünür.
        </p>

        <h2 id="listeler">Listeler ve setter&apos;lar</h2>
        <p>
          Bileşeninin prop&apos;ları hiçbir biçime uymuyorsa listeleri ve setter&apos;ları doğrudan
          kullan. <AcademyBadge kind="mui" /> <code>Autocomplete</code>:
        </p>
        <DocsCodeBlock code={customCode} />
        <p>
          Kendi aramanı yazıyorsan <Link href="/address/docs/helpers">toSearchKey</Link>
          &#32;harf ve Türkçe karakter farkını yok sayar:
        </p>
        <DocsCodeBlock code={searchCode} lang="ts" />

        <h2 id="uzun-listeler">Uzun listeler</h2>
        <p>
          Bir ilçe birkaç yüz mahalle ve köy tutabilir; en kalabalığı <strong>Artvin</strong>
          &apos;in Yusufeli ilçesidir (674). Bu seviyede aranabilir bir select kullan; listen
          binlerce satır çizecekse sanallaştırın.
        </p>
      </DocsProse>
    </>
  );
}
