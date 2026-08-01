import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

export function MaskHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Helpers"
        description="Hook olmadan da kullanabileceğiniz formatlama ve yardımcı fonksiyonlar."
      />
      <DocsProse>
        <h2 id="mask">Maske yardımcıları</h2>
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
                  <code>applyMask(value, mask)</code>
                </td>
                <td>Ham değere pattern uygular</td>
              </tr>
              <tr>
                <td>
                  <code>unmask(value, mask)</code>
                </td>
                <td>Maskeden veri karakterlerini çıkarır</td>
              </tr>
              <tr>
                <td>
                  <code>stripMask(value, mask)</code>
                </td>
                <td>Maske ile kilit adımda yalnızca data slot’larını tutar</td>
              </tr>
              <tr>
                <td>
                  <code>cleanValue(value, allowed?, forbidden?)</code>
                </td>
                <td>İzin / yasak regex ile filtreler</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="currency">Para birimi</h2>
        <ul>
          <li>
            <code>formatCurrency(value, options)</code>: ham <code>&quot;1234.56&quot;</code> →
            görüntü (<code>1,234.56</code> US varsayılan; TR için ayırıcıları customize edin)
          </li>
          <li>
            <code>unformatCurrency(value, options)</code>: görüntü → ham
          </li>
        </ul>

        <h2 id="card">Kart</h2>
        <p>
          <code>getCardType(cardNumber)</code> →{" "}
          <code>
            &quot;visa&quot; | &quot;mastercard&quot; | &quot;amex&quot; | &quot;troy&quot; |
            &quot;unknown&quot;
          </code>
          . BIN öneklerine göre çalışır (Visa <code>4</code>, Amex <code>34</code>/<code>37</code>,
          Troy <code>9792</code>…).
        </p>

        <h2 id="refs">Refs</h2>
        <p>
          <code>mergeRefs(...refs)</code>: RHF register ref’i ile yerel ref’i birleştirmek için.
          Hook bunu dahili kullanır; kendi kontrollü input’unuzda da işe yarar.
        </p>
      </DocsProse>
    </>
  );
}
