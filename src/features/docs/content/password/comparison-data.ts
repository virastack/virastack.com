/**
 * Comparison rows for the password docs. Checked on 2026-10-26 against:
 * - Radix: radix-ui.com/primitives/docs/components/password-toggle-field and the
 *   @radix-ui/react-password-toggle-field@0.2.1 source and package.json
 * - zxcvbn-ts: zxcvbn-ts.github.io/zxcvbn (guide, matcher pages) and @zxcvbn-ts/core@4.2.0 types
 * "?" means not verified from a live source.
 */
export type ComparisonCell = "yes" | "no" | "na" | "unknown" | (string & {});

export type ComparisonRow = {
  /** Stable key; the label is localized on the page. */
  id: string;
  password: ComparisonCell;
  radix: ComparisonCell;
  zxcvbn: ComparisonCell;
};

export const comparisonRows: ComparisonRow[] = [
  { id: "toggle", password: "yes", radix: "yes", zxcvbn: "no" },
  { id: "api", password: "Hook", radix: "Components", zxcvbn: "Function" },
  { id: "hideOnSubmit", password: "yes", radix: "yes", zxcvbn: "na" },
  { id: "focus", password: "yes", radix: "yes", zxcvbn: "na" },
  { id: "controlled", password: "yes", radix: "yes", zxcvbn: "na" },
  { id: "autoComplete", password: "yes", radix: "yes", zxcvbn: "na" },
  { id: "ariaPressed", password: "yes", radix: "no", zxcvbn: "na" },
  { id: "capsLock", password: "yes", radix: "no", zxcvbn: "na" },
  { id: "score", password: "yes", radix: "no", zxcvbn: "yes" },
  { id: "lengthPolicy", password: "yes", radix: "no", zxcvbn: "unknown" },
  { id: "userInputs", password: "yes", radix: "no", zxcvbn: "yes" },
  { id: "feedback", password: "Keys", radix: "na", zxcvbn: "Text" },
  { id: "confirm", password: "yes", radix: "no", zxcvbn: "na" },
  { id: "server", password: "yes", radix: "no", zxcvbn: "unknown" },
  { id: "pwned", password: "yes", radix: "no", zxcvbn: "yes" },
  { id: "dependencies", password: "0", radix: "8", zxcvbn: "1 + dictionaries" },
  { id: "version", password: "1.1", radix: "0.2.1 (unstable_)", zxcvbn: "4.2.0" },
];

export const comparisonSources = [
  {
    label: "Radix PasswordToggleField",
    href: "https://www.radix-ui.com/primitives/docs/components/password-toggle-field",
  },
  { label: "zxcvbn-ts", href: "https://zxcvbn-ts.github.io/zxcvbn/" },
  { label: "zxcvbn-ts matchers", href: "https://zxcvbn-ts.github.io/zxcvbn/guide/matcher/" },
];
