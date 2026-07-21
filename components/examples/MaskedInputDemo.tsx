"use client";

import { useViraMask, PRESETS } from "@virastack/mask";
import type { MaskOptions, MaskPreset } from "@virastack/mask";
import { useForm } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useTranslations } from "next-intl";

export function MaskedInputDemo({
  preset,
  labelKey,
  options,
  placeholder,
}: {
  preset: MaskPreset;
  labelKey?: string;
  options?: MaskOptions;
  placeholder?: string;
}) {
  const t = useTranslations("InputMask.examples");
  const form = useForm({ defaultValues: { input: "" } });

  const schemaInput = options
    ? {
        ...PRESETS[preset],
        ...options,
        ...(preset === "currency" &&
        options.currency &&
        PRESETS.currency.currency
          ? {
              currency: {
                ...PRESETS.currency.currency,
                ...options.currency,
              },
            }
          : {}),
      }
    : preset;

  const mask = useViraMask({
    form,
    schema: { input: schemaInput },
  });

  // Extract rawValue to avoid passing it to the DOM element
  const { rawValue, ...inputProps } = mask.input;
  const label = labelKey ? t(`labels.${labelKey}`) : "";

  return (
    <article className="flex gap-4">
      <Field className="md:w-72 mt-4 gap-2">
        <FieldLabel htmlFor={label}>{label}</FieldLabel>
        <Input id={label} {...inputProps} placeholder={placeholder} />
        {form.formState.touchedFields.input &&
          form.formState.errors.input && (
            <FieldError>{t("maskedInput.invalid", { label })}</FieldError>
          )}
      </Field>

      <div className="flex flex-col justify-center gap-2 md:w-80 h-14 mt-6 border border-dashed border-border text-xs p-2 bg-muted/50">
        <div className="flex items-center justify-between gap-2">
          <span>{t("maskedInput.rawValue")}</span> <span>{rawValue}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>{t("maskedInput.displayValue")}</span> <span>{mask.input.value}</span>
        </div>
      </div>
    </article>
  );
}
