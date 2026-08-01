import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

export function MaskIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Introduction"
        description="A lightweight input formatting library that works in sync with React Hook Form."
      />
      <DocsProse>
        <p>
          It provides a single <code>useViraMask()</code> hook for card numbers, phone, IBAN,
          currency, and custom masks. While the form state holds raw (unmasked) values, the input
          shows a formatted display.
        </p>

        <h2 id="baslarken">Getting started</h2>
        <p>
          Install the package. For live mask examples, see the{" "}
          <Link href="/mask/docs/examples">examples</Link> page.
        </p>

        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/mask")} />

        <h2 id="peer">Peer dependencies</h2>
        <ul>
          <li>
            <code>react</code> ≥ 18.2
          </li>
          <li>
            <code>react-dom</code> ≥ 18.2
          </li>
          <li>
            <code>react-hook-form</code> ≥ 7
          </li>
        </ul>
        <p>
          Also selectable during{" "}
          <GuideProductMark id="start" linked={false}>
            Start
          </GuideProductMark>{" "}
          CLI setup.
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
            <strong>Lightweight</strong>: zero runtime dependencies; React and React Hook Form as
            peers.
          </li>
          <li>
            <strong>RHF-first</strong>: integrates with register / setValue; display and raw values
            are separate.
          </li>
          <li>
            <strong>Type-safe</strong>: field names in the schema match TypeScript types.
          </li>
          <li>
            <strong>Smart presets</strong>: card (Visa, Mastercard, Amex, Troy), CVV, TCKN, IBAN,
            currency, and more.
          </li>
        </ul>

        <h2 id="kapsam">Scope</h2>
        <p>This documentation covers the full package surface:</p>
        <ul>
          <li>
            <Link href="/mask/docs/use-vira-mask">useViraMask()</Link> and the schema model
          </li>
          <li>
            <Link href="/mask/docs/custom-mask">Custom mask</Link> syntax and{" "}
            <code>resolveMask</code>
          </li>
          <li>
            <Link href="/mask/docs/validation">Validation</Link> and{" "}
            <Link href="/mask/docs/helpers">helpers</Link>
          </li>
          <li>
            <Link href="/mask/docs/types">Types</Link> reference
          </li>
          <li>
            <Link href="/mask/docs/examples">Examples</Link> for every preset
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
