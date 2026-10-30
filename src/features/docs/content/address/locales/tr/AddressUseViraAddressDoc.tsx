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
      <option value="">İl seç</option>
      {provinces.map((p) => (
        <option key={p.value} value={p.value}>{p.label}</option>
      ))}
    </select>

    <select
      value={value.district ?? ""}
      onChange={(e) => setDistrict(e.target.value)}
      disabled={!districts.length}
    >
      <option value="">İlçe seç</option>
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
        {loading.neighbourhoods ? "Yükleniyor…" : "Mahalle seç"}
      </option>
      {neighbourhoods.map((n) => (
        <option key={n.value} value={n.value}>{n.label}</option>
      ))}
    </select>
  </>
)`;

const valueCode = `{
  provinceCode: "34",       // plaka kodu, string olarak
  province: "İSTANBUL",
  district: "FATİH",
  neighbourhood: "AKSARAY MAH.",
  postalCode: "34096",      // mahallenin ilk posta kodu ya da yazılan kod
  postalCodes: ["34096"],   // hepsi; birkaç yüz mahallede birden fazla
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
    "paketteki veri seti",
    "Listelerin geldiği yer. Test fixture'ı ya da kendi API'n için değiştir.",
  ],
  [
    "defaultValue",
    "—",
    <>
      <code>{"{ provinceCode, district, neighbourhood }"}</code>&#32;ile başlangıç.{" "}
      <code>form</code>&#32;verildiyse ve bu boşsa formdaki adresten okunur.
    </>,
  ],
  [
    "formatLabel",
    <code key="default">formatName</code>,
    <>
      Ham adı etikete çevirir; ikinci parametre seviyedir. <code>{"(name) => name"}</code>
      &#32;büyük harfi korur.
    </>,
  ],
  [
    "onChange",
    "—",
    <>
      Her değişiklikte <code>value</code>&#32;ile çağrılır; ilk render&apos;da çağrılmaz.
    </>,
  ],
  [
    "form",
    "—",
    <>
      Senkron tutulacak form, örneğin React Hook Form&apos;un <code>useForm()</code>&#32;sonucu.
    </>,
  ],
  [
    "names",
    <>
      <code>province</code>, <code>district</code>, <code>neighbourhood</code>,{" "}
      <code>postalCode</code>
    </>,
    <>
      Formdaki ve prop getter&apos;ların döndürdüğü input&apos;lardaki alan adları.{" "}
      <code>provinceCode</code>&#32;yalnızca adı verilirse yazılır.
    </>,
  ],
  [
    "shouldValidate",
    <code key="default">true</code>,
    "Adres değiştikçe form alanlarını yeniden doğrular.",
  ],
];

const returns: [string, ReactNode][] = [
  ["value", "Seçili adres; yukarıdaki nesne."],
  [
    "provinces, districts, neighbourhoods",
    <>
      Select&apos;e hazır <code>{"{ value, label }"}</code>&#32;listeleri. Mahalle seçenekleri
      ayrıca <code>postalCode</code>&#32;ve <code>postalCodes</code>&#32;taşır.
    </>,
  ],
  [
    "setProvince(code), setDistrict(name), setNeighbourhood(name)",
    <>
      Seçim yapar; <code>null</code>&#32;veya <code>&quot;&quot;</code>&#32;seviyeyi temizler. Üst
      seviye alttakileri temizler.
    </>,
  ],
  [
    "setPostalCode(code)",
    <>
      Posta kodundan adresi doldurur; <code>{'"exact" | "partial" | "unknown"'}</code>&#32;ile
      çözülür. Bkz. <Link href="/address/docs/postal-code">posta kodundan adres</Link>.
    </>,
  ],
  [
    "postalCodeStatus",
    <>
      Son posta kodunun ne bulduğu; etkin bir arama yoksa <code>null</code>.
    </>,
  ],
  ["reset()", "Her seviyeyi temizler."],
  [
    "loading.neighbourhoods",
    <>
      Seçili ilin mahalleleri yüklenirken <code>true</code>.
    </>,
  ],
  [
    "error",
    "Son yükleme hatası. Başka bir il seçilince temizlenir; başarısız il sonra tekrar seçilirse yükleme yeniden denenir.",
  ],
  [
    "getProvinceProps(), getDistrictProps(), getNeighbourhoodProps()",
    <>
      Düz bir <code>&lt;select&gt;</code>&apos;e yayılan prop&apos;lar; <code>disabled</code>{" "}
      zincirden hesaplanır. Diğer bileşenler için <code>as</code>&#32;ile biçim seçilir.
    </>,
  ],
  ["getPostalCodeProps()", "Türetilen posta kodu için gizli bir input."],
  [
    "getPostalCodeInputProps()",
    "Kullanıcının posta kodu yazabildiği input; seçimden türetilen kodu da gösterir.",
  ],
];

