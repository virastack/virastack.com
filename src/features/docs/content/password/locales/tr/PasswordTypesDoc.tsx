import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const optionsTypeCode = `interface UseViraPasswordOptions {
  defaultVisible?: boolean
  icons?: {
    show: ReactNode
    hide: ReactNode
  }
  disabled?: boolean
  readOnly?: boolean
  id?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  btnProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}`;

const resultTypeCode = `interface UseViraPasswordResult {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
  btnProps: React.ButtonHTMLAttributes<HTMLButtonElement>
  isVisible: boolean
  toggle: () => void
  setVisible: (visible: boolean) => void
}`;

export async function PasswordTypesDoc() {
  return (
    <>
      <DocsPageHeader title="Types" description="Paket dışa aktarımındaki TypeScript tipleri." />
      <DocsProse>
        <h2 id="options">UseViraPasswordOptions</h2>
        <DocsCodeBlock code={optionsTypeCode} lang="ts" />

        <h2 id="result">UseViraPasswordResult</h2>
        <DocsCodeBlock code={resultTypeCode} lang="ts" />
        <p>Ayrıca dışa aktarılan değerler:</p>
        <ul>
          <li>
            <code>useViraPassword</code>, <code>mergeProps</code>
          </li>
          <li>
            <code>getInputType</code>, <code>getButtonAriaAttributes</code>,{" "}
            <code>getInputAriaAttributes</code>
          </li>
          <li>
            <code>EyeIcon</code>, <code>EyeOffIcon</code>
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
