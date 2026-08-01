"use client";

import { getCardType, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

type CreditCardForm = {
  card: string;
  expiry: string;
  cvv: string;
};

type MaskCreditCardDemoProps = {
  /** Show rawValue / value meta under each field. */
  showMeta?: boolean;
};

/**
 * Integrated card + expiry + cvv demo. Amex expands CVV to 4 digits.
 */
export function MaskCreditCardDemo({ showMeta = true }: MaskCreditCardDemoProps) {
  const t = useTranslations("DocsMask");
  const form = useForm<CreditCardForm>({
    defaultValues: { card: "", expiry: "", cvv: "" },
    mode: "onChange",
  });

  const { card, expiry, cvv } = useViraMask({
    form,
    schema: {
      card: {
        preset: "card",
        errorMessage: t("demoInvalidCard"),
      },
      expiry: {
        preset: "expiry",
        errorMessage: t("demoInvalidExpiry"),
      },
      cvv: "cvv",
    },
  });

  const { rawValue: cardRaw, value: cardValue, ...cardProps } = card;
  const { rawValue: expiryRaw, value: expiryValue, ...expiryProps } = expiry;
  const { rawValue: cvvRaw, value: cvvValue, ...cvvProps } = cvv;

  const cardType = getCardType(cardRaw);
  const errors = form.formState.errors;

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="mask-cc-card">{t("demoCardNumberLabel")}</Label>
          {cardType !== "unknown" ? (
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {cardType}
            </span>
          ) : null}
        </div>
        <Input
          id="mask-cc-card"
          {...cardProps}
          value={cardValue}
          placeholder="0000 0000 0000 0000"
          aria-invalid={Boolean(errors.card)}
        />
        {errors.card ? (
          <p className="text-xs text-destructive">
            {String(errors.card.message ?? t("demoInvalidGeneric"))}
          </p>
        ) : showMeta ? (
          <MaskFieldMeta rawValue={cardRaw} value={cardValue} />
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="mask-cc-expiry">{t("demoExpiryLabel")}</Label>
          <Input
            id="mask-cc-expiry"
            {...expiryProps}
            value={expiryValue}
            placeholder="12/28"
            aria-invalid={Boolean(errors.expiry)}
          />
          {errors.expiry ? (
            <p className="text-xs text-destructive">
              {String(errors.expiry.message ?? t("demoInvalidGeneric"))}
            </p>
          ) : showMeta ? (
            <MaskFieldMeta rawValue={expiryRaw} value={expiryValue} />
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="mask-cc-cvv">{t("demoCvvLabel")}</Label>
          <Input
            id="mask-cc-cvv"
            {...cvvProps}
            value={cvvValue}
            placeholder={cardType === "amex" ? "1234" : "123"}
          />
          {showMeta ? <MaskFieldMeta rawValue={cvvRaw} value={cvvValue} /> : null}
        </div>
      </div>
    </div>
  );
}
