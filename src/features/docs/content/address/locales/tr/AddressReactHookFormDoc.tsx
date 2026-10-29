import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const basicCode = `"use client"

import { useForm } from "react-hook-form"
import { useViraAddress } from "@virastack/address"

type Values = {
  province: string
  district: string
  neighbourhood: string
  postalCode: string
}

export function AddressForm() {
  const form = useForm<Values>()
  const {
    getProvinceProps,
    getDistrictProps,
    getNeighbourhoodProps,
  } = useViraAddress({ form })

  return (
    <form onSubmit={form.handleSubmit(save)}>
      <select {...getProvinceProps()} />
      <select {...getDistrictProps()} />
      <select {...getNeighbourhoodProps()} />
      <button type="submit">Kaydet</button>
    </form>
  )
}`;

const namesCode = `type Values = {
  address: {
    il: string
    ilce: string
    mahalle: string
    postaKodu: string
    plaka: string
  }
}

const form = useForm<Values>()

useViraAddress({
  form,
  names: {
    province: "address.il",
    district: "address.ilce",
    neighbourhood: "address.mahalle",
    postalCode: "address.postaKodu",
    provinceCode: "address.plaka", // plaka kodu da yazılsın
  },
})

// "address.ilc" gibi bir yazım hatası derleme hatası verir.`;

const providerCode = `import { useFormContext } from "react-hook-form"

function AddressFields() {
  const address = useViraAddress({ form: useFormContext<Values>() })
  // ...
}`;

const editCode = `const form = useForm<Values>({
  defaultValues: {
    province: "İstanbul",
    district: "Fatih",
    neighbourhood: "Aksaray Mah.",
    postalCode: "34096",
  },
})

const address = useViraAddress({ form })
// address.value.district === "FATİH"
// mahalleler yüklenince address.value.neighbourhood === "AKSARAY MAH."`;

const zodCode = `import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  province: z.string().min(1, "İl seçin"),
  district: z.string().min(1, "İlçe seçin"),
  neighbourhood: z.string().min(1, "Mahalle seçin"),
  postalCode: z.string().regex(/^\\d{5}$/),
})

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    province: "",
    district: "",
    neighbourhood: "",
    postalCode: "",
  },
})
const address = useViraAddress({ form })

// form.formState.errors.district?.message`;

const formikCode = `import { useFormikContext } from "formik"

const { setFieldValue } = useFormikContext()

// form, setValue(name, value) taşıyan herhangi bir nesnedir.
const address = useViraAddress({
  form: { setValue: (name, value) => setFieldValue(name, value) },
})`;

const onChangeCode = `const address = useViraAddress({
  onChange: (value) => {
    form.setFieldValue("province", value.province ?? "")
    form.setFieldValue("district", value.district ?? "")
    form.setFieldValue("neighbourhood", value.neighbourhood ?? "")
    form.setFieldValue("postalCode", value.postalCode ?? "")
  },
})`;

