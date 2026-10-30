import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const createMaskCode = `import { createMask } from "@virastack/mask"

const phone = createMask({ preset: "phone", country: "TR" })
phone.format("5551234567")        // "(555) 123 45 67"
phone.parse("+90 555 123 45 67")  // "5551234567"
phone.validate("555")             // "phone.incomplete"
phone.isComplete("5551234567")    // true

const price = createMask("currency")
price.format("1234.5", { from: "USD" }) // "$1,234.5"`;

const validatorsCode = `import {
  getCardType,
  isValidCard,
  isValidIBAN,
  isValidLuhn,
  isValidTCKN,
  isValidVKN,
} from "@virastack/mask"

getCardType("3782 822463 10005") // "amex"
isValidCard("4111111111111111")  // true: uzunluk + Luhn
isValidTCKN("10000000146")       // true
isValidVKN("1234567890")         // true
isValidIBAN("DE89 3704 0044 0532 0130 00") // true, her ülke
isValidIBAN("TR330006100519786457841326")  // true
isValidIBAN("TR33000610051978645784132")   // false: TR IBAN 26 karakter olmalı`;

const moneyCode = `import { toMinorUnits } from "@virastack/mask"

toMinorUnits("1234.56", "TRY") // 123456
toMinorUnits("0.1", 2)         // 10 (float hatası yok)
toMinorUnits("1500", "JPY")    // 1500`;

export function MaskHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Yardımcılar"
        description="Hook dışında kullanabileceğin saf maske, doğrulayıcı ve para fonksiyonları."
      />
      <DocsProse>
        <p>
          Hepsi React&apos;siz ve saf fonksiyonlardır. Sunucuda <code>@virastack/mask/server</code>
          &apos;dan içe aktarın.
        </p>

        <h2 id="create-mask">createMask</h2>
        <p>
          Hook&apos;un kullandığı nesnenin aynısı. Listelerde, tablolarda ve raporlarda maskeli
          gösterim için <code>format</code>; dışarıdan gelen metin için <code>parse</code>.
        </p>
        <DocsCodeBlock code={createMaskCode} lang="ts" />

        <h2 id="validators">Doğrulayıcılar</h2>
        <DocsCodeBlock code={validatorsCode} lang="ts" />
        <p>
          Bir Türkiye IBAN&apos;ının hangi bankaya ait olduğunu bulmak için{" "}
          <Link href="/mask/docs/banks">getTurkishBank</Link>&#32;kullan.
        </p>

        <h2 id="money">Para</h2>
        <p>
          <code>toMinorUnits</code> ondalık metni tam sayı küçük birime çevirir. İkinci argüman
          ondalık basamak sayısı ya da ISO para kodudur.
        </p>
        <DocsCodeBlock code={moneyCode} lang="ts" />
      </DocsProse>
    </>
  );
}
