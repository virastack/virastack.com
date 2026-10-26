"use client";

import { useState } from "react";

import { useViraMask } from "@virastack/mask";
import { useViraPassword } from "@virastack/password";
import { useForm, useWatch } from "react-hook-form";

import { passwordMessages } from "../password-messages";
import { policy } from "../password-policy";

type Values = { phone: string; password: string; confirm: string };

export function SignupForm() {
  const [values, setValues] = useState<Values | null>(null);
  // One form: React Hook Form holds every value. Mask and Password go on different inputs.
  const form = useForm<Values>({ defaultValues: { phone: "", password: "", confirm: "" } });
  const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } });
  const { errors } = form.formState;

  const password = useWatch({ control: form.control, name: "password" });
  const { inputProps, btnProps, rule, issues } = useViraPassword({ policy, value: password });
  const {
    inputProps: confirmProps,
    btnProps: confirmButton,
    rule: confirmRule,
  } = useViraPassword({ matchWith: password });

  return (
    <form method="post" onSubmit={form.handleSubmit(setValues)}>
      <label htmlFor="phone">Phone</label>
      <input id="phone" {...phone} placeholder="(555) 123 45 67" />

      <label htmlFor={inputProps.id}>New password</label>
      <div>
        {/* deps: re-check the confirm field when the password changes */}
        <input {...inputProps} {...form.register("password", { ...rule, deps: ["confirm"] })} />
        <button {...btnProps} />
      </div>
      {errors.password && <p role="alert">{passwordMessages[issues[0] ?? "password.tooShort"]}</p>}

      <label htmlFor={confirmProps.id}>Confirm password</label>
      <div>
        <input {...confirmProps} {...form.register("confirm", confirmRule)} />
        <button {...confirmButton} />
      </div>
      {errors.confirm && <p role="alert">{passwordMessages["password.mismatch"]}</p>}

      <button type="submit">Sign up</button>
      {values && (
        <pre>
          {JSON.stringify({ phone: values.phone, password: "•".repeat(values.password.length) })}
        </pre>
      )}
    </form>
  );
}
