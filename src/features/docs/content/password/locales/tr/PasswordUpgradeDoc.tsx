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

export function PasswordUpgradeDoc() {
  return (
    <>
      <DocsPageHeader
        title="1.0'dan 1.1'e geçiş"
        description="1.1 hook'u kırmadan özellik ekler. Birkaç varsayılan değişti; hepsi kapatılabilir."
      />
      <DocsProse>
        <h2 id="ozet">Özet</h2>
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
