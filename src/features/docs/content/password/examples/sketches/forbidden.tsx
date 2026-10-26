"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";

import { passwordMessages } from "../password-messages";
import { policy } from "../password-policy";

export function NewPasswordField() {
  const [email, setEmail] = useState("hello@virastack.com");
  const [name, setName] = useState("Vira Stack");

  // Email: the local part and its pieces ("hello"). Name: each word ("vira", "stack").
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
          : "Try vira-garden-path"}
      </p>
    </>
  );
}
