import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const optionsCode = `import type { UseViraPasswordOptions } from "@virastack/password"

interface UseViraPasswordOptions {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  hideOnSubmit?: boolean
  hideOnBlur?: boolean
  autoComplete?: string | false
  policy?: Policy
  forbidden?: readonly unknown[]
  matchWith?: string
  value?: string
  icons?: { show: ReactNode; hide: ReactNode }
  disabled?: boolean
  readOnly?: boolean
  id?: string
  inputProps?: ViraPasswordInputProps
  btnProps?: ButtonHTMLAttributes<HTMLButtonElement>
}`;

const resultCode = `interface UseViraPasswordResult {
  inputProps: ViraPasswordInputProps // InputHTMLAttributes (+ verdiyseniz sizin ref'iniz)
  btnProps: ButtonHTMLAttributes<HTMLButtonElement>
  isVisible: boolean
  capsLock: boolean
  toggle: () => void
  setVisible: (visible: boolean) => void
  strength: StrengthResult | null
  strengthProps: ViraPasswordStrengthProps
  matches: boolean | null
  issues: PasswordIssue[]
  rule: { validate: (value: unknown) => true | PasswordIssue }
}`;

const strengthCode = `import type {
  Policy, PolicyOptions, PolicyPreset, StrengthResult, StrengthScore,
  StrengthLevel, PasswordChecks, PasswordIssue, EvaluateOptions,
} from "@virastack/password/strength"

type StrengthScore = 0 | 1 | 2 | 3 | 4
type StrengthLevel = "weak" | "fair" | "good" | "strong"`;

const serverCode = `import type { PasswordValidation, ValidatePasswordOptions } from "@virastack/password/server"

interface PasswordValidation extends StrengthResult {
  password: string // NFKC ile normalleştirilmiş
}`;

const pwnedCode = `import type { CheckPwnedOptions, PwnedResult } from "@virastack/password/pwned"

type PwnedResult =
  | { status: "pwned"; count: number }
  | { status: "safe" }
  | { status: "unknown"; reason: PwnedUnknownReason }`;

export function PasswordTypesDoc() {
  return (
    <>
      <DocsPageHeader title="Tipler" description="Dışa aktarılan TypeScript tipleri. any yok." />
      <DocsProse>
        <h2 id="options">UseViraPasswordOptions</h2>
        <DocsCodeBlock code={optionsCode} lang="ts" />
        <h2 id="result">UseViraPasswordResult</h2>
        <DocsCodeBlock code={resultCode} lang="ts" />
        <h2 id="strength">/strength</h2>
        <DocsCodeBlock code={strengthCode} lang="ts" />
        <h2 id="server">/server</h2>
        <DocsCodeBlock code={serverCode} lang="ts" />
        <h2 id="pwned">/pwned</h2>
        <DocsCodeBlock code={pwnedCode} lang="ts" />
      </DocsProse>
    </>
  );
}
