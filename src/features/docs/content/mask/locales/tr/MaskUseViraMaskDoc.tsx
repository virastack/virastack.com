import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskPresetDemo } from "@/features/docs/components/MaskPresetDemo";
import { Link } from "@/i18n/routing";

const basicCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Example() {
  const form = useForm<{ phone: string }>()
  const { phone } = useViraMask({
    form,
    schema: { phone: "phone" },
  })

  const { rawValue, ...inputProps } = phone

  return <input {...inputProps} placeholder="(555) 555-5555" />
}`;

export async function MaskUseViraMaskDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraMask()"
        description="Tek hook ile birden fazla alanı maskeleyin. Schema alan adları form alanlarıyla eşleşir."
      />
      <DocsProse>
        <h2 id="temel">Temel kullanım</h2>
        <ComponentPreview
          preview={<MaskPresetDemo preset="phone" placeholder="(555) 555-5555" />}
          code={basicCode}
        >
          <DocsCodeBlock code={basicCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="schema">Schema</h2>
        <p>Her alan için üç yazım geçerlidir:</p>
        <ul>
          <li>
            <strong>Preset string</strong>: <code>{`{ phone: "phone" }`}</code>
          </li>
          <li>
            <strong>Options nesnesi</strong>:{" "}
            <code>{`{ amount: { currency: { decimalSeparator: ",", thousandSeparator: ".", symbol: "₺" } } }`}</code>
          </li>
          <li>
            <strong>Preset + override</strong>:{" "}
            <code>{`{ card: { preset: "card", onCardTypeChange: fn } }`}</code>
          </li>
        </ul>
        <p>
          Tüm hazır maskeler için <Link href="/mask/docs/examples">örnekler</Link> sayfasına bakın.
          Sıfırdan maske için <Link href="/mask/docs/custom-mask">custom mask</Link>.
        </p>

        <h2 id="donus">Dönüş değeri</h2>
        <p>
          <code>useViraMask()</code>, schema’daki her anahtar için bir <code>MaskField</code> döner.
          <code>rawValue</code>’yu DOM’a yaymamak için ayırın — <code>value</code>{" "}
          <code>inputProps</code> içinde kalır:{" "}
          <code>{`const { rawValue, ...inputProps } = phone`}</code>
        </p>
        <ul>
          <li>
            <code>value</code>: formatlı (display) değer
          </li>
          <li>
            <code>rawValue</code>: formda tutulan ham değer
          </li>
          <li>
            <code>ref</code>, <code>name</code>, <code>onChange</code>, <code>onBlur</code>,{" "}
            <code>onFocus</code>, <code>onKeyDown</code>
          </li>
          <li>
            <code>type</code>, <code>inputMode</code>, <code>autoComplete</code>
          </li>
          <li>
            <code>aria-invalid</code>, <code>aria-describedby</code>, <code>title</code>
          </li>
        </ul>

        <h2 id="rhf">React Hook Form</h2>
        <ul>
          <li>
            Her alan <code>register</code> edilir; doğrulama <code>validate.maskFormat</code>{" "}
            altında çalışır.
          </li>
          <li>
            <code>setValue</code> ile forma <strong>ham</strong> değer yazılır (
            <code>shouldValidate</code> / <code>shouldDirty</code> / <code>shouldTouch</code>).
          </li>
          <li>
            Doğrulama yalnızca <code>validate: true</code> ve değer boş değilken koşulur; ayrıntılar{" "}
            <Link href="/mask/docs/validation">validation</Link> sayfasında.
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
