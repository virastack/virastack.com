"use client";

import { useViraMask } from "@virastack/mask";
import { useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export function CreditCardDemo() {
  const t = useTranslations("InputMask.examples.creditCard");
  const form = useForm({
    mode: "onChange",
    defaultValues: { cardNumber: "", expiry: "", cvv: "" },
  });
  const {
    formState: { errors },
  } = form;

  const mask = useViraMask({
    form,
    schema: {
      cardNumber: {
        preset: "card",
        errorMessage: t("invalidCardNumber"),
      },
      expiry: {
        preset: "expiry",
        errorMessage: t("invalidDate"),
      },
      cvv: {
        preset: "cvv",
        errorMessage: t("invalidCvv"),
      },
    },
  });

  return (
    <Field className="md:w-64 mt-4">
      <div>
        <FieldLabel htmlFor="cardNumber">{t("cardNumber")}</FieldLabel>
        <Input
          id="cardNumber"
          {...mask.cardNumber}
          placeholder={t("cardNumberPlaceholder")}
        />
        <FieldError>{errors.cardNumber?.message as string}</FieldError>
      </div>
      <div className="flex gap-4">
        <div>
          <FieldLabel htmlFor="expiry">{t("expiry")}</FieldLabel>
          <Input id="expiry" {...mask.expiry} placeholder={t("expiryPlaceholder")} />
          <FieldError>{errors.expiry?.message as string}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor="cvv">{t("cvv")}</FieldLabel>
          <Input id="cvv" {...mask.cvv} placeholder={t("cvvPlaceholder")} />
          <FieldError>{errors.cvv?.message as string}</FieldError>
        </div>
      </div>
    </Field>
  );
}
