"use client";

import { useState } from "react";

import { useViraPassword } from "@virastack/password";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PasswordInput } from "./password-input";
import { passwordMessages } from "./password-messages";
import { policy } from "./password-policy";

export function ForbiddenExample() {
  const [email, setEmail] = useState("ada.lovelace@example.com");
  const [name, setName] = useState("Ada Lovelace");

  // Email: the local part and its pieces ("ada", "lovelace"). Name: each word.
  const pw = useViraPassword({ policy, forbidden: [email, name] });

  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="forbidden-email">Email</Label>
        <Input
          id="forbidden-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="forbidden-name">Name</Label>
        <Input id="forbidden-name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <PasswordInput label="New password" pw={pw} />
      <p {...pw.strengthProps} className="text-xs text-muted-foreground">
        {pw.issues.includes("password.containsPersonalInfo")
          ? passwordMessages["password.containsPersonalInfo"]
          : "Try lovelace-garden-path"}
      </p>
    </div>
  );
}
