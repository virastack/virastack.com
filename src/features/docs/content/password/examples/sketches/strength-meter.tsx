"use client";

import { useViraPassword } from "@virastack/password";

import { passwordMessages } from "../password-messages";
import { policy } from "../password-policy";

export function NewPasswordField() {
  const { inputProps, btnProps, strength, strengthProps, issues } = useViraPassword({ policy });
  const typed = (strength?.length ?? 0) > 0;

  return (
    <>
      <label htmlFor={inputProps.id}>New password</label>
      <div>
        <input {...inputProps} />
        <button {...btnProps} />
      </div>

      {/* The bar is yours: the hook only gives the score (0–4). */}
      <meter min={0} max={4} value={strength?.score ?? 0} />
      <p {...strengthProps}>{typed ? `Strength: ${strength?.level}` : "15 characters or more"}</p>

      {typed && (
        <ul>
          {issues.map((issue) => (
            <li key={issue}>{passwordMessages[issue]}</li>
          ))}
        </ul>
      )}
    </>
  );
}
