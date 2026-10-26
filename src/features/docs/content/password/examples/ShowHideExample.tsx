"use client";

import { useViraPassword } from "@virastack/password";

import { PasswordInput } from "./password-input";

export function ShowHideExample() {
  const pw = useViraPassword({ inputProps: { placeholder: "Your password" } });

  return <PasswordInput label="Password" pw={pw} />;
}
