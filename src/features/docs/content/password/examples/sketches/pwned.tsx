"use client";

import { useState, useTransition } from "react";

import { useViraPassword } from "@virastack/password";
import type { PwnedResult } from "@virastack/password/pwned";

import { checkPassword } from "../pwned-action";

export function LeakCheck() {
  const [result, setResult] = useState<PwnedResult | null>(null);
  const [pending, startTransition] = useTransition();
  const { inputProps, btnProps } = useViraPassword({
    inputProps: { name: "password", defaultValue: "password123" },
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password"));
    startTransition(async () => setResult(await checkPassword(password)));
  }

  return (
    // POST: a submit before hydration never puts the password in the URL.
    <form method="post" onSubmit={onSubmit}>
      <label htmlFor={inputProps.id}>Password</label>
      <div>
        <input {...inputProps} />
        <button {...btnProps} />
      </div>
      <button type="submit" disabled={pending}>
        Check leaks
      </button>

      <p aria-live="polite">
        {result?.status === "pwned" &&
          `Seen ${result.count.toLocaleString("en")} times in data breaches.`}
        {result?.status === "safe" && "Not found in known breaches."}
        {/* Fail open: never block the user because the check failed. */}
        {result?.status === "unknown" &&
          `Could not check (${result.reason}). The form still works.`}
      </p>
    </form>
  );
}
