import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";
import { Link } from "@/i18n/routing";

const messagesCode = `const messages: Record<string, string> = {
  "tckn.invalid": "Geçersiz T.C. Kimlik No",
  "phone.incomplete": "Telefon numarası eksik",
  "date.minAge": "18 yaşından büyük olmalısınız",
}

const error = form.formState.errors.tckn
{error && <p>{messages[error.message ?? ""] ?? error.message}</p>}`;

const customCode = `useViraMask(form, {
  // true: geçerli · false: "<ad>.invalid" · metin: kendi anahtarınız
  tckn: { preset: "tckn", validate: (value) => value !== "11111111110" || "tckn.blocked" },
  // React Hook Form kuralları da çalışır
  phone: { preset: "phone", country: "TR", rules: { required: "required", validate: { mobile: (v) => v.startsWith("5") || "phone.mobile" } } },
})`;

const resolverCode = `import { zodResolver } from "@hookform/resolvers/zod"
import { maskResolver, useViraMask } from "@virastack/mask"

const masks = { tckn: "tckn", phone: { preset: "phone", country: "TR" } } as const
const schema = z.object({ tckn: z.string().min(1, "required"), phone: z.string() })

const form = useForm({ resolver: maskResolver(masks, zodResolver(schema)) })
// ya da Standard Schema'yı doğrudan verin (@hookform/resolvers gerekmez)
const form2 = useForm({ resolver: maskResolver(masks, schema) })

const { tckn, phone } = useViraMask(form, masks)`;

export function MaskValidationDoc() {
  return (
    <>
      <DocsPageHeader
        title="Doğrulama"
        description="Hatalar mesaj değil anahtar olarak döner. Kendi kuralınızı ekleyin, resolver ile birlikte kullanın."
      />
      <DocsProse>
        <h2 id="anahtarlar">Hata anahtarları</h2>
        <p>
          Boş değer doğrulanmaz; zorunluluk <code>rules.required</code> ya da şemanızın işidir. Hata{" "}
          <code>errors.alan.message</code> içinde bir anahtar olarak gelir, böylece çeviriyi siz
          yönetirsiniz.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Anahtar</th>
                <th>Ne zaman</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>&lt;ad&gt;.incomplete</code>
                </td>
                <td>Desen dolmadı (phone, card, tckn…)</td>
              </tr>
              <tr>
                <td>
                  <code>&lt;ad&gt;.invalid</code>
                </td>
                <td>Algoritma reddetti (Luhn, TCKN, VKN, mod-97, gerçek olmayan tarih)</td>
              </tr>
              <tr>
                <td>
                  <code>&lt;ad&gt;.min</code>, <code>&lt;ad&gt;.max</code>
                </td>
                <td>Sayı, para ya da tarih sınırı; son kullanmada geçmiş ay</td>
              </tr>
              <tr>
                <td>
                  <code>date.minAge</code>
                </td>
                <td>Yaş sınırı</td>
              </tr>
              <tr>
                <td>
                  <code>date.beforeFrom</code>
                </td>
                <td>Bağlı başlangıç tarihinden önce</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <code>&lt;ad&gt;</code> preset adıdır; özel desende <code>mask</code>,{" "}
          <code>definePreset</code> ile verdiğiniz ad.
        </p>
        <ComponentPreview
          preview={<MaskFieldDemo config="tckn" placeholder="10000000146" />}
          code={messagesCode}
        >
          <DocsCodeBlock code={messagesCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="ozel">Özel doğrulama</h2>
        <p>
          <code>validate</code> yerleşik kontrollerden sonra çalışır. Preset üzerinde verirseniz
          ikisi birlikte uygulanır.
        </p>
        <DocsCodeBlock code={customCode} lang="tsx" />

        <h2 id="resolver">Zod, Valibot ve resolver</h2>
        <p>
          <AcademyBadge kind="react-hook-form" />, resolver varken <code>register</code>{" "}
          doğrulamasını atlar. Resolver&apos;ı <code>maskResolver</code> ile sarın; şema hataları ve
          maske hataları birlikte gelir. Sarmazsanız geliştirme modunda konsola uyarı düşer.
        </p>
        <DocsCodeBlock code={resolverCode} lang="tsx" />
        <p>
          Aynı şemayı sunucuda kullanmak için <Link href="/mask/docs/server">sunucu</Link> sayfasına
          bakın.
        </p>
      </DocsProse>
    </>
  );
}
