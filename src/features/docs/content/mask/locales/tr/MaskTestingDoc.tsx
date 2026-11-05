import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskTestingDemo } from "@/features/docs/components/MaskTestingDemo";

const entryCode = `import { generateIBAN, generateTCKN } from "@virastack/mask/testing"`;

const tcknCode = `generateTCKN()             // her çağrıda yeni bir numara
generateTCKN({ seed: 1 })  // her çalıştırmada "49537717654"

isValidTCKN(generateTCKN()) // true`;

const ibanCode = `generateIBAN()                        // rastgele bir bankada Türk IBAN'ı
generateIBAN("TR", { bank: "0062" })  // "TR51 0006 2…", Garanti
generateIBAN("DE", { seed: 1 })       // her çalıştırmada "DE70449725173128749365"

getTurkishBank(generateIBAN("TR", { bank: "0062" })) // { code: "0062", name: "T. GARANTİ BANKASI A.Ş." }`;

const seedCode = `// prisma/seed.ts — "use client" yok, Node'da çalışır
import { generateIBAN, generateTCKN } from "@virastack/mask/testing"

const customers = Array.from({ length: 50 }, (_, i) => ({
  name: \`Müşteri \${i + 1}\`,
  tckn: generateTCKN({ seed: i }),
  iban: generateIBAN("TR", { seed: i }),
}))
// her çalıştırmada aynı 50 müşteri; snapshot ve ekran görüntüleri değişmez`;

const testCode = `import { generateTCKN } from "@virastack/mask/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

it("geçerli TCKN'yi kabul eder", async () => {
  render(<SignupForm />)
  await userEvent.type(screen.getByLabelText("TCKN"), generateTCKN({ seed: 7 }))
  await userEvent.click(screen.getByRole("button", { name: "Devam" }))
  expect(screen.queryByText("Geçersiz TCKN")).toBeNull()
})`;

export function MaskTestingDoc() {
  return (
    <>
      <DocsPageHeader
        title="Test verisi"
        description="@virastack/mask/testing ile test ve seed verisi için geçerli TCKN ve IBAN üret (2.3+)."
      />
      <DocsProse>
        <h2 id="giris">Test girişi</h2>
        <p>
          <strong>Yalnızca test ve seed verisi için.</strong> Üretilen değer algoritmaya uyduğu için
          gerçek bir kişiye ya da hesaba denk gelebilir. Gerçek veri olarak kullanma.
        </p>
        <p>
          Üreteçler ayrı bir girişte durur: <code>@virastack/mask/testing</code>. Kök ve{" "}
          <code>/server</code> girişleri bunları export etmez, bu yüzden üretim bundle&apos;ına
          girmezler. Girişte React ve <code>&quot;use client&quot;</code> yok: seed betiklerinde,
          test dosyalarında ve Server Component&apos;lerde çalışır. Boyutu yaklaşık 2 KB.
        </p>
        <DocsCodeBlock code={entryCode} lang="ts" />

        <h2 id="deneyin">Dene</h2>
        <p>
          Bir butona bas, değer ekranda görünsün. Seed verince değer sabit kalır; başka bir değer
          için seed&apos;i değiştir.
        </p>
        <MaskTestingDemo />

        <h2 id="tckn">generateTCKN</h2>
        <p>
          Dokuz hane seçer (ilki 1–9) ve 10. ile 11. haneyi <code>isValidTCKN</code> ile aynı
          kuralla hesaplar. Liste tutulmaz, her numara anında üretilir.
        </p>
        <DocsCodeBlock code={tcknCode} lang="ts" />

        <h2 id="iban">generateIBAN</h2>
        <p>
          IBAN&apos;ı boşluksuz döndürür, <code>iban</code> preset&apos;inin sakladığı gibi. Ülke
          varsayılan olarak <code>TR</code>.
        </p>
        <ul>
          <li>
            <strong>Türkiye:</strong> ulusal düzene uyar: <code>turkishBanks</code> listesinden
            banka kodu, rezerv hane <code>0</code> ve 16 haneli hesap numarası. <code>bank</code>{" "}
            dört haneli TCMB koduyla bankayı seçer; verilmezse banka rastgele seçilir.{" "}
            <code>getTurkishBank</code> üretilen her IBAN&apos;ın bankasını bulur.
          </li>
          <li>
            <strong>Diğer ülkeler:</strong> IBAN kaydındaki 89 ülkenin hepsi. Hesap kısmı kayıttaki
            uzunlukta ve yalnızca rakamdır. <code>isValidIBAN</code> kontrolünü (uzunluk ve mod-97)
            geçer, İngiltere banka kodundaki harfler gibi ulusal kuralları geçmez.
          </li>
          <li>
            Bilinmeyen ülke, bilinmeyen banka kodu ya da Türkiye dışında <code>bank</code> hata
            fırlatır; yazım hatası sessizce yanlış veri üretmez.
          </li>
        </ul>
        <DocsCodeBlock code={ibanCode} lang="ts" />

        <h2 id="seed">Seed ve testler</h2>
        <p>
          <code>seed</code> verilmezse her çağrı yeni değer verir. Tam sayı bir <code>seed</code>{" "}
          ile değer her çalıştırmada ve her platformda aynıdır; snapshot&apos;lar, seed verisi ve
          ekran görüntüleri değişmez. Seed yalnızca üretecin başlangıç değeridir, hiçbir kişiye ya
          da tabloya karşılık gelmez. Aynı seed TCKN ve IBAN için birbiriyle ilgisiz rakamlar verir.
        </p>
        <DocsCodeBlock code={seedCode} lang="ts" />
        <DocsCodeBlock code={testCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
