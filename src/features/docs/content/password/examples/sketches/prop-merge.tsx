"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";

export function NewPasswordField() {
  const [toggles, setToggles] = useState(0);

  const { inputProps, btnProps } = useViraPassword({
    id: "signup-password",
    // merged into the input: your keys win, handlers run after the hook's
    inputProps: { name: "password", placeholder: "New password" },
    btnProps: { onClick: () => setToggles((count) => count + 1) },
  });

  return (
    <>
      <label htmlFor={inputProps.id}>New password</label>
      <div>
        <input {...inputProps} />
        <button {...btnProps} />
      </div>
      <p>Toggled {toggles} times</p>
    </>
  );
}
