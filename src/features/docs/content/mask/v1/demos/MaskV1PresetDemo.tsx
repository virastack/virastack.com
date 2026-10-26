"use client";

import { useViraMask, type MaskPreset } from "@virastack/mask-v1";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

type MaskPresetDemoProps = {
  preset: MaskPreset;
  placeholder?: string;
  className?: string;
  /** Show RHF validation errors under the input (detail pages). */
  showError?: boolean;
  errorMessage?: string;
  /** Show rawValue / value meta under the input. */
  showMeta?: boolean;
};

/**
 * Minimal live input demo for a single Mask preset (used on examples index + detail pages).
 */
export function MaskV1PresetDemo({
  preset,
  placeholder,
  className,
  showError = false,
  errorMessage,
  showMeta = true,
}: MaskPresetDemoProps) {
  const t = useTranslations("DocsMaskV1");
  const form = useForm<Record<string, string>>({
    defaultValues: { [preset]: "" },
    mode: showError ? "onChange" : "onSubmit",
  });
  const fields = useViraMask({
    form,
    schema: {
      [preset]: errorMessage ? { preset, errorMessage } : preset,
    },
  });

  const field = fields[preset];
  if (!field) return null;

  const { rawValue, ...inputProps } = field;
  const error = form.formState.errors[preset];

  return (
    <div className="w-full space-y-1.5">
      <Input
        {...inputProps}
        placeholder={placeholder}
        className={className}
        aria-invalid={Boolean(error)}
      />
      {showError && error ? (
        <p className="text-xs text-destructive">{String(error.message ?? t("demoInvalidValue"))}</p>
      ) : showMeta ? (
        <MaskFieldMeta formValue={rawValue} display={field.value} />
      ) : null}
    </div>
  );
}
