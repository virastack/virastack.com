import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

const ruleCode = `const password = useWatch({ control: form.control, name: "password" })
const confirm = useViraPassword({ matchWith: password })

<input {...mergeProps(confirm.inputProps, form.register("confirm", confirm.rule))} />
// değerler farklıysa "password.mismatch" (boş tekrar alanı da geçmez)`;

const sharedCode = `const [visible, setVisible] = useState(false)

const pw = useViraPassword({ visible, onVisibleChange: setVisible })
const confirm = useViraPassword({ matchWith: password, visible, onVisibleChange: setVisible })`;

export function PasswordConfirmDoc() {
  return (
    <>
      <DocsPageHeader
        title="Parola tekrarı"
        description="Aynı hook ve matchWith ile parola tekrarı alanı."
      />
      <DocsProse>
        <h2 id="temel">Temel kullanım</h2>
        <p>
          Ayrı bir hook yoktur. Tekrar alanına <code>matchWith</code> verin: <code>matches</code>{" "}
          <code>true</code>, <code>false</code> veya alan boşken <code>null</code> olur. İki değer
          sunucudaki gibi NFKC sonrası karşılaştırılır.
        </p>
        <PasswordExamplePreview id="confirm" />

        <h2 id="rule">rule</h2>
        <p>
          <code>rule.validate</code> her zaman en son <code>matchWith</code>&apos;i okur; aynı nesne{" "}
          <code>register()</code>&apos;a verilebilir. Parola değişince tekrar alanını yeniden
          kontrol etmek için <Link href="/password/docs/react-hook-form">deps</Link>&apos;e bakın.
        </p>
        <DocsCodeBlock code={ruleCode} lang="tsx" />

        <h2 id="gorunurluk">Ortak görünürlük</h2>
        <p>
          Her alanın kendi toggle&apos;ı vardır. İkisini birlikte göstermek için tek state ile
          kontrol edin:
        </p>
        <DocsCodeBlock code={sharedCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
