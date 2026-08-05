"use client";

import { useViraMask } from "@virastack/mask";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

type PhoneForm = {
  phone: string;
};

/**
 * Live TR phone demo, spaces instead of hyphen grouping.
 */
export function MaskPhoneTrDemo() {
  const form = useForm<PhoneForm>({
    defaultValues: { phone: "" },
  });

  const { phone } = useViraMask({
    form,
    schema: {
      phone: {
        preset: "phone",
        mask: "(999) 999 99 99",
      },
    },
  });

  const { rawValue, ...inputProps } = phone;

  return (
    <div className="w-full space-y-1.5">
      <Input {...inputProps} placeholder="(555) 555 55 55" />
      <MaskFieldMeta rawValue={rawValue} value={phone.value} />
    </div>
  );
}
