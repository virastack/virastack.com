import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCreditCardDemo } from "@/features/docs/components/MaskCreditCardDemo";
import { StatusIcon } from "@/features/docs/components/StatusIcon";
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
        description="Zero-dependency input masks for React Hook Form, with Turkish validators, type safety and server support."
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
          <AcademyBadge kind="react-hook-form" />, Turkey and the server.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="[&_code]:whitespace-nowrap [&_td:not(:first-child)]:text-center [&_th:not(:first-child)]:text-center">
            <thead>
              <tr>
                <th>Feature</th>
                <th>
                  <GuideProductMark id="mask" linked={false}>
                    Mask
                  </GuideProductMark>
                </th>
                <th>react-imask</th>
                <th>Maskito</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Designed for React Hook Form (register rules, reset, setValue)</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
              </tr>
              <tr>
                <td>Pattern masks, custom tokens, optional parts, dynamic masks</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
              </tr>
              <tr>
                <td>Number and date (min/max)</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
              </tr>
              <tr>
                <td>Card type detection</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>Luhn algorithm</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>TCKN, VKN, Turkish IBAN validation</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="no" />
                </td>
              </tr>
              <tr>
                <td>Per-country phone formatting</td>
                <td>
                  <StatusIcon status="partial" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
              </tr>
              <tr>
                <td>Parsing and validation on the server</td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
              </tr>
              <tr>
                <td>Vue, Angular</td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
              </tr>
              <tr>
                <td>Range, Enum, Pipe blocks</td>
                <td>
                  <StatusIcon status="no" />
                </td>
                <td>
                  <StatusIcon status="yes" />
                </td>
                <td>
                  <StatusIcon status="partial" />
                </td>
              </tr>
              <tr>
                <td>Runtime dependencies</td>
                <td>-</td>
                <td>imask, prop-types</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Size (same form, min+gzip)</td>
                <td>
                  <code>8.3 KB</code>
                </td>
                <td>
                  <code>17.1 KB</code>
                </td>
                <td>
                  <code>10.6 KB</code>
                </td>
              </tr>
              <tr>
                <td>Latest release</td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>2.0.0</code>
                    <span className="text-xs text-muted-foreground">Oct 2026</span>
                  </span>
                </td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>7.6.1</code>
                    <span className="text-xs text-muted-foreground">May 2024</span>
                  </span>
                </td>
                <td>
                  <span className="flex flex-col items-center gap-1">
                    <code>5.6.1</code>
                    <span className="text-xs text-muted-foreground">Oct 2026</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          <StatusIcon status="yes" decorative /> yes · <StatusIcon status="partial" decorative />{" "}
          partial or manual · <StatusIcon status="no" decorative /> no. Checked on 29 October 2026
          against the npm packages (<code>@virastack/mask 2.0.0</code>,{" "}
          <code>react-imask 7.6.1</code>, <code>@maskito/react 5.6.1</code>).
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>How size was measured:</strong> The same form was written with each library:
          Turkish phone, card number, expiry, CVV, TRY amount and a date no later than today, with
          values written to React Hook Form. Each was built with esbuild in production mode,
          minified and tree-shaken. The number is the gzip size of the difference over the same form
          built without a mask library, so <AcademyBadge kind="react" /> and{" "}
          <AcademyBadge kind="react-hook-form" />, present on both sides, are not counted. Mask’s
          card preset also includes card type detection and the Luhn algorithm; the other two do
          not.
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
