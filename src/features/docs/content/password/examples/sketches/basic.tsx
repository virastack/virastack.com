"use client";

import { useViraPassword } from "@virastack/password";

export function PasswordField() {
  const { inputProps, btnProps } = useViraPassword();

  return (
    <>
      <label htmlFor={inputProps.id}>Password</label>
      <div>
        <input {...inputProps} placeholder="Your password" />
        <button {...btnProps} />
      </div>
    </>
  );
}
