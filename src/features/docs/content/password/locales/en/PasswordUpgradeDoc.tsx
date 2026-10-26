import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { Link } from "@/i18n/routing";

const installCode = `npm install @virastack/password@^1.1`;

const optOutCode = `useViraPassword({
  hideOnSubmit: false, // keep the 1.0 behavior on submit
  autoComplete: false, // leave autocomplete out, as in 1.0
  inputProps: { spellCheck: true }, // your inputProps still win
})`;

type Row = [string, string, string];

const defaultRows: Row[] = [
  ["Form submit / reset", "Visibility unchanged", "Hidden again (hideOnSubmit: false)"],
  [
    "autoComplete",
    "Not set",
    "current-password; new-password with policy or matchWith (autoComplete: false)",
  ],
  ["spellCheck, autoCorrect, autoCapitalize", "Not set", "Off (override in inputProps)"],
  [
    "Toggle clicked with a mouse",
    "Focus stays on the button",
    "Focus and caret return to the input",
  ],
  ["mergeProps: aria-describedby", "Later value wins", "Values are joined"],
  ["mergeProps: ref", "Later value wins", "Refs are composed"],
  ["inputProps.id", "aria-controls kept the hook's id", "aria-controls follows inputProps.id"],
];

export function PasswordUpgradeDoc() {
  return (
    <>
      <DocsPageHeader
        title="Upgrading from 1.0 to 1.1"
        description="1.1 adds features without breaking the hook. A few defaults changed; each can be turned off."
      />
      <DocsProse>
        <h2 id="ozet">Summary</h2>
        <DocsCodeBlock code={installCode} lang="bash" />
        <p>
          The hook&apos;s options and return value are the same; new fields are additions. The 1.0
          docs are <Link href="/password/docs/v1">archived</Link>.
        </p>

        <h2 id="varsayilanlar">New defaults</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Behavior</th>
                <th>1.0</th>
                <th>1.1 (how to turn off)</th>
              </tr>
            </thead>
            <tbody>
              {defaultRows.map(([behavior, before, after]) => (
                <tr key={behavior}>
                  <td>{behavior}</td>
                  <td>{before}</td>
                  <td>{after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DocsCodeBlock code={optOutCode} lang="tsx" />

        <h2 id="yeni">New features</h2>
        <ul>
          <li>
            Options: <code>visible</code>, <code>onVisibleChange</code>, <code>hideOnSubmit</code>,{" "}
            <code>hideOnBlur</code>, <code>autoComplete</code>, <code>policy</code>,{" "}
            <code>forbidden</code>, <code>matchWith</code>, <code>value</code>
          </li>
          <li>
            Return value: <code>capsLock</code>, <code>strength</code>, <code>strengthProps</code>,{" "}
            <code>matches</code>, <code>issues</code>, <code>rule</code>
          </li>
          <li>
            Entries: <Link href="/password/docs/strength">/strength</Link>,{" "}
            <Link href="/password/docs/server">/server</Link>,{" "}
            <Link href="/password/docs/pwned">/pwned</Link>
          </li>
          <li>
            <Link href="/password/docs/helpers">composeRefs</Link>
          </li>
        </ul>

        <h2 id="paket">Package</h2>
        <ul>
          <li>
            Files are <code>.mjs</code> / <code>.cjs</code> with <code>.d.mts</code> /{" "}
            <code>.d.cts</code> types. Deep imports into <code>dist</code>&#32;were never public;
            use the package entries.
          </li>
          <li>
            <code>getInputAriaAttributes</code> returns a typed object instead of{" "}
            <code>Record&lt;string, any&gt;</code>.
          </li>
          <li>Peer dependencies are unchanged: React and React DOM 18.2+.</li>
        </ul>
      </DocsProse>
    </>
  );
}
