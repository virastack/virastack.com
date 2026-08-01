import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AntDesignDarkTheme } from "@/components/ui/svgs/antDesignDarkTheme";
import { ChakraUi } from "@/components/ui/svgs/chakraUi";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskPresetDemo } from "@/features/docs/components/MaskPresetDemo";

const patternCode = `const { card } = useViraMask({
  form,
  schema: {
    card: "card",
  },
})

// card.value → "4111 1111 1111 1111" (ekranda görünen)
// card.rawValue → "4111111111111111" (formdaki ham değer)

return <input {...card} placeholder="0000 0000 0000 0000" />`;

const shadcnCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"
import { Input } from "@/components/ui/input"

function Example() {
  const form = useForm<{ card: string }>()
  const { card } = useViraMask({
    form,
    schema: {
      card: "card",
    },
  })

  return <Input {...card} placeholder="0000 0000 0000 0000" />
}`;

const antDesignCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"
import { Input } from "antd"

function Example() {
  const form = useForm<{ card: string }>()
  const { card } = useViraMask({
    form,
    schema: {
      card: "card",
    },
  })

  return <Input {...card} placeholder="0000 0000 0000 0000" />
}`;

const chakraCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"
import { Input } from "@chakra-ui/react"

function Example() {
  const form = useForm<{ card: string }>()
  const { card } = useViraMask({
    form,
    schema: {
      card: "card",
    },
  })

  return <Input {...card} placeholder="0000 0000 0000 0000" />
}`;

export async function MaskUiLibrariesDoc() {
  return (
    <>
      <DocsPageHeader
        title="UI kütüphaneleri"
        description="Mask herhangi bir input bileşenine bağlanır. Aşağıdaki örnekler aynı hook API’sini kullanır."
      />
      <DocsProse>
        <p>
          <code>useViraMask()</code> alan props’larını döndürür. Input’a doğrudan spread edin;{" "}
          <code>card.value</code> formatlı görünümü, <code>card.rawValue</code> formdaki ham değeri
          verir.
        </p>

        <h2 id="pattern">Ortak pattern</h2>
        <DocsCodeBlock code={patternCode} lang="tsx" />

        <h2 id="shadcn" className="flex items-center gap-2.5">
          <ShadcnUi className="size-5 shrink-0 text-foreground" aria-hidden />
          shadcn/ui
        </h2>
        <p>
          Bu sitedeki canlı demolar da shadcn <code>Input</code> kullanır. Props doğrudan spread
          edilir:
        </p>
        <ComponentPreview
          preview={<MaskPresetDemo preset="card" placeholder="0000 0000 0000 0000" />}
          code={shadcnCode}
        >
          <DocsCodeBlock code={shadcnCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="ant-design" className="flex items-center gap-2.5">
          <AntDesignDarkTheme className="size-5 shrink-0" aria-hidden />
          Ant Design
        </h2>
        <p>
          <code>antd</code> <code>Input</code> native input props kabul eder. Aynı pattern:
        </p>
        <DocsCodeBlock code={antDesignCode} lang="tsx" />

        <h2 id="chakra" className="flex items-center gap-2.5">
          <ChakraUi className="size-5 shrink-0" aria-hidden />
          Chakra UI
        </h2>
        <p>
          Chakra <code>Input</code> de aynı şekilde çalışır:
        </p>
        <DocsCodeBlock code={chakraCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
