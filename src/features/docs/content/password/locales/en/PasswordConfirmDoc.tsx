import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

const ruleCode = `const password = useWatch({ control: form.control, name: "password" })
const { inputProps, rule } = useViraPassword({ matchWith: password })

<input {...inputProps} {...form.register("confirm", rule)} />
// "password.mismatch" when the values differ (an empty confirm fails too)`;

const sharedCode = `const [visible, setVisible] = useState(false)

const shared = { visible, onVisibleChange: setVisible }

const passwordField = useViraPassword(shared)
const confirmField = useViraPassword({ ...shared, matchWith: password })`;

export function PasswordConfirmDoc() {
  return (
    <>
      <DocsPageHeader
        title="Confirm password"
        description="Repeat-password fields with the same hook and matchWith."
      />
      <DocsProse>
        <h2 id="temel">Basic usage</h2>
        <p>
          There is no separate hook. Give the confirm field <code>matchWith</code>:{" "}
          <code>matches</code> is <code>true</code>, <code>false</code>, or <code>null</code>
          &#32;while the field is empty. Both values are compared after NFKC, like on the server.
        </p>
        <PasswordExamplePreview id="confirm" />

        <h2 id="rule">rule</h2>
        <p>
          <code>rule.validate</code> always reads the latest <code>matchWith</code>, so the same
          object can go into <code>register()</code>. To re-check the confirm field when the
          password changes, see <Link href="/password/docs/react-hook-form">deps</Link>.
        </p>
        <DocsCodeBlock code={ruleCode} lang="tsx" />

        <h2 id="gorunurluk">Shared visibility</h2>
        <p>Each field has its own toggle. To show both at once, control them with one state:</p>
        <DocsCodeBlock code={sharedCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
