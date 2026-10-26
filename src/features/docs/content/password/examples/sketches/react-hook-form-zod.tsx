"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useViraPassword } from "@virastack/password";
import { evaluate, type PasswordIssue } from "@virastack/password/strength";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { passwordMessages } from "../password-messages";
import { policy } from "../password-policy";

// The same policy inside a Zod schema: errors are keys, messages come from your map.
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
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });
  const { errors } = form.formState;

  // value from useWatch: reset() and setValue() don't fire input events.
  const password = useWatch({ control: form.control, name: "password" });
  const { inputProps, btnProps } = useViraPassword({ policy, value: password });
  const { inputProps: confirmProps, btnProps: confirmButton } = useViraPassword({
    matchWith: password,
  });

  return (
    <form method="post" onSubmit={form.handleSubmit(() => setSubmitted(true))}>
      <label htmlFor={inputProps.id}>New password</label>
      <div>
        <input {...inputProps} {...form.register("password")} />
        <button {...btnProps} />
      </div>
      {errors.password && (
        <p role="alert">{passwordMessages[errors.password.message as PasswordIssue]}</p>
      )}

      <label htmlFor={confirmProps.id}>Confirm password</label>
      <div>
        <input {...confirmProps} {...form.register("confirm")} />
        <button {...confirmButton} />
      </div>
      {errors.confirm && (
        <p role="alert">{passwordMessages[errors.confirm.message as PasswordIssue]}</p>
      )}

      <div>
        <button type="submit">Create account</button>
        <button type="button" onClick={() => (form.reset(), setSubmitted(false))}>
          Reset
        </button>
      </div>
      {submitted && <p>Valid. The password was hidden on submit.</p>}
    </form>
  );
}
