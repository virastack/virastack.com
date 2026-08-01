import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

export function MaskHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Helpers"
        description="Formatting and utility functions you can use without the hook."
      />
      <DocsProse>
        <h2 id="mask">Mask helpers</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>applyMask(value, mask)</code>
                </td>
                <td>Applies a pattern to a raw value</td>
              </tr>
              <tr>
                <td>
                  <code>unmask(value, mask)</code>
                </td>
                <td>Extracts data characters from a masked value</td>
              </tr>
              <tr>
                <td>
                  <code>stripMask(value, mask)</code>
                </td>
                <td>At a locked mask step, keeps only data slots</td>
              </tr>
              <tr>
                <td>
                  <code>cleanValue(value, allowed?, forbidden?)</code>
                </td>
                <td>Filters with allow / forbid regex</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="currency">Currency</h2>
        <ul>
          <li>
            <code>formatCurrency(value, options)</code>: raw <code>&quot;1234.56&quot;</code> →
            display (<code>1,234.56</code> US default; customize separators for TR)
          </li>
          <li>
            <code>unformatCurrency(value, options)</code>: display → raw
          </li>
        </ul>

        <h2 id="card">Card</h2>
        <p>
          <code>getCardType(cardNumber)</code> →{" "}
          <code>
            &quot;visa&quot; | &quot;mastercard&quot; | &quot;amex&quot; | &quot;troy&quot; |
            &quot;unknown&quot;
          </code>
          . Works from BIN prefixes (Visa <code>4</code>, Amex <code>34</code>/<code>37</code>, Troy{" "}
          <code>9792</code>…).
        </p>

        <h2 id="refs">Refs</h2>
        <p>
          <code>mergeRefs(...refs)</code>: merge the RHF register ref with a local ref. The hook
          uses this internally; useful on your own controlled inputs too.
        </p>
      </DocsProse>
    </>
  );
}