export function AddressUseViraAddressDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraAddress()"
        description="Hook API'si: seçenekler, dönüş değeri, value nesnesi ve kendi veri kaynağın."
      />
      <DocsProse>
        <h2 id="temel">Temel kullanım</h2>
        <p>
          Hook üç liste ve üç setter döndürür. Her liste <code>{"{ value, label }"}</code>
          &#32;biçimindedir: <code>value</code>&#32;veri setindeki ham adı (<code>FATİH</code>),{" "}
          <code>label</code>&#32;başlık biçimini (<code>Fatih</code>) taşır. İl listesinde{" "}
          <code>value</code>&#32;plaka kodudur (<code>&quot;34&quot;</code>).
        </p>
        <DocsCodeBlock code={basicCode} />
        <p>
          Elle bağlamak istemiyorsanız aynı şeyi{" "}
          <Link href="/address/docs/ui-libraries">prop getter&apos;lar</Link>&#32;tek satırda yapar.{" "}
          <code>setProvince</code>&#32;plaka kodunu sayı veya metin olarak alır.
        </p>

        <h2 id="value">value</h2>
        <p>Formun ihtiyaç duyduğu her şey tek nesnededir:</p>
        <DocsCodeBlock code={valueCode} lang="ts" />
        <p>
          Seçilmemiş seviyeler <code>null</code>, <code>postalCodes</code>&#32;boş dizidir. Adlar
          veri setindeki gibi büyük harflidir; ekranda göstermek için listelerdeki{" "}
          <code>label</code>&#32;alanını ya da <Link href="/address/docs/helpers">formatName</Link>
          &#32;kullan.
        </p>

        <h2 id="secenekler">Seçenekler</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Seçenek</th>
                <th>Varsayılan</th>
                <th>Ne yapar</th>
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
          <code>form</code>, <code>names</code>&#32;ve <code>shouldValidate</code>{" "}
          <Link href="/address/docs/react-hook-form">React Hook Form</Link>&#32;sayfasında ayrıntılı
          anlatılır.
        </p>

        <h2 id="donus">Dönüş değeri</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Alan</th>
                <th>Açıklama</th>
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

        <h2 id="kaynak">Kendi veri kaynağın</h2>
        <p>
          Varsayılan kaynak paketteki veri setidir. Testlerde küçük bir fixture kullanmak ya da
          listeleri kendi API&apos;nden okumak için <code>source</code>&#32;ver:
        </p>
        <DocsCodeBlock code={sourceCode} />
        <p>
          Hook mahalleleri yalnızca il değiştiğinde okur; her render&apos;da yeni bir{" "}
          <code>source</code>&#32;nesnesi vermek yüklemeyi tekrarlatmaz. Yalnızca mahallelerin
          nereden geldiğini değiştirmek istiyorsanız <code>setLoader</code>&#32;daha kısadır; bkz.{" "}
          <Link href="/address/docs/data">veri seti</Link>.
        </p>
      </DocsProse>
    </>
  );
}
