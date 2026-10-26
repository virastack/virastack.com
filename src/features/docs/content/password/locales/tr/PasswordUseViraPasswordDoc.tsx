import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

type Row = [name: string, fallback: string, description: string];

const optionRows: Row[] = [
  ["defaultVisible", "false", "Başlangıç görünürlüğü (kontrolsüz)"],
  ["visible", "-", "Kontrollü görünürlük"],
  ["onVisibleChange", "-", "(visible) => void; otomatik gizlemede de çağrılır"],
  ["hideOnSubmit", "true", "Form gönderilince veya resetlenince gizle"],
  ["hideOnBlur", "false", "Odak alandan çıkınca veya sekme gizlenince gizle"],
  [
    "autoComplete",
    "current-password",
    "policy veya matchWith ile new-password; false ile eklenmez",
  ],
  ["policy", "-", "definePolicy() politikası; strength ve issues'u açar"],
  ["forbidden", "-", "Parolanın içermemesi gereken değerler (e-posta, ad)"],
  ["matchWith", "-", "Tekrar alanının eşleşeceği parola; matches'i açar"],
  ["value", "-", "Güncel değer, örn. useWatch()'tan"],
  ["icons", "Eye / EyeOff", "ReactNode olarak { show, hide }"],
  ["disabled", "false", "Input ve toggle kilitlenir"],
  ["readOnly", "false", "Salt okunur input, disabled toggle"],
  ["id", "useId()", "Input id'si; butonun aria-controls'u"],
  ["inputProps", "-", 'Input props\'larıyla birleşir, örn. register("password")'],
  ["btnProps", "-", "Buton props'larıyla birleşir"],
];

const returnRows: [string, string][] = [
  ["inputProps", "<input {...inputProps} />; yalnızca öznitelik, ref veya handler yok"],
  ["btnProps", "<button {...btnProps} />, ikon children olarak"],
  ["isVisible", "Güncel görünürlük"],
  ["toggle() / setVisible(v)", "Görünürlüğü değiştirir (disabled veya readOnly iken no-op)"],
  ["capsLock", "Input odaktayken Caps Lock açık"],
  ["strength", "Güncel değer için evaluate() sonucu; politika yoksa null"],
  ["strengthProps", "Gücü gösteren eleman için canlı bölge props'ları"],
  ["matches", "matchWith ile true / false; boşken null"],
  ["issues", "Hata anahtarları: önce politika, sonra password.mismatch"],
  ["rule", "React Hook Form için { validate }; ilk anahtarı döndürür"],
];

const mergeCode = `useViraPassword({
  inputProps: { onBlur: () => track("blur"), className: "pr-10" },
})
// onBlur: önce hook'un handler'ı, sonra sizinki
// className, aria-describedby: boşlukla birleşir
// ref (sizinki): olduğu gibi geçer`;

function PropTable({ rows, head }: { rows: string[][]; head: string[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table>
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, ...rest]) => (
            <tr key={name}>
              <td>
                <code>{name}</code>
              </td>
              {rest.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PasswordUseViraPasswordDoc() {
  return (
    <>
      <DocsPageHeader
        title="useViraPassword()"
        description="Input ve toggle için tek hook; güç ve parola tekrarı aynı hook'un seçenekleridir."
      />
      <DocsProse>
        <h2 id="temel">Temel kullanım</h2>
        <PasswordExamplePreview id="show-hide" />

        <h2 id="options">Options</h2>
        <PropTable head={["Seçenek", "Varsayılan", "Açıklama"]} rows={optionRows} />
        <p>
          Güç: <Link href="/password/docs/strength">güç</Link>. Tekrar alanı:{" "}
          <Link href="/password/docs/confirm">parola tekrarı</Link>.
        </p>

        <h2 id="donus">Dönüş değeri</h2>
        <PropTable head={["Alan", "Açıklama"]} rows={returnRows} />

        <h2 id="merge">Prop merging</h2>
        <p>
          <code>inputProps</code> ve <code>btnProps</code> hook&apos;unkilerden sonra uygulanır;
          çoğu anahtar değiştirilebilir. Şunlar birleştirilir:
        </p>
        <DocsCodeBlock code={mergeCode} lang="tsx" />
        <p>
          Dönen <code>inputProps</code> yalnızca öznitelik taşır; <code>register()</code> veya bir{" "}
          <Link href="/password/docs/react-hook-form">ViraStack Mask</Link> alanından önce ya da
          sonra spread edilebilir, onların ref ve handler&apos;larını ezmez.
        </p>
      </DocsProse>
    </>
  );
}