export function AddressReactHookFormDoc() {
  return (
    <>
      <DocsPageHeader
        title="React Hook Form"
        description="form seçeneğiyle her seçim forma yazılır: varsayılan alan adları, names, FormProvider, düzenleme formu ve Zod."
      />
      <DocsProse>
        <h2 id="temel">Temel kullanım</h2>
        <p>
          <AcademyBadge kind="react-hook-form" />
          &#32;formunu <code>form</code>&#32;seçeneğiyle verin; alanlar kendiliğinden dolar:
        </p>
        <DocsCodeBlock code={basicCode} />
        <p>
          Bir üst seviye değişince alttakiler formda da <code>&quot;&quot;</code>&#32;olur. Değerler{" "}
          <code>shouldDirty</code>, <code>shouldTouch</code>&#32;ve <code>shouldValidate</code>
          &#32;ile yazılır; böylece zorunlu bir ilçe alanı, il değiştikten sonra geçerli kalamaz.
          Yeniden doğrulamayı kapatmak için <code>shouldValidate: false</code>&#32;verin.
        </p>
        <p>
          Hook React Hook Form&apos;dan hiçbir şey import etmez, bağımlılığı da değildir.{" "}
          <code>form</code>, <code>setValue(name, value, options)</code>&#32;ve doluyla başlamak
          için <code>getValues(name)</code>&#32;taşıyan herhangi bir nesnedir;{" "}
          <code>useForm()</code>&#32;sonucu olduğu gibi uyar.
        </p>

        <h2 id="names">names</h2>
        <p>
          Alanlar varsayılan olarak <code>province</code>, <code>district</code>,{" "}
          <code>neighbourhood</code>&#32;ve <code>postalCode</code>&apos;dur. Formunuz farklıysa{" "}
          <code>names</code>&#32;verin; TypeScript her adı formun tipine karşı kontrol eder:
        </p>
        <DocsCodeBlock code={namesCode} />
        <p>
          <code>provinceCode</code>&#32;yalnızca adı verilirse yazılır. Aynı adlar prop
          getter&apos;ların döndürdüğü <code>name</code>&#32;özniteliğine de gider; native bir form
          gönderimi de aynı alanları taşır.
        </p>

        <h2 id="form-provider">FormProvider</h2>
        <p>
          Adres alanlarını ayrı bir bileşene taşıdığınızda formu prop olarak geçirmek yerine
          bağlamdan alın:
        </p>
        <DocsCodeBlock code={providerCode} />

        <h2 id="duzenleme">Düzenleme formu</h2>
        <p>
          Hook formdaki adresle başlar; ayrıca <code>defaultValue</code>&#32;vermeniz gerekmez.
          Adlar büyük/küçük harf ve Türkçe karakter farkı gözetmeden eşleşir: veritabanından{" "}
          <code>&quot;Fatih&quot;</code>&#32;gelse de seçim doğru dolar.
        </p>
        <DocsCodeBlock code={editCode} />
        <p>
          Mahalleler yüklenip posta kodu dolduğunda form kirli (<code>isDirty</code>) işaretlenmez;
          bu bir düzenleme değildir. <code>isDirty</code>&#32;ancak kullanıcı bir şey seçince{" "}
          <code>true</code>&#32;olur.
        </p>
        <p>
          Hook formdaki adresi yalnızca ilk render&apos;da okur. Adresi sonradan{" "}
          <code>form.reset()</code>&#32;ile değiştirirseniz hook&apos;u yeni bir <code>key</code>
          &#32;ile yeniden başlatın.
        </p>

        <h2 id="zod">Zod ile doğrulama</h2>
        <DocsCodeBlock code={zodCode} />
        <p>
          <AcademyBadge kind="zod" />
          &#32;şeması olduğu gibi çalışır. İl değişince ilçe ve mahalle boşaltılıp yeniden
          doğrulandığı için hata mesajları doğru seviyede kalır. Yine de client doğrulaması tek
          başına yetmez: gönderilen adresi{" "}
          <Link href="/address/docs/server">sunucuda resolveAddress</Link>&#32;ile kontrol edin.
        </p>

        <h2 id="diger">Diğer form kütüphaneleri</h2>
        <p>
          <code>setValue</code>&#32;imzasına uyan küçük bir nesne her form kütüphanesini bağlar.{" "}
          <AcademyBadge kind="formik" />:
        </p>
        <DocsCodeBlock code={formikCode} />
        <p>
          Ya da yazma işini kendiniz yapın: <code>onChange</code>&#32;her değişiklikte tüm{" "}
          <code>value</code>&#32;ile çağrılır. <AcademyBadge kind="tanstack-form" />:
        </p>
        <DocsCodeBlock code={onChangeCode} />
        <p>
          Kütüphane kullanmayan bir form için <Link href="/address/docs/server">Server Action</Link>
          &#32;örneğine bakın.
        </p>
      </DocsProse>
    </>
  );
}
