"use client";

import { useViraPassword } from "@virastack/password";

import { cn } from "@/lib/utils";

import { PasswordInput } from "./password-input";
import { passwordMessages } from "./password-messages";
import { policy } from "./password-policy";

const colors = ["bg-red-500", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-green-600"];

export function StrengthMeterExample() {
  const pw = useViraPassword({ policy });
  const score = pw.strength?.score ?? 0;
  const length = pw.strength?.length ?? 0;

  return (
    <div className="grid gap-2">
      <PasswordInput label="New password" pw={pw} />

      {/* The bar is yours: the hook only gives the score. */}
      <div className="grid grid-cols-4 gap-1" aria-hidden>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={cn(
              "h-1 rounded-full",
              length > 0 && score >= step ? colors[score] : "bg-muted",
            )}
          />
        ))}
      </div>

      <p {...pw.strengthProps} className="text-xs text-muted-foreground">
        {length > 0 ? `Strength: ${pw.strength?.level}` : "15 characters or more"}
      </p>

      {length > 0 && (
        <ul className="list-disc pl-4 text-xs text-muted-foreground">
          {pw.issues.map((issue) => (
            <li key={issue}>{passwordMessages[issue]}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
