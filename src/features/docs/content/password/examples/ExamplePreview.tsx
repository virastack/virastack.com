import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";

import { ConfirmPasswordExample } from "./ConfirmPasswordExample";
import { passwordExampleCode, passwordExampleSketch } from "./example-code.generated";
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

/**
 * Live example with a short sketch of the code: plain markup, no styling, the package in focus.
 * Extra files (Server Actions) follow in their own blocks.
 */
export function PasswordExamplePreview({ id }: { id: PasswordExamplePreviewId }) {
  const Preview = previews[id];
  const [main, ...extra] = passwordExampleSketch[id];

  return (
    <>
      <ComponentPreview preview={<Preview />} code={main}>
        <DocsCodeBlock code={main} lang="tsx" />
      </ComponentPreview>
      {extra.map((code) => (
        <DocsCodeBlock key={code} code={code} lang="ts" />
      ))}
    </>
  );
}

/** The styled source of the live example, for copying the whole thing. */
export function PasswordExampleFullSource({ id }: { id: PasswordExamplePreviewId }) {
  return <DocsCodeBlock code={passwordExampleCode[id]} lang="tsx" />;
}
