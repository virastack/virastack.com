"use client";

import { Home, Star } from "lucide-react";
import { useViraPassword } from "@virastack/password";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type PasswordDemoVariant =
  "basic" | "custom-icons" | "custom-text" | "disabled" | "prop-merge" | "programmatic";

type PasswordDemoProps = {
  variant?: PasswordDemoVariant;
  className?: string;
};

/**
 * Live password visibility demo for docs (used on hook page + examples).
 */
export function PasswordDemo({ variant = "basic", className }: PasswordDemoProps) {
  const t = useTranslations("DocsPassword");
  const disabled = variant === "disabled";
  const isTextToggle = variant === "custom-text";
  const isPropMerge = variant === "prop-merge";

  const { inputProps, btnProps, isVisible, setVisible } = useViraPassword({
    disabled,
    defaultVisible: false,
    icons:
      variant === "custom-icons"
        ? {
            show: <Star />,
            hide: <Home />,
          }
        : variant === "custom-text"
          ? {
              show: t("demoShow"),
              hide: t("demoHide"),
            }
          : undefined,
    id: `password-demo-${variant}`,
    inputProps: {
      name: isPropMerge ? "password" : undefined,
      autoComplete: isPropMerge ? "new-password" : "current-password",
      defaultValue: "virastack",
      className: isTextToggle ? "pr-16" : "pr-10",
      placeholder: isPropMerge
        ? t("demoPlaceholderNewPassword")
        : disabled
          ? t("demoPlaceholderLocked")
          : t("demoPlaceholderPassword"),
      onBlur:
        variant === "programmatic"
          ? () => {
              setVisible(false);
            }
          : undefined,
    },
    btnProps: {
      className: isTextToggle
        ? "absolute inset-y-0 right-1 my-auto h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
        : "absolute inset-y-0 right-1 my-auto size-7 text-muted-foreground hover:text-foreground",
    },
  });

  const { className: btnClassName, children, ...restBtnProps } = btnProps;

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="relative w-full">
        <Input {...inputProps} />
        <Button
          variant="ghost"
          size={isTextToggle ? "sm" : "icon-sm"}
          {...restBtnProps}
          className={cn(btnClassName)}
        >
          {children}
        </Button>
      </div>
      {variant === "programmatic" ? (
        <p className="text-xs text-muted-foreground">
          {t("demoStatusLabel", {
            status: isVisible ? t("demoStatusVisible") : t("demoStatusHidden"),
          })}
          {isVisible ? t("demoStatusBlurHint") : ""}
        </p>
      ) : null}
      {variant === "disabled" ? (
        <p className="text-xs text-muted-foreground">{t("demoDisabledHint")}</p>
      ) : null}
    </div>
  );
}
