import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCreditCardDemo } from "@/features/docs/components/MaskCreditCardDemo";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

const quickStartCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Checkout() {
  const form = useForm<{ card: string; expiry: string; cvv: string }>()

  const { card, expiry, cvv } = useViraMask(form, {
    card: "card",
    expiry: "expiry",
    cvv: { preset: "cvv", from: "card" },
  })

  return (
    <form onSubmit={form.handleSubmit(console.log)}>
      <input {...card} />
      <input {...expiry} />
      <input {...cvv} />
    </form>
  )
}
// form.watch("card") → "4111111111111111"`;

export function MaskIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Introduction"
        description="Zero-config input masks for React Hook Form, with Turkish validators, type safety and server support."
      />
      <DocsProse>
        <p>
          The form keeps the raw value (<code>5551234567</code>); the input shows the mask (
          <code>(555) 123 45 67</code>). <code>register</code> rules, <code>reset</code>,{" "}
          <code>setValue</code>, <code>watch</code> and resolvers keep working.
        </p>

        <h2 id="baslarken">Getting started</h2>
        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/mask")} />
        <ComponentPreview preview={<MaskCreditCardDemo />} code={quickStartCode}>
          <DocsCodeBlock code={quickStartCode} lang="tsx" />
        </ComponentPreview>
        <p>
          Try every preset on the <Link href="/mask/examples">examples</Link> page. On v1? Read the{" "}
          <Link href="/mask/docs/upgrade">upgrade guide</Link>.
        </p>

        <h2 id="peer">Peer dependencies</h2>
        <ul>
          <li>
            <code>react</code> ≥ 18.2 (<AcademyBadge kind="react" label="React 19" /> recommended)
          </li>
          <li>
            <code>react-hook-form</code> ≥ 7.55
          </li>
        </ul>
        <p>
          No runtime dependencies. The whole package is ~8 KB (min + brotli).{" "}
          <GuideProductMark id="start" linked={false}>
            Start
          </GuideProductMark>{" "}
          CLI can add it for you.
        </p>

        <h2 id="neden">
          Why{" "}
          <GuideProductMark id="mask" linked={false} tone="heading">
            Mask
          </GuideProductMark>
          ?
        </h2>
        <ul>
          <li>
            <strong>
              Built for <AcademyBadge kind="react-hook-form" />
            </strong>
            : the form is the single source of truth; the hook keeps no value state.
          </li>
          <li>
            <strong>Turkey ready</strong>: TCKN, VKN, Turkish IBAN and phone, and TRY that keeps
            kuruş.
          </li>
          <li>
            <strong>Type-safe</strong>: field names, <code>from</code> and rules are checked against
            your form type; a typo is a compile error.
          </li>
          <li>
            <strong>On the server too</strong>: the same schema parses and validates in a Server
            Action with <code>@virastack/mask/server</code>.
          </li>
          <li>
            <strong>Stays out of the way</strong>: not a UI package; works with{" "}
            <AcademyBadge kind="shadcn" />, Radix or a plain input.
          </li>
        </ul>

        <h2 id="karsilastirma">Comparison</h2>
        <p>
          It doesn&apos;t compete with imask or Maskito on engine power; the difference is{" "}
          <AcademyBadge kind="react-hook-form" />, Turkey and the server. ✅ yes, ➖ partial or
          manual, ❌ no. Checked against imask.js.org and maskito.dev in October 2026.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Mask v2</th>
                <th>react-imask</th>
                <th>Maskito</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Designed for React Hook Form (register rules, reset, setValue)</td>
                <td>✅</td>
                <td>➖</td>
                <td>➖</td>
              </tr>
              <tr>
                <td>Pattern masks, custom tokens, optional parts, dynamic masks</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Number and date (min/max)</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Card type detection and Luhn</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>TCKN, VKN, Turkish IBAN validation</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Parsing and validation on the server</td>
                <td>✅</td>
                <td>➖</td>
                <td>➖</td>
              </tr>
              <tr>
                <td>Vue, Angular</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Range, Enum, Pipe blocks</td>
                <td>❌</td>
                <td>✅</td>
                <td>➖</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="kapsam">Scope</h2>
        <ul>
          <li>
            <Link href="/mask/docs/use-vira-mask">useViraMask()</Link>: schema, linked fields and
            React Hook Form compatibility
          </li>
          <li>
            <Link href="/mask/docs/custom-mask">Custom mask</Link>: pattern syntax, number,
            currency, date and <code>definePreset</code>
          </li>
          <li>
            <Link href="/mask/docs/validation">Validation</Link> and the{" "}
            <Link href="/mask/docs/server">server</Link>
          </li>
          <li>
            <Link href="/mask/docs/helpers">Helpers</Link> and{" "}
            <Link href="/mask/docs/types">types</Link>
          </li>
          <li>
            <Link href="/mask/examples">Examples</Link> for every preset
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
