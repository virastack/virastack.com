import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";

import { passwordExampleSketch } from "./example-code.generated";
import styles from "./sketch-frame.module.css";
import { PasswordField as BasicField } from "./sketches/basic";
import { NewPasswordFields } from "./sketches/confirm";
import { PasswordField as CustomIconsField } from "./sketches/custom-icons";
import { PasswordField as CustomTextField } from "./sketches/custom-text";
import { LockedPasswordField } from "./sketches/disabled";
import { NewPasswordField as ForbiddenField } from "./sketches/forbidden";
import { SignupForm as MaskSignupForm } from "./sketches/mask-signup";
import { PasswordField as ProgrammaticField } from "./sketches/programmatic";
import { NewPasswordField as PropMergeField } from "./sketches/prop-merge";
import { LeakCheck } from "./sketches/pwned";
import { SignupForm as ZodSignupForm } from "./sketches/react-hook-form-zod";
import { SignupForm as ServerSignupForm } from "./sketches/server-action";
import { PasswordField as ShadcnField } from "./sketches/shadcn";
import { PasswordField } from "./sketches/show-hide";
import { NewPasswordField as StrengthField } from "./sketches/strength-meter";

const previews = {
  "show-hide": PasswordField,
  "strength-meter": StrengthField,
  confirm: NewPasswordFields,
  "react-hook-form-zod": ZodSignupForm,
  "server-action": ServerSignupForm,
  forbidden: ForbiddenField,
  pwned: LeakCheck,
  "mask-signup": MaskSignupForm,
  basic: BasicField,
  "custom-icons": CustomIconsField,
  "custom-text": CustomTextField,
  disabled: LockedPasswordField,
  "prop-merge": PropMergeField,
  programmatic: ProgrammaticField,
  shadcn: ShadcnField,
} as const;

/** Examples that bring their own styling (a UI library) and skip the frame's styles. */
const styled = new Set<PasswordExamplePreviewId>(["shadcn"]);

export type PasswordExamplePreviewId = keyof typeof previews;

/** The live example alone, e.g. for the examples grid. */
export function PasswordExampleLive({ id }: { id: PasswordExamplePreviewId }) {
  const Preview = previews[id];
  if (styled.has(id)) return <Preview />;
  return (
    <div className={styles.frame}>
      <Preview />
    </div>
  );
}

/**
 * Live example and its code, from the same file: plain markup, no styling; the look comes from
 * sketch-frame.module.css. Extra files (Server Actions) follow in their own blocks.
 */
export function PasswordExamplePreview({ id }: { id: PasswordExamplePreviewId }) {
  const [main, ...extra] = passwordExampleSketch[id];

  return (
    <>
      <ComponentPreview preview={<PasswordExampleLive id={id} />} code={main}>
        <DocsCodeBlock code={main} lang="tsx" />
      </ComponentPreview>
      {extra.map((code) => (
        <DocsCodeBlock key={code} code={code} lang="ts" />
      ))}
    </>
  );
}
