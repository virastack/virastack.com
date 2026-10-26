import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

const hideCode = `useViraPassword({
  hideOnSubmit: true, // varsayılan: form gönderilince ve resetlenince gizle
  hideOnBlur: true,   // odak alandan çıkınca veya sekme gizlenince gizle
})`;

const autoCompleteCode = `useViraPassword() // current-password (giriş)
useViraPassword({ policy }) // new-password (kayıt)
useViraPassword({ autoComplete: "one-time-code" })
useViraPassword({ autoComplete: false }) // öznitelik eklenmez`;

export function PasswordCustomizationDoc() {
  return (
    <>
      <DocsPageHeader
        title="Özelleştirme"
        description="İkonlar, metin, props, otomatik gizleme, autoComplete ve kilit durumları."
      />
      <DocsProse>
        <h2 id="icons">İkonlar & metin</h2>
        <p>
          <code>icons</code> herhangi bir <code>ReactNode</code> alır: <code>show</code>&#32;parola
          gizliyken, <code>hide</code>&#32;görünürken render edilir.
        </p>
        <PasswordExamplePreview id="custom-icons" />
        <PasswordExamplePreview id="custom-text" />

        <h2 id="props">inputProps & btnProps</h2>
        <PasswordExamplePreview id="prop-merge" />
        <p>
          Birleştirme kuralları:{" "}
          <Link href="/password/docs/use-vira-password">useViraPassword()</Link>.
        </p>

        <h2 id="gizleme">Otomatik gizleme</h2>
        <p>
          Gönderimde gizlemek, parola yöneticisinin kaydederken parola alanı görmesini sağlar.
          Otomatik gizleme alan disabled olsa bile çalışır.
        </p>
        <DocsCodeBlock code={hideCode} lang="tsx" />

        <h2 id="autocomplete">autoComplete</h2>
        <DocsCodeBlock code={autoCompleteCode} lang="tsx" />

        <h2 id="state">disabled & readOnly</h2>
        <PasswordExamplePreview id="disabled" />
      </DocsProse>
    </>
  );
}
