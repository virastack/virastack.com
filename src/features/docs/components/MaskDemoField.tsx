"use client";

import type { ComponentProps } from "react";

import { useTranslations } from "next-intl";
import type { FieldError } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

/** Maps a mask error key (`tckn.invalid`) to a demo message by its suffix. */
export function useMaskErrorText() {
  const t = useTranslations("DocsMask");

  return (error: FieldError | undefined) => {
    const key = String(error?.message ?? "");
    switch (key.slice(key.indexOf(".") + 1)) {
      case "incomplete":
        return t("demoErrorIncomplete");
      case "min":
        return t("demoErrorMin");
      case "max":
        return t("demoErrorMax");
      case "minAge":
        return t("demoErrorMinAge");
      case "beforeFrom":
        return t("demoErrorBeforeFrom");
      default:
        return t("demoErrorInvalid");
    }
  };
}

type MaskDemoFieldProps = ComponentProps<typeof Input> & {
  label?: string;
  error?: FieldError;
  formValue: string;
  display: string;
  showMeta?: boolean;
};

/** One demo input with its label, error text and form value / display meta. */
export function MaskDemoField({
  label,
  error,
  formValue,
  display,
  showMeta = true,
  id,
  ...inputProps
}: MaskDemoFieldProps) {
  const errorText = useMaskErrorText();

  return (
    <div className="w-full space-y-1.5">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Input id={id} {...inputProps} />
      {error ? (
        <p className="text-xs text-destructive">
          {errorText(error)} <code className="text-[11px] opacity-70">{error.message}</code>
        </p>
      ) : showMeta ? (
        <MaskFieldMeta formValue={formValue} display={display} />
      ) : null}
    </div>
  );
}
