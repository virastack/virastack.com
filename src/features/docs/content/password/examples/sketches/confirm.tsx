"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";

export function NewPasswordFields() {
  const [password, setPassword] = useState("");

  const { inputProps, btnProps } = useViraPassword({
    inputProps: { value: password, onChange: (event) => setPassword(event.target.value) },
  });
  // Same hook with matchWith. Each field keeps its own show/hide button.
  const {
    inputProps: confirmProps,
    btnProps: confirmButton,
    matches,
  } = useViraPassword({ matchWith: password });

  return (
    <>
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

      <p aria-live="polite">
        {matches === null && "Repeat the password."}
        {matches === true && "Passwords match."}
        {matches === false && "Passwords don't match."}
      </p>
    </>
  );
}
