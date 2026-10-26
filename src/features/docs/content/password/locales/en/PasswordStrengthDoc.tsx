import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { passwordExampleFile } from "@/features/docs/content/password/examples/example-code.generated";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
import { Link } from "@/i18n/routing";

const evaluateCode = `import { evaluate } from "@virastack/password/strength"
import { policy } from "@/lib/password-policy"

evaluate("correct horse battery staple", policy)
// {
//   score: 0,            // 0–1 fail the policy, 2–4 pass
//   level: "weak",       // "weak" | "fair" | "good" | "strong"
//   length: 28,          // code points after NFKC
//   valid: false,
//   checks: { minLength: true, maxLength: true, notCommon: false, ... },
//   issues: ["password.common"],
// }`;

const customCode = `definePolicy({ preset: "nist", minLength: 8 }) // with a second factor (MFA)
definePolicy({ preset: "legacy", require: { symbol: false } })
definePolicy({ blocklist: ["acme", "acme pay"] }) // your product, contained anywhere
definePolicy({ minTokenLength: 4 }) // fewer false positives for short names
definePolicy({ blockCommon: false, blockRepetitive: false })`;

const forbiddenCode = `evaluate(password, policy, { forbidden: [email, name, username] })
// "hello@virastack.com" → "hello" (domain ignored)
// "Vira Stack" → "vira stack", "vira", "stack"`;

const presetRows: [string, string, string][] = [
  [
    "nist (default)",
    "15–64",
    "None. Per NIST SP 800-63B-4: length and a blocklist, no composition rules",
  ],
  ["legacy", "8–64", "Lowercase, uppercase, digit and symbol"],
];

const issueRows: [string, string][] = [
  ["password.tooShort / tooLong", "Outside minLength–maxLength"],
  [
    "password.noLowercase / noUppercase / noDigit / noSymbol",
    "A required class is missing (legacy)",
  ],
  ["password.common", "A common password, also with digits, symbols or leetspeak around it"],
  ["password.blocked", "Contains a word from the policy blocklist"],
  ["password.repetitive", "Repeats or sequences: aaaa…, abcabc…, 12345…, qwerty…"],
  ["password.containsPersonalInfo", "Contains a forbidden value"],
];

export function PasswordStrengthDoc() {
  return (
    <>
      <DocsPageHeader
        title="Strength"
        description="NIST-style password policy with @virastack/password/strength: length, common passwords, repeats and personal info."
      />
      <DocsProse>
        <h2 id="policy">definePolicy()</h2>
        <p>
          Define the policy once in a shared file without <code>&quot;use client&quot;</code>. The
          form and the server import the same object.
        </p>
        <DocsCodeBlock code={passwordExampleFile["password-policy"]} lang="ts" />

        <h2 id="sablonlar">Presets</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Preset</th>
                <th>Length</th>
                <th>Composition</th>
              </tr>
            </thead>
            <tbody>
              {presetRows.map(([preset, length, composition]) => (
                <tr key={preset}>
                  <td>
                    <code>{preset}</code>
                  </td>
                  <td>{length}</td>
                  <td>{composition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Every preset value can be changed:</p>
        <DocsCodeBlock code={customCode} lang="ts" />
        <p>
          Conflicting rules (for example <code>minLength</code> above <code>maxLength</code>) throw
          when the policy is defined.
        </p>

        <h2 id="sonuc">Result</h2>
        <DocsCodeBlock code={evaluateCode} lang="ts" />
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {issueRows.map(([key, when]) => (
                <tr key={key}>
                  <td>
                    <code>{key}</code>
                  </td>
                  <td>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The score is a heuristic from length and character variety, not a crack-time estimate. For
          that, see the <Link href="/password/docs/comparison">comparison</Link>.
        </p>

        <h2 id="hook">In the hook</h2>
        <p>
          Pass <code>policy</code> and read <code>strength</code>, <code>issues</code> and{" "}
          <code>strengthProps</code>. The hook doesn&apos;t import the engine; it comes with the
          policy, so a toggle-only page doesn&apos;t download it.
        </p>
        <PasswordExamplePreview id="strength-meter" />

        <h2 id="forbidden">forbidden</h2>
        <p>
          The package doesn&apos;t know your user; pass the values. Matching ignores case, accents
          and simple leetspeak.
        </p>
        <DocsCodeBlock code={forbiddenCode} lang="ts" />
        <p>
          Parts shorter than <code>minTokenLength</code>&#32;(default 3) are ignored. Short parts
          cause false positives: with <code>dev@virastack.com</code>, the part <code>dev</code>{" "}
          rejects <code>devoted-garden-path</code>. Raise it to 4 if that matters to you.
        </p>
        <PasswordExamplePreview id="forbidden" />

        <h2 id="unicode">Unicode</h2>
        <ul>
          <li>
            The password is normalized with NFKC, so the same text typed on different keyboards
            gives the same result.
          </li>
          <li>Length counts code points: an emoji or a Turkish letter counts once.</li>
          <li>Zero-width characters don&apos;t count towards the length.</li>
          <li>
            Nothing is cut at <code>maxLength</code>; a longer password gets{" "}
            <code>password.tooLong</code>.
          </li>
        </ul>

        <h2 id="yapistirma">Paste</h2>
        <p>
          Don&apos;t block pasting into password fields. Password managers depend on it, and NIST
          recommends allowing it. The hook never blocks paste.
        </p>
      </DocsProse>
    </>
  );
}
