"use client";

import { useViraPassword } from "@virastack/password";

import { policy } from "../password-policy";

type Props = { email: string; name: string };

export function NewPasswordField({ email, name }: Props) {
  // "hello@virastack.com" → "hello"; "Vira Stack" → "vira", "stack"
  const { inputProps, btnProps, issues } = useViraPassword({ policy, forbidden: [email, name] });

  return (
    <>
      <input {...inputProps} />
      <button {...btnProps} />
      {issues.includes("password.containsPersonalInfo") && (
        <p>Don&apos;t use your name or email.</p>
      )}
    </>
  );
}
