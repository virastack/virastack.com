import type { ReactNode } from "react";

import { AddressDemo } from "@/components/shared/AddressDemo";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const inputCode = `"use client"

import { useViraAddress } from "@virastack/address"

export function AddressFields() {
  const {
    getProvinceProps,
    getDistrictProps,
    getNeighbourhoodProps,
    getPostalCodeInputProps,
    postalCodeStatus,
  } = useViraAddress()

  return (
    <>
      <input {...getPostalCodeInputProps()} />
      {postalCodeStatus === "unknown" && <p>Bu posta kodu bulunamadı.</p>}

      <select {...getProvinceProps()} />
      <select {...getDistrictProps()} />
      <select {...getNeighbourhoodProps()} />
    </>
  )
}`;

const setterCode = `const { setPostalCode, value } = useViraAddress()

await setPostalCode("34710") // "exact"
value
// { province: "İSTANBUL", district: "KADIKÖY",
//   neighbourhood: "CAFERAĞA MAH.", postalCode: "34710", ... }

await setPostalCode("34096") // "partial"
value
// { province: "İSTANBUL", district: "FATİH",
//   neighbourhood: null, postalCode: "34096", ... }

await setPostalCode("34999") // "unknown": adres değişmez
await setPostalCode(null)    // null: arama bırakılır, adres kalır`;

const shadcnCode = `import { Input } from "@/components/ui/input"

<Input
  {...address.getPostalCodeInputProps({ placeholder: "34710" })}
  aria-describedby="postal-code-hint"
/>`;

const statuses: [string, ReactNode][] = [
  ["exact", "Kodun altında tek mahalle var: il, ilçe ve mahalle doldu."],
  [
    "partial",
    <>
      İl ve ilçe doldu; mahalle listesi bu koda daraltıldı, mahalleyi kullanıcı seçer. Bu kodun
      altında zaten seçili bir mahalle varsa korunur.
    </>,
  ],
  [
    "unknown",
    <>
      Veri setinde böyle bir kod yok. Adres değişmez, input <code>aria-invalid</code>&#32;alır.
    </>,
  ],
  ["loading", "Kodun ili yükleniyor. Yalnızca o il okunur."],
  ["null", "Etkin bir arama yok: kod hiç yazılmadı ya da il veya ilçe elle değiştirildi."],
];

