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
        isStyled
          ? "text-teal-700 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
          : "text-teal-700",
      )}
    >
      {label}
    </button>
  );
}
