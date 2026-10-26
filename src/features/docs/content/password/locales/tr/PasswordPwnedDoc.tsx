import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";

const optionsCode = `checkPwned(password, {
  signal,         // AbortSignal
  timeout: 3000,  // ms, varsayılan 5000
  fetch,          // özel fetch (test, proxy)
})`;

const resultRows: [string, string][] = [
  ['{ status: "pwned", count }', "Sızıntılarda count kez görülmüş"],
  ['{ status: "safe" }', "Listede yok"],
  [
    '{ status: "unknown", reason }',
    "empty, unsupported (crypto.subtle veya fetch yok), network, timeout, aborted, rate-limited, http",
  ],
];

export function PasswordPwnedDoc() {
  return (
    <>
      <DocsPageHeader
        title="Sızmış parolalar"
        description="İsteğe bağlı Have I Been Pwned kontrolü, k-anonymity ile: @virastack/password/pwned."
      />
      <DocsProse>
        <h2 id="kullanim">Kullanım</h2>
        <p>
          Siz çağırmadıkça kapalıdır. Ücretsiz Pwned Passwords range API&apos;sini kullanır; anahtar
          ve bağımlılık gerekmez.
        </p>
        <PasswordExamplePreview id="pwned" />
        <DocsCodeBlock code={optionsCode} lang="ts" />

        <h2 id="sonuc">Sonuç</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Sonuç</th>
                <th>Anlamı</th>
              </tr>
            </thead>
            <tbody>
              {resultRows.map(([result, meaning]) => (
                <tr key={result}>
                  <td>
                    <code>{result}</code>
                  </td>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Hiç hata fırlatmaz. <code>unknown</code> durumunda kullanıcının devam etmesine izin verin
          (fail open).
        </p>

        <h2 id="gizlilik">Gizlilik ve sınırlar</h2>
        <ul>
          <li>
            Parolanın SHA-1 özetinin yalnızca ilk 5 karakteri gönderilir; parola ve tam özet asla
            çıkmaz. Yanıtlar dolgu (padding) içerir.
          </li>
          <li>
            Sunucudan çağırın. Tarayıcıdan çağrılırsa Have I Been Pwned kullanıcının IP&apos;sini
            görür.
          </li>
          <li>
            <code>crypto.subtle</code> yalnızca HTTPS ve localhost&apos;ta vardır; aksi halde sonuç{" "}
            <code>unknown</code> olur.
          </li>
          <li>Her tuş vuruşunda çağırmayın; gönderimde kontrol edin.</li>
        </ul>
      </DocsProse>
    </>
  );
}
