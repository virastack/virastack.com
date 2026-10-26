"use client";

import { useState, useTransition } from "react";

import { useViraPassword } from "@virastack/password";
import type { PwnedResult } from "@virastack/password/pwned";

import { Button } from "@/components/ui/button";

import { PasswordInput } from "./password-input";
import { checkPassword } from "./pwned-action";

export function PwnedExample() {
  const [result, setResult] = useState<PwnedResult | null>(null);
  const [pending, startTransition] = useTransition();
  const pw = useViraPassword({ inputProps: { defaultValue: "password123" } });

  return (
    <form
      // POST: a submit before hydration never puts the password in the URL.
      method="post"
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const password = new FormData(event.currentTarget).get("password");
        if (typeof password !== "string") return;
        startTransition(async () => setResult(await checkPassword(password)));
      }}
    >
      <PasswordInput
        label="Password"
        pw={{ ...pw, inputProps: { ...pw.inputProps, name: "password" } }}
      />
      <Button type="submit" variant="outline" disabled={pending}>
        Check leaks
      </Button>
      <p className="text-xs text-muted-foreground" aria-live="polite">
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
