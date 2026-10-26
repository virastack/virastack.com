import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";

import { ConfirmPasswordExample } from "./ConfirmPasswordExample";
import { passwordExampleCode } from "./example-code.generated";
import { ForbiddenExample } from "./ForbiddenExample";
import { MaskSignupExample } from "./MaskSignupExample";
import { PwnedExample } from "./PwnedExample";
import { ReactHookFormZodExample } from "./ReactHookFormZodExample";
import { ServerActionExample } from "./ServerActionExample";
import { ShowHideExample } from "./ShowHideExample";
import { StrengthMeterExample } from "./StrengthMeterExample";

const previews = {
  "show-hide": ShowHideExample,
  "strength-meter": StrengthMeterExample,
  confirm: ConfirmPasswordExample,
  "react-hook-form-zod": ReactHookFormZodExample,
  "server-action": ServerActionExample,
  forbidden: ForbiddenExample,
  pwned: PwnedExample,
  "mask-signup": MaskSignupExample,
} as const;

export type PasswordExamplePreviewId = keyof typeof previews;

/** The live example alone, e.g. for the examples grid. */
export function PasswordExampleLive({ id }: { id: PasswordExamplePreviewId }) {
  const Preview = previews[id];
  return <Preview />;
}

/** Live example with the exact source it was built from. */
export function PasswordExamplePreview({ id }: { id: PasswordExamplePreviewId }) {
  const Preview = previews[id];
  const code = passwordExampleCode[id];

  return (
    <ComponentPreview preview={<Preview />} code={code}>
      <DocsCodeBlock code={code} lang="tsx" />
    </ComponentPreview>
  );
}
