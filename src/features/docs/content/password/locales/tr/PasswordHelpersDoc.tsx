import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const helpersCode = `import {
  getInputType,
  getButtonAriaAttributes,
  getInputAriaAttributes,
  mergeProps,
  EyeIcon,
  EyeOffIcon,
} from "@virastack/password"

getInputType(false) // "password"
getInputType(true)  // "text"

getButtonAriaAttributes(true, "pwd-1")
// {
//   "aria-label": "Toggle password visibility",
//   "aria-pressed": true,
//   "aria-controls": "pwd-1",
//   type: "button",
// }

getInputAriaAttributes(true, "pwd-error")
// { "aria-invalid": true, "aria-describedby": "pwd-error" }`;

export function PasswordHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Helpers"
        description="Hook dışında da kullanabileceğiniz core yardımcılar, ikonlar ve mergeProps."
      />
      <DocsProse>
        <h2 id="core">Core yardımcılar</h2>
        <p>Framework-agnostic fonksiyonlar: React state olmadan da kullanılabilir:</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Fonksiyon</th>
                <th>Açıklama</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>getInputType(isVisible)</code>
                </td>
                <td>
                  <code>&quot;password&quot;</code> | <code>&quot;text&quot;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>getButtonAriaAttributes(isVisible, inputId, label?)</code>
                </td>
                <td>
                  Buton için <code>aria-*</code> ve <code>type=&quot;button&quot;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>getInputAriaAttributes(isInvalid?, describedBy?)</code>
                </td>
                <td>
                  Opsiyonel <code>aria-invalid</code> / <code>aria-describedby</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <DocsCodeBlock code={helpersCode} lang="ts" />

        <h2 id="icons">İkonlar</h2>
        <p>
          Varsayılan <code>EyeIcon</code> / <code>EyeOffIcon</code> (16×16 SVG,{" "}
          <code>currentColor</code>). Hook bunları render eder; kendi UI’nızda da import
          edebilirsiniz.
        </p>

        <h2 id="merge">mergeProps</h2>
        <p>
          Hook’un kullandığı birleştirici dışa aktarılır: <code>on*</code> handler’ları zincirler,{" "}
          <code>className</code> string’lerini birleştirir, diğer anahtarlarda sonraki değer
          kazanır. Kontrollü bileşenlerinizde manuel merge için kullanışlıdır.
        </p>
      </DocsProse>
    </>
  );
}
