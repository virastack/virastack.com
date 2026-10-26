import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

const entries: [string, string, string][] = [
  ["@virastack/password", "useViraPassword, mergeProps, composeRefs, icons", "client"],
  ["@virastack/password/strength", "definePolicy, evaluate, normalizePassword", "client + server"],
  ["@virastack/password/server", "validatePassword (+ the strength exports)", "server"],
  ["@virastack/password/pwned", "checkPwned", "server (recommended)"],
];

export function PasswordIntroductionDoc() {
  return (
    <>
      <DocsPageHeader
        title="Introduction"
        description="Headless password hook for React: show/hide, strength, confirmation, server validation and leaked password checks."
      />
      <DocsProse>
        <p>
          Password fields are easy to get wrong: missing ARIA, a toggle that submits the form, a
          password manager that sees a text field, rules that differ between the form and the
          server. <code>useViraPassword()</code> handles this in one hook. Markup and styling stay
          yours.
        </p>
        <PasswordExamplePreview id="show-hide" />

        <h2 id="baslarken">Getting started</h2>
        <CodeBlockCommand {...convertNpmCommand("npm install @virastack/password")} />
        <p>
          Coming from 1.0? Nothing breaks; see the{" "}
          <Link href="/password/docs/upgrade">upgrade guide</Link>. Live demos are on the{" "}
          <Link href="/password/examples">examples</Link> page.
        </p>

        <h2 id="giris-noktalari">Entry points</h2>
        <p>
          Only the root entry has <code>&quot;use client&quot;</code>. The strength engine ships
          only when you pass a policy.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Import</th>
                <th>Exports</th>
                <th>Runs on</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([entry, exports, runs]) => (
                <tr key={entry}>
                  <td>
                    <code>{entry}</code>
                  </td>
                  <td>{exports}</td>
                  <td>{runs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="peer">Requirements</h2>
        <ul>
          <li>
            <AcademyBadge kind="react" label="React 18.2+" /> and <code>react-dom</code> (React 19
            supported)
          </li>
          <li>No runtime dependencies</li>
          <li>
            <AcademyBadge kind="react-hook-form" /> is optional; any form library or none works.
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
            <strong>Headless</strong>: every returned value is a valid input or button prop.
          </li>
          <li>
            <strong>Radix-level details</strong>: hides on submit, focus returns after a click,
            controlled <code>visible</code>, Caps Lock, <code>autoComplete</code>.
          </li>
          <li>
            <strong>NIST-style strength</strong>: length first (15–64), common passwords, repeats
            and personal info. No composition rules by default.
          </li>
          <li>
            <strong>Same rules on the server</strong>: one policy object for the form and the Server
            Action.
          </li>
          <li>
            <strong>Error keys</strong>: <code>password.tooShort</code>,{" "}
            <code>password.mismatch</code>… Messages and i18n stay yours.
          </li>
        </ul>

        <h2 id="kapsam">Scope</h2>
        <ul>
          <li>
            <Link href="/password/docs/use-vira-password">useViraPassword()</Link>,{" "}
            <Link href="/password/docs/strength">strength</Link> and{" "}
            <Link href="/password/docs/confirm">confirm password</Link>
          </li>
          <li>
            <Link href="/password/docs/react-hook-form">React Hook Form</Link>,{" "}
            <Link href="/password/docs/server">server validation</Link> and{" "}
            <Link href="/password/docs/pwned">leaked passwords</Link>
          </li>
          <li>
            <Link href="/password/docs/accessibility">Accessibility</Link>,{" "}
            <Link href="/password/docs/customization">customization</Link> and{" "}
            <Link href="/password/docs/comparison">comparison</Link>
          </li>
        </ul>
        <p>
          Not included: a strength bar or password generator component, passkeys, clipboard
          clearing.
        </p>
      </DocsProse>
    </>
  );
}
