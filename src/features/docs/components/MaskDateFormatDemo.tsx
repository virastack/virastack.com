"use client";

import { useViraMask, type MaskOptions } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

type DateForm = {
  date: string;
};

type MaskDateFormatDemoProps = {
  dateFormat: NonNullable<MaskOptions["dateFormat"]>;
  /** Override when format needs a different slot order (e.g. YMD → 9999/99/99). */
  mask?: string;
  placeholder?: string;
};

/**
 * Live date demo with a custom dateFormat (and optional mask override).
 */
export function MaskDateFormatDemo({
  dateFormat,
  mask,
  placeholder = "99/99/9999",
}: MaskDateFormatDemoProps) {
  const t = useTranslations("DocsMask");
  const form = useForm<DateForm>({
    defaultValues: { date: "" },
    mode: "onChange",
  });

  const { date } = useViraMask({
    form,
    schema: {
      date: {
        preset: "date",
        dateFormat,
        ...(mask ? { mask } : {}),
        errorMessage: t("demoInvalidDate"),
      },
    },
  });

  const { rawValue, ...inputProps } = date;
  const error = form.formState.errors.date;

  return (
    <div className="w-full space-y-1.5">
      <Input {...inputProps} placeholder={placeholder} aria-invalid={Boolean(error)} />
      {error ? (
        <p className="text-xs text-destructive">{String(error.message ?? t("demoInvalidDate"))}</p>
      ) : (
        <MaskFieldMeta rawValue={rawValue} value={date.value} />
      )}
    </div>
  );
}
