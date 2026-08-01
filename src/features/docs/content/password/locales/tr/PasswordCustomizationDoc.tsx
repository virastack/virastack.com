import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { Link } from "@/i18n/routing";

const iconsCode = `import { Home, Star } from "lucide-react"
import { useViraPassword } from "@virastack/password"

const { inputProps, btnProps } = useViraPassword({
  icons: {
    show: <Star className="size-4" />,
    hide: <Home className="size-4" />,
  },
})`;

const textCode = `const { inputProps, btnProps } = useViraPassword({
  icons: {
    show: "Göster",
    hide: "Gizle",
  },
})`;

const propsCode = `const { inputProps, btnProps } = useViraPassword({
  id: "signup-password",
  inputProps: {
    name: "password",
    autoComplete: "new-password",
    className: "pr-10",
  },
  btnProps: {
    className: "absolute inset-y-0 right-2 my-auto",
    onClick: () => analytics.track("password_toggled"),
  },
})`;

const stateCode = `// Input + buton disabled; toggle / setVisible no-op
useViraPassword({ disabled: true })

// Input readOnly; buton disabled; toggle / setVisible no-op
useViraPassword({ readOnly: true })`;

export async function PasswordCustomizationDoc() {
  return (
    <>
      <DocsPageHeader
        title="Customization"
        description="İkonlar, metin, stil ve kilit durumları: headless API ile kendi tasarım sisteminize uyum."
      />
      <DocsProse>
        <h2 id="icons">İkonlar & metin</h2>
        <p>
          <code>icons</code> alanı <code>ReactNode</code> kabul eder: SVG, bileşen veya düz metin.{" "}
          <code>show</code> parola gizliyken, <code>hide</code> görünürken render edilir.
        </p>
        <ComponentPreview preview={<PasswordDemo variant="custom-icons" />} code={iconsCode}>
          <DocsCodeBlock code={iconsCode} lang="tsx" />
        </ComponentPreview>
        <p>Metin örneği:</p>
        <ComponentPreview preview={<PasswordDemo variant="custom-text" />} code={textCode}>
          <DocsCodeBlock code={textCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Varsayılan ikonlar <Link href="/password/docs/helpers">helpers</Link> sayfasından da
          import edilebilir. Daha fazla örnek:{" "}
          <Link href="/password/docs/examples/custom-icons">özel ikonlar</Link>,{" "}
          <Link href="/password/docs/examples/custom-text">özel metin</Link>.
        </p>

        <h2 id="props">inputProps & btnProps</h2>
        <p>name, autoComplete, className ve ekstra handler’lar options üzerinden merge edilir:</p>
        <ComponentPreview preview={<PasswordDemo variant="prop-merge" />} code={propsCode}>
          <DocsCodeBlock code={propsCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Merge kuralları <Link href="/password/docs/use-vira-password">useViraPassword()</Link>{" "}
          sayfasında. Örnek: <Link href="/password/docs/examples/prop-merge">Prop merge</Link>.
        </p>

        <h2 id="state">disabled & readOnly</h2>
        <p>
          Her iki durumda da görünürlük değiştirilemez: buton disabled olur, <code>toggle</code> /{" "}
          <code>setVisible</code> no-op’dur.
        </p>
        <ComponentPreview preview={<PasswordDemo variant="disabled" />} code={stateCode}>
          <DocsCodeBlock code={stateCode} lang="tsx" />
        </ComponentPreview>
      </DocsProse>
    </>
  );
}
