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
        description="Hazır maskelerdeki yerleşik doğrulayıcılar veya kendi fonksiyonunuz. React Hook Form hatalarına bağlanır."
      />
      <DocsProse>
        <h2 id="built-in">Yerleşik validators</h2>
        <p>
          <code>validate: true</code> ve bir <code>validator</code> anahtarı ile etkinleşir. Boş
          alanlar doğrulanmaz.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Anahtar</th>
                <th>Kullanım</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>luhn</code>
                </td>
                <td>Kart numarası (Amex 15 / diğer 16 hane)</td>
              </tr>
              <tr>
                <td>
                  <code>expiry</code>
                </td>
                <td>MMYY: ay 1–12, geçmiş tarih değil</td>
              </tr>
              <tr>
                <td>
                  <code>tckn</code>
                </td>
                <td>11 haneli T.C. kimlik algoritması</td>
              </tr>
              <tr>
                <td>
                  <code>vkn</code>
                </td>
                <td>10 haneli vergi kimlik numarası</td>
              </tr>
              <tr>
                <td>
                  <code>iban</code>
                </td>
                <td>TR + 24 rakam, mod-97</td>
              </tr>
              <tr>
                <td>
                  <code>email</code>
                </td>
                <td>E-posta regex</td>
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
                  Takvim tarihi (<code>dateFormat</code> ile)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Fonksiyonlar ayrıca doğrudan import edilebilir: <code>validateLuhn</code>,{" "}
          <code>validateTCKN</code>, <code>validateIBAN</code>, <code>VALIDATORS</code> map’i vb.
        </p>

        <h2 id="ozel">Özel validator</h2>
        <DocsCodeBlock code={customValidatorCode} lang="ts" />

        <h2 id="mesaj">Hata mesajı</h2>
        <p>
          Başarısız doğrulamada <code>errorMessage</code> döner; verilmezse RHF <code>false</code>{" "}
          alır. Hataları <code>form.formState.errors</code> üzerinden okuyun.
        </p>
        <p>
          Tip tanımları için <Link href="/mask/docs/types">types</Link>, canlı örnekler için{" "}
          <Link href="/mask/docs/examples">örnekler</Link>.
        </p>
      </DocsProse>
    </>
  );
}
