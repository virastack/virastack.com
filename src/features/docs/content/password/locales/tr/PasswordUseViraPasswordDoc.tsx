import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { Link } from "@/i18n/routing";

const basicCode = `import { useViraPassword } from "@virastack/password"

function Example() {
  const { inputProps, btnProps } = useViraPassword()

  return (
    <div className="relative">
      <input {...inputProps} placeholder="Parolanız" />
      <button {...btnProps} />
    </div>
  )
}`;

export async function PasswordUseViraPasswordDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraPassword()"
        description="Tek hook ile input type’ını ve görünürlük butonunu yönetin. Props doğrudan spread edilir."
      />
      <DocsProse>
        <h2 id="temel">Temel kullanım</h2>
        <ComponentPreview preview={<PasswordDemo variant="basic" />} code={basicCode}>
          <DocsCodeBlock code={basicCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="options">Options</h2>
        <p>
          <code>useViraPassword(options?)</code> isteğe bağlı ayarlar alır:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Alan</th>
                <th>Varsayılan</th>
                <th>Açıklama</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>defaultVisible</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Başlangıç görünürlüğü</td>
              </tr>
              <tr>
                <td>
                  <code>icons</code>
                </td>
                <td>Eye / EyeOff</td>
                <td>
                  <code>{`{ show, hide }`}</code> özel ikonlar
                </td>
              </tr>
              <tr>
                <td>
                  <code>disabled</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Input ve buton kilitlenir</td>
              </tr>
              <tr>
                <td>
                  <code>readOnly</code>
                </td>
                <td>
                  <code>false</code>
                </td>
                <td>Input readOnly; buton disabled</td>
              </tr>
              <tr>
                <td>
                  <code>id</code>
                </td>
                <td>
                  <code>useId()</code>
                </td>
                <td>
                  Input id; buton <code>aria-controls</code> ile eşleşir
                </td>
              </tr>
              <tr>
                <td>
                  <code>inputProps</code>
                </td>
                <td>-</td>
                <td>Base input props ile merge</td>
              </tr>
              <tr>
                <td>
                  <code>btnProps</code>
                </td>
                <td>-</td>
                <td>Base button props ile merge</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          İkonlar ve stil için <Link href="/password/docs/customization">customization</Link>, ARIA
          için <Link href="/password/docs/accessibility">accessibility</Link>.
        </p>

        <h2 id="donus">Dönüş değeri</h2>
        <ul>
          <li>
            <code>inputProps</code>: <code>{`<input {...inputProps} />`}</code>
          </li>
          <li>
            <code>btnProps</code>: <code>{`<button {...btnProps} />`}</code> (ikon{" "}
            <code>children</code> olarak)
          </li>
          <li>
            <code>isVisible</code>: mevcut görünürlük
          </li>
          <li>
            <code>toggle()</code>: görünürlüğü değiştirir
          </li>
          <li>
            <code>setVisible(visible)</code>: görünürlüğü ayarlar
          </li>
        </ul>

        <h2 id="merge">Prop merging</h2>
        <p>
          Kullanıcı props’ları base props’tan sonra uygulanır. Çoğu anahtar override edilebilir; şu
          alanlar birleştirilir:
        </p>
        <ul>
          <li>
            <code>on*</code> event handler’lar sırayla çağrılır (önce base, sonra kullanıcı)
          </li>
          <li>
            <code>className</code> string’leri boşlukla birleşir
          </li>
        </ul>
        <p>
          Manuel birleştirme için <Link href="/password/docs/helpers">mergeProps</Link> dışa
          aktarılır.
        </p>
      </DocsProse>
    </>
  );
}
