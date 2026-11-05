"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";
import { useForm } from "react-hook-form";

import { passwordMessages } from "@/features/docs/content/password/examples/password-messages";
import { policy } from "@/features/docs/content/password/examples/password-policy";

type Values = { email: string; password: string; confirm: string };

/** The message for an issue key the rule put on the field. */
function issueText(message: string | undefined) {
  return Object.entries(passwordMessages).find(([issue]) => issue === message)?.[1];
}

export function SignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<Values>({
    defaultValues: { email: "selin@example.com", password: "", confirm: "" },
  });
  const { errors } = form.formState;

  // One entry per field, as in useViraMask. The confirm field is checked again when the
  // password changes, and the password when the email changes: no value, deps or trigger.
  const { password, confirm } = useViraPassword(form, {
    password: { policy, forbidden: ["email"] },
    confirm: { matchWith: "password" },
  });

  return (
    <form method="post" onSubmit={form.handleSubmit(() => setSubmitted(true))}>
      <label htmlFor="form-binding-email">Email</label>
      <input id="form-binding-email" type="email" {...form.register("email")} />

      <label htmlFor={password.inputProps.id}>New password</label>
      <div>
        <input {...password.inputProps} />
        <button {...password.btnProps} />
      </div>
      <p {...password.strengthProps}>
        {password.strength?.length
          ? `Strength: ${password.strength.level}`
          : "15 characters or more"}
      </p>
      {errors.password && <p role="alert">{issueText(errors.password.message)}</p>}

      <label htmlFor={confirm.inputProps.id}>Confirm password</label>
      <div>
        <input {...confirm.inputProps} />
        <button {...confirm.btnProps} />
      </div>
      {errors.confirm && <p role="alert">{issueText(errors.confirm.message)}</p>}

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
