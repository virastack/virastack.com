"use client";

import { useViraMask } from "@virastack/mask";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

type CurrencyForm = {
  amount: string;
};

/**
 * Live TR currency demo (comma decimal, dot thousands, ₺ prefix).
 */
export function MaskCurrencyTrDemo() {
  const form = useForm<CurrencyForm>({
    defaultValues: { amount: "" },
  });

  const { amount } = useViraMask({
    form,
    schema: {
      amount: {
        currency: {
          precision: 2,
          decimalSeparator: ",",
          thousandSeparator: ".",
          symbol: "₺",
          symbolPosition: "prefix",
        },
      },
    },
  });

  const { rawValue, ...inputProps } = amount;

  return (
    <div className="w-full space-y-1.5">
      <Input {...inputProps} placeholder="₺1.234,56" />
      <MaskFieldMeta rawValue={rawValue} value={amount.value} />
    </div>
  );
}
