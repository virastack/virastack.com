import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AntDesignDarkTheme } from "@/components/ui/svgs/antDesignDarkTheme";
import { ChakraUi } from "@/components/ui/svgs/chakraUi";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";

const patternCode = `const { inputProps, btnProps } = useViraPassword({
  inputProps: { className: "pr-10" },
  btnProps: { className: "absolute inset-y-0 right-2 my-auto" },
})

return (
  <div className="relative">
    <input {...inputProps} placeholder="Your password" />
    <button {...btnProps} />
  </div>
)`;

const shadcnCode = `import { useViraPassword } from "@virastack/password"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function Example() {
  const { inputProps, btnProps } = useViraPassword({
    inputProps: { className: "pr-10" },
  })

  const { children, ...restBtn } = btnProps

  return (
    <div className="relative">
      <Input {...inputProps} placeholder="Your password" />
      <Button variant="ghost" size="icon-sm" {...restBtn} className="absolute inset-y-0 right-1 my-auto">
        {children}
      </Button>
    </div>
  )
}`;

const antDesignCode = `import { useViraPassword } from "@virastack/password"
import { Input, Button } from "antd"

function Example() {
  const { inputProps, btnProps } = useViraPassword()
  const { children, ...restBtn } = btnProps

  return (
    <div style={{ position: "relative" }}>
      <Input {...inputProps} placeholder="Your password" />
      <Button {...restBtn} type="text" style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)" }}>
        {children}
      </Button>
    </div>
  )
}`;

const chakraCode = `import { useViraPassword } from "@virastack/password"
import { Input, IconButton, Box } from "@chakra-ui/react"

function Example() {
  const { inputProps, btnProps } = useViraPassword()
  const { children, ...restBtn } = btnProps

  return (
    <Box position="relative">
      <Input {...inputProps} placeholder="Your password" pe="10" />
      <IconButton
        {...restBtn}
        aria-label={restBtn["aria-label"] ?? "Toggle password visibility"}
        position="absolute"
        right="2"
        top="50%"
        transform="translateY(-50%)"
        variant="ghost"
        size="sm"
      >
        {children}
      </IconButton>
    </Box>
  )
}`;

export async function PasswordUiLibrariesDoc() {
  return (
    <>
      <DocsPageHeader
        title="UI libraries"
        description="Password attaches to any input / button component. The examples below use the same hook API."
      />
      <DocsProse>
        <p>
          <code>useViraPassword()</code> returns prop bags. Spread them onto input and button; the
          icon lives in <code>btnProps.children</code>.
        </p>
        <p>
          The package only manages visibility logic and accessible props; markup and styling are
          yours. shadcn/Tailwind, Ant Design (its own CSS + <code>style</code>/
          <code>className</code>), or Chakra (style props). The same hook works with every UI kit.
        </p>

        <h2 id="pattern">Common pattern</h2>
        <DocsCodeBlock code={patternCode} lang="tsx" />

        <h2 id="shadcn" className="flex items-center gap-2.5">
          <ShadcnUi className="size-5 shrink-0 text-foreground" aria-hidden />
          shadcn/ui
        </h2>
        <p>
          Live demos on this site also use shadcn <code>Input</code> + <code>Button</code>:
        </p>
        <ComponentPreview preview={<PasswordDemo variant="basic" />} code={shadcnCode}>
          <DocsCodeBlock code={shadcnCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="ant-design" className="flex items-center gap-2.5">
          <AntDesignDarkTheme className="size-5 shrink-0" aria-hidden />
          Ant Design
        </h2>
        <p>
          <code>antd</code> accepts native props. Same pattern:
        </p>
        <DocsCodeBlock code={antDesignCode} lang="tsx" />

        <h2 id="chakra" className="flex items-center gap-2.5">
          <ChakraUi className="size-5 shrink-0" aria-hidden />
          Chakra UI
        </h2>
        <p>
          Works with Chakra <code>Input</code> / <code>IconButton</code> too:
        </p>
        <DocsCodeBlock code={chakraCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
