import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { AddressDemo } from "@/components/shared/AddressDemo";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
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
      <p>Posta kodu: {value.postalCode ?? "—"}</p>
    </>
  )
}`;

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
        title="Giriş"
        description="Türkiye adresleri için headless React hook'u: il, ilçe ve mahalle zincirleme seçilir, posta kodu mahalleden türetilir; sunucu doğrulaması ve PTT verisiyle."
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
          altındakileri temizler. Posta kodu yazmak ters yönde çalışır ve select&apos;leri doldurur.
        </p>
        <p>
          Yukarıdaki demo aynı hook&apos;u <AcademyBadge kind="shadcn" />
          &#32;Select ile kullanır; diğer bileşenler için{" "}
          <Link href="/address/docs/ui-libraries">UI kütüphaneleri</Link>&#32;sayfasına bakın.
        </p>

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
            <strong>İki yönlü posta kodu</strong>: Mahalle seçilince kodu gelir, kod yazılınca
            select&apos;ler dolar: kodun tek mahallesi varsa üçü de, yoksa il ve ilçe. Bkz.{" "}
            <Link href="/address/docs/postal-code">posta kodundan adres</Link>.
          </li>
          <li>
            <strong>Tek satır adres</strong>: <code>formatAddress</code>&#32;seçimi &quot;Alandüzü
            Mah. Adapazarı/Sakarya&quot; biçimine getirir; istenirse posta koduyla.
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
            <code>resolveAddress</code>&#32;adresi veri setine karşı yeniden kontrol eder, posta
            kodunu sunucuda türetir ve uymayan bir kodu reddeder.
          </li>
        </ul>

        <h2 id="karsilastirma">Karşılaştırma</h2>
        <p>
          Karşılaştırılan iki paket veri paketidir: select&apos;leri, zincirlemeyi ve doğrulamayı
          siz yazarsınız. Fark hook, posta kodu, isteğe bağlı yükleme ve sunucu tarafındadır.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="[&_code]:whitespace-nowrap [&_td:not(:first-child)]:text-center [&_th:not(:first-child)]:text-center">
            <thead>
              <tr>
                <th>Özellik</th>
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
                <td>React hook (zincirleme select&apos;ler)</td>
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
                <td>İl, ilçe ve mahalle verisi</td>
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
                <td>Pakette bulunan mahalle sayısı</td>
                <td>
                  <code>72.466</code>
                </td>
                <td>
                  <code>73.305</code>
                </td>
                <td>
                  <code>49.662</code>
                </td>
              </tr>
              <tr>
                <td>Mahalleden posta kodu</td>
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
                <td>Tarayıcıda çalışır</td>
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
                <td>İl bazında isteğe bağlı yükleme</td>
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
                <td>Sunucuda adres doğrulama</td>
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
                <td>Türkçe harf dönüşümü, sıralama ve arama</td>
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
                <td>Şehirler arası mesafe</td>
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
                <td>Çalışma zamanı bağımlılığı</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <code>fs</code>
                </td>
              </tr>
              <tr>
                <td>Boyut (aynı form, ilk yükleme, min+gzip)</td>
                <td>
                  <code>8,6 KB</code>
                </td>
                <td>
                  <code>434,5 KB</code>
                </td>
                <td>Tarayıcı için derlenemez</td>
              </tr>
              <tr>
                <td>Son sürüm</td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>0.0.0</code>
                    <span className="text-xs text-muted-foreground">Yayınlanmadı</span>
                  </span>
                </td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>4.0.3</code>
                    <span className="text-xs text-muted-foreground">Mart 2024</span>
                  </span>
                </td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>1.1.1</code>
                    <span className="text-xs text-muted-foreground">Mayıs 2025</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          <StatusIcon status="yes" decorative /> var · <StatusIcon status="partial" decorative />{" "}
          kısmi ya da elle · <StatusIcon status="no" decorative /> yok. 29 Ekim 2026’da npm
          paketleri (<code>turkey-neighbourhoods 4.0.3</code>,{" "}
          <code>turkey-location-data 1.1.1</code>) ve <code>@virastack/address</code> yerel
          derlemesi üzerinden kontrol edildi.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Boyut nasıl ölçüldü:</strong>&#32;Aynı form (zincirleme il, ilçe ve mahalle
          select&apos;leri) üç paketle ayrı ayrı yazıldı ve esbuild ile production modunda, minify,
          tree-shaking ve code splitting açık derlendi. Tablodaki boyut, sayfa ilk açıldığında inen
          JS&apos;in aynı formun veri paketi olmadan derlenmiş halinden farkının gzip boyutudur;{" "}
          <AcademyBadge kind="react" />
          &#32;iki tarafta da olduğu için boyuta dahil edilmez. Address&apos;te bir ilin mahalleleri
          o il seçilince ayrıca iner: ortanca 4,8 KB, en büyüğü 29,6 KB. turkey-location-data veriyi
          Node&apos;un <code>fs</code> modülüyle okuduğu için tarayıcı için derlenemez. Sunucu
          doğrulamasındaki kısmi işaret, adresin dışa aktarılan listelerle elle kontrol edilebildiği
          anlamına gelir.
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
