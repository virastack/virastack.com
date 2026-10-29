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
      <button type="submit">Save</button>
    </form>
  )
}`;

const namesCode = `type Values = {
  shipping: {
    city: string
    district: string
    neighbourhood: string
    zip: string
    plate: string
  }
}

const form = useForm<Values>()

useViraAddress({
  form,
  names: {
    province: "shipping.city",
    district: "shipping.district",
    neighbourhood: "shipping.neighbourhood",
    postalCode: "shipping.zip",
    provinceCode: "shipping.plate", // also store the plate code
  },
})

// A typo such as "shipping.zp" is a type error.`;

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
// once loaded: address.value.neighbourhood === "AKSARAY MAH."`;

const zodCode = `import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  province: z.string().min(1, "Pick a province"),
  district: z.string().min(1, "Pick a district"),
  neighbourhood: z.string().min(1, "Pick a neighbourhood"),
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

// form is any object with setValue(name, value).
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
        description="Pass a form and every pick is written into it: default field names, names, FormProvider, edit forms and Zod."
      />
      <DocsProse>
        <h2 id="temel">Basic usage</h2>
        <p>
          Hand your <AcademyBadge kind="react-hook-form" />
          &#32;form to the hook through the <code>form</code>&#32;option, and the fields fill
          themselves:
        </p>
        <DocsCodeBlock code={basicCode} />
        <p>
          When a higher level changes, the levels below it become <code>&quot;&quot;</code>&#32;in
          the form too. Values are written with <code>shouldDirty</code>, <code>shouldTouch</code>
          &#32;and <code>shouldValidate</code>, so a required district cannot stay valid after the
          province changes. Pass <code>shouldValidate: false</code>
          &#32;to skip the revalidation.
        </p>
        <p>
          The hook imports nothing from React Hook Form and does not depend on it. <code>form</code>
          &#32;is any object with <code>setValue(name, value, options)</code>, plus{" "}
          <code>getValues(name)</code>&#32;if it should start filled and <code>subscribe</code>
          &#32;if it should follow <code>reset()</code>; the result of <code>useForm()</code>
          &#32;fits as it is.
        </p>

        <h2 id="names">names</h2>
        <p>
          The fields default to <code>province</code>, <code>district</code>,{" "}
          <code>neighbourhood</code>&#32;and <code>postalCode</code>. If your form is shaped
          differently, pass <code>names</code>; TypeScript checks each one against the form&apos;s
          type:
        </p>
        <DocsCodeBlock code={namesCode} />
        <p>
          <code>provinceCode</code>&#32;is only written when you name it. The same names go on the
          inputs the prop getters return, so a native form submit sends the same fields.
        </p>

        <h2 id="form-provider">FormProvider</h2>
        <p>
          When the address fields live in their own component, take the form from context instead of
          passing it down:
        </p>
        <DocsCodeBlock code={providerCode} />

        <h2 id="duzenleme">Edit forms</h2>
        <p>
          The hook starts from the address already in the form, so there is no separate{" "}
          <code>defaultValue</code>&#32;to keep in sync. Names match regardless of case and Turkish
          characters: a database value like <code>&quot;Fatih&quot;</code>&#32;still finds{" "}
          <code>FATİH</code>.
        </p>
        <DocsCodeBlock code={editCode} />
        <p>
          Filling in the postal code once the neighbourhoods load is not an edit, so the form is not
          marked dirty. <code>isDirty</code>&#32;only turns <code>true</code>&#32;when the user
          picks something.
        </p>
        <p>
          Data that arrives later works too: <code>form.reset(data)</code>, the <code>values</code>
          &#32;option of <code>useForm()</code>&#32;and <code>setValue()</code>&#32;on a level all
          move the selects, and the form stays pristine. <code>form.reset()</code>&#32;to empty
          values clears the address as well, so you never call <code>address.reset()</code>
          &#32;alongside it. A level the new province or district does not have is dropped in the
          form too.
        </p>

        <h2 id="zod">Validation with Zod</h2>
        <DocsCodeBlock code={zodCode} />
        <p>
          A <AcademyBadge kind="zod" />
          &#32;schema works as it is. Because the district and neighbourhood are cleared and
          revalidated when the province changes, error messages stay on the right level. Client
          validation alone is not enough, though: check the submitted address{" "}
          <Link href="/address/docs/server">on the server with resolveAddress</Link>.
        </p>

        <h2 id="diger">Other form libraries</h2>
        <p>
          A small object that matches the <code>setValue</code>&#32;signature connects any form
          library. <AcademyBadge kind="formik" />:
        </p>
        <DocsCodeBlock code={formikCode} />
        <p>
          Or do the writing yourself: <code>onChange</code>&#32;is called with the whole{" "}
          <code>value</code>&#32;on every change. <AcademyBadge kind="tanstack-form" />:
        </p>
        <DocsCodeBlock code={onChangeCode} />
        <p>
          For a form without a library, see the{" "}
          <Link href="/address/docs/server">Server Action</Link>&#32;example.
        </p>
      </DocsProse>
    </>
  );
}
