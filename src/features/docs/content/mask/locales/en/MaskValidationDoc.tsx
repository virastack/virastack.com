import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const customValidatorCode = `{
  mask: "(999) 999 99 99",
  validate: true,
  validator: (value) => value.length === 10,
}`;

export async function MaskValidationDoc() {
  return (
    <>
      <DocsPageHeader
        title="Validation"
        description="Built-in validators on presets or your own function; wired to React Hook Form errors."
      />
      <DocsProse>
        <h2 id="built-in">Built-in validators</h2>
        <p>
          Enable with <code>validate: true</code> and a <code>validator</code> key. Empty fields are
          not validated.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>luhn</code>
                </td>
                <td>Card number (Amex 15 / others 16 digits)</td>
              </tr>
              <tr>
                <td>
                  <code>expiry</code>
                </td>
                <td>MMYY: month 1–12, not a past date</td>
              </tr>
              <tr>
                <td>
                  <code>tckn</code>
                </td>
                <td>11-digit Turkish ID algorithm</td>
              </tr>
              <tr>
                <td>
                  <code>vkn</code>
                </td>
                <td>10-digit tax ID number</td>
              </tr>
              <tr>
                <td>
                  <code>iban</code>
                </td>
                <td>TR + 24 digits, mod-97</td>
              </tr>
              <tr>
                <td>
                  <code>email</code>
                </td>
                <td>Email regex</td>
              </tr>
              <tr>
                <td>
                  <code>url</code>
                </td>
                <td>URL regex</td>
              </tr>
              <tr>
                <td>
                  <code>date</code>
                </td>
                <td>
                  Calendar date (with <code>dateFormat</code>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Functions can also be imported directly: <code>validateLuhn</code>,{" "}
          <code>validateTCKN</code>, <code>validateIBAN</code>, the <code>VALIDATORS</code> map,
          etc.
        </p>

        <h2 id="ozel">Custom validator</h2>
        <DocsCodeBlock code={customValidatorCode} lang="ts" />

        <h2 id="mesaj">Error message</h2>
        <p>
          On failed validation, <code>errorMessage</code> is returned; otherwise RHF gets{" "}
          <code>false</code>. Read errors from <code>form.formState.errors</code>.
        </p>
        <p>
          For type definitions see <Link href="/mask/docs/types">types</Link>; for live examples see{" "}
          <Link href="/mask/docs/examples">examples</Link>.
        </p>
      </DocsProse>
    </>
  );
}
