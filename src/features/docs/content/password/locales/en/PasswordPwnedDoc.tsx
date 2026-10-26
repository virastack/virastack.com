import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";

const optionsCode = `checkPwned(password, {
  signal,         // AbortSignal
  timeout: 3000,  // ms, default 5000
  fetch,          // custom fetch (tests, proxies)
})`;

const resultRows: [string, string][] = [
  ['{ status: "pwned", count }', "Seen count times in breaches"],
  ['{ status: "safe" }', "Not in the list"],
  [
    '{ status: "unknown", reason }',
    "empty, unsupported (no crypto.subtle or fetch), network, timeout, aborted, rate-limited, http",
  ],
];

export function PasswordPwnedDoc() {
  return (
    <>
      <DocsPageHeader
        title="Leaked passwords"
        description="Optional Have I Been Pwned check with k-anonymity: @virastack/password/pwned."
      />
      <DocsProse>
        <h2 id="kullanim">Usage</h2>
        <p>
          Off unless you call it. It uses the free Pwned Passwords range API; no key, no
          dependencies.
        </p>
        <PasswordExamplePreview id="pwned" />
        <DocsCodeBlock code={optionsCode} lang="ts" />

        <h2 id="sonuc">Result</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Result</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {resultRows.map(([result, meaning]) => (
                <tr key={result}>
                  <td>
                    <code>{result}</code>
                  </td>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          It never throws. On <code>unknown</code>, let the user continue (fail open).
        </p>

        <h2 id="gizlilik">Privacy and limits</h2>
        <ul>
          <li>
            Only the first 5 characters of the password&apos;s SHA-1 hash are sent; the password and
            the full hash never leave. Responses are padded.
          </li>
          <li>
            Call it from the server. From a browser, Have I Been Pwned sees the user&apos;s IP.
          </li>
          <li>
            <code>crypto.subtle</code> exists only on HTTPS and localhost; elsewhere the result is{" "}
            <code>unknown</code>.
          </li>
          <li>Don&apos;t call it on every keystroke; check on submit.</li>
        </ul>
      </DocsProse>
    </>
  );
}
