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
    <input {...inputProps} placeholder="Parolanız" />
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
      <Input {...inputProps} placeholder="Parolanız" />
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
      <Input {...inputProps} placeholder="Parolanız" />
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
      <Input {...inputProps} placeholder="Parolanız" pe="10" />
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
        title="UI kütüphaneleri"
        description="Password herhangi bir input / button bileşenine bağlanır. Aşağıdaki örnekler aynı hook API’sini kullanır."
      />
      <DocsProse>
        <p>
          <code>useViraPassword()</code> prop bag döndürür. Input ve butona doğrudan spread edin;
          ikon <code>btnProps.children</code> içindedir.
        </p>
        <p>
          Paket yalnızca görünürlük mantığını ve erişilebilir props’ları yönetir; markup ve stil
          size aittir. shadcn/Tailwind, Ant Design (kendi CSS’i + <code>style</code>/
          <code>className</code>) veya Chakra (style props) fark etmez; aynı hook her UI kitine
          bağlanır.
        </p>

        <h2 id="pattern">Ortak pattern</h2>
        <DocsCodeBlock code={patternCode} lang="tsx" />

        <h2 id="shadcn" className="flex items-center gap-2.5">
          <ShadcnUi className="size-5 shrink-0 text-foreground" aria-hidden />
          shadcn/ui
        </h2>
        <p>
          Bu sitedeki canlı demolar da shadcn <code>Input</code> + <code>Button</code> kullanır:
        </p>
        <ComponentPreview preview={<PasswordDemo variant="basic" />} code={shadcnCode}>
          <DocsCodeBlock code={shadcnCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="ant-design" className="flex items-center gap-2.5">
          <AntDesignDarkTheme className="size-5 shrink-0" aria-hidden />
          Ant Design
        </h2>
        <p>
          <code>antd</code> native props kabul eder. Aynı pattern:
        </p>
        <DocsCodeBlock code={antDesignCode} lang="tsx" />

        <h2 id="chakra" className="flex items-center gap-2.5">
          <ChakraUi className="size-5 shrink-0" aria-hidden />
          Chakra UI
        </h2>
        <p>
          Chakra <code>Input</code> / <code>IconButton</code> ile de çalışır:
        </p>
        <DocsCodeBlock code={chakraCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
