"use client";

import { useViraPassword } from "@virastack/password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordField() {
  const { inputProps, btnProps } = useViraPassword({
    inputProps: { className: "pr-10" },
  });

  const { children, ...restBtn } = btnProps;

  return (
    <div className="relative">
      <Input {...inputProps} placeholder="Your password" />
      <Button
        variant="ghost"
        size="icon-sm"
        {...restBtn}
        className="absolute inset-y-0 right-1 my-auto"
      >
        {children}
      </Button>
    </div>
  );
}
