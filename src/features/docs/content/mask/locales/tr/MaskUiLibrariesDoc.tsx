import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AntDesignDarkTheme } from "@/components/ui/svgs/antDesignDarkTheme";
import { ChakraUi } from "@/components/ui/svgs/chakraUi";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";

const patternCode = `const { card } = useViraMask(form, { card: "card" })

// ekranda: "4111 1111 1111 1111"
// form.watch("card"): "4111111111111111"

return <input {...card} placeholder="0000 0000 0000 0000" />`;

const refCode = `// Kendi ref'in de lazımsa ikisini birleştir
const inputRef = useRef<HTMLInputElement>(null)

<Input
  {...card}
  ref={(el) => {
    card.ref(el)
    inputRef.current = el
  }}
/>`;

const shadcnCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"
import { Input } from "@/components/ui/input"

function Example() {
  const form = useForm<{ card: string }>()
  const { card } = useViraMask(form, { card: "card" })

  return <Input {...card} placeholder="0000 0000 0000 0000" />
}`;

const antDesignCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"
import { Input } from "antd"

function Example() {
  const form = useForm<{ card: string }>()
  const { card } = useViraMask(form, { card: "card" })

  return <Input {...card} placeholder="0000 0000 0000 0000" />
}`;

const chakraCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"
import { Input } from "@chakra-ui/react"

function Example() {
  const form = useForm<{ card: string }>()
  const { card } = useViraMask(form, { card: "card" })

  return <Input {...card} placeholder="0000 0000 0000 0000" />
}`;

export function MaskUiLibrariesDoc() {
  return (
    <>
      <DocsPageHeader
        title="UI kütüphaneleri"
        description="Mask bir UI paketi değildir. shadcn/ui, Ant Design, Chakra ve düz input ile aynı kalıp."
      />
      <DocsProse>
        <p>
          Dönen nesneyi input&apos;a yayın. Bileşen <code>ref</code>&apos;i gerçek{" "}
          <code>&lt;input&gt;</code>&apos;a iletmelidir (
          <AcademyBadge kind="react" label="React 19" />
          &apos;da prop olarak, <AcademyBadge kind="react" label="React 18" />
          &apos;de <code>forwardRef</code> ile). <code>value</code> verme; input kontrolsüzdür.
        </p>

        <h2 id="pattern">Ortak kalıp</h2>
        <DocsCodeBlock code={patternCode} lang="tsx" />
        <DocsCodeBlock code={refCode} lang="tsx" />

        <h2 id="shadcn" className="flex items-center gap-2.5">
          <ShadcnUi className="size-5 shrink-0 text-foreground" aria-hidden />
          shadcn/ui
        </h2>
        <p>
          Bu sitedeki canlı demolar da <AcademyBadge kind="shadcn" /> <code>Input</code> kullanır:
        </p>
        <ComponentPreview
          preview={<MaskFieldDemo config="card" placeholder="0000 0000 0000 0000" />}
          code={shadcnCode}
        >
          <DocsCodeBlock code={shadcnCode} lang="tsx" />
        </ComponentPreview>

        <h2 id="ant-design" className="flex items-center gap-2.5">
          <AntDesignDarkTheme className="size-5 shrink-0" aria-hidden />
          Ant Design
        </h2>
        <DocsCodeBlock code={antDesignCode} lang="tsx" />

        <h2 id="chakra" className="flex items-center gap-2.5">
          <ChakraUi className="size-5 shrink-0" aria-hidden />
          Chakra UI
        </h2>
        <DocsCodeBlock code={chakraCode} lang="tsx" />
      </DocsProse>
    </>
  );
}
