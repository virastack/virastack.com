"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";

import { PasswordInput } from "./password-input";

export function ConfirmPasswordExample() {
  const [password, setPassword] = useState("");

  const pw = useViraPassword({
    inputProps: { value: password, onChange: (event) => setPassword(event.target.value) },
  });
  // Same hook, with matchWith. Each field keeps its own show/hide button.
  const confirm = useViraPassword({ matchWith: password });

  return (
    <div className="grid gap-3">
      <PasswordInput label="New password" pw={pw} />
      <PasswordInput label="Confirm password" pw={confirm} />
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {confirm.matches === null && "Repeat the password."}
        {confirm.matches === true && "Passwords match."}
        {confirm.matches === false && "Passwords don't match."}
      </p>
    </div>
  );
}
