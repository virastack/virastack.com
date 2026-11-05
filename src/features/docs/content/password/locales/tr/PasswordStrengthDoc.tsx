import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { passwordExampleFile } from "@/features/docs/content/password/examples/example-code.generated";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";

const evaluateCode = `import { evaluate } from "@virastack/password/strength"
import { policy } from "@/lib/password-policy"

evaluate("correct horse battery staple", policy)
// {
//   score: 0,            // 0–1 politikayı geçmez, 2–4 geçer
//   level: "weak",       // "weak" | "fair" | "good" | "strong"
//   length: 28,          // normalleştirme sonrası karakter (code point)
//   valid: false,
//   checks: { minLength: true, maxLength: true, notCommon: false, ... },
//   issues: ["password.common"],
// }`;

const customCode = `definePolicy({ preset: "mfa" }) // 8 karakter, ikinci faktörle
definePolicy({ require: { digit: true } }) // bileşim kuralı, mecbursan
definePolicy({ blocklist: ["acme", "acme pay"] }) // parolanın tamamı ürün adın olamaz
definePolicy({ normalization: "NFC" }) // NIST'in önerisi; varsayılan NFKC
definePolicy({ blockCommon: false, blockRepetitive: false })`;

const forbiddenCode = `evaluate(password, policy, { forbidden: [email, name, username] })
// "hello@virastack.com" → "hello" (alan adı yok sayılır)
// "Vira Stack" → "virastack", "vira", "stack"

// Rakam, sembol, leetspeak ve tekrar çıkarıldıktan sonra parolanın tamamı karşılaştırılır:
evaluate("vira-1990-2024!", policy, { forbidden: ["Vira Stack"] }) // containsPersonalInfo
evaluate("v1ra-v1ra-v1ra-2024", policy, { forbidden: ["Vira Stack"] }) // containsPersonalInfo
evaluate("viral-garden-path", policy, { forbidden: ["Vira Stack"] }) // geçer`;

const presetRows: [string, string, string][] = [
  [
    "nist (varsayılan)",
    "15–64",
    "Yok. NIST SP 800-63B-4'e göre: uzunluk ve yasak liste, bileşim kuralı yok",
  ],
  ["mfa", "8–64", "Yok. Parola ikinci bir faktörle kullanılıyorsa (NIST SP 800-63B-4)"],
  ["legacy (kullanımdan kalkıyor)", "8–64", "Küçük harf, büyük harf, rakam ve sembol"],
];

const issueRows: [string, string][] = [
  ["password.tooShort / tooLong", "minLength–maxLength dışında"],
  [
    "password.noLowercase / noUppercase / noDigit / noSymbol",
    "Gerekli bir karakter sınıfı eksik (legacy)",
  ],
  ["password.common", "Yaygın bir parola; etrafında rakam, sembol veya leetspeak olsa bile"],
  [
    "password.blocked",
    "Politikanın blocklist'indeki bir kelimedir; etrafında rakam veya sembol olsa da",
  ],
  ["password.repetitive", "Tekrar veya dizi: aaaa…, abcabc…, 12345…, qwerty…"],
  [
    "password.containsPersonalInfo",
    "Bir forbidden değeri ya da onun bir parçasıdır; etrafında rakam veya sembol olsa da",
  ],
  ["password.pwned", "Bir veri sızıntısında var (pwned ile validatePassword, yalnızca sunucu)"],
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
          tanımla. Form ve sunucu aynı nesneyi import eder.
        </p>
        <DocsCodeBlock code={passwordExampleFile["password-policy"]} lang="ts" />

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
          Geçerli bir parola en az uzunlukta <code>fair</code>, 5 karakter fazlasıyla{" "}
          <code>good</code>, 10 karakter fazlasıyla <code>strong</code> olur. Büyük harf, rakam veya
          sembol seviyeyi değiştirmez: NIST bileşim kurallarını kaldırdı, gösterge de onları geri
          getirmez. Tekrarlanan karakterler az katkı yapar. Kırılma süresi tahmini değildir.
        </p>
        <p>
          <strong>Karmaşık bir 14 karakterlik parola neden zayıf?</strong> Skor evrensel bir kurala
          değil, politikaya göre hesaplanır. Varsayılan <code>nist</code> şablonu 15 karakter ister;
          daha kısa parolalar ne kadar karışık olursa olsun politikayı geçemez ve 0–1 alır. 15
          karakterden sonra skor uzunlukla artar. Daha kısa parola mı gerekiyor? <code>mfa</code>{" "}
          şablonunu kullan: parola ikinci bir faktörle kullanılıyorsa NIST 8 karaktere izin verir.
        </p>

        <h2 id="hook">Hook içinde</h2>
        <p>
          <code>policy</code> ver; <code>strength</code>, <code>issues</code> ve{" "}
          <code>strengthProps</code>&#32;alanlarını oku. Hook motoru import etmez; motor politikayla
          gelir, yani yalnızca toggle kullanan sayfa onu indirmez.
        </p>
        <PasswordExamplePreview id="strength-meter" />

        <h2 id="forbidden">forbidden</h2>
        <p>
          Paket kullanıcını bilmez; değerleri sen verirsin. NIST&apos;in istediği gibi parolanın
          tamamı karşılaştırılır, içinde kelime aranmaz: parola bir değer ya da onun bir parçasıysa
          (etrafında rakam, sembol, leetspeak veya tekrar olsa da) reddedilir. Büyük/küçük harf ve
          aksan yok sayılır.
        </p>
        <DocsCodeBlock code={forbiddenCode} lang="ts" />
        <p>
          Sıradan bir kelimenin içindeki kısa bir ad eşleşme sayılmaz: <code>Ali</code> adıyla{" "}
          <code>kaliteli-sabah-kahvesi</code>&#32;geçer, <code>ali1990</code>&#32;geçmez.{" "}
          <code>minTokenLength</code>&apos;ten (varsayılan 3) kısa parçalar yok sayılır.
        </p>
        <PasswordExamplePreview id="forbidden" />

        <h2 id="unicode">Unicode</h2>
        <ul>
          <li>
            Parola varsayılan olarak NFKC ile normalleştirilir; farklı klavyelerde yazılan aynı
            metin, tam genişlikli harfler dahil, aynı sonucu verir.{" "}
            <code>normalization: &quot;NFC&quot;</code>&#32;NIST&apos;in önerisine uyar; tam
            genişlikli harfleri ve bitişik harfleri olduğu gibi bırakır. Değiştirmek hash&apos;lenen
            parolayı değiştirir; kullanıcın olmadan önce seç.
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
          Parola alanlarına yapıştırmayı engelleme. Parola yöneticileri buna dayanır ve NIST izin
          verilmesini önerir. Hook yapıştırmayı asla engellemez.
        </p>
      </DocsProse>
    </>
  );
}
