import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

export function MaskIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Giriş"
        description="React Hook Form ile senkron çalışan hafif bir input formatlama kütüphanesidir."
      />
      <DocsProse>
        <p>
          Kart numarası, telefon, IBAN, para birimi ve özel maskeler için tek bir{" "}
          <code>useViraMask()</code> hook&apos;u sunar. Form state&apos;inde ham (unmasked) değer
          tutulurken input&apos;ta formatlı görüntü gösterilir.
        </p>

        <h2 id="baslarken">Başlarken</h2>
        <p>
          Paketi ekleyin. Canlı maske örneklerini görmek için{" "}
          <Link href="/mask/docs/examples">örnekler</Link> sayfasına bakın.
        </p>

        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/mask")} />

        <h2 id="peer">Peer bağımlılıklar</h2>
        <ul>
          <li>
            <code>react</code> ≥ 18.2
          </li>
          <li>
            <code>react-dom</code> ≥ 18.2
          </li>
          <li>
            <code>react-hook-form</code> ≥ 7
          </li>
        </ul>
        <p>
          <GuideProductMark id="start" linked={false}>
            Start
          </GuideProductMark>{" "}
          CLI kurulumunda da seçilebilir.
        </p>

        <h2 id="neden">
          Neden{" "}
          <GuideProductMark id="mask" linked={false} tone="heading">
            Mask
          </GuideProductMark>
          ?
        </h2>
        <ul>
          <li>
            <strong>Hafif</strong>: sıfır runtime dependency; peer olarak React ve React Hook Form.
          </li>
          <li>
            <strong>RHF-first</strong>: register / setValue ile entegre; display ile raw değer
            ayrılır.
          </li>
          <li>
            <strong>Tip güvenli</strong>: schema&apos;daki alan adları TypeScript ile eşleşir.
          </li>
          <li>
            <strong>Akıllı hazır maskeler</strong>: kart (Visa, Mastercard, Amex, Troy), CVV, TCKN,
            IBAN, currency ve daha fazlası.
          </li>
        </ul>

        <h2 id="kapsam">Kapsam</h2>
        <p>Dokümantasyon paket yüzeyinin tamamını kapsar:</p>
        <ul>
          <li>
            <Link href="/mask/docs/use-vira-mask">useViraMask()</Link> ve schema modeli
          </li>
          <li>
            <Link href="/mask/docs/custom-mask">Custom mask</Link> sözdizimi ve{" "}
            <code>resolveMask</code>
          </li>
          <li>
            <Link href="/mask/docs/validation">Validation</Link> ve{" "}
            <Link href="/mask/docs/helpers">helpers</Link>
          </li>
          <li>
            <Link href="/mask/docs/types">Types</Link> referansı
          </li>
          <li>
            Tüm hazır maskeler için <Link href="/mask/docs/examples">örnekler</Link>
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
