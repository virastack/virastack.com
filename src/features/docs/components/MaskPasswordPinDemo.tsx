"use client";

import type { ComponentProps } from "react";

import { useViraMask } from "@virastack/mask";
import { useViraPassword } from "@virastack/password";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";

type PinForm = {
  password: string;
  pin: string;
};

const masks = { pin: { mask: "999999" } } as const;

function ToggleInput({
  inputProps,
  btnProps,
}: {
  inputProps: ComponentProps<typeof Input>;
  btnProps: ComponentProps<"button">;
}) {
  const { className: _className, children, ...restBtnProps } = btnProps;
  return (
    <div className="relative w-full">
      <Input {...inputProps} className="pr-10" />
      <Button
        variant="ghost"
        size="icon-sm"
        {...restBtnProps}
        className="absolute inset-y-0 right-1 my-auto size-7 text-muted-foreground hover:text-foreground"
      >
        {children}
      </Button>
    </div>
  );
}

/**
 * ViraStack Mask and ViraStack Password on the same form: a plain password and a masked 6-digit PIN,
 * both with a show/hide toggle.
 */
export function MaskPasswordPinDemo() {
  const t = useTranslations("DocsMask");
  const form = useForm<PinForm>({ defaultValues: { password: "", pin: "" } });
  const { pin } = useViraMask(form, masks);
  const password = useViraPassword({ id: "mask-password-demo" });
  const pinPassword = useViraPassword({ id: "mask-pin-demo" });
  const [pinValue] = useWatch({ control: form.control, name: ["pin"] });

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="mask-password-demo">{t("demoPasswordLabel")}</Label>
        <ToggleInput
          inputProps={{
            ...form.register("password"),
            ...password.inputProps,
            autoComplete: "new-password",
          }}
          btnProps={password.btnProps}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="mask-pin-demo">{t("demoPinLabel")}</Label>
        <ToggleInput
          inputProps={{ ...pin, ...pinPassword.inputProps, placeholder: "••••••" }}
          btnProps={pinPassword.btnProps}
        />
        <MaskFieldMeta formValue={pinValue} display={pinValue} />
      </div>
    </div>
  );
}
