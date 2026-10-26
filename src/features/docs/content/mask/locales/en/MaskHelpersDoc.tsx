import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

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
isValidCard("4111111111111111")  // true: length + Luhn
isValidTCKN("10000000146")       // true
isValidVKN("1234567890")         // true
isValidIBAN("DE89 3704 0044 0532 0130 00") // true, any country
isValidIBAN("TR330006100519786457841326")  // true
isValidIBAN("TR33000610051978645784132")   // false: a TR IBAN has 26 characters`;

const moneyCode = `import { toMinorUnits } from "@virastack/mask"

toMinorUnits("1234.56", "TRY") // 123456
toMinorUnits("0.1", 2)         // 10 (no float errors)
toMinorUnits("1500", "JPY")    // 1500`;

export function MaskHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Helpers"
        description="Pure mask, validator and money functions you can use outside the hook."
      />
      <DocsProse>
        <p>
          All of them are pure and React-free. On the server, import them from{" "}
          <code>@virastack/mask/server</code>.
        </p>

        <h2 id="create-mask">createMask</h2>
        <p>
          The same object the hook uses. <code>format</code> for masked display in lists, tables and
          reports; <code>parse</code> for text from outside.
        </p>
        <DocsCodeBlock code={createMaskCode} lang="ts" />

        <h2 id="validators">Validators</h2>
        <DocsCodeBlock code={validatorsCode} lang="ts" />

        <h2 id="money">Money</h2>
        <p>
          <code>toMinorUnits</code> turns a decimal string into integer minor units. The second
          argument is the number of fraction digits or an ISO currency code.
        </p>
        <DocsCodeBlock code={moneyCode} lang="ts" />
      </DocsProse>
    </>
  );
}
