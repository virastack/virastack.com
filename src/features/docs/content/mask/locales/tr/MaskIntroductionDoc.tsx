import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCreditCardDemo } from "@/features/docs/components/MaskCreditCardDemo";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

const quickStartCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Checkout() {
  const form = useForm<{ card: string; expiry: string; cvv: string }>()

  const { card, expiry, cvv } = useViraMask(form, {
    card: "card",
    expiry: "expiry",
    cvv: { preset: "cvv", from: "card" },
  })

  return (
    <form onSubmit={form.handleSubmit(console.log)}>
      <input {...card} />
      <input {...expiry} />
      <input {...cvv} />
    </form>
  )
}
// form.watch("card") → "4111111111111111"`;

export function MaskIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Giriş"
        description="React Hook Form için sıfır ayarlı input maskeleri: Türkiye doğrulayıcıları, tip güvenliği ve sunucu desteği."
      />
      <DocsProse>
        <p>
          Form ham değeri tutar (<code>5551234567</code>), input maskeyi gösterir (
          <code>(555) 123 45 67</code>). <code>register</code> kuralları, <code>reset</code>,{" "}
          <code>setValue</code>, <code>watch</code> ve resolver&apos;lar olduğu gibi çalışır.
        </p>

        <h2 id="baslarken">Başlarken</h2>
        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/mask")} />
        <ComponentPreview preview={<MaskCreditCardDemo />} code={quickStartCode}>
          <DocsCodeBlock code={quickStartCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Tüm hazır maskeleri <Link href="/mask/examples">örnekler</Link> sayfasında deneyin. v1
          kullanıyorsanız <Link href="/mask/docs/upgrade">geçiş rehberine</Link> bakın.
        </p>

        <h2 id="peer">Peer bağımlılıklar</h2>
        <ul>
          <li>
            <code>react</code> ≥ 18.2 (<AcademyBadge kind="react" label="React 19" /> önerilir)
          </li>
          <li>
            <code>react-hook-form</code> ≥ 7.55
          </li>
        </ul>
        <p>
          Çalışma zamanı bağımlılığı yoktur. Paketin tamamı ~8 KB (min + brotli).{" "}
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
            <strong>
              <AcademyBadge kind="react-hook-form" /> için
            </strong>
            : tek doğruluk kaynağı formdur; hook kendi değer state&apos;i tutmaz.
          </li>
          <li>
            <strong>Türkiye&apos;ye hazır</strong>: TCKN, VKN, TR IBAN, TR telefon ve kuruşu koruyan
            TRY.
          </li>
          <li>
            <strong>Tip güvenli</strong>: alan adları, <code>from</code> ve kurallar form tipinden
            denetlenir; yazım hatası derleme hatasıdır.
          </li>
          <li>
            <strong>Sunucuda da</strong>: aynı şema <code>@virastack/mask/server</code> ile Server
            Action&apos;da ayrıştırılır ve doğrulanır.
          </li>
          <li>
            <strong>Kenara çekilir</strong>: UI paketi değildir; <AcademyBadge kind="shadcn" />,
            Radix ya da düz input ile çalışır.
          </li>
        </ul>

        <h2 id="karsilastirma">Karşılaştırma</h2>
        <p>
          Maske motoru gücünde imask ve Maskito ile yarışmaz; fark{" "}
          <AcademyBadge kind="react-hook-form" />, Türkiye ve sunucu tarafındadır. ✅ var, ➖ kısmi
          ya da elle, ❌ yok. Ekim 2026&apos;da imask.js.org ve maskito.dev üzerinden kontrol
          edildi.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Özellik</th>
                <th>Mask v2</th>
                <th>react-imask</th>
                <th>Maskito</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>React Hook Form için tasarım (register kuralları, reset, setValue)</td>
                <td>✅</td>
                <td>➖</td>
                <td>➖</td>
              </tr>
              <tr>
                <td>Desen maskesi, özel token, isteğe bağlı bölüm, dinamik maske</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Sayı ve tarih (min/max)</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Kart tipi tespiti ve Luhn</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>TCKN, VKN, TR IBAN doğrulama</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Sunucuda ayrıştırma ve doğrulama</td>
                <td>✅</td>
                <td>➖</td>
                <td>➖</td>
              </tr>
              <tr>
                <td>Vue, Angular</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Range, Enum, Pipe blokları</td>
                <td>❌</td>
                <td>✅</td>
                <td>➖</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="kapsam">Kapsam</h2>
        <ul>
          <li>
            <Link href="/mask/docs/use-vira-mask">useViraMask()</Link>: şema, bağlı alanlar ve React
            Hook Form uyumu
          </li>
          <li>
            <Link href="/mask/docs/custom-mask">Özel maske</Link>: desen sözdizimi, sayı, para,
            tarih ve <code>definePreset</code>
          </li>
          <li>
            <Link href="/mask/docs/validation">Doğrulama</Link> ve{" "}
            <Link href="/mask/docs/server">sunucu</Link>
          </li>
          <li>
            <Link href="/mask/docs/helpers">Yardımcılar</Link> ve{" "}
            <Link href="/mask/docs/types">tipler</Link>
          </li>
          <li>
            Tüm hazır maskeler için <Link href="/mask/examples">örnekler</Link>
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
