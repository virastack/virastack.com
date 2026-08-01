import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

export function PasswordIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Introduction"
        description="Accessible, customizable password visibility toggle; a headless React hook."
      />
      <DocsProse>
        <p>
          Show/hide password fields are easy to get wrong: missing ARIA, buttons that submit forms,
          disabled sync issues, prop conflicts. <code>useViraPassword()</code> handles all of this
          in one hook. Markup and styling are up to you.
        </p>

        <h2 id="baslarken">Getting started</h2>
        <p>
          Install the package. For live demos, see the{" "}
          <Link href="/password/docs/examples">examples</Link> page.
        </p>

        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/password")} />

        <h2 id="peer">Peer dependencies</h2>
        <ul>
          <li>
            <code>react</code> ≥ 18.2
          </li>
          <li>
            <code>react-dom</code> ≥ 18.2
          </li>
        </ul>
        <p>
          Also selectable during{" "}
          <GuideProductMark id="start" linked={false}>
            Start
          </GuideProductMark>{" "}
          CLI setup (<code>npx virastack@latest --tools password</code>).
        </p>

        <h2 id="neden">
          Why{" "}
          <GuideProductMark id="password" linked={false} tone="heading">
            Password
          </GuideProductMark>
          ?
        </h2>
        <ul>
          <li>
            <strong>Accessibility</strong>: <code>aria-label</code>, <code>aria-pressed</code>,{" "}
            <code>aria-controls</code>, and <code>type=&quot;button&quot;</code> out of the box.
          </li>
          <li>
            <strong>Headless</strong>: prop bags only; same API with shadcn, Ant Design, or native
            inputs.
          </li>
          <li>
            <strong>Smart defaults</strong>: Eye / EyeOff SVG icons built in.
          </li>
          <li>
            <strong>Safe merge</strong>: <code>on*</code> handlers are chained,{" "}
            <code>className</code> is merged; <code>disabled</code> / <code>readOnly</code> lock the
            toggle.
          </li>
        </ul>

        <h2 id="kapsam">Scope</h2>
        <p>This documentation covers the full package surface:</p>
        <ul>
          <li>
            <Link href="/password/docs/use-vira-password">useViraPassword()</Link> API
          </li>
          <li>
            <Link href="/password/docs/accessibility">Accessibility</Link> and{" "}
            <Link href="/password/docs/customization">customization</Link>
          </li>
          <li>
            <Link href="/password/docs/helpers">Helpers</Link> and{" "}
            <Link href="/password/docs/types">types</Link>
          </li>
          <li>
            UI libraries and <Link href="/password/docs/examples">examples</Link>
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
