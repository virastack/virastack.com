"use client";

import { useViraMask } from "@virastack/mask";
import { useViraPassword } from "@virastack/password";
import { useForm, useWatch } from "react-hook-form";

import { policy } from "../password-policy";

export function SignupForm() {
  const form = useForm({ defaultValues: { phone: "", password: "", confirm: "" } });
  const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } });
  const password = useWatch({ control: form.control, name: "password" });

  const { inputProps, btnProps, rule } = useViraPassword({ policy, value: password });
  const {
    inputProps: confirmProps,
    btnProps: confirmButton,
    rule: confirmRule,
  } = useViraPassword({ matchWith: password });

  return (
    <form
      method="post"
      onSubmit={form.handleSubmit((values) =>
        fetch("/api/signup", { method: "POST", body: JSON.stringify(values) }),
      )}
    >
      <input {...phone} />

      <input {...inputProps} {...form.register("password", { ...rule, deps: ["confirm"] })} />
      <button {...btnProps} />

      <input {...confirmProps} {...form.register("confirm", confirmRule)} />
      <button {...confirmButton} />

      <button type="submit">Sign up</button>
    </form>
  );
}
