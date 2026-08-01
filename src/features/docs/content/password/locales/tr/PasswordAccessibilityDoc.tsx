import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const ariaMarkup = `<input
  id="virapassword-input-…"
  type="password"
/>
<button
  type="button"
  aria-label="Toggle password visibility"
  aria-pressed="false"
  aria-controls="virapassword-input-…"
>
  <!-- EyeIcon -->
</button>`;

export function PasswordAccessibilityDoc() {
  return (
    <>
      <DocsPageHeader
        title="Accessibility"
        description="Ekran okuyucu ve klavye kullanıcıları için hazır ARIA; ekstra yapılandırma gerekmez."
      />
      <DocsProse>
        <p>
          Hook, buton ve input için erişilebilir öznitelikleri üretir. Varsayılan çıktıya yakın
          markup:
        </p>
        <DocsCodeBlock code={ariaMarkup} lang="html" />

        <h2 id="aria">ARIA öznitelikleri</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Öznitelik</th>
                <th>Nerede</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>aria-label</code>
                </td>
                <td>button</td>
                <td>
                  Varsayılan: <code>Toggle password visibility</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>aria-pressed</code>
                </td>
                <td>button</td>
                <td>Toggle durumu (görünür = true)</td>
              </tr>
              <tr>
                <td>
                  <code>aria-controls</code>
                </td>
                <td>button</td>
                <td>
                  Kontrol edilen input’un <code>id</code>’si
                </td>
              </tr>
              <tr>
                <td>
                  <code>aria-invalid</code> / <code>aria-describedby</code>
                </td>
                <td>input (opsiyonel)</td>
                <td>
                  <code>getInputAriaAttributes</code> ile manuel eklenebilir
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Core yardımcılar <Link href="/password/docs/helpers">helpers</Link> sayfasında.
        </p>

        <h2 id="button">type=button</h2>
        <p>
          Toggle her zaman <code>type=&quot;button&quot;</code> alır. Böylece form içinde
          yanlışlıkla submit tetiklenmez: kendi buton bileşeninizi kullanırken de bu değer korunur
          (override etmeyin).
        </p>

        <h2 id="ids">Stabil ID’ler</h2>
        <ul>
          <li>
            <code>id</code> verilmezse React <code>useId()</code> ile{" "}
            <code>virapassword-input-…</code> üretilir.
          </li>
          <li>
            Buton <code>aria-controls</code> aynı id’ye bağlanır: birden fazla parola alanı aynı
            sayfada güvenle çalışır.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
