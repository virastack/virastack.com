"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useViraPassword } from "@virastack/password";
import { evaluate } from "@virastack/password/strength";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { policy } from "../password-policy";

const schema = z
  .object({ password: z.string(), confirm: z.string() })
  .superRefine(({ password, confirm }, ctx) => {
    for (const issue of evaluate(password, policy).issues) {
      ctx.addIssue({ code: "custom", path: ["password"], message: issue });
    }
    if (confirm !== password) {
      ctx.addIssue({ code: "custom", path: ["confirm"], message: "password.mismatch" });
    }
  });

export function SignupForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });
  const password = useWatch({ control: form.control, name: "password" });

  const { inputProps, btnProps, strength } = useViraPassword({ policy, value: password });
  const { inputProps: confirmProps, btnProps: confirmButton } = useViraPassword({
    matchWith: password,
  });

  return (
    <form
      method="post"
      onSubmit={form.handleSubmit((values) =>
        fetch("/api/signup", { method: "POST", body: JSON.stringify(values) }),
      )}
    >
      <input {...inputProps} {...form.register("password")} />
      <button {...btnProps} />
      <p>{strength?.level}</p>

      <input {...confirmProps} {...form.register("confirm")} />
      <button {...confirmButton} />

      <button type="submit">Sign up</button>
    </form>
  );
}
