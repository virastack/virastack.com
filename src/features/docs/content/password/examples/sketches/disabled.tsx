"use client";

import { useViraPassword } from "@virastack/password";

export function LockedPasswordField() {
  // or readOnly: true (read-only input, disabled toggle)
  const { inputProps, btnProps } = useViraPassword({ disabled: true });

  return (
    <>
      <label htmlFor={inputProps.id}>Password</label>
      <div>
        <input {...inputProps} defaultValue="secret" />
        <button {...btnProps} />
      </div>
      <p>The toggle is locked while the field is disabled.</p>
    </>
  );
}
