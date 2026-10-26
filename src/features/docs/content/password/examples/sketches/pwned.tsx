"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";
import type { PwnedResult } from "@virastack/password/pwned";

import { checkPassword } from "../pwned-action";

export function LeakCheck() {
  const [result, setResult] = useState<PwnedResult | null>(null);
  const { inputProps, btnProps } = useViraPassword({ inputProps: { name: "password" } });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password"));
    setResult(await checkPassword(password));
  }

  return (
    <form method="post" onSubmit={onSubmit}>
      <input {...inputProps} />
      <button {...btnProps} />
      <button type="submit">Check</button>
      {result?.status === "pwned" && <p>Seen {result.count} times in breaches.</p>}
    </form>
  );
}
