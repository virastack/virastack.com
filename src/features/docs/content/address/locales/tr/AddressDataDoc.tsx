import type { ReactNode } from "react";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
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

source.date             // "2026-10-28": verinin toplandığı gün
source.neighbourhoods   // 72466

await findPostalCode("34710")
// { postalCode: "34710", province: { code: 34, ... },
//   district: "KADIKÖY", neighbourhoods: [{ name: "CAFERAĞA MAH.", ... }] }`;

const loaderCode = `import { setLoader } from "@virastack/address/data"

setLoader(async (provinceCode) => {
  const response = await fetch(\`/api/address/\${provinceCode}\`)
  return response.text()
})

setLoader(null) // paketteki modüllere dön`;

const payloadCode = `SEYHAN;AKKAPI MAH.:01040|ALTINŞEHİR MAH.:01170
CEYHAN;BAHÇE MAH.:01950`;

const costs: [string, ReactNode, string][] = [
  ["names", "İl ve ilçe adları; sayfa açılınca bir kez", "5,3 kB"],
  [
    "istanbul",
    <>
      <strong>İstanbul</strong> seçilince (973 mahalle)
    </>,
    "6,8 kB",
  ],
  [
    "ankara",
    <>
      <strong>Ankara</strong> seçilince (1.434 mahalle)
    </>,
    "8,3 kB",
  ],
  ["median", "Orta büyüklükte bir il: 81 ilin yarısı bundan küçük", "4,6 kB"],
  ["p90", "Büyük bir il: 81 ilin 73'ü en fazla bu kadar", "9,2 kB"],
  [
    "largest",
    <>
      En büyük il: <strong>Kastamonu</strong> (167 mahalle ve 4.151 köy)
    </>,
    "28,5 kB",
  ],
];

export function AddressDataDoc() {
  return (
    <>
      <DocsPageHeader
        title="Veri seti"
        description="81 il, 973 ilçe ve 72.466 mahalle, posta kodlarıyla. React gerektirmez; her il yalnızca ihtiyaç duyulunca yüklenir."
      />
      <DocsProse>
        <h2 id="api">API</h2>
        <p>
          Hook&apos;un arkasındaki veri paketin içinde gelir ve <code>@virastack/address/data</code>
          &#32;girişinden React olmadan kullanılabilir:
        </p>
        <DocsCodeBlock code={apiCode} lang="ts" />
        <p>
          <code>provinces</code>, <code>province</code>&#32;ve <code>districts</code>
          &#32;eşzamanlıdır. <code>neighbourhoods(code)</code>&#32;bir <code>Promise</code>
          &#32;döndürür ve sonucu önbelleğe alır: aynı anda gelen iki istek tek yüklemeyi paylaşır,
          başarısız bir yükleme hatırlanmaz ve il yeniden istenince tekrar denenir. İl olmayan bir
          kod boş bir <code>Map</code>&#32;verir.
        </p>
        <p>
          Mahallelerin çoğunun tek posta kodu vardır. Birkaç yüzünün birden fazla, en çok sekiz
          posta kodu vardır ve hepsi korunur: <code>postalCodes</code>&#32;tam cevaptır,{" "}
          <code>postalCode</code>&#32;yaygın durum için ilkidir.
        </p>
        <p>
          <code>findPostalCode(code)</code>&#32;bir posta kodunun ilini, ilçesini ve kapsadığı
          mahalleleri verir; veri setinde yoksa <code>null</code>. Yalnızca kodun ilk iki
          hanesindeki il yüklenir. Her kod tek bir ilçeye aittir ve ilin plaka koduyla başlar; veri
          derlenirken bu kontrol edilir.
        </p>

        <h2 id="maliyet">Ne kadar indirir?</h2>
        <p>
          Sayfa açılınca il ve ilçe adları gelir; bir il seçilince yalnızca o ilin mahalleleri
          indirilir. Bunun için ayar gerekmez: her il ayrı bir dosyadır ve projenin bundler&apos;ı
          onu kendiliğinden ayırır. Sunucuda da yalnızca istenen iller belleğe alınır.
        </p>
        <p>
          Tablodaki boyutlar, tarayıcının ağdan gerçekten indirdiği sıkıştırılmış (gzip) hâlidir.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Ne indirilir</th>
                <th>Boyut</th>
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
          81 ilin 75&apos;i 10 kB&apos;ın altındadır. Tipik bir ziyaret, il ve ilçe adlarıyla
          seçilen ili birlikte yaklaşık <strong>10 kB</strong>&#32;indirir.{" "}
          <strong>İstanbul</strong> ve <strong>Ankara</strong>&#32;gibi büyük şehirlerin dosyası da
          10 kB&apos;ın altındadır; en büyük dosyalar binlerce köyü olan kırsal illerindir. Veri
          derlemesi en büyük il 30 kB&apos;ı geçerse başarısız olur; bir güncelleme yükü sessizce
          büyütemez.
        </p>

        <h2 id="loader">Kendi loader&apos;ın</h2>
        <p>
          Mahalleleri diskten, bir CDN&apos;den ya da kendi endpoint&apos;inden okumak için loader
          değiştir:
        </p>
        <DocsCodeBlock code={loaderCode} lang="ts" />
        <p>
          Loader ilin kodlanmış metnini döndürür: her satır bir ilçedir, ilçe adından sonra{" "}
          <code>;</code>, mahalleler arasında <code>|</code>, posta kodundan önce <code>:</code>,
          birden çok posta kodu arasında <code>,</code>&#32;bulunur.
        </p>
        <DocsCodeBlock code={payloadCode} lang="ts" />
        <p>
          <code>setLoader</code>&#32;hook&apos;u ve <code>/server</code>&apos;ı da etkiler; hepsi
          aynı veri modülünü okur. Yeni bir loader daha önce okunan illeri unutturur.
        </p>

        <h2 id="kaynak">Kaynak ve güncelleme</h2>
        <p>
          Veri, Türkiye&apos;nin posta hizmeti{" "}
          <a href="https://www.ptt.gov.tr/posta-kodu" target="_blank" rel="noreferrer">
            PTT
          </a>
          &apos;den derlendi. Adlar ve posta kodları kamuya açık referans verisidir; bu paket
          yalnızca biçimlerini değiştirir. Teslimatın kritik olduğu işlerde PTT ile doğrula.
        </p>
        <p>
          Kaynak her sokağı listeler; bu, bir adres formunun ihtiyacından çok fazladır. Derleme
          veriyi posta koduyla birlikte benzersiz mahallelere indirger. Her il iç içe JSON yerine
          tek bir kodlanmış metin olarak gelir: ağda daha küçüktür ve bir metni bölmek, nesne
          dizisini ayrıştırmaktan hızlıdır.
        </p>
        <p>
          Veri her ay otomatik bir sistemle PTT&apos;ye karşı kontrol edilir. Bir değişiklik
          bulunursa yeni bir patch sürümü yayınlanır; API değişmez. <code>source.date</code>
          &#32;verinin toplandığı günü verir.
        </p>
      </DocsProse>
    </>
  );
}
