"use client";

import { createMask, getCardType, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { MaskDemoField } from "@/features/docs/components/MaskDemoField";

type CreditCardForm = {
  card: string;
  expiry: string;
  cvv: string;
};

const masks = {
  card: "card",
  expiry: "expiry",
  cvv: { preset: "cvv", from: "card" },
} as const;

const cardMask = createMask("card");
const expiryMask = createMask("expiry");
const cvvMask = createMask("cvv");

type MaskCreditCardDemoProps = {
  /** Show form value / display meta under each field. */
  showMeta?: boolean;
};

/**
 * Card + expiry + CVV. An Amex card switches the CVV to 4 digits.
 */
export function MaskCreditCardDemo({ showMeta = true }: MaskCreditCardDemoProps) {
  const t = useTranslations("DocsMask");
  const form = useForm<CreditCardForm>({
    defaultValues: { card: "", expiry: "", cvv: "" },
    mode: "onTouched",
  });
  const { card, expiry, cvv } = useViraMask(form, masks);
  const watched = useWatch({ control: form.control, name: ["card", "expiry", "cvv"] });
  const values = { card: watched[0], expiry: watched[1], cvv: watched[2] };
  const errors = form.formState.errors;
  const cardType = getCardType(values.card);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative">
        {cardType !== "unknown" ? (
          <span className="absolute top-0 right-0 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {cardType}
          </span>
        ) : null}
        <MaskDemoField
          id="mask-cc-card"
          label={t("demoCardNumberLabel")}
          {...card}
          placeholder="0000 0000 0000 0000"
          error={errors.card}
          formValue={values.card}
          display={cardMask.format(values.card)}
          showMeta={showMeta}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MaskDemoField
          id="mask-cc-expiry"
          label={t("demoExpiryLabel")}
          {...expiry}
          placeholder="12/28"
          error={errors.expiry}
          formValue={values.expiry}
          display={expiryMask.format(values.expiry)}
          showMeta={showMeta}
        />
        <MaskDemoField
          id="mask-cc-cvv"
          label={t("demoCvvLabel")}
          {...cvv}
          placeholder={cardType === "amex" ? "1234" : "123"}
          error={errors.cvv}
          formValue={values.cvv}
          display={cvvMask.format(values.cvv, { from: values.card })}
          showMeta={showMeta}
        />
      </div>
    </div>
  );
}
