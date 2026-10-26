import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { Link } from "@/i18n/routing";

const iconsCode = `import { Home, Star } from "lucide-react"
import { useViraPassword } from "@virastack/password"

const { inputProps, btnProps } = useViraPassword({
  icons: { show: <Star />, hide: <Home /> },
})`;

const textCode = `useViraPassword({ icons: { show: "Göster", hide: "Gizle" } })`;

const propsCode = `useViraPassword({
  id: "signup-password",
  inputProps: { name: "password", className: "pr-10" },
  btnProps: {
    className: "absolute inset-y-0 right-2 my-auto",
    onClick: () => analytics.track("password_toggled"),
  },
})`;

const hideCode = `useViraPassword({
  hideOnSubmit: true, // varsayılan: form gönderilince ve resetlenince gizle
  hideOnBlur: true,   // odak alandan çıkınca veya sekme gizlenince gizle
})`;

const autoCompleteCode = `useViraPassword() // current-password (giriş)
useViraPassword({ policy }) // new-password (kayıt)
useViraPassword({ autoComplete: "one-time-code" })
useViraPassword({ autoComplete: false }) // öznitelik eklenmez`;

const stateCode = `useViraPassword({ disabled: true }) // input ve buton disabled
useViraPassword({ readOnly: true }) // salt okunur input, disabled buton`;

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
          <code>icons</code> herhangi bir <code>ReactNode</code> alır: <code>show</code> parola
          gizliyken, <code>hide</code> görünürken render edilir.
        </p>
        <ComponentPreview preview={<PasswordDemo variant="custom-icons" />} code={iconsCode}>
          <DocsCodeBlock code={iconsCode} lang="tsx" />
        </ComponentPreview>
        <ComponentPreview preview={<PasswordDemo variant="custom-text" />} code={textCode}>
          <DocsCodeBlock code={textCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="props">inputProps & btnProps</h2>
        <ComponentPreview preview={<PasswordDemo variant="prop-merge" />} code={propsCode}>
          <DocsCodeBlock code={propsCode} lang="tsx" />
        </ComponentPreview>
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
        <ComponentPreview preview={<PasswordDemo variant="disabled" />} code={stateCode}>
          <DocsCodeBlock code={stateCode} lang="tsx" />
        </ComponentPreview>
      </DocsProse>
    </>
  );
}
