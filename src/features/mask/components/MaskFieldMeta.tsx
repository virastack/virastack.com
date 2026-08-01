"use client";

import { useTranslations } from "next-intl";

type MaskFieldMetaProps = {
  rawValue: string;
  value: string;
};

/**
 * Shows MaskField `rawValue` and `value` under live demos (library property names).
 */
export function MaskFieldMeta({ rawValue, value }: MaskFieldMetaProps) {
  const t = useTranslations("Mask");

  return (
    <div className="space-y-0.5 font-mono text-xs text-muted-foreground">
      <p>
        {t("demoRawLabel")}: {rawValue || "—"}
      </p>
      <p>
        {t("demoValueLabel")}: {value || "—"}
      </p>
    </div>
  );
}
