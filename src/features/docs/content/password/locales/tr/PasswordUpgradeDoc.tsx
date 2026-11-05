import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const installCode = `npm install @virastack/password@^1.1`;

const optOutCode = `useViraPassword({
  hideOnSubmit: false, // gönderimde 1.0 davranışı
  autoComplete: false, // 1.0'daki gibi autocomplete yok
  inputProps: { spellCheck: true }, // inputProps yine kazanır
})`;

type Row = [string, string, string];

const defaultRows: Row[] = [
  ["Form gönderimi / reset", "Görünürlük değişmez", "Yeniden gizlenir (hideOnSubmit: false)"],
  [
    "autoComplete",
    "Ayarlanmaz",
    "current-password; policy veya matchWith ile new-password (autoComplete: false)",
  ],
  ["spellCheck, autoCorrect, autoCapitalize", "Ayarlanmaz", "Kapalı (inputProps ile değiştir)"],
  ["Toggle fareyle tıklanınca", "Odak butonda kalır", "Odak ve imleç input'a döner"],
  ["mergeProps: aria-describedby", "Sonraki değer kazanır", "Değerler birleşir"],
  ["mergeProps: ref", "Sonraki değer kazanır", "Ref'ler birleşir"],
  ["inputProps.id", "aria-controls hook'un id'sinde kalır", "aria-controls inputProps.id'yi izler"],
];

const v12Rows: Row[] = [
  [
    "Seviye",
    "Büyük harf, rakam ve sembolle artar",
    "Yalnızca uzunlukla artar: +5 good, +10 strong",
  ],
  [
    "forbidden ve blocklist",
    "Parolanın içinde aranır: Ali adı için “kaliteli” reddedilir",
    "Parolanın tamamı karşılaştırılır: “ali1990” reddedilir, “kaliteli” geçer",
  ],
  ["aaaabbbbccccdddd", "Geçerli (fair)", "password.repetitive"],
  ["legacy şablonu", "Destekleniyor", "Kullanımdan kalkıyor; mecbursan require kullan"],
];

const v12Code = `npm install @virastack/password@^1.2`;

export function PasswordUpgradeDoc() {
  return (
    <>
      <DocsPageHeader
        title="Sürüm geçişi"
        description="1.2 NIST'e daha yakından uyar, 1.1 özellik ekledi. İkisi de hook'un API'sini değiştirmez."
      />
      <DocsProse>
        <h2 id="v1-2">1.1 → 1.2</h2>
        <DocsCodeBlock code={v12Code} lang="bash" />
        <p>
          API aynı kalır. Politika NIST SP 800-63B-4&apos;e daha yakından uyar; aynı parola farklı
          sonuç alabilir: <code>level</code> ya da hata anahtarı sabitleyen testlerini kontrol et.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Davranış</th>
                <th>1.1</th>
                <th>1.2</th>
              </tr>
            </thead>
            <tbody>
              {v12Rows.map(([behavior, before, after]) => (
                <tr key={behavior}>
                  <td>{behavior}</td>
                  <td>{before}</td>
                  <td>{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            <Link href="/password/docs/react-hook-form#form">useViraPassword(form, schema)</Link>:
            alanları <code>useViraMask(form, schema)</code>&#32;gibi React Hook Form&apos;a bağlar.{" "}
            <code>useViraPassword(options)</code>&#32;eskisi gibi çalışır.
          </li>
          <li>
            <code>mfa</code> şablonu (ikinci faktörle 8 karakter) ve <code>normalization</code>{" "}
            seçeneği (varsayılan <code>NFKC</code>, ya da <code>NFC</code>):{" "}
            <Link href="/password/docs/strength">güç</Link> sayfasında.
          </li>
          <li>
            <code>
              validatePassword(..., {"{"} pwned {"}"})
            </code>
            : politika ve Have I Been Pwned{" "}
            <Link href="/password/docs/server#sizinti">tek çağrıda</Link>.
          </li>
        </ul>

        <h2 id="ozet">1.0 → 1.1</h2>
        <DocsCodeBlock code={installCode} lang="bash" />
        <p>
          Hook&apos;un seçenekleri ve dönüş değeri aynıdır; yeni alanlar eklemedir. 1.0 dokümanı{" "}
          <Link href="/password/docs/v1">arşivde</Link>.
        </p>

        <h2 id="varsayilanlar">Yeni varsayılanlar</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Davranış</th>
                <th>1.0</th>
                <th>1.1 (nasıl kapatılır)</th>
              </tr>
            </thead>
            <tbody>
              {defaultRows.map(([behavior, before, after]) => (
                <tr key={behavior}>
                  <td>{behavior}</td>
                  <td>{before}</td>
                  <td>{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DocsCodeBlock code={optOutCode} lang="tsx" />

        <h2 id="yeni">Yeni özellikler</h2>
        <ul>
          <li>
            Seçenekler: <code>visible</code>, <code>onVisibleChange</code>,{" "}
            <code>hideOnSubmit</code>, <code>hideOnBlur</code>, <code>autoComplete</code>,{" "}
            <code>policy</code>, <code>forbidden</code>, <code>matchWith</code>, <code>value</code>
          </li>
          <li>
            Dönüş değeri: <code>capsLock</code>, <code>strength</code>, <code>strengthProps</code>,{" "}
            <code>matches</code>, <code>issues</code>, <code>rule</code>
          </li>
          <li>
            Giriş noktaları: <Link href="/password/docs/strength">/strength</Link>,{" "}
            <Link href="/password/docs/server">/server</Link>,{" "}
            <Link href="/password/docs/pwned">/pwned</Link>
          </li>
          <li>
            <Link href="/password/docs/helpers">composeRefs</Link>
          </li>
        </ul>

        <h2 id="paket">Paket</h2>
        <ul>
          <li>
            Dosyalar <code>.mjs</code> / <code>.cjs</code>, tipler <code>.d.mts</code> /{" "}
            <code>.d.cts</code>. <code>dist</code>&#32;içine derin import hiçbir zaman genel API
            değildi; paket girişlerini kullan.
          </li>
          <li>
            <code>getInputAriaAttributes</code>, <code>Record&lt;string, any&gt;</code>&#32;yerine
            tipli bir nesne döndürür.
          </li>
          <li>Peer bağımlılıklar aynı: React ve React DOM 18.2+.</li>
        </ul>
      </DocsProse>
    </>
  );
}
