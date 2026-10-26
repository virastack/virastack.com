"use client";

import { useTranslations } from "next-intl";

type MaskFieldMetaProps = {
  /** What React Hook Form holds (`watch(name)`). */
  formValue: string;
  /** What the input shows. */
  display: string;
};

/**
 * Shows the form value and the display text under live demos.
 */
export function MaskFieldMeta({ formValue, display }: MaskFieldMetaProps) {
  const t = useTranslations("Mask");

  return (
    <div className="space-y-0.5 font-mono text-xs text-muted-foreground">
      <p>
        {t("demoRawLabel")}: {formValue || "-"}
      </p>
      <p>
        {t("demoValueLabel")}: {display || "-"}
      </p>
    </div>
  );
}
