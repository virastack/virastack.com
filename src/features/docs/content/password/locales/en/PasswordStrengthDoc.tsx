import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { passwordExampleFile } from "@/features/docs/content/password/examples/example-code.generated";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";

const evaluateCode = `import { evaluate } from "@virastack/password/strength"
import { policy } from "@/lib/password-policy"

evaluate("correct horse battery staple", policy)
// {
//   score: 0,            // 0–1 fail the policy, 2–4 pass
//   level: "weak",       // "weak" | "fair" | "good" | "strong"
//   length: 28,          // code points after normalization
//   valid: false,
//   checks: { minLength: true, maxLength: true, notCommon: false, ... },
//   issues: ["password.common"],
// }`;

const customCode = `definePolicy({ preset: "mfa" }) // 8 characters, with a second factor
definePolicy({ require: { digit: true } }) // composition rules, if you must
definePolicy({ blocklist: ["acme", "acme pay"] }) // the whole password must not be your product
definePolicy({ normalization: "NFC" }) // NIST's recommendation; NFKC by default
definePolicy({ blockCommon: false, blockRepetitive: false })`;

const forbiddenCode = `evaluate(password, policy, { forbidden: [email, name, username] })
// "hello@virastack.com" → "hello" (domain ignored)
// "Vira Stack" → "virastack", "vira", "stack"

// The whole password is compared, after digits, symbols, leetspeak and repetition are removed:
evaluate("vira-1990-2024!", policy, { forbidden: ["Vira Stack"] }) // containsPersonalInfo
evaluate("v1ra-v1ra-v1ra-2024", policy, { forbidden: ["Vira Stack"] }) // containsPersonalInfo
evaluate("viral-garden-path", policy, { forbidden: ["Vira Stack"] }) // passes`;

const presetRows: [string, string, string][] = [
  [
    "nist (default)",
    "15–64",
    "None. Per NIST SP 800-63B-4: length and a blocklist, no composition rules",
  ],
  ["mfa", "8–64", "None. For a password used with a second factor (NIST SP 800-63B-4)"],
  ["legacy (deprecated)", "8–64", "Lowercase, uppercase, digit and symbol"],
];

const issueRows: [string, string][] = [
  ["password.tooShort / tooLong", "Outside minLength–maxLength"],
  [
    "password.noLowercase / noUppercase / noDigit / noSymbol",
    "A required class is missing (legacy)",
  ],
  ["password.common", "A common password, also with digits, symbols or leetspeak around it"],
  ["password.blocked", "Is a word from the policy blocklist, with digits or symbols around it"],
  ["password.repetitive", "Repeats or sequences: aaaa…, abcabc…, 12345…, qwerty…"],
  [
    "password.containsPersonalInfo",
    "Is a forbidden value or a part of it, with digits or symbols around it",
  ],
  ["password.pwned", "Found in a breach (validatePassword with pwned, server only)"],
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
          A valid password is <code>fair</code> at the minimum length, <code>good</code> from 5
          characters more and <code>strong</code> from 10 more. An uppercase letter, a digit or a
          symbol doesn&apos;t change the level: NIST drops composition rules, so the meter
          doesn&apos;t bring them back. Repeated characters add little. It is not a crack-time
          estimate.
        </p>
        <p>
          <strong>Why is a complex 14-character password weak?</strong> The score follows the
          policy, not a universal rule. The default <code>nist</code> preset asks for 15 characters,
          so anything shorter fails it and scores 0–1, however mixed it is. From 15 characters the
          score rises with length. Need shorter passwords? Use the <code>mfa</code> preset: NIST
          allows 8 characters when the password is used with a second factor.
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
          The package doesn&apos;t know your user; pass the values. As NIST asks, the whole password
          is compared, not searched for words: it fails when it is a value or a part of it with
          digits, symbols, leetspeak or repetition around it. Case and accents are ignored.
        </p>
        <DocsCodeBlock code={forbiddenCode} lang="ts" />
        <p>
          A short name inside an ordinary word is not a match: with the name <code>Ali</code>,{" "}
          <code>kaliteli-sabah-kahvesi</code>&#32;passes and <code>ali1990</code>&#32;fails. Parts
          shorter than <code>minTokenLength</code>&#32;(default 3) are ignored.
        </p>
        <PasswordExamplePreview id="forbidden" />

        <h2 id="unicode">Unicode</h2>
        <ul>
          <li>
            The password is normalized with NFKC by default, so the same text typed on different
            keyboards, full-width letters included, gives the same result.{" "}
            <code>normalization: &quot;NFC&quot;</code>&#32;follows NIST&apos;s recommendation and
            keeps full-width letters and ligatures as they are. Switching changes the normalized
            password you hash, so choose before you have users.
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
