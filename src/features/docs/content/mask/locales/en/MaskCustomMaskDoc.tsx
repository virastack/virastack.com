import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";

const patternCode = `useViraMask(form, {
  code: { mask: "aaa-999", transform: "uppercase" },     // ABC-123
  zip: { mask: "99999[-9999]" },                          // 12345 or 12345-6789
  hex: { mask: "\\\\#hhhhhh", tokens: { h: /[0-9a-f]/i } }, // #FF00AA
  iban: { mask: "{TR}99 9999 9999 9999 9999 9999 99" },   // value: TR33…
})`;

const dynamicCode = `useViraMask(form, {
  // the first pattern that fits wins
  code: { mask: ["999-999", "9999-9999"] },
  // pick the pattern from the value or a linked field
  card: {
    mask: (value) => (/^3[47]/.test(value) ? "9999 999999 99999" : "9999 9999 9999 9999"),
  },
  // clean the input before it is placed
  phone: { mask: "(999) 999 99 99", normalize: (value) => value.replace(/^0+/, "") },
})`;

const numberDateCode = `useViraMask(form, {
  quantity: { number: { min: 1, max: 99 } },
  weight: { number: { scale: 2, signed: true, locale: "en-US" } },
  price: { currency: "USD" },
  amount: { currency: { code: "TRY", min: 10, max: 5000 } },
  birthDate: { date: { max: "today", minAge: 18 } },
  expiry: { date: { format: "MM/YY", min: "today" } },
})`;

const presetCode = `// masks.ts — shared by the client and the server
import { definePreset } from "@virastack/mask/server"

export const plate = definePreset("plate", {
  mask: "99 a[aa] 99[99]",
  transform: "uppercase",
  validate: (value) => !value.startsWith("00") || "plate.city",
})

// form
useViraMask(form, { plate, backupPlate: { preset: plate } })`;

export function MaskCustomMaskDoc() {
  return (
    <>
      <DocsPageHeader
        title="Custom mask"
        description="Pattern syntax, custom tokens, optional and fixed parts, dynamic masks, number and date options."
      />
      <DocsProse>
        <h2 id="sozdizimi">Pattern syntax</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Syntax</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>9</code>
                </td>
                <td>Digit</td>
              </tr>
              <tr>
                <td>
                  <code>a</code>
                </td>
                <td>Letter (Turkish letters included)</td>
              </tr>
              <tr>
                <td>
                  <code>*</code>
                </td>
                <td>Letter or digit</td>
              </tr>
              <tr>
                <td>
                  <code>\</code>
                </td>
                <td>
                  The next character is literal: <code>\9</code> shows a 9
                </td>
              </tr>
              <tr>
                <td>
                  <code>[ ]</code>
                </td>
                <td>Optional part; the mask counts as complete without it</td>
              </tr>
              <tr>
                <td>
                  <code>{"{ }"}</code>
                </td>
                <td>
                  Fixed part; shown and kept in the form value (<code>{"{TR}"}</code>,{" "}
                  <code>{"{+}"}</code>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Other characters are display only. Define your own characters with <code>tokens</code>;{" "}
          <code>transform</code> changes letter case.
        </p>
        <ComponentPreview
          preview={
            <MaskFieldDemo
              config={{ mask: "aaa-999", transform: "uppercase" }}
              placeholder="ABC-123"
            />
          }
          code={patternCode}
        >
          <DocsCodeBlock code={patternCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="dinamik">Dynamic masks</h2>
        <p>
          With an array, the first pattern that fits the whole value wins. A function gets the value
          and <code>ctx.from</code> (the linked field&apos;s value) and returns a pattern.
        </p>
        <DocsCodeBlock code={dynamicCode} lang="tsx" />

        <h2 id="sayi-tarih">Number, currency and date</h2>
        <p>
          <code>mask</code>, <code>number</code>, <code>currency</code> ve <code>date</code> exclude
          each other; passing two is a compile error.
        </p>
        <ul>
          <li>
            <code>number</code>: <code>min</code>, <code>max</code>, <code>scale</code> (fraction
            digits), <code>signed</code>, <code>locale</code> (default <code>en-US</code>; use the
            preset with <code>country: &quot;TR&quot;</code> for Turkish separators). Max applies
            while typing, min on blur.
          </li>
          <li>
            <code>currency</code>: an ISO code or <code>{"{ code, locale, min, max, scale }"}</code>
            . Separators and symbol come from Intl. Without a code: <code>1,234.56</code>, no
            symbol; Turkish lira: <code>{'{ preset: "currency", country: "TR" }'}</code>.
          </li>
          <li>
            <code>date</code>: <code>format</code>, <code>min</code>, <code>max</code> (
            <code>&quot;today&quot;</code>, ISO or a <code>Date</code>), <code>minAge</code>. Full
            dates store ISO in the form.
          </li>
        </ul>
        <ComponentPreview
          preview={<MaskFieldDemo config={{ number: { min: 1, max: 99 } }} placeholder="1–99" />}
          code={numberDateCode}
        >
          <DocsCodeBlock code={numberDateCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="preset">definePreset</h2>
        <p>
          Define your team&apos;s mask once. The name prefixes its error keys (
          <code>plate.incomplete</code>). The hook, the server and tests use the same object.
        </p>
        <DocsCodeBlock code={presetCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
