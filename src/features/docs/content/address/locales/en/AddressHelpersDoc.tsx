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
// "Adapazarı/Sakarya": a level not picked is left out`;

export function AddressHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Turkish helpers"
        description="formatName, toSearchKey, compareNames and formatAddress: display, search and sort Turkish names and put an address on one line, with İ and ı handled correctly."
      />
      <DocsProse>
        <p>
          Turkish has two letter i&apos;s: a dotted <code>i</code>&#32;whose capital is{" "}
          <code>İ</code>, and a dotless <code>ı</code>&#32;whose capital is <code>I</code>. The
          default JavaScript case functions only know the English pair, so{" "}
          <code>&quot;KADIKÖY&quot;.toLowerCase()</code>&#32;gives the wrong word. These three
          helpers apply Turkish rules for you.
        </p>

        <h2 id="format-name">formatName</h2>
        <p>
          The dataset is in capitals (<code>AKKAPI MAH.</code>), which reads badly in a dropdown.{" "}
          <code>formatName</code>&#32;lowercases with Turkish rules, then capitalises the first
          letter of every word and every letter after a dot, hyphen, slash or parenthesis.
        </p>
        <DocsCodeBlock code={formatNameCode} lang="ts" />
        <p>
          It is the default <Link href="/address/docs/use-vira-address">formatLabel</Link>, so the{" "}
          <code>label</code>&#32;in every list comes from it. <code>MAH.</code>&#32;is short for{" "}
          <em>mahallesi</em>, &quot;neighbourhood&quot;.
        </p>

        <h2 id="search-key">toSearchKey</h2>
        <p>
          Prepares text for search: case and Turkish characters are ignored, so a user typing{" "}
          <code>kadikoy</code>&#32;on a keyboard without Turkish letters still finds{" "}
          <code>KADIKÖY</code>.
        </p>
        <DocsCodeBlock code={searchKeyCode} lang="ts" />
        <p>
          <code>resolveAddress</code>, name matching in edit forms and the{" "}
          <AcademyBadge kind="ant-design" />
          &#32;flavour&apos;s search all use it.
        </p>

        <h2 id="compare-names">compareNames</h2>
        <p>
          Sorts in Turkish alphabetical order, where <code>Ç</code>, <code>Ğ</code>, <code>İ</code>,{" "}
          <code>Ö</code>, <code>Ş</code>&#32;and <code>Ü</code>&#32;each come right after their base
          letter.
        </p>
        <DocsCodeBlock code={compareCode} lang="ts" />
        <p>The province and district lists are sorted with it.</p>

        <h2 id="format-address">formatAddress</h2>
        <p>
          Puts the picked address on one line, for an order summary, an invoice or a cargo label.
          The default is the neighbourhood followed by <code>district/province</code>, the way
          Turkish addresses are written, with names in <code>formatName</code>&#32;case.
        </p>
        <DocsCodeBlock code={formatAddressCode} lang="ts" />
        <p>
          There are two options: <code>postalCode</code>&#32;adds the postal code before the
          district, as on an envelope, and <code>separator</code>&#32;changes what goes between
          district and province. Levels not picked yet are left out, so a half-filled form still
          reads cleanly. It takes the hook&apos;s <code>value</code>, a <code>resolveAddress</code>
          &#32;result or your own object, and is exported from <code>/server</code>&#32;too.
        </p>
      </DocsProse>
    </>
  );
}
