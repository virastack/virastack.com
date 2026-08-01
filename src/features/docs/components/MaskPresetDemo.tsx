"use client";

import { useViraMask, type MaskPreset } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

type MaskPresetDemoProps = {
  preset: MaskPreset;
  placeholder?: string;
  className?: string;
  /** Show RHF validation errors under the input (detail pages). */
  showError?: boolean;
  errorMessage?: string;
};

/**
 * Minimal live input demo for a single Mask preset (used on examples index + detail pages).
 */
export function MaskPresetDemo({
  preset,
  placeholder,
  className,
  showError = false,
  errorMessage,
}: MaskPresetDemoProps) {
  const t = useTranslations("DocsMask");
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

  const { rawValue: _rawValue, ...inputProps } = field;
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
      ) : null}
    </div>
  );
}
