import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const coreCode = `import { getButtonAriaAttributes, getInputAriaAttributes, getInputType } from "@virastack/password"

getInputType(true) // "text"
getButtonAriaAttributes(false, "pw", "Show password")
// { "aria-label": "Show password", "aria-pressed": false, "aria-controls": "pw", type: "button" }
getInputAriaAttributes(true, "pw-hint") // { "aria-invalid": true, "aria-describedby": "pw-hint" }`;

const iconsCode = `import { EyeIcon, EyeOffIcon } from "@virastack/password"

<EyeIcon width={20} className="text-muted-foreground" />`;

const mergeCode = `import { mergeProps } from "@virastack/password"

<input {...mergeProps(pw.inputProps, form.register("password", pw.rule))} />
// on* handlers: both run, the first argument first
// className, aria-describedby: joined
// ref: composed
// anything else: the later value wins`;

const refsCode = `import { composeRefs } from "@virastack/password"

<input ref={composeRefs(localRef, field.ref)} />
// supports object refs, callback refs and React 19 ref cleanups`;

export function PasswordHelpersDoc() {
  return (
    <>
      <DocsPageHeader
        title="Helpers"
        description="mergeProps, composeRefs, core helpers and the default icons."
      />
      <DocsProse>
        <h2 id="core">Core helpers</h2>
        <DocsCodeBlock code={coreCode} lang="tsx" />

        <h2 id="icons">Icons</h2>
        <DocsCodeBlock code={iconsCode} lang="tsx" />

        <h2 id="merge">mergeProps</h2>
        <DocsCodeBlock code={mergeCode} lang="tsx" />

        <h2 id="refs">composeRefs</h2>
        <DocsCodeBlock code={refsCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
