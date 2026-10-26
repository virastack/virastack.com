import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { passwordExampleCode } from "@/features/docs/content/password/examples/example-code.generated";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

const evaluateCode = `import { evaluate } from "@virastack/password/strength"
import { policy } from "@/lib/password-policy"

evaluate("correct horse battery staple", policy)
// {
//   score: 0,            // 0–1 politikayı geçmez, 2–4 geçer
//   level: "weak",       // "weak" | "fair" | "good" | "strong"
//   length: 28,          // NFKC sonrası karakter (code point)
//   valid: false,
//   checks: { minLength: true, maxLength: true, notCommon: false, ... },
//   issues: ["password.common"],
// }`;

const customCode = `definePolicy({ preset: "nist", minLength: 8 }) // ikinci faktörle (MFA)
definePolicy({ preset: "legacy", require: { symbol: false } })
definePolicy({ blocklist: ["acme", "acme pay"] }) // ürün adınız, herhangi bir yerde
definePolicy({ minTokenLength: 4 }) // kısa adlarda daha az yanlış pozitif
definePolicy({ blockCommon: false, blockRepetitive: false })`;

const forbiddenCode = `evaluate(password, policy, { forbidden: [email, name, username] })
// "vira.stack@example.com" → "vira.stack", "vira", "stack" (alan adı yok sayılır)
// "Vira Stack" → "vira stack", "vira", "stack"`;

const presetRows: [string, string, string][] = [
  [
    "nist (varsayılan)",
    "15–64",
    "Yok. NIST SP 800-63B-4'e göre: uzunluk ve yasak liste, bileşim kuralı yok",
  ],
  ["legacy", "8–64", "Küçük harf, büyük harf, rakam ve sembol"],
];

const issueRows: [string, string][] = [
  ["password.tooShort / tooLong", "minLength–maxLength dışında"],
  [
    "password.noLowercase / noUppercase / noDigit / noSymbol",
    "Gerekli bir karakter sınıfı eksik (legacy)",
  ],
  ["password.common", "Yaygın bir parola; etrafında rakam, sembol veya leetspeak olsa bile"],
  ["password.blocked", "Politikanın blocklist'indeki bir kelimeyi içerir"],
  ["password.repetitive", "Tekrar veya dizi: aaaa…, abcabc…, 12345…, qwerty…"],
  ["password.containsPersonalInfo", "forbidden değerlerinden birini içerir"],
];

export function PasswordStrengthDoc() {
  return (
    <>
      <DocsPageHeader
        title="Güç"
        description="@virastack/password/strength ile NIST tarzı parola politikası: uzunluk, yaygın parolalar, tekrarlar ve kişisel bilgi."
      />
      <DocsProse>
        <h2 id="policy">definePolicy()</h2>
        <p>
          Politikayı <code>&quot;use client&quot;</code>&#32;içermeyen ortak bir dosyada bir kez
          tanımlayın. Form ve sunucu aynı nesneyi import eder.
        </p>
        <DocsCodeBlock code={passwordExampleCode["password-policy"]} lang="ts" />

        <h2 id="sablonlar">Şablonlar</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Şablon</th>
                <th>Uzunluk</th>
                <th>Bileşim</th>
              </tr>
            </thead>
            <tbody>
              {presetRows.map(([preset, length, composition]) => (
                <tr key={preset}>
                  <td>
                    <code>{preset}</code>
                  </td>
                  <td>{length}</td>
                  <td>{composition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Şablonun her değeri değiştirilebilir:</p>
        <DocsCodeBlock code={customCode} lang="ts" />
        <p>
          Çakışan kurallar (örneğin <code>maxLength</code>&apos;ten büyük <code>minLength</code>)
          politika tanımlanırken hata fırlatır.
        </p>

        <h2 id="sonuc">Sonuç</h2>
        <DocsCodeBlock code={evaluateCode} lang="ts" />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Anahtar</th>
                <th>Ne zaman</th>
              </tr>
            </thead>
            <tbody>
              {issueRows.map(([key, when]) => (
                <tr key={key}>
                  <td>
                    <code>{key}</code>
                  </td>
                  <td>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Skor, uzunluk ve karakter çeşitliliğinden çıkan bir sezgiseldir; kırılma süresi tahmini
          değildir. Onun için <Link href="/password/docs/comparison">karşılaştırmaya</Link>
          &#32;bakın.
        </p>

        <h2 id="hook">Hook içinde</h2>
        <p>
          <code>policy</code> verin; <code>strength</code>, <code>issues</code> ve{" "}
          <code>strengthProps</code>&#32;alanlarını okuyun. Hook motoru import etmez; motor
          politikayla gelir, yani yalnızca toggle kullanan sayfa onu indirmez.
        </p>
        <PasswordExamplePreview id="strength-meter" />

        <h2 id="forbidden">forbidden</h2>
        <p>
          Paket kullanıcınızı bilmez; değerleri siz verirsiniz. Eşleştirme büyük/küçük harfi, aksanı
          ve basit leetspeak&apos;i yok sayar.
        </p>
        <DocsCodeBlock code={forbiddenCode} lang="ts" />
        <p>
          <code>minTokenLength</code>&apos;ten (varsayılan 3) kısa parçalar yok sayılır. Kısa
          parçalar yanlış pozitife yol açar: <code>vira.dev@example.com</code> için <code>dev</code>{" "}
          parçası <code>devoted-garden-path</code>&#32;parolasını reddeder. Sizin için önemliyse
          4&apos;e çıkarın.
        </p>
        <PasswordExamplePreview id="forbidden" />

        <h2 id="unicode">Unicode</h2>
        <ul>
          <li>
            Parola NFKC ile normalleştirilir; farklı klavyelerde yazılan aynı metin aynı sonucu
            verir.
          </li>
          <li>Uzunluk code point sayar: bir emoji veya Türkçe harf bir kez sayılır.</li>
          <li>Sıfır genişlikli karakterler uzunluğa sayılmaz.</li>
          <li>
            <code>maxLength</code>&apos;te hiçbir şey kesilmez; uzun parola{" "}
            <code>password.tooLong</code>&#32;alır.
          </li>
        </ul>

        <h2 id="yapistirma">Yapıştırma</h2>
        <p>
          Parola alanlarına yapıştırmayı engellemeyin. Parola yöneticileri buna dayanır ve NIST izin
          verilmesini önerir. Hook yapıştırmayı asla engellemez.
        </p>
      </DocsProse>
    </>
  );
}
