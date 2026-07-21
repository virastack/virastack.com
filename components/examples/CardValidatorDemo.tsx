"use client";

import { useViraMask, validateLuhn } from "@virastack/mask";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function CardValidatorDemo() {
  const t = useTranslations("InputMask.examples.cardValidator");
  const form = useForm();

  const mask = useViraMask({
    form,
    schema: {
      cardNumber: {
        preset: "card",
        validator: (value) => {
          const clean = value.replace(/\D/g, "");

          // Custom rule: Must start with 4 (Visa)
          if (!clean.startsWith("4")) return false;

          // Optional: Also run the standard Luhn check
          return validateLuhn(value);
        },
      },
    },
  });

  return (
    <article className="flex gap-4">
      <Field className="md:w-72 mt-4 gap-2">
        <FieldLabel htmlFor="card-validator">{t("visaCardOnly")}</FieldLabel>
        <Input id="card-validator" {...mask.cardNumber} placeholder="4..." />
        {form.formState.touchedFields.cardNumber &&
          form.formState.errors.cardNumber && (
            <FieldError>{t("invalidVisaCard")}</FieldError>
          )}
      </Field>

      <div className="flex flex-col justify-center gap-2 md:w-80 h-14 mt-6 border border-dashed border-border text-xs p-2 bg-muted/50">
        <div className="flex items-center justify-between gap-2">
          <span>{t("rawValue")}</span> <span>{mask.cardNumber.rawValue}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>{t("displayValue")}</span> <span>{mask.cardNumber.value}</span>
        </div>
      </div>
    </article>
  );
}
