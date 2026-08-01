"use client";

import { ChevronRightIcon } from "lucide-react";
import { useViraPassword } from "@virastack/password";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

export function PasswordDemo() {
  const t = useTranslations("Password");
  const { inputProps, btnProps, isVisible } = useViraPassword({
    id: "password-landing-demo",
    defaultVisible: false,
    inputProps: {
      autoComplete: "current-password",
      defaultValue: "virastack",
      className: "pr-10",
      placeholder: t("demoPlaceholder"),
    },
    btnProps: {
      className:
        "absolute inset-y-0 right-1 my-auto size-7 text-muted-foreground hover:text-foreground",
    },
  });

  const { className: btnClassName, children, ...restBtnProps } = btnProps;

  return (
    <section id="demo" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
      <Reveal className="mx-auto w-full max-w-md">
        <div className="p-5 sm:p-6">
          <div className="space-y-1.5">
            <Label htmlFor="password-landing-demo">{t("demoLabel")}</Label>
            <div className="relative w-full">
              <Input {...inputProps} />
              <Button variant="ghost" size="icon-sm" {...restBtnProps} className={cn(btnClassName)}>
                {children}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("demoStatus")}: {isVisible ? t("demoVisible") : t("demoHidden")}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/password/docs/examples" />}
          >
            <span>{t("demoMoreExamples")}</span>
            <ChevronRightIcon
              data-icon="inline-end"
              className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
            />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
