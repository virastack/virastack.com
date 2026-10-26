"use client";

import { useViraPassword } from "@virastack/password";
import { definePolicy } from "@virastack/password/strength";

const policy = definePolicy(); // NIST: 15–64 characters

export function NewPasswordField() {
  const { inputProps, btnProps, strength, strengthProps, issues } = useViraPassword({ policy });

  return (
    <>
      <input {...inputProps} />
      <button {...btnProps} />
      <meter min={0} max={4} value={strength?.score} />
      <p {...strengthProps}>{strength?.level}</p>
      {/* keys like "password.tooShort": map them to your own text */}
      {issues.map((issue) => (
        <p key={issue}>{issue}</p>
      ))}
    </>
  );
}
