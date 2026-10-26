"use client";

import { useViraPassword } from "@virastack/password";

export function PasswordField() {
  // icons takes any ReactNode, text included
  const { inputProps, btnProps } = useViraPassword({
    icons: { show: "Show", hide: "Hide" },
  });

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
