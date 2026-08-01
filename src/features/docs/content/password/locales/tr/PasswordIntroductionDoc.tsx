import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

export function PasswordIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Giriş"
        description="Erişilebilir ve özelleştirilebilir parola görünürlük toggle’ı; headless bir React hook."
      />
      <DocsProse>
        <p>
          Show/hide parola alanları kolayca yanlış uygulanır: eksik ARIA, form submit’e basan buton,
          disabled senkronu, prop çakışması. <code>useViraPassword()</code> bunları tek hook’ta
          çözer. Markup ve stil size aittir.
        </p>

        <h2 id="baslarken">Başlarken</h2>
        <p>
          Paketi ekleyin. Canlı demolar için <Link href="/password/docs/examples">örnekler</Link>{" "}
          sayfasına bakın.
        </p>

        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/password")} />

        <h2 id="peer">Peer bağımlılıklar</h2>
        <ul>
          <li>
            <code>react</code> ≥ 18.2
          </li>
          <li>
            <code>react-dom</code> ≥ 18.2
          </li>
        </ul>
        <p>
          <GuideProductMark id="start" linked={false}>
            Start
          </GuideProductMark>{" "}
          CLI kurulumunda da seçilebilir (<code>npx virastack@latest --tools password</code>).
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
            <strong>Erişilebilirlik</strong>: <code>aria-label</code>, <code>aria-pressed</code>,{" "}
            <code>aria-controls</code> ve <code>type=&quot;button&quot;</code> hazır.
          </li>
          <li>
            <strong>Headless</strong>: yalnızca prop bag; shadcn, Ant Design veya native input ile
            aynı API.
          </li>
          <li>
            <strong>Akıllı varsayılanlar</strong>: Eye / EyeOff SVG ikonları dahili.
          </li>
          <li>
            <strong>Güvenli merge</strong>: <code>on*</code> handler’lar zincirlenir,{" "}
            <code>className</code> birleşir; <code>disabled</code> / <code>readOnly</code> toggle’ı
            kilitler.
          </li>
        </ul>

        <h2 id="kapsam">Kapsam</h2>
        <p>Dokümantasyon paket yüzeyinin tamamını kapsar:</p>
        <ul>
          <li>
            <Link href="/password/docs/use-vira-password">useViraPassword()</Link> API’si
          </li>
          <li>
            <Link href="/password/docs/accessibility">Accessibility</Link> ve{" "}
            <Link href="/password/docs/customization">customization</Link>
          </li>
          <li>
            <Link href="/password/docs/helpers">Helpers</Link> ve{" "}
            <Link href="/password/docs/types">types</Link>
          </li>
          <li>
            UI kütüphaneleri ve <Link href="/password/docs/examples">örnekler</Link>
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
