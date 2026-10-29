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

export function AddressHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Türkçe yardımcılar"
        description="formatName, toSearchKey ve compareNames: adları göstermek, aramak ve sıralamak için; İ ve ı doğru işlenir."
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
      </DocsProse>
    </>
  );
}
