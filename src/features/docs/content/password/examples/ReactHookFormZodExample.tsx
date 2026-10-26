"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { mergeProps, useViraPassword } from "@virastack/password";
import { evaluate, type PasswordIssue } from "@virastack/password/strength";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { PasswordInput } from "./password-input";
import { passwordMessages } from "./password-messages";
import { policy } from "./password-policy";

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

type Values = z.infer<typeof schema>;

export function ReactHookFormZodExample() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });
  const [password, confirmValue] = useWatch({
    control: form.control,
    name: ["password", "confirm"],
  });
  const { errors } = form.formState;

  // value from useWatch(): reset() and setValue() don't fire input events.
  const pw = useViraPassword({ policy, value: password });
  const confirm = useViraPassword({ matchWith: password, value: confirmValue });

  return (
    <form
      // POST: a submit before hydration never puts the password in the URL.
      method="post"
      onSubmit={form.handleSubmit(() => setSubmitted(true))}
      className="grid gap-3"
    >
      <PasswordInput
        label="New password"
        pw={{ ...pw, inputProps: mergeProps(pw.inputProps, form.register("password")) }}
      />
      {errors.password && (
        <p className="text-xs text-destructive">
          {passwordMessages[errors.password.message as PasswordIssue]}
        </p>
      )}

      <PasswordInput
        label="Confirm password"
        pw={{ ...confirm, inputProps: mergeProps(confirm.inputProps, form.register("confirm")) }}
      />
      {errors.confirm && (
        <p className="text-xs text-destructive">
          {passwordMessages[errors.confirm.message as PasswordIssue]}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit">Create account</Button>
        <Button type="button" variant="outline" onClick={() => (form.reset(), setSubmitted(false))}>
          Reset
        </Button>
      </div>
      {submitted && (
        <p className="text-xs text-green-600">Valid. The password was hidden on submit.</p>
      )}
    </form>
  );
}
