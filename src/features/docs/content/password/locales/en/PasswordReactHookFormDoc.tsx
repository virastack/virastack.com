import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";

const registerCode = `const { inputProps, btnProps, rule } = useViraPassword({ policy, value: password })

// inputProps holds attributes only: spread it before or after register()
<input {...inputProps} {...form.register("password", rule)} />
<button {...btnProps} />`;

const valueCode = `const password = useWatch({ control: form.control, name: "password" })
const { inputProps, strength } = useViraPassword({ policy, value: password })`;

const depsCode = `form.register("password", { ...rule, deps: ["confirm"] })

// deps only runs on user input. After setValue, check the confirm field yourself:
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
        description="Use the hook with register, Controller, Zod and ViraStack Mask in one form."
      />
      <DocsProse>
        <p>
          <AcademyBadge kind="react-hook-form" />
          &#32;stays the single source of truth. The hook only adds props to the input; it never
          holds the form value.
        </p>

        <h2 id="register">register()</h2>
        <DocsCodeBlock code={registerCode} lang="tsx" />

        <h2 id="value">useWatch()</h2>
        <p>
          <code>reset()</code> and <code>setValue()</code>&#32;change the input without an input
          event. Pass <code>value</code> so strength and <code>matches</code> follow them.{" "}
          <code>useWatch</code> also works with the React Compiler, unlike <code>watch()</code>.
        </p>
        <DocsCodeBlock code={valueCode} lang="tsx" />

        <h2 id="rule">rule & deps</h2>
        <p>
          <code>rule</code> returns the first error key. <code>deps</code>&#32;re-validates the
          confirm field when the password changes.
        </p>
        <DocsCodeBlock code={depsCode} lang="tsx" />

        <p>
          Give the form <code>method=&quot;post&quot;</code>. Before hydration a form submits
          natively, and the default GET puts the password in the URL.
        </p>

        <h2 id="controller">Controller</h2>
        <DocsCodeBlock code={controllerCode} lang="tsx" />

        <h2 id="zod">Zod resolver</h2>
        <p>
          With a resolver, <code>register</code> rules don&apos;t run. Put the same policy into the{" "}
          <AcademyBadge kind="zod" /> schema with <code>evaluate</code>:
        </p>
        <PasswordExamplePreview id="react-hook-form-zod" />

        <h2 id="mask">With Mask</h2>
        <p>
          <GuideProductMark id="mask" linked={false}>
            Mask
          </GuideProductMark>{" "}
          v2 also keeps the value in React Hook Form, so both share one <code>useForm</code>. Use
          them on different inputs, never on the same one.
        </p>
        <PasswordExamplePreview id="mask-signup" />
      </DocsProse>
    </>
  );
}
