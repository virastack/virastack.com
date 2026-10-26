"use client";

import { useActionState, useState } from "react";

import { useViraPassword } from "@virastack/password";

import { passwordMessages } from "../password-messages";
import { policy } from "../password-policy";
import { signup, type SignupState } from "../signup-action";

export function SignupForm() {
  const [state, action, pending] = useActionState<SignupState, FormData>(signup, null);
  const [password, setPassword] = useState("");

  // No form library: plain state; the form still posts its own FormData.
  const { inputProps, btnProps } = useViraPassword({
    policy,
    inputProps: {
      name: "password",
      value: password,
      onChange: (event) => setPassword(event.target.value),
    },
  });
  const { inputProps: confirmProps, btnProps: confirmButton } = useViraPassword({
    matchWith: password,
    inputProps: { name: "confirm" },
  });

  return (
    <form action={action}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        defaultValue="hello@virastack.com"
      />

      <label htmlFor={inputProps.id}>New password</label>
      <div>
        <input {...inputProps} />
        <button {...btnProps} />
      </div>

      <label htmlFor={confirmProps.id}>Confirm password</label>
      <div>
        <input {...confirmProps} />
        <button {...confirmButton} />
      </div>

      <button type="submit" disabled={pending}>
        Create account
      </button>

      {state?.ok && <p>The server accepted the password.</p>}
      {state && !state.ok && (
        <ul role="alert">
          {state.issues.map((issue) => (
            <li key={issue}>{passwordMessages[issue]}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
