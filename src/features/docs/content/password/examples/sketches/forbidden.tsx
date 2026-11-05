"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";

import { passwordMessages } from "@/features/docs/content/password/examples/password-messages";
import { policy } from "@/features/docs/content/password/examples/password-policy";

export function NewPasswordField() {
  const [email, setEmail] = useState("hello@virastack.com");
  const [name, setName] = useState("Vira Stack");

  // Email: the local part ("hello"). Name: the whole name and each word ("virastack", "vira", "stack").
  // The whole password is compared: "vira-1990-2024" fails, "viral-garden-path" passes.
  const { inputProps, btnProps, issues, strengthProps } = useViraPassword({
    policy,
    forbidden: [email, name],
  });

  return (
    <>
      <label htmlFor="forbidden-email">Email</label>
      <input
        id="forbidden-email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="forbidden-name">Name</label>
      <input id="forbidden-name" value={name} onChange={(event) => setName(event.target.value)} />

      <label htmlFor={inputProps.id}>New password</label>
      <div>
        <input {...inputProps} />
        <button {...btnProps} />
      </div>

      <p {...strengthProps}>
        {issues.includes("password.containsPersonalInfo")
          ? passwordMessages["password.containsPersonalInfo"]
          : "Try vira-1990-2024, then viral-garden-path"}
      </p>
    </>
  );
}
