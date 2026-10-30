import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCurrencyFromDemo } from "@/features/docs/components/MaskCurrencyFromDemo";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";
import { Link } from "@/i18n/routing";

const basicCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Example() {
  const form = useForm<{ phone: string }>()
  const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } })

  return <input {...phone} placeholder="(555) 123 45 67" />
}
// form.watch("phone") → "5551234567"`;

const schemaCode = `useViraMask(form, {
  // preset adı
  tckn: "tckn",
  // preset + değişiklik
  birthDate: { preset: "date", date: { max: "today", minAge: 18 } },
  // React Hook Form kuralları olduğu gibi geçer
  phone: { preset: "phone", country: "TR", rules: { required: "required" } },
  // iç içe alan: anahtarı tırnakla yaz ya da name ver
  "address.zip": { mask: "99999" },
  zip2: { name: "address.zip2", mask: "99999" },
  // forma maskeli metin yaz
  iban: { preset: "iban", country: "TR", output: "masked" },
  // maske dolunca
  card: { preset: "card", onComplete: () => form.setFocus("expiry") },
})`;

const fromCode = `const form = useForm({ defaultValues: { currency: "TRY", price: "1234.56" } })

const { price } = useViraMask(form, {
  price: { preset: "currency", from: "currency" },
})

<select {...form.register("currency")}>…</select>
<input {...price} />`;

export function MaskUseViraMaskDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraMask()"
        description="Tek hook ile birden fazla alanı maskele. Form ham değeri tutar, input maskeyi gösterir."
      />
      <DocsProse>
        <h2 id="temel">Temel kullanım</h2>
        <p>
          İlk argüman <code>useForm()</code> dönüşüdür, ikincisi şema. Tip formdan gelir; ayrıca
          yazmanız gerekmez.
        </p>
        <ComponentPreview
          preview={
            <MaskFieldDemo
              config={{ preset: "phone", country: "TR" }}
              placeholder="(555) 123 45 67"
            />
          }
          code={basicCode}
        >
          <DocsCodeBlock code={basicCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="schema">Schema</h2>
        <p>
          Anahtarlar formdaki alan yollarıdır. Olmayan bir alan, olmayan bir preset ya da yanlış
          seçenek derleme hatası verir.
        </p>
        <DocsCodeBlock code={schemaCode} lang="tsx" />
        <ul>
          <li>
            <code>rules</code>: <code>required</code>, <code>minLength</code>, <code>deps</code>,{" "}
            <code>setValueAs</code>, <code>disabled</code>, <code>onChange</code> ve diğer{" "}
            <code>register</code> kuralları.
          </li>
          <li>
            <code>country</code>: <code>phone</code>, <code>iban</code>, <code>currency</code> ve{" "}
            <code>number</code> için Türkiye biçimi (şimdilik <code>&quot;TR&quot;</code>).
            Varsayılanlar globaldir.
          </li>
          <li>
            <code>output</code>: <code>&quot;raw&quot;</code> (varsayılan) ya da{" "}
            <code>&quot;masked&quot;</code>.
          </li>
          <li>
            <code>onComplete</code>: maske dolduğunda bir kez çalışır. Odağı sen yönetirsin.
          </li>
        </ul>

        <h2 id="from">Bağlı alanlar (from)</h2>
        <p>
          Bir maske başka bir alanın değerine bağlı olabilir. Bağlantı açık yazılır ve tiplidir:{" "}
          <code>from</code> formdaki gerçek bir alan olmalıdır.
        </p>
        <ul>
          <li>
            <code>cvv</code> → <code>card</code>: Amex ise 4, değilse 3 hane.
          </li>
          <li>
            <code>currency</code> → bir select: seçilen kura göre sembol ve ayırıcılar.
          </li>
          <li>
            <code>date</code> → başlangıç tarihi: bitiş ondan önce olamaz (
            <code>date.beforeFrom</code>).
          </li>
        </ul>
        <ComponentPreview preview={<MaskCurrencyFromDemo />} code={fromCode}>
          <DocsCodeBlock code={fromCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Bağlı alan değişince maske yeniden uygulanır: kart Amex&apos;ten Visa&apos;ya dönerse CVV
          hem ekranda hem formda 3 haneye kısalır.
        </p>

        <h2 id="donus">Dönüş değeri</h2>
        <p>
          Her anahtar için input&apos;a doğrudan yayılabilen bir nesne döner. İçindeki her alan
          geçerli bir input prop&apos;udur; DOM&apos;a bilinmeyen bir şey sızmaz.
        </p>
        <ul>
          <li>
            <code>name</code>, <code>ref</code>, <code>defaultValue</code>
          </li>
          <li>
            <code>onChange</code>, <code>onBlur</code>, <code>onCompositionEnd</code>
          </li>
          <li>
            <code>type</code>, <code>inputMode</code>, <code>autoComplete</code>
          </li>
          <li>
            <code>disabled</code> (kurallarda varsa), <code>aria-invalid</code> (hata varsa)
          </li>
        </ul>
        <p>
          Input kontrolsüzdür (<code>defaultValue</code>); <code>value</code> verme. Ham değeri{" "}
          <code>form.watch(&quot;phone&quot;)</code> ile oku.
        </p>

        <h2 id="rhf">React Hook Form uyumu</h2>
        <ul>
          <li>
            <code>reset()</code> ve <code>setValue()</code> ekrana yansır. Ham değer ver (tarihte
            ISO: <code>2026-07-29</code>).
          </li>
          <li>
            <code>watch</code>, <code>getValues</code>, <code>formState</code>,{" "}
            <code>Controller</code> ve <code>useFieldArray</code> ile birlikte çalışır.
          </li>
          <li>
            Mask doğrulaması <code>validate.mask</code> kuralı olarak eklenir; kendi{" "}
            <code>validate</code> kuralların korunur.
          </li>
          <li>
            Resolver (<AcademyBadge kind="zod" />, Valibot) kullanıyorsan{" "}
            <Link href="/mask/docs/validation#resolver">maskResolver</Link> ile sarın.
          </li>
          <li>IME (Çince, Japonca, ölü tuşlar) bitene kadar biçimlendirme bekler.</li>
        </ul>
      </DocsProse>
    </>
  );
}