export function AddressPostalCodeDoc() {
  return (
    <>
      <DocsPageHeader
        title="Posta kodundan adres"
        description="Posta kodunu yazın, select'ler dolsun: tek mahalleli kodda üç seviye, ortak kodda il ve ilçe."
      />
      <DocsProse>
        <p>
          Adres, select&apos;lerden seçilmek yerine posta kodundan da doldurulabilir. Posta kodu
          input&apos;u ekleyin; kod yazılınca select&apos;ler kendiliğinden dolar. Mahalle seçilince
          de aynı input türetilen kodu gösterir, iki yön birlikte çalışır.
        </p>

        <h2 id="input">Posta kodu input&apos;u</h2>
        <ComponentPreview
          preview={<AddressDemo showValue />}
          previewClassName="max-w-2xl"
          code={inputCode}
        >
          <DocsCodeBlock code={inputCode} lang="tsx" />
        </ComponentPreview>
        <p>
          <code>getPostalCodeInputProps()</code>&#32;düz bir <code>&lt;input&gt;</code>&apos;a
          yayılır: <code>inputMode=&quot;numeric&quot;</code>,{" "}
          <code>autoComplete=&quot;postal-code&quot;</code>, <code>maxLength</code>&#32;5,{" "}
          <code>value</code>&#32;ve <code>onChange</code>. Rakam olmayan her şey atılır; arama beş
          rakam girilince yapılır. Daha az rakamla düzenlerken adres yerinde kalır.
        </p>
        <p>
          <code>names.postalCode</code>&#32;verdiyseniz input o adı taşır. Aynı formda gizli{" "}
          <code>getPostalCodeProps()</code>&#32;input&apos;unu ayrıca kullanmayın; ikisi aynı alanı
          gönderir.
        </p>

        <h2 id="kesinlik">Ne kadar kesin?</h2>
        <p>
          Her posta kodu tek bir ilçeye aittir ve ilk iki hanesi ilin plaka kodudur. Ama bir kod
          çoğu zaman birden çok mahalleyi kapsar: 2.777 kodun yalnızca 205&apos;inin altında tek
          mahalle vardır, Sakarya&apos;da <code>54100</code>&#32;ise 81 mahallenin ortak kodudur. Bu
          yüzden arama kodun kesin söyleyebildiği kadarını doldurur ve <code>postalCodeStatus</code>
          &#32;neyin bulunduğunu söyler:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>postalCodeStatus</th>
                <th>Ne oldu</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map(([name, description]) => (
                <tr key={name}>
                  <td>
                    <code>{name === "null" ? name : `"${name}"`}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Veri derlenirken her kodun tek ilçede kaldığı ve plaka koduyla başladığı kontrol edilir;
          bir güncelleme bunu bozarsa yayınlanmaz.
        </p>

        <h2 id="davranis">Davranış</h2>
        <ul>
          <li>
            İl veya ilçe elle seçilince arama bırakılır: mahalle listesi yeniden tamamlanır, input
            seçimden türetilen kodu gösterir.
          </li>
          <li>
            Daraltılmış listeden mahalle seçmek aramayı korur. Birden çok kodu olan bir mahallede{" "}
            <code>value.postalCode</code>&#32;kullanıcının yazdığı koddur, ilki değil.
          </li>
          <li>
            Kod yüklenirken başka bir seçim yapılırsa ya da yeni bir kod yazılırsa eski yanıt
            yenisinin üstüne yazılmaz.
          </li>
          <li>İl seçim için zaten yüklendiyse tekrar indirilmez; arama aynı veriyi kullanır.</li>
          <li>
            <code>form</code>&#32;verildiyse dolan her seviye forma <code>shouldDirty</code>&#32;ile
            yazılır; <code>&quot;partial&quot;</code>&#32;durumda mahalle boş, posta kodu dolu olur.{" "}
            <code>form.reset()</code>&#32;aramayı da bırakır.
          </li>
        </ul>

        <h2 id="set-postal-code">setPostalCode()</h2>
        <p>
          Input kullanmadan, örneğin kayıtlı bir adresten ya da konumdan gelen kodla aramayı
          kendiniz başlatın. Promise, bulunan durumla çözülür:
        </p>
        <DocsCodeBlock code={setterCode} lang="ts" />
        <p>
          Kodu metin olarak verin: <code>01040</code>&#32;sayı olarak <code>1040</code>&#32;olur ve
          baştaki sıfır geri getirilemez. Boşluklar atılır, <code>&quot;34 710&quot;</code>
          &#32;çalışır.
        </p>

        <h2 id="ui">UI kütüphaneleri</h2>
        <p>
          Prop&apos;lar standart input prop&apos;larıdır; <code>onChange</code>&#32;hem olayı hem
          düz değeri alır. shadcn/ui ve Ant Design&apos;ın <code>Input</code>&apos;u olduğu gibi
          kabul eder:
        </p>
        <DocsCodeBlock code={shadcnCode} lang="tsx" />

        <h2 id="sunucu">Sunucuda</h2>
        <p>
          Aynı arama sunucuda <code>resolvePostalCode</code>&#32;ile yapılır; gönderilen posta kodu
          da <code>resolveAddress</code>&#32;ile mahalleye karşı kontrol edilir. Bkz.{" "}
          <Link href="/address/docs/server">sunucu doğrulaması</Link>. React olmadan ham sonuç için{" "}
          <Link href="/address/docs/data">veri setindeki</Link>&#32;<code>findPostalCode</code>
          &#32;kullanılır.
        </p>
      </DocsProse>
    </>
  );
}
