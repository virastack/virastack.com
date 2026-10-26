"use client";

import { createMask, useViraMask, type MaskSpec } from "@virastack/mask";
import { useForm, useWatch } from "react-hook-form";

import { MaskDemoField } from "@/features/docs/components/MaskDemoField";

type MaskFieldDemoProps = {
  /** A preset name or serializable mask options. */
  config: MaskSpec;
  placeholder?: string;
  className?: string;
  /** Show the form value / display meta under the input. */
  showMeta?: boolean;
};

/**
 * Live single-field demo. Errors show after the first blur, like a real form.
 */
export function MaskFieldDemo({
  config,
  placeholder,
  className,
  showMeta = true,
}: MaskFieldDemoProps) {
  const form = useForm<{ value: string }>({ defaultValues: { value: "" }, mode: "onTouched" });
  const { value } = useViraMask(form, { value: config });
  const formValue = useWatch({ control: form.control, name: "value" });

  return (
    <MaskDemoField
      {...value}
      placeholder={placeholder}
      className={className}
      error={form.formState.errors.value}
      formValue={formValue}
      display={createMask(config).format(formValue)}
      showMeta={showMeta}
    />
  );
}
