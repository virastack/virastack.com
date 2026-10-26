import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPromptBlock } from "@/features/docs/components/DocsPromptBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MASK_UPGRADE_PROMPT } from "@/features/docs/content/mask/mask-upgrade-prompt";
import { Link } from "@/i18n/routing";

const signatureCode = `- const { phone } = useViraMask({ form, schema: { phone: "phone" } })
+ const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } })`;

const rawCode = `- const { rawValue, ...inputProps } = phone
- <input {...inputProps} />
+ <input {...phone} />
+ const raw = form.watch("phone") // "5551234567"`;

const resolverCode = `useForm({ resolver: maskResolver(masks, zodResolver(schema)) })`;

type Row = [string, string];

const presetRows: Row[] = [
  [
    "phone (ABD biçimi)",
    '{ preset: "phone", country: "TR" } → (555) 123 45 67; "phone" → E.164 (+905551234567). ABD için { mask: "(999) 999-9999" }',
  ],
  [
    "iban (yalnız TR, değer TR'siz)",
    '{ preset: "iban", country: "TR" } (değer TR ile); "iban" her ülke için',
  ],
  [
    "currency (ABD ayırıcıları, sembolsüz)",
    'Aynısı "currency" (1,234.56); Türk lirası { preset: "currency", country: "TR" } (₺1.234,56); diğer kurlar currency: "USD" ya da from',
  ],
  ["date (değer 01022020)", "Değer ISO: 2020-02-01"],
  ["taxNumber", "vkn"],
  ["numeric", "number"],
  [
    "email, url, username, alpha, password, text, zipCode",
    "Kaldırıldı; şemanızda doğrulayın ya da definePreset",
  ],
];

const optionRows: Row[] = [
  ["resolveMask", "mask: (value, ctx) => string"],
  ["cvv şemada kart arıyordu", 'cvv: { preset: "cvv", from: "card" }'],
  [
    'validator: "tckn" / validate: true',
    'Presette yerleşik; ekleme için validate: (value) => true | "anahtar"',
  ],
  ["errorMessage", "Hata anahtarı döner (tckn.invalid); mesajı siz eşlersiniz"],
  [
    "currency: { decimalSeparator, thousandSeparator, symbol }",
    "currency: { code, locale, scale }",
  ],
  ['dateFormat: "DMY"', 'date: { format: "DD/MM/YYYY" }'],
  ["allowedChars, forbiddenChars", '{ mask: "hhhh", tokens: { h: /[0-9a-f]/i } }'],
  ["displayPrefix", "{TR}99 … (sabit bölüm değerde kalır)"],
  ["placeholderChar", "Kaldırıldı (hiç çalışmıyordu)"],
  ["onCardTypeChange", 'getCardType(form.watch("card"))'],
];

const helperRows: Row[] = [
  [
    "validateTCKN, validateVKN, validateLuhn, validateIBAN",
    "isValidTCKN, isValidVKN, isValidLuhn / isValidCard, isValidIBAN",
  ],
  ["applyMask, unmask, formatCurrency…", "createMask(spec).format() / .parse()"],
  ["mergeRefs", "Kaldırıldı; React 19'da ref bir prop"],
];

function UpgradeTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table>
        <thead>
          <tr>
            <th>v1</th>
            <th>v2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([before, after]) => (
            <tr key={before}>
              <td>
                <code>{before}</code>
              </td>
              <td>{after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MaskUpgradeDoc() {
  return (
    <>
      <DocsPageHeader
        title="v1'den v2'ye geçiş"
        description="v2 baştan yazıldı. Hook imzası, preset listesi ve bazı değerler değişti."
      />
      <DocsProse>
        <h2 id="prompt">Yapay zekâ ile tek adımda</h2>
        <p>
          Prompt&apos;u kopyalayıp projenizde <AcademyBadge kind="claudeCode" />,{" "}
          <AcademyBadge kind="cursor" /> ya da <AcademyBadge kind="codex" /> gibi bir ajana verin.
          Ajan tüm kullanımları bulur, v2&apos;ye çevirir, tip kontrolü ve testleri çalıştırır;
          sonunda biçimi değişen verileri (tarih ISO, TR IBAN&apos;da <code>TR</code>) onayınız için
          listeler.
        </p>
        <DocsPromptBlock
          prompt={MASK_UPGRADE_PROMPT}
          label="v1 → v2 upgrade prompt"
          copyLabel="Kopyala"
        />
        <p>Elle yapmak isterseniz aşağıdaki tablolar aynı adımları anlatır.</p>
        <p>
          v1 dokümanı <Link href="/mask/docs/v1">arşivde</Link> duruyor. Gereksinimler:{" "}
          <AcademyBadge kind="react" label="React 18.2+" />,{" "}
          <AcademyBadge kind="react-hook-form" label="React Hook Form 7.55+" />,{" "}
          <AcademyBadge kind="nodejs" label="Node 20+" />.
        </p>

        <h2 id="imza">Hook imzası</h2>
        <DocsCodeBlock code={signatureCode} lang="tsx" />
        <p>
          Şema anahtarları formdaki alan adları olmalı (ya da <code>name</code> verin). Yazım hatası
          artık derleme hatasıdır.
        </p>

        <h2 id="raw">rawValue kalktı</h2>
        <p>Form zaten ham değeri tutar. Dönen nesneyi doğrudan yayın.</p>
        <DocsCodeBlock code={rawCode} lang="tsx" />

        <h2 id="presetler">Presetler</h2>
        <UpgradeTable rows={presetRows} />

        <h2 id="secenekler">Seçenekler</h2>
        <UpgradeTable rows={optionRows} />

        <h2 id="dogrulama">Resolver ile doğrulama</h2>
        <p>
          v1&apos;de resolver varken maske doğrulaması sessizce duruyordu. v2&apos;de
          resolver&apos;ı sarın:
        </p>
        <DocsCodeBlock code={resolverCode} lang="ts" />

        <h2 id="yardimcilar">Yardımcılar</h2>
        <UpgradeTable rows={helperRows} />
      </DocsProse>
    </>
  );
}
