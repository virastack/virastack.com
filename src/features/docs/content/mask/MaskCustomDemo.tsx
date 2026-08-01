"use client";

import { useViraMask } from "@virastack/mask";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

type CustomForm = {
  code: string;
};

type MaskCustomDemoProps = {
  /** Show rawValue / value meta under the input. */
  showMeta?: boolean;
};

export function MaskCustomDemo({ showMeta = true }: MaskCustomDemoProps) {
  const form = useForm<CustomForm>({ defaultValues: { code: "" } });
  const { code } = useViraMask({
    form,
    schema: {
      code: {
        mask: "aaa-999",
        transform: "uppercase",
      },
    },
  });

  const { rawValue, ...inputProps } = code;

  return (
    <div className="w-full space-y-1.5">
      <Input {...inputProps} placeholder="ABC-123" />
      {showMeta ? <MaskFieldMeta rawValue={rawValue} value={code.value} /> : null}
    </div>
  );
}
