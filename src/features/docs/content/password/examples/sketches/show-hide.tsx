"use client";

import { useViraPassword } from "@virastack/password";

export function PasswordField() {
  const { inputProps, btnProps, capsLock } = useViraPassword();

  return (
    <>
      <input {...inputProps} />
      <button {...btnProps} />
      {capsLock && <p>Caps Lock is on</p>}
    </>
  );
}
