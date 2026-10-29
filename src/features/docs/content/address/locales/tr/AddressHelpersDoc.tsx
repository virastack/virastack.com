import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const formatNameCode = `import { formatName } from "@virastack/address"

formatName("AKKAPI MAH.")             // "Akkapı Mah."
formatName("İSTANBUL")                // "İstanbul"
formatName("ŞEHİT P. ÜSTEĞMEN MAH.")  // "Şehit P. Üsteğmen Mah."
formatName("GAZİ-OSMAN MAH.")         // "Gazi-Osman Mah."`;

const searchKeyCode = `import { toSearchKey } from "@virastack/address"

toSearchKey("KADIKÖY")    // "kadikoy"
toSearchKey("Çağlayan")   // "caglayan"

const hits = neighbourhoods.filter((n) =>
  toSearchKey(n.label).includes(toSearchKey(query)),
)`;

const compareCode = `import { compareNames } from "@virastack/address"

const sorted = ["İZMİR", "ADANA", "ÇORUM"].sort(compareNames)
// ["ADANA", "ÇORUM", "İZMİR"]`;

const formatAddressCode = `import { formatAddress } from "@virastack/address"

const value = {
  province: "SAKARYA",
  district: "ADAPAZARI",
  neighbourhood: "ALANDÜZÜ MAH.",
  postalCode: "54100",
}

formatAddress(value)                        // "Alandüzü Mah. Adapazarı/Sakarya"
formatAddress(value, { postalCode: true })  // "Alandüzü Mah. 54100 Adapazarı/Sakarya"
formatAddress(value, { separator: ", " })   // "Alandüzü Mah. Adapazarı, Sakarya"

formatAddress({ province: "SAKARYA", district: "ADAPAZARI" })
// "Adapazarı/Sakarya": seçilmeyen seviye atlanır`;

export function AddressHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Türkçe yardımcılar"
        description="formatName, toSearchKey, compareNames ve formatAddress: adları göstermek, aramak, sıralamak ve adresi tek satıra dökmek için; İ ve ı doğru işlenir."
      />
      <DocsProse>
        <h2 id="format-name">formatName</h2>
        <p>
          Veri seti büyük harflidir (<code>AKKAPI MAH.</code>) ve bir açılır listede kötü okunur.
          Sıradan <code>toLowerCase</code>&#32;<code>I</code>&#32;harfini <code>ı</code>&#32;yerine{" "}
          <code>i</code>&#32;yapar. <code>formatName</code>&#32;Türkçe kurallarla küçültür; her
          kelimenin ve nokta, tire, eğik çizgi ya da parantezden sonraki harfin ilkini büyütür.
        </p>
        <DocsCodeBlock code={formatNameCode} lang="ts" />
        <p>
          Hook&apos;un <Link href="/address/docs/use-vira-address">formatLabel</Link>
          &#32;varsayılanıdır; listelerdeki <code>label</code>&#32;alanı bununla üretilir.
        </p>

        <h2 id="search-key">toSearchKey</h2>
        <p>
          Bir metni aramaya hazırlar: büyük/küçük harf ve Türkçe karakterler yok sayılır;{" "}
          <code>kadikoy</code>&#32;araması <code>KADIKÖY</code>&apos;ü bulur.
        </p>
        <DocsCodeBlock code={searchKeyCode} lang="ts" />
        <p>
          <code>resolveAddress</code>, düzenleme formundaki adların eşleşmesi ve{" "}
          <AcademyBadge kind="ant-design" />
          &#32;biçiminin araması da bunu kullanır.
        </p>

        <h2 id="compare-names">compareNames</h2>
        <p>
          Türk alfabesine göre sıralar; <code>Ç</code>, <code>Ğ</code>, <code>İ</code>,{" "}
          <code>Ö</code>, <code>Ş</code>&#32;ve <code>Ü</code>&#32;doğru yere düşer.
        </p>
        <DocsCodeBlock code={compareCode} lang="ts" />
        <p>İl ve ilçe listeleri bununla sıralanır.</p>

        <h2 id="format-address">formatAddress</h2>
        <p>
          Seçilen adresi tek satıra döker: sipariş özeti, fatura ya da kargo etiketi için.
          Varsayılan biçim mahalle, ardından <code>ilçe/il</code>&apos;dir; adlar{" "}
          <code>formatName</code>
          &#32;ile yazılır.
        </p>
        <DocsCodeBlock code={formatAddressCode} lang="ts" />
        <p>
          İki seçenek vardır: <code>postalCode</code>&#32;posta kodunu zarftaki gibi ilçeden önce
          ekler, <code>separator</code>&#32;ilçe ile il arasındakini değiştirir. Seçilmemiş
          seviyeler atlanır, yarım doldurulmuş bir form da düzgün okunur. Hook&apos;un{" "}
          <code>value</code>
          &apos;sunu, <code>resolveAddress</code>&#32;sonucunu ya da kendi nesnenizi alır;{" "}
          <code>/server</code>&#32;içinden de dışa aktarılır.
        </p>
      </DocsProse>
    </>
  );
}
