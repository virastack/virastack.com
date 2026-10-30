import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";

const patternCode = `useViraMask(form, {
  code: { mask: "aaa-999", transform: "uppercase" },     // ABC-123
  zip: { mask: "99999[-9999]" },                          // 12345 ya da 12345-6789
  hex: { mask: "\\\\#hhhhhh", tokens: { h: /[0-9a-f]/i } }, // #FF00AA
  iban: { mask: "{TR}99 9999 9999 9999 9999 9999 99" },   // değer: TR33…
})`;

const dynamicCode = `useViraMask(form, {
  // ilk uyan desen seçilir
  code: { mask: ["999-999", "9999-9999"] },
  // değere ya da bağlı alana göre desen
  card: {
    mask: (value) => (/^3[47]/.test(value) ? "9999 999999 99999" : "9999 9999 9999 9999"),
  },
  // yazılanı desene yerleştirmeden önce düzelt
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

const presetCode = `// masks.ts — client ve server paylaşır
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
        title="Özel maske"
        description="Desen sözdizimi, özel token, isteğe bağlı ve sabit bölümler, dinamik maske, sayı ve tarih seçenekleri."
      />
      <DocsProse>
        <h2 id="sozdizimi">Desen sözdizimi</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Yazım</th>
                <th>Anlam</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>9</code>
                </td>
                <td>Rakam</td>
              </tr>
              <tr>
                <td>
                  <code>a</code>
                </td>
                <td>Harf (Türkçe harfler dahil)</td>
              </tr>
              <tr>
                <td>
                  <code>*</code>
                </td>
                <td>Harf ya da rakam</td>
              </tr>
              <tr>
                <td>
                  <code>\</code>
                </td>
                <td>
                  Sonraki karakter sabittir: <code>\9</code> ekranda 9 yazar
                </td>
              </tr>
              <tr>
                <td>
                  <code>[ ]</code>
                </td>
                <td>İsteğe bağlı bölüm; boş kalsa da maske tamamlanmış sayılır</td>
              </tr>
              <tr>
                <td>
                  <code>{"{ }"}</code>
                </td>
                <td>
                  Sabit bölüm; ekranda görünür ve form değerinde kalır (<code>{"{TR}"}</code>,{" "}
                  <code>{"{+}"}</code>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Diğer karakterler yalnızca ekranda görünür. <code>tokens</code> ile kendi karakterlerini
          tanımlarsın; <code>transform</code> harfleri büyütür ya da küçültür.
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

        <h2 id="dinamik">Dinamik maske</h2>
        <p>
          Dizi verirseniz değeri bütünüyle alan ilk desen seçilir. Fonksiyon değeri ve{" "}
          <code>ctx.from</code> (bağlı alanın değeri) ile desen döner.
        </p>
        <DocsCodeBlock code={dynamicCode} lang="tsx" />

        <h2 id="sayi-tarih">Sayı, para ve tarih</h2>
        <p>
          <code>mask</code>, <code>number</code>, <code>currency</code> ve <code>date</code>{" "}
          birbirini dışlar; ikisini birden vermek derleme hatasıdır.
        </p>
        <ul>
          <li>
            <code>number</code>: <code>min</code>, <code>max</code>, <code>scale</code> (ondalık
            basamak), <code>signed</code>, <code>locale</code> (varsayılan <code>en-US</code>;
            Türkçe ayırıcılar için preset ile <code>country: &quot;TR&quot;</code>). Max yazarken,
            min alan terk edilince uygulanır.
          </li>
          <li>
            <code>currency</code>: ISO kodu ya da <code>{"{ code, locale, min, max, scale }"}</code>
            . Ayırıcılar ve sembol Intl&apos;den gelir. Kod yoksa sembolsüz <code>1,234.56</code>;
            Türk lirası için <code>{'{ preset: "currency", country: "TR" }'}</code>.
          </li>
          <li>
            <code>date</code>: <code>format</code>, <code>min</code>, <code>max</code> (
            <code>&quot;today&quot;</code>, ISO ya da <code>Date</code>), <code>minAge</code>. Tam
            tarihlerde form değeri ISO&apos;dur.
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
          Ekibinin maskesini tek yerde tanımla. Ad, hata anahtarlarının önekidir (
          <code>plate.incomplete</code>). Hook, sunucu ve testler aynı nesneyi kullanır.
        </p>
        <DocsCodeBlock code={presetCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
