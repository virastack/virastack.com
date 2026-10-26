import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { comparisonSources } from "@/features/docs/content/password/comparison-data";
import { ComparisonTable } from "@/features/docs/content/password/ComparisonTable";

const labels: Record<string, string> = {
  toggle: "Göster/gizle toggle",
  api: "API",
  hideOnSubmit: "Form gönderiminde gizler",
  focus: "Tıklamadan sonra odak input'a döner",
  controlled: "Kontrollü görünürlük",
  autoComplete: "Varsayılan autoComplete",
  ariaPressed: "Toggle'da aria-pressed",
  capsLock: "Caps Lock algılama",
  score: "0–4 güç skoru",
  lengthPolicy: "Uzunluk politikası (NIST şablonları)",
  userInputs: "Kişisel bilgi (e-posta, ad)",
  feedback: "Geri bildirim",
  confirm: "Parola tekrarı alanı",
  server: "Sunucuda aynı kurallar",
  pwned: "Sızmış parola kontrolü (HIBP)",
  dependencies: "Çalışma zamanı bağımlılıkları",
  version: "Sürüm",
};

export function PasswordComparisonDoc() {
  return (
    <>
      <DocsPageHeader
        title="Karşılaştırma"
        description="ViraStack Password, Radix PasswordToggleField ve zxcvbn-ts yan yana."
      />
      <DocsProse>
        <h2 id="tablo">Tablo</h2>
        <ComparisonTable labels={labels} head={["Özellik", "Doğrulanmadı"]} />
        <p className="text-sm text-muted-foreground">
          ? = canlı kaynaktan doğrulanmadı. 26 Ekim 2026&apos;da kontrol edildi.
        </p>

        <h2 id="notlar">Notlar</h2>
        <ul>
          <li>
            <strong>Radix PasswordToggleField</strong> yalnızca toggle için bir bileşen setidir.
            Hâlâ <code>unstable_PasswordToggleField</code> olarak dışa aktarılır. Toggle&apos;ı{" "}
            <code>aria-pressed</code> yerine <code>aria-label</code>&apos;ını değiştirir (&quot;Show
            password&quot; / &quot;Hide password&quot;).
          </li>
          <li>
            <strong>zxcvbn-ts</strong> gücü sözlükler ve desen eşleştirmeyle tahmin eder; buradaki
            uzunluk öncelikli sezgiselden daha kapsamlıdır. Sözlükler büyüktür; yalnızca gereken
            yerde yükleyin. Geri bildirimi anahtar değil, çevrilmiş metindir.
          </li>
          <li>
            Birlikte kullanılabilirler: alan için <code>useViraPassword</code>, skor için
            zxcvbn-ts&apos;i kendi arayüzünüzde kullanın.
          </li>
        </ul>
        <p>Kaynaklar:</p>
        <ul>
          {comparisonSources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </DocsProse>
    </>
  );
}
