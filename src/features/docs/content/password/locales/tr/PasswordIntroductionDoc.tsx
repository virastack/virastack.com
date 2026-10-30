import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

const entries: [string, string, string][] = [
  ["@virastack/password", "useViraPassword, mergeProps, composeRefs, ikonlar", "client"],
  ["@virastack/password/strength", "definePolicy, evaluate, normalizePassword", "client + server"],
  ["@virastack/password/server", "validatePassword (+ strength dışa aktarımları)", "server"],
  ["@virastack/password/pwned", "checkPwned", "server (önerilen)"],
];

export function PasswordIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Giriş"
        description="React için headless parola hook'u: göster/gizle, güç, parola tekrarı, sunucu doğrulaması ve sızmış parola kontrolü."
      />
      <DocsProse>
        <p>
          Parola alanlarında hata yapmak kolaydır: eksik ARIA, formu gönderen bir toggle, metin
          alanı gören parola yöneticisi, formda ve sunucuda farklı kurallar.{" "}
          <code>useViraPassword()</code>&#32;bunları tek hook ile çözer. İşaretleme ve stil sende
          kalır.
        </p>

        <h2 id="baslarken">Başlarken</h2>
        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/password")} />
        <PasswordExamplePreview id="show-hide" />
        <p>
          1.0&apos;dan mı geliyorsun? Hiçbir şey kırılmaz;{" "}
          <Link href="/password/docs/upgrade">geçiş rehberine</Link> bak. Canlı demolar{" "}
          <Link href="/password/examples">örnekler</Link>&#32;sayfasında.
        </p>

        <h2 id="giris-noktalari">Giriş noktaları</h2>
        <p>
          Yalnızca kök girişte <code>&quot;use client&quot;</code>&#32;vardır. Güç motoru yalnızca
          politika verdiğinde paketine girer.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Import</th>
                <th>Dışa aktarımlar</th>
                <th>Çalıştığı yer</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([entry, exports, runs]) => (
                <tr key={entry}>
                  <td>
                    <code>{entry}</code>
                  </td>
                  <td>{exports}</td>
                  <td>{runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="peer">Gereksinimler</h2>
        <ul>
          <li>
            <AcademyBadge kind="react" label="React 18.2+" /> ve <code>react-dom</code>&#32;(React
            19 desteklenir)
          </li>
          <li>Çalışma zamanı bağımlılığı yok</li>
          <li>
            <AcademyBadge kind="react-hook-form" />
            &#32;isteğe bağlıdır; başka bir form kütüphanesiyle veya kütüphanesiz de çalışır.
          </li>
        </ul>
        <p>
          Ayrıca{" "}
          <GuideProductMark id="start" linked={false}>
            Start
          </GuideProductMark>{" "}
          CLI kurulumunda seçilebilir (<code>npx virastack@latest --tools password</code>).
        </p>

        <h2 id="neden">
          Neden{" "}
          <GuideProductMark id="password" linked={false} tone="heading">
            Password
          </GuideProductMark>
          ?
        </h2>
        <ul>
          <li>
            <strong>Headless</strong>: döndürülen her değer geçerli bir input veya buton
            prop&apos;udur.
          </li>
          <li>
            <strong>Radix düzeyinde detaylar</strong>: gönderimde gizleme, tıklamadan sonra odak,
            kontrollü <code>visible</code>, Caps Lock, <code>autoComplete</code>.
          </li>
          <li>
            <strong>NIST tarzı güç</strong>: önce uzunluk (15–64), yaygın parolalar, tekrarlar ve
            kişisel bilgi. Varsayılan olarak bileşim kuralı yok.
          </li>
          <li>
            <strong>Sunucuda aynı kurallar</strong>: form ve Server Action için tek politika
            nesnesi.
          </li>
          <li>
            <strong>Hata anahtarları</strong>: <code>password.tooShort</code>,{" "}
            <code>password.mismatch</code>… Mesajlar ve i18n sende kalır.
          </li>
        </ul>

        <h2 id="kapsam">Kapsam</h2>
        <ul>
          <li>
            <Link href="/password/docs/use-vira-password">useViraPassword()</Link>,{" "}
            <Link href="/password/docs/strength">güç</Link> ve{" "}
            <Link href="/password/docs/confirm">parola tekrarı</Link>
          </li>
          <li>
            <Link href="/password/docs/react-hook-form">React Hook Form</Link>,{" "}
            <Link href="/password/docs/server">sunucu doğrulaması</Link> ve{" "}
            <Link href="/password/docs/pwned">sızmış parolalar</Link>
          </li>
          <li>
            <Link href="/password/docs/accessibility">Erişilebilirlik</Link> ve{" "}
            <Link href="/password/docs/customization">özelleştirme</Link>
          </li>
        </ul>
        <p>Kapsam dışı: güç barı veya parola üretici bileşeni, passkey, pano temizleme.</p>
      </DocsProse>
    </>
  );
}
