import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCustomDemo } from "@/features/docs/content/mask/MaskCustomDemo";

const customCode = `const form = useForm({ defaultValues: { code: "" } })

const { code } = useViraMask({
  form,
  schema: {
    code: {
      mask: "aaa-999",
      transform: "uppercase",
    },
  },
})

const { rawValue, ...inputProps } = code

<input {...inputProps} placeholder="ABC-123" />`;

const resolveMaskCode = `{
  mask: "9999 9999 9999 9999",
  resolveMask: (value) => {
    const digits = value.replace(/\\D/g, "")
    if (digits.startsWith("34") || digits.startsWith("37")) {
      return "9999 999999 99999" // Amex
    }
    return undefined
  },
}`;

export async function MaskCustomMaskDoc() {
  return (
    <>
      <DocsPageHeader
        title="Custom mask"
        description="Hazır maske yetmediğinde kendi maske dizginizi ve MaskOptions alanlarını kullanın."
      />
      <DocsProse>
        <h2 id="sozdizimi">Sözdizimi</h2>
        <p>Maske dizgisindeki özel token’lar:</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Anlam</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>9</code>
                </td>
                <td>Rakam (0–9)</td>
              </tr>
              <tr>
                <td>
                  <code>a</code> / <code>A</code>
                </td>
                <td>
                  Harf (a–z). Büyük/küçük için <code>transform</code> kullanın
                </td>
              </tr>
              <tr>
                <td>
                  <code>*</code>
                </td>
                <td>Herhangi bir karakter</td>
              </tr>
              <tr>
                <td>Diğer</td>
                <td>
                  Literal ayırıcı (<code> </code>, <code>/</code>, <code>(</code>, <code>)</code>…)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ComponentPreview preview={<MaskCustomDemo />} code={customCode}>
          <DocsCodeBlock code={customCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="options">MaskOptions</h2>
        <p>Sık kullanılan alanlar:</p>
        <ul>
          <li>
            <code>mask</code>: pattern dizgisi
          </li>
          <li>
            <code>transform</code>: <code>uppercase</code> | <code>lowercase</code>
          </li>
          <li>
            <code>allowedChars</code> / <code>forbiddenChars</code>
          </li>
          <li>
            <code>displayPrefix</code>: gösterilir, ham değere yazılmaz (IBAN’daki <code>TR</code>)
          </li>
          <li>
            <code>currency</code>, <code>dateFormat</code>, <code>alphaFormat</code>,{" "}
            <code>usernameFormat</code>
          </li>
          <li>
            <code>type</code>, <code>inputMode</code>, <code>autoComplete</code>
          </li>
          <li>
            <code>preset</code>: hazır maske üzerine override
          </li>
        </ul>

        <h2 id="resolve">resolveMask</h2>
        <p>
          Dinamik maske için <code>resolveMask(value, allValues, schema)</code> yeni bir maske
          dizgisi (veya <code>undefined</code>) döner. Kart (Amex) ve CVV hazır maskeleri bunu
          kullanır: kardeş alanlara bakarak maskeyi günceller.
        </p>
        <DocsCodeBlock code={resolveMaskCode} lang="ts" />
      </DocsProse>
    </>
  );
}
