"use client";

import { Home, Star } from "lucide-react";
import { useViraPassword } from "@virastack/password";

export function PasswordField() {
  // show: while the password is hidden; hide: while it is visible
  const { inputProps, btnProps } = useViraPassword({
    icons: { show: <Star />, hide: <Home /> },
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
