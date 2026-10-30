import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskBankDemo } from "@/features/docs/components/MaskBankDemo";

const usageCode = `import { getTurkishBank, useViraMask } from "@virastack/mask"
import { useWatch } from "react-hook-form"

const { iban } = useViraMask(form, {
  iban: { preset: "iban", country: "TR" },
})
const bank = getTurkishBank(useWatch({ control: form.control, name: "iban" }))

<input {...iban} />
<p>{bank?.name}</p> // "T. GARANTİ BANKASI A.Ş."`;

const apiCode = `import { getTurkishBank, turkishBanks } from "@virastack/mask"

getTurkishBank("TR63 0006 2000 0000 0000 1234 56")
// { code: "0062", name: "T. GARANTİ BANKASI A.Ş." }

getTurkishBank("TR63 0006 2")   // banka hanesi yazılınca yeterli
getTurkishBank("tr630006200000000000123456") // boşluksuz, küçük harf
getTurkishBank("TR63 0006")     // null: banka kodu henüz tamamlanmadı
getTurkishBank("DE89 3704 0044 0532 0130 00") // null: TR değil

turkishBanks.length // 70`;

export function MaskBanksDoc() {
  return (
    <>
      <DocsPageHeader
        title="Banka tespiti"
        description="Türkiye IBAN'ından bankayı bul. API yok; banka, numaranın içindeki banka kodundan okunur."
      />
      <DocsProse>
        <h2 id="deneyin">Dene</h2>
        <p>
          Bir IBAN yaz; banka kodunun son hanesi girildiği anda banka görünür ve tabloda
          işaretlenir.
        </p>
        <MaskBankDemo />

        <h2 id="nasil">Nasıl çalışır</h2>
        <p>
          Türkiye IBAN&apos;ı 26 karakterdir: <code>TR</code>, 2 kontrol hanesi, 5 haneli banka
          kodu, 1 rezerv hane ve 16 haneli hesap numarası. Banka kodu, sıfırla başlayan TCMB
          katılımcı kodudur: <code>TR63 0006 2…</code>&#32;içindeki <code>00062</code>,{" "}
          <code>0062</code>
          &#32;koduyla Garanti BBVA&apos;dır. Bu yüzden ağa çıkmadan, tarayıcıda ve sunucuda aynı
          şekilde çalışır.
        </p>
        <p>
          Şube ve hesap sahibi IBAN&apos;dan anlaşılmaz; bunlar yalnızca bankaların kendi
          servisleriyle öğrenilebilir.
        </p>

        <h2 id="kullanim">Kullanım</h2>
        <DocsCodeBlock code={usageCode} />
        <DocsCodeBlock code={apiCode} lang="ts" />
        <p>
          <code>getTurkishBank</code>&#32;IBAN&apos;ın kendisini doğrulamaz; kontrol hanesi yanlış
          bir IBAN&apos;ın da bankasını söyler. Doğrulama için <code>iban</code>&#32;preset&apos;i
          ya da <code>isValidIBAN</code>&#32;kullan. İkisi de <code>@virastack/mask/server</code>
          &#32;içinde de vardır.
        </p>
        <p>
          Tablo düz bir dizidir: <code>getTurkishBank</code>&#32;ya da <code>turkishBanks</code>
          &#32;kullanmayan uygulamaların paketine girmez. Kullanıldığında yaklaşık 2 KB ekler.
        </p>

        <h2 id="kaynak">Kaynak</h2>
        <p>
          Liste,{" "}
          <a href="https://www.tcmb.gov.tr/" target="_blank" rel="noreferrer">
            Türkiye Cumhuriyet Merkez Bankası
          </a>
          &#32;tarafından yayımlanan Ödeme Sistemleri Katılımcıları tablosundan alınmıştır: 70
          katılımcı, son değişiklik 18.09.2026. Adlar TCMB&apos;nin yazdığı gibidir. Liste
          değiştiğinde paketin yeni bir sürümüyle güncellenir.
        </p>
      </DocsProse>
    </>
  );
}
