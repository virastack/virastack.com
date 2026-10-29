"use client";

import { cn } from "@/lib/utils";

type GuideStepCtaProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isStyled: boolean;
};

export function GuideStepCta({ label, onClick, disabled, isStyled }: GuideStepCtaProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "cursor-pointer text-left underline underline-offset-2 transition-colors",
        disabled && "cursor-default no-underline opacity-70",
        isStyled ? "text-brand-start hover:opacity-80" : "text-brand-start",
      )}
    >
      {label}
    </button>
  );
}
