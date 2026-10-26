import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { comparisonSources } from "@/features/docs/content/password/comparison-data";
import { ComparisonTable } from "@/features/docs/content/password/ComparisonTable";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";

const labels: Record<string, string> = {
  toggle: "Show/hide toggle",
  api: "API",
  hideOnSubmit: "Hides on form submit",
  focus: "Focus back to the input after a click",
  controlled: "Controlled visibility",
  autoComplete: "autoComplete default",
  ariaPressed: "aria-pressed on the toggle",
  capsLock: "Caps Lock detection",
  score: "Strength score 0–4",
  lengthPolicy: "Length policy (NIST presets)",
  userInputs: "Personal info (email, name)",
  feedback: "Feedback",
  confirm: "Confirm field",
  server: "Same rules on the server",
  pwned: "Leaked password check (HIBP)",
  dependencies: "Runtime dependencies",
  version: "Version",
};

export function PasswordComparisonDoc() {
  return (
    <>
      <DocsPageHeader
        title="Comparison"
        description={
          <>
            <GuideProductMark id="password" linked={false}>
              Password
            </GuideProductMark>{" "}
            next to Radix PasswordToggleField and zxcvbn-ts.
          </>
        }
      />
      <DocsProse>
        <h2 id="tablo">Table</h2>
        <ComparisonTable labels={labels} head={["Feature", "Not verified"]} />
        <p className="text-sm text-muted-foreground">
          ✅ yes · ❌ no · ➖ not applicable · ? not verified from a live source. Checked on 26
          October 2026.
        </p>

        <h2 id="notlar">Notes</h2>
        <ul>
          <li>
            <GuideProductMark id="password" linked={false}>
              Password
            </GuideProductMark>{" "}
            covers the whole field in one hook: the toggle, strength, confirmation, the same rules
            on the server and an optional leak check.
          </li>
          <li>
            <strong>Radix PasswordToggleField</strong>&#32;is a set of components for the toggle
            only. It is still exported as <code>unstable_PasswordToggleField</code>. Its toggle
            changes its <code>aria-label</code>&#32;(&quot;Show password&quot; / &quot;Hide
            password&quot;) instead of using <code>aria-pressed</code>.
          </li>
          <li>
            <strong>zxcvbn-ts</strong>&#32;estimates strength with dictionaries and pattern
            matching, which is more thorough than the length-first heuristic here. Dictionaries are
            large; load them only where you need them. Its feedback is translated text, not keys.
          </li>
          <li>
            They combine: use <code>useViraPassword</code>&#32;for the field and pass your own score
            from zxcvbn-ts to your UI.
          </li>
        </ul>
        <p>Sources:</p>
        <ul>
          {comparisonSources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </DocsProse>
    </>
  );
}
