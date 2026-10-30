import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const ariaCode = `<input id="virapassword-input-:r0:" type="password" aria-describedby="…-strength" />
<button
  type="button"
  aria-label="Toggle password visibility"
  aria-pressed="false"
  aria-controls="virapassword-input-:r0:"
/>`;

const labelCode = `useViraPassword({ btnProps: { "aria-label": t("togglePassword") } })`;

const liveCode = `const { inputProps, strength, strengthProps } = useViraPassword({ policy })

<input {...inputProps} />
<p {...strengthProps}>{strength?.level}</p>
// role="status" aria-live="polite" aria-atomic="true"
// input, ona işaret eden aria-describedby alır`;

export function PasswordAccessibilityDoc() {
  return (
    <>
      <DocsPageHeader
        title="Erişilebilirlik"
        description="ARIA, tıklamadan sonra odak, güç için canlı bölge ve Caps Lock."
      />
      <DocsProse>
        <h2 id="aria">ARIA öznitelikleri</h2>
        <DocsCodeBlock code={ariaCode} lang="html" />
        <ul>
          <li>
            <code>type=&quot;button&quot;</code>: toggle formu asla göndermez.
          </li>
          <li>
            <code>aria-pressed</code> ekran okuyucuya parolanın görünüp görünmediğini söyler;{" "}
            <code>aria-controls</code>&#32;butonu input&apos;a bağlar.
          </li>
          <li>Etiket İngilizcedir; btnProps ile çevirin:</li>
        </ul>
        <DocsCodeBlock code={labelCode} lang="tsx" />

        <h2 id="odak">Odak</h2>
        <ul>
          <li>Fare veya dokunmayla basınca odak ve imleç input&apos;a döner.</li>
          <li>Odaktaki butonda Enter veya Space odağı butonda tutar.</li>
          <li>
            Safari, &quot;Tüm denetimlere Sekme&quot; açık değilse Tab ile butonları atlar;
            Option+Tab ulaşır. Bu bir tarayıcı ayarıdır, hata değil.
          </li>
        </ul>

        <h2 id="canli">Canlı bölge</h2>
        <p>
          <code>strengthProps</code>&apos;u gücü gösteren elemana spread et. Her kuralı değil kısa
          bir seviyeyi duyurun; yazarken gürültü olmasın.
        </p>
        <DocsCodeBlock code={liveCode} lang="tsx" />

        <h2 id="caps">Caps Lock</h2>
        <p>
          <code>capsLock</code>, input odaktayken Caps Lock açıksa true olur. Metinle uyarın; tek
          başına renk yeterli değildir.
        </p>

        <h2 id="ids">Stabil ID&apos;ler</h2>
        <p>
          <code>id</code>&#32;verilmezse input id&apos;sini server ve client&apos;ta eşleşen{" "}
          <code>useId()</code>&apos;den alır. Etiket veya test sabit bir değer istiyorsa{" "}
          <code>id</code>&#32;ver.
        </p>
      </DocsProse>
    </>
  );
}
