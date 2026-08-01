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

// card.value → "4111 1111 1111 1111" (display)
// card.rawValue → "4111111111111111" (raw form value)

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
        title="UI libraries"
        description="Mask attaches to any input component. The examples below use the same hook API."
      />
      <DocsProse>
        <p>
          <code>useViraMask()</code> returns field props. Spread them onto an input;{" "}
          <code>card.value</code> is the formatted display and <code>card.rawValue</code> is the raw
          form value.
        </p>

        <h2 id="pattern">Common pattern</h2>
        <DocsCodeBlock code={patternCode} lang="tsx" />

        <h2 id="shadcn" className="flex items-center gap-2.5">
          <ShadcnUi className="size-5 shrink-0 text-foreground" aria-hidden />
          shadcn/ui
        </h2>
        <p>
          Live demos on this site also use shadcn <code>Input</code>. Props are spread directly:
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
          <code>antd</code> <code>Input</code> accepts native input props. Same pattern:
        </p>
        <DocsCodeBlock code={antDesignCode} lang="tsx" />

        <h2 id="chakra" className="flex items-center gap-2.5">
          <ChakraUi className="size-5 shrink-0" aria-hidden />
          Chakra UI
        </h2>
        <p>
          Chakra <code>Input</code> works the same way:
        </p>
        <DocsCodeBlock code={chakraCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
