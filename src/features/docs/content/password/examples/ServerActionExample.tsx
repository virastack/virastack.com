"use client";

import { useActionState, useState } from "react";

import { useViraPassword } from "@virastack/password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PasswordInput } from "./password-input";
import { passwordMessages } from "./password-messages";
import { policy } from "./password-policy";
import { signup, type SignupState } from "./signup-action";

export function ServerActionExample() {
  const [state, action, pending] = useActionState<SignupState, FormData>(signup, null);

  // No form library: plain state; the form still posts its own FormData.
  const [password, setPassword] = useState("");
  const pw = useViraPassword({
    policy,
    inputProps: {
      name: "password",
      value: password,
      onChange: (event) => setPassword(event.target.value),
    },
  });
  const confirm = useViraPassword({ matchWith: password, inputProps: { name: "confirm" } });

  return (
    <form action={action} className="grid gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="server-email">Email</Label>
        <Input
          id="server-email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue="ada@example.com"
        />
      </div>
      <PasswordInput label="New password" pw={pw} />
      <PasswordInput label="Confirm password" pw={confirm} />
      <Button type="submit" disabled={pending}>
        Create account
      </Button>

      {state?.ok && <p className="text-xs text-green-600">The server accepted the password.</p>}
      {state && !state.ok && (
        <ul className="list-disc pl-4 text-xs text-destructive">
          {state.issues.map((issue) => (
            <li key={issue}>{passwordMessages[issue]}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
