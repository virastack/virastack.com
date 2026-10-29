import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskBankDemo } from "@/features/docs/components/MaskBankDemo";

const usageCode = `import { getTurkishBank, useViraMask } from "@virastack/mask"
import { useWatch } from "react-hook-form"

const { iban } = useViraMask(form, {
  iban: { preset: "iban", country: "TR" },
})
const bank = getTurkishBank(useWatch({ control: form.control, name: "iban" }))

<input {...iban} />
<p>{bank?.name}</p> // "T. GARANTİ BANKASI A.Ş."`;

const apiCode = `import { getTurkishBank, turkishBanks } from "@virastack/mask"

getTurkishBank("TR63 0006 2000 0000 0000 1234 56")
// { code: "0062", name: "T. GARANTİ BANKASI A.Ş." }

getTurkishBank("TR63 0006 2")   // enough once the bank digits are typed
getTurkishBank("tr630006200000000000123456") // no spaces, lowercase
getTurkishBank("TR63 0006")     // null: bank code not complete yet
getTurkishBank("DE89 3704 0044 0532 0130 00") // null: not TR

turkishBanks.length // 70`;

export function MaskBanksDoc() {
  return (
    <>
      <DocsPageHeader
        title="Bank detection"
        description="Find the bank behind a Turkish IBAN. No API: the bank is read from the bank code inside the number."
      />
      <DocsProse>
        <h2 id="deneyin">Try it</h2>
        <p>
          Type an IBAN; the bank shows up as soon as the last digit of the bank code is in, and its
          row is highlighted in the table.
        </p>
        <MaskBankDemo />

        <h2 id="nasil">How it works</h2>
        <p>
          A Turkish IBAN has 26 characters: <code>TR</code>, 2 check digits, a 5-digit bank code, 1
          reserved digit and a 16-digit account number. The bank code is the CBRT (TCMB) participant
          code with a leading zero: <code>00062</code>&#32;in <code>TR63 0006 2…</code>&#32;is code{" "}
          <code>0062</code>, Garanti BBVA. So it works without a network call, the same in the
          browser and on the server.
        </p>
        <p>
          The branch and the account holder cannot be read from an IBAN; only the banks&apos; own
          services know them.
        </p>

        <h2 id="kullanim">Usage</h2>
        <DocsCodeBlock code={usageCode} />
        <DocsCodeBlock code={apiCode} lang="ts" />
        <p>
          <code>getTurkishBank</code>&#32;does not validate the IBAN itself; it names the bank of an
          IBAN with wrong check digits too. Use the <code>iban</code>&#32;preset or{" "}
          <code>isValidIBAN</code>&#32;for that. Both are on <code>@virastack/mask/server</code>
          &#32;as well.
        </p>
        <p>
          The table is a plain array, so it stays out of apps that never use{" "}
          <code>getTurkishBank</code>&#32;or <code>turkishBanks</code>. When used, it adds about 2
          KB.
        </p>

        <h2 id="kaynak">Source</h2>
        <p>
          The list comes from the payment systems participants table published by the{" "}
          <a href="https://www.tcmb.gov.tr/" target="_blank" rel="noreferrer">
            Central Bank of the Republic of Türkiye
          </a>
          : 70 participants, last change 18.09.2026. Names are as TCMB writes them. When the list
          changes, a new package version updates it.
        </p>
      </DocsProse>
    </>
  );
}
