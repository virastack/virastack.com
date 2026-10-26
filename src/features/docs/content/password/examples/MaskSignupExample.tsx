"use client";

import { useState } from "react";

import { useViraMask } from "@virastack/mask";
import { mergeProps, useViraPassword } from "@virastack/password";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PasswordInput } from "./password-input";
import { passwordMessages } from "./password-messages";
import { policy } from "./password-policy";

type Values = { phone: string; password: string; confirm: string };

export function MaskSignupExample() {
  const [values, setValues] = useState<Values | null>(null);
  // One form: React Hook Form holds every value. Mask and Password go on different inputs.
  const form = useForm<Values>({ defaultValues: { phone: "", password: "", confirm: "" } });
  const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } });

  const [password, confirmValue] = useWatch({
    control: form.control,
    name: ["password", "confirm"],
  });
  const pw = useViraPassword({ policy, value: password });
  const confirm = useViraPassword({ matchWith: password, value: confirmValue });
  const { errors } = form.formState;

  return (
    <form
      // POST: a submit before hydration never puts the password in the URL.
      method="post"
      onSubmit={form.handleSubmit(setValues)}
      className="grid gap-3"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="mask-signup-phone">Phone</Label>
        <Input id="mask-signup-phone" {...phone} placeholder="(555) 123 45 67" />
      </div>
      <PasswordInput
        label="New password"
        pw={{
          ...pw,
          // deps: re-check the confirm field when the password changes
          inputProps: mergeProps(
            pw.inputProps,
            form.register("password", { ...pw.rule, deps: ["confirm"] }),
          ),
        }}
      />
      {errors.password && (
        <p className="text-xs text-destructive">
          {passwordMessages[pw.issues[0] ?? "password.tooShort"]}
        </p>
      )}
      <PasswordInput
        label="Confirm password"
        pw={{
          ...confirm,
          inputProps: mergeProps(confirm.inputProps, form.register("confirm", confirm.rule)),
        }}
      />
      {errors.confirm && (
        <p className="text-xs text-destructive">{passwordMessages["password.mismatch"]}</p>
      )}

      <Button type="submit">Sign up</Button>
      {values && (
        <pre className="overflow-x-auto rounded-md bg-muted p-2 text-xs">
          {JSON.stringify({ phone: values.phone, password: "•".repeat(values.password.length) })}
        </pre>
      )}
    </form>
  );
}
