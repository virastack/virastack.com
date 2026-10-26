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
          disabled sync issues, prop conflicts. <code>useViraPassword()</code>&#32;handles all of
          this in one hook. Markup and styling are up to you.
        </p>

        <h2 id="baslarken">Getting started</h2>
        <p>
          Install the package. For live demos, see the{" "}
          <Link href="/password/examples">examples</Link>&#32;page.
        </p>

        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/password@1.0")} />

        <h2 id="peer">Peer dependencies</h2>
        <ul>
          <li>
            <code>react</code>&#32;≥ 18.2
          </li>
          <li>
            <code>react-dom</code>&#32;≥ 18.2
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
            <code>aria-controls</code>, and <code>type=&quot;button&quot;</code>&#32;out of the box.
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
            <code>className</code> is merged; <code>disabled</code> / <code>readOnly</code>&#32;lock
            the toggle.
          </li>
        </ul>

        <h2 id="kapsam">Scope</h2>
        <p>This documentation covers the full package surface:</p>
        <ul>
          <li>
            <Link href="/password/docs/v1/use-vira-password">useViraPassword()</Link>&#32;API
          </li>
          <li>
            <Link href="/password/docs/v1/accessibility">Accessibility</Link> and{" "}
            <Link href="/password/docs/v1/customization">customization</Link>
          </li>
          <li>
            <Link href="/password/docs/v1/helpers">Helpers</Link> and{" "}
            <Link href="/password/docs/v1/types">types</Link>
          </li>
          <li>
            UI libraries and <Link href="/password/examples">examples</Link>
          </li>
        </ul>
      </DocsProse>
    </>
  );
}
