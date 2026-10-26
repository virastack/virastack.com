import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AntDesignDarkTheme } from "@/components/ui/svgs/antDesignDarkTheme";
import { ChakraUi } from "@/components/ui/svgs/chakraUi";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";

const patternCode = `const { card } = useViraMask(form, { card: "card" })

// on screen: "4111 1111 1111 1111"
// form.watch("card"): "4111111111111111"

return <input {...card} placeholder="0000 0000 0000 0000" />`;

const refCode = `// Need your own ref too? Call both
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
        title="UI libraries"
        description="Mask is not a UI package. The same pattern works with shadcn/ui, Ant Design, Chakra and plain inputs."
      />
      <DocsProse>
        <p>
          Spread the returned object on the input. The component must pass <code>ref</code> to the
          real <code>&lt;input&gt;</code> (as a prop in{" "}
          <AcademyBadge kind="react" label="React 19" />, with <code>forwardRef</code> in
          <AcademyBadge kind="react" label="React 18" />
          ). Don&apos;t pass <code>value</code>; the input is uncontrolled.
        </p>

        <h2 id="pattern">Shared pattern</h2>
        <DocsCodeBlock code={patternCode} lang="tsx" />
        <DocsCodeBlock code={refCode} lang="tsx" />

        <h2 id="shadcn" className="flex items-center gap-2.5">
          <ShadcnUi className="size-5 shrink-0 text-foreground" aria-hidden />
          shadcn/ui
        </h2>
        <p>
          The live demos on this site use the <AcademyBadge kind="shadcn" /> <code>Input</code> too:
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
