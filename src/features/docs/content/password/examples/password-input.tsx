"use client";

import type { UseViraPasswordResult } from "@virastack/password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordInputProps = {
  label: string;
  pw: UseViraPasswordResult;
};

/** An input with a show/hide button and a Caps Lock hint. Bring your own styles. */
export function PasswordInput({ label, pw }: PasswordInputProps) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={pw.inputProps.id}>{label}</Label>
      <div className="relative">
        <Input {...pw.inputProps} className="pr-10" />
        <Button
          {...pw.btnProps}
          variant="ghost"
          size="icon-sm"
          className="absolute inset-y-0 right-1 my-auto text-muted-foreground"
        />
      </div>
      {pw.capsLock && <p className="text-xs text-amber-600">Caps Lock is on</p>}
    </div>
  );
}
