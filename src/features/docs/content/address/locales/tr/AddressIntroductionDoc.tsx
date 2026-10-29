import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { AddressDemo } from "@/components/shared/AddressDemo";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
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
      <p>Posta kodu: {value.postalCode ?? "—"}</p>
    </>
  )
}`;

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
        title="Giriş"
        description="React için headless Türkçe adres hook'u: il, ilçe ve mahalle zincirleme seçilir, posta kodu mahalleden türetilir; sunucu doğrulaması ve PTT verisiyle."
      />
      <DocsProse>
        <p>
          Adres formu göründüğünden zordur: il değişince ilçe ve mahalle temizlenmeli, posta kodu
          kullanıcıya yazdırılmamalı, 72 bin mahalle tek seferde indirilmemeli ve gönderilen adres
          sunucuda yeniden kontrol edilmelidir. <code>useViraAddress()</code>&#32;bunları tek hook
          ile çözer. Select&apos;leriniz ve stiliniz sizde kalır.
        </p>

        <h2 id="baslarken">Başlarken</h2>
        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/address")} />
        <ComponentPreview
          preview={<AddressDemo showValue />}
          previewClassName="max-w-2xl"
          code={quickStartCode}
        >
          <DocsCodeBlock code={quickStartCode} lang="tsx" />
        </ComponentPreview>
        <p>
          İl seçilince ilçeler gelir, ilçe seçilince o ilin mahalleleri yüklenir, mahalle seçilince
          posta kodu <code>value.postalCode</code>&#32;alanına düşer. Bir üst seviyeyi değiştirmek
          altındakileri temizler.
        </p>
        <p>
          Yukarıdaki demo aynı hook&apos;u <AcademyBadge kind="shadcn" />
          &#32;Select ile kullanır; diğer bileşenler için{" "}
          <Link href="/address/docs/ui-libraries">UI kütüphaneleri</Link>&#32;sayfasına bakın.
        </p>

        <h2 id="giris-noktalari">Giriş noktaları</h2>
        <p>
          Yalnızca kök girişte <code>&quot;use client&quot;</code>&#32;vardır. <code>/server</code>{" "}
          ve <code>/data</code>&#32;React import etmez; Server Component, Server Action, route
          handler ve Node betiklerinde çalışır.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Import</th>
                <th>Dışa aktarımlar</th>
                <th>Çalıştığı yer</th>
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

        <h2 id="gereksinimler">Gereksinimler</h2>
        <ul>
          <li>
            Hook için <AcademyBadge kind="react" label="React 18.2+" />
            &#32;(React 19 desteklenir). <code>/server</code>&#32;ve <code>/data</code>&#32;React
            olmadan çalışır.
          </li>
          <li>
            <AcademyBadge kind="nodejs" label="Node.js 20+" />
          </li>
          <li>Çalışma zamanı bağımlılığı yok; veri paketin içinde gelir.</li>
          <li>
            <AcademyBadge kind="react-hook-form" />
            &#32;isteğe bağlıdır. Hook ondan hiçbir şey import etmez; formu <code>form</code>{" "}
            seçeneğiyle alır.
          </li>
        </ul>

        <h2 id="neden">
          Neden{" "}
          <GuideProductMark id="address" linked={false} tone="heading">
            Address
          </GuideProductMark>
          ?
        </h2>
        <ul>
          <li>
            <strong>Zincirleme seçim</strong>: İl, ilçe, mahalle. Üst seviye değişince alttakiler
            hem hook&apos;ta hem formda temizlenir.
          </li>
          <li>
            <strong>Türetilen posta kodu</strong>: Kullanıcı yazmaz, mahalleden gelir. Birden çok
            posta kodu olan birkaç yüz mahallede <code>postalCodes</code>&#32;hepsini verir.
          </li>
          <li>
            <strong>Güncel veri</strong>: Veri her ay otomatik bir sistemle PTT&apos;ye karşı
            kontrol edilir. Bir değişiklik bulunursa yeni bir patch sürümü yayınlanır; API değişmez.
          </li>
          <li>
            <strong>İsteğe bağlı yükleme</strong>: İl ve ilçe adları paketle gelir; bir ilin
            mahalleleri yalnızca o il seçilince yüklenir. Tipik bir ziyaret yaklaşık 10 kB indirir.
          </li>
          <li>
            <strong>Headless</strong>: Hiçbir şey çizmez. Native select,{" "}
            <AcademyBadge kind="shadcn" />, <AcademyBadge kind="ant-design" />
            &#32;veya kendi bileşeninizle çalışır.
          </li>
          <li>
            <strong>Türkçe farkındalık</strong>: Sıralama, harf dönüşümü ve arama <code>İ</code> ile{" "}
            <code>ı</code>&apos;yı doğru işler.
          </li>
          <li>
            <strong>Sunucuda doğrulama</strong>: Client&apos;ın gönderdiği posta koduna güvenilmez;{" "}
            <code>resolveAddress</code>&#32;adresi veri setine karşı yeniden kontrol eder ve posta
            kodunu sunucuda türetir.
          </li>
        </ul>

        <h2 id="kapsam">Kapsam</h2>
        <ul>
          <li>
            <Link href="/address/docs/use-vira-address">useViraAddress()</Link>,{" "}
            <Link href="/address/docs/react-hook-form">React Hook Form</Link> ve{" "}
            <Link href="/address/docs/ui-libraries">UI kütüphaneleri</Link>
          </li>
          <li>
            <Link href="/address/docs/server">Sunucu doğrulaması</Link> ve{" "}
            <Link href="/address/docs/data">veri seti</Link>
          </li>
          <li>
            <Link href="/address/docs/helpers">Türkçe yardımcılar</Link> ve{" "}
            <Link href="/address/docs/types">tipler</Link>
          </li>
        </ul>
        <p>
          Kapsam dışı: sokak, bina ve kapı numarası (veri setinde yoktur, serbest metin olarak
          alın), yurt dışı adresler, harita ve konumdan adres bulma, hazır select bileşeni.
        </p>
      </DocsProse>
    </>
  );
}
