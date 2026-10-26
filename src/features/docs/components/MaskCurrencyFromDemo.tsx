"use client";

import { createMask, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { MaskDemoField } from "@/features/docs/components/MaskDemoField";

type CurrencyForm = {
  currency: string;
  price: string;
};

const CURRENCIES = ["TRY", "USD", "EUR"] as const;
const priceMask = createMask("currency");

/**
 * A price that follows a currency select through `from`.
 */
export function MaskCurrencyFromDemo() {
  const t = useTranslations("DocsMask");
  const form = useForm<CurrencyForm>({ defaultValues: { currency: "TRY", price: "1234.56" } });
  const { price } = useViraMask(form, { price: { preset: "currency", from: "currency" } });
  const watched = useWatch({ control: form.control, name: ["currency", "price"] });
  const values = { currency: watched[0], price: watched[1] };

  return (
    <div className="grid w-full grid-cols-[7rem_1fr] items-start gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="mask-currency-code">{t("demoCurrencyLabel")}</Label>
        <select
          id="mask-currency-code"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-2 text-sm"
          {...form.register("currency")}
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
      <MaskDemoField
        id="mask-currency-price"
        label={t("demoAmountLabel")}
        {...price}
        formValue={values.price}
        display={priceMask.format(values.price, { from: values.currency })}
      />
    </div>
  );
}
