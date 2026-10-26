"use client";

import { useActionState } from "react";

import { useViraPassword } from "@virastack/password";

import { signup } from "../signup-action";

export function SignupForm() {
  const [state, action] = useActionState(signup, null);
  const { inputProps, btnProps } = useViraPassword({ inputProps: { name: "password" } });

  return (
    <form action={action}>
      <input name="email" type="email" autoComplete="username" />
      <input {...inputProps} />
      <button {...btnProps} />
      <button type="submit">Sign up</button>
      {state?.issues.map((issue) => (
        <p key={issue}>{issue}</p>
      ))}
    </form>
  );
}
