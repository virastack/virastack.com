"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";

export function NewPasswordFields() {
  const [password, setPassword] = useState("");

  const { inputProps, btnProps } = useViraPassword({
    inputProps: { value: password, onChange: (event) => setPassword(event.target.value) },
  });
  const {
    inputProps: confirmProps,
    btnProps: confirmButton,
    matches,
  } = useViraPassword({
    matchWith: password,
  });

  return (
    <>
      <input {...inputProps} />
      <button {...btnProps} />
      <input {...confirmProps} />
      <button {...confirmButton} />
      {matches === false && <p>Passwords don&apos;t match.</p>}
    </>
  );
}
