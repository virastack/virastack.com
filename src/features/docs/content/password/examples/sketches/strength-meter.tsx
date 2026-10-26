"use client";

import { useViraPassword } from "@virastack/password";

import { passwordMessages } from "../password-messages";
import { policy } from "../password-policy";

// Filled bars per level
const bars = { weak: 1, fair: 2, good: 3, strong: 4 };

export function NewPasswordField() {
  const { inputProps, btnProps, strength, strengthProps, issues } = useViraPassword({ policy });
  const typed = (strength?.length ?? 0) > 0;
  const filled = typed && strength ? bars[strength.level] : 0;

  return (
    <>
      <label htmlFor={inputProps.id}>New password</label>
      <div>
        <input {...inputProps} />
        <button {...btnProps} />
      </div>

      {/* The bar is yours: the hook only gives the level. */}
      <div data-level={strength?.level}>
        {[1, 2, 3, 4].map((step) => (
          <span key={step} data-filled={step <= filled} />
        ))}
      </div>
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
