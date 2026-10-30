import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";

const registerCode = `const { inputProps, btnProps, rule } = useViraPassword({ policy, value: password })

// inputProps yalnızca öznitelik taşır: register()'dan önce ya da sonra spread et
<input {...inputProps} {...form.register("password", rule)} />
<button {...btnProps} />`;

const valueCode = `const password = useWatch({ control: form.control, name: "password" })
const { inputProps, strength } = useViraPassword({ policy, value: password })`;

const depsCode = `form.register("password", { ...rule, deps: ["confirm"] })

// deps yalnızca kullanıcı girişinde çalışır. setValue'dan sonra tekrar alanını sen kontrol et:
form.setValue("password", next)
form.trigger("confirm")`;

const controllerCode = `<Controller
  control={form.control}
  name="password"
  render={({ field }) => <PasswordField field={field} />}
/>

function PasswordField({ field }: { field: ControllerRenderProps<Values, "password"> }) {
  const { inputProps } = useViraPassword({
    policy,
    value: field.value,
    inputProps: { ...field, onChange: (e) => field.onChange(e.target.value) },
  })
  return <input {...inputProps} />
}`;

export function PasswordReactHookFormDoc() {
  return (
    <>
      <DocsPageHeader
        title="React Hook Form"
        description="Hook'u register, Controller, Zod ve ViraStack Mask ile aynı formda kullan."
      />
      <DocsProse>
        <p>
          <AcademyBadge kind="react-hook-form" />
          &#32;tek doğruluk kaynağı olarak kalır. Hook yalnızca input&apos;a props ekler; form
          değerini hiçbir zaman tutmaz.
        </p>

        <h2 id="register">register()</h2>
        <DocsCodeBlock code={registerCode} lang="tsx" />

        <h2 id="value">useWatch()</h2>
        <p>
          <code>reset()</code> ve <code>setValue()</code>&#32;input olayı tetiklemeden değeri
          değiştirir. Güç ve <code>matches</code> bunları takip etsin diye <code>value</code> ver.{" "}
          <code>useWatch</code>, <code>watch()</code>&apos;tan farklı olarak React Compiler ile de
          çalışır.
        </p>
        <DocsCodeBlock code={valueCode} lang="tsx" />

        <h2 id="rule">rule & deps</h2>
        <p>
          <code>rule</code> ilk hata anahtarını döndürür. <code>deps</code>, parola değişince tekrar
          alanını yeniden doğrular.
        </p>
        <DocsCodeBlock code={depsCode} lang="tsx" />

        <p>
          Forma <code>method=&quot;post&quot;</code>&#32;ver. Hydration&apos;dan önce form yerel
          olarak gönderilir ve varsayılan GET parolayı URL&apos;ye yazar.
        </p>

        <h2 id="controller">Controller</h2>
        <DocsCodeBlock code={controllerCode} lang="tsx" />

        <h2 id="zod">Zod resolver</h2>
        <p>
          Resolver varken <code>register</code> kuralları çalışmaz. Aynı politikayı{" "}
          <code>evaluate</code> ile <AcademyBadge kind="zod" />
          &#32;şemasına koy:
        </p>
        <PasswordExamplePreview id="react-hook-form-zod" />

        <h2 id="mask">Mask ile</h2>
        <p>
          <GuideProductMark id="mask" linked={false}>
            Mask
          </GuideProductMark>{" "}
          v2 de değeri React Hook Form&apos;da tutar; ikisi aynı <code>useForm</code>&apos;u
          paylaşır. Farklı input&apos;larda kullan, asla aynı input&apos;ta değil.
        </p>
        <PasswordExamplePreview id="mask-signup" />
      </DocsProse>
    </>
  );
}
