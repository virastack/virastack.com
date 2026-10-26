"use client";

import { useState, useTransition, type FormEvent } from "react";

import { ChevronRightIcon } from "lucide-react";
import { useViraPassword } from "@virastack/password";
import type { PwnedResult } from "@virastack/password/pwned";
import { definePolicy } from "@virastack/password/strength";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkPasswordLeak } from "@/features/password/actions/check-pwned";
import { Link } from "@/i18n/routing";

const policy = definePolicy();
// Filled bars and colour per level: weak 1, fair 2, good 3, strong 4.
const bars = {
  weak: [1, "bg-red-500"],
  fair: [2, "bg-amber-500"],
  good: [3, "bg-lime-500"],
  strong: [4, "bg-green-600"],
} as const;

export function PasswordDemo() {
  const t = useTranslations("Password");
  const locale = useLocale();
  const [leak, setLeak] = useState<PwnedResult | null>(null);
  const [checking, startCheck] = useTransition();
  const { inputProps, btnProps, isVisible, strength, strengthProps } = useViraPassword({
    id: "password-landing-demo",
    defaultVisible: false,
    policy,
    inputProps: {
      name: "password",
      defaultValue: "password123",
      onChange: () => setLeak(null),
      className: "pr-10",
      placeholder: t("demoPlaceholder"),
    },
    btnProps: {
      className:
        "absolute inset-y-0 right-1 my-auto size-7 text-muted-foreground hover:text-foreground",
    },
  });

  const levels = {
    weak: t("demoLevelWeak"),
    fair: t("demoLevelFair"),
    good: t("demoLevelGood"),
    strong: t("demoLevelStrong"),
  };

  const { className: btnClassName, children, ...restBtnProps } = btnProps;
  const [filled, barColor] = strength && strength.length > 0 ? bars[strength.level] : [0, ""];

  function onCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");
    if (typeof password !== "string" || password === "") return;
    startCheck(async () => setLeak(await checkPasswordLeak(password)));
  }

  return (
    <section id="demo" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
      <Reveal className="mx-auto w-full max-w-md">
        {/* POST: a submit before hydration never puts the password in the URL. */}
        <form method="post" onSubmit={onCheck} className="space-y-3 p-5 sm:p-6">
          <div className="space-y-1.5">
            <Label htmlFor="password-landing-demo">{t("demoLabel")}</Label>
            <div className="relative w-full">
              <Input {...inputProps} />
              <Button variant="ghost" size="icon-sm" {...restBtnProps} className={cn(btnClassName)}>
                {children}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1" aria-hidden>
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={cn(
                  "h-1 rounded-full transition-colors",
                  filled >= step ? barColor : "bg-muted",
                )}
              />
            ))}
          </div>

          <div className="space-y-1 text-xs text-muted-foreground">
            <p {...strengthProps}>
              {t("demoStrength")}: {strength ? levels[strength.level] : null}
            </p>
            <p>
              {t("demoStatus")}: {isVisible ? t("demoVisible") : t("demoHidden")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="outline" size="sm" disabled={checking}>
              {t("demoCheckLeak")}
            </Button>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {leak?.status === "pwned" &&
                t("demoLeakPwned", { count: leak.count.toLocaleString(locale) })}
              {leak?.status === "safe" && t("demoLeakSafe")}
              {leak?.status === "unknown" && t("demoLeakUnknown")}
            </p>
          </div>
        </form>

        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/password/examples" />}
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
