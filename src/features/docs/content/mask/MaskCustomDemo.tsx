"use client";

import { useViraMask } from "@virastack/mask";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

export function MaskCustomDemo() {
  const form = useForm({ defaultValues: { code: "" } });
  const { code } = useViraMask({
    form,
    schema: {
      code: {
        mask: "aaa-999",
        transform: "uppercase",
      },
    },
  });

  const { rawValue: _rawValue, ...inputProps } = code;

  return <Input {...inputProps} placeholder="ABC-123" />;
}
