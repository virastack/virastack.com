"use client";

import { useEffect } from "react";

import { CheckIcon, SparklesIcon } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { buildStartCliCommand, START_CLI_AGENTS } from "@/helpers/build-start-cli-command";
import { isOneOf } from "@/helpers/is-one-of";

import { CopyButton } from "@/components/shared/CopyButton";
import { TanstackLogo } from "@/components/shared/TanstackLogo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Switch } from "@/components/ui/switch";
import {
  useFeatureInstallStore,
  type InstallVariant,
} from "@/features/start/stores/feature-install.store";

const FRAMEWORKS = [
  { value: "nextjs", label: "Next.js", i18nLibrary: "next-intl" },
  { value: "tanstack", label: "TanStack Start", i18nLibrary: "Paraglide JS" },
] as const;

const FRAMEWORK_VALUES = FRAMEWORKS.map(({ value }) => value);

/** Where each template keeps the page of a URL, for a module that brings no page. */
const PAGE_FILES = {
  nextjs: (feature) => `src/app/${feature}/page.tsx`,
  "nextjs-i18n": (feature) => `src/app/[locale]/${feature}/page.tsx`,
  tanstack: (feature) => `src/routes/${feature}/index.tsx`,
  "tanstack-i18n": (feature) => `src/routes/{-$lang}/${feature}/index.tsx`,
} as const satisfies Record<InstallVariant, (feature: string) => string>;

const optionClassName =
  "flex h-10 cursor-pointer items-center gap-2 rounded-md border border-border px-3 text-sm text-muted-foreground transition-colors hover:text-foreground has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50";
const checkedClassName =
  "has-data-checked:border-foreground/40 has-data-checked:bg-muted has-data-checked:text-foreground";

/** ViraStack turquoise (teal-700 on light, teal-500 on dark), the one filled button on the page. */
const brandButtonClassName = "bg-brand-virastack text-background hover:bg-brand-virastack/90";

export type FeaturePromptDialogProps = {
  feature: string;
  /** The component a page renders, for a module that brings no page. */
  component: string;
  /** Next.js: the `Suspense` fallback of `component`. */
  fallback?: string;
  /** TanStack Start: the search params the route definition spreads. */
  routeSearch?: { name: string; file: string };
  /** The URLs of the pages the module brings itself; the prompt then asks for no page. */
  pages?: readonly string[];
};

/** The module's prompt for the picked framework and i18n setup, shown before it is copied. */
export function FeaturePromptDialog({
  feature,
  component,
  fallback,
  routeSearch,
  pages,
}: FeaturePromptDialogProps) {
  const t = useTranslations("StartFeatureCatalog.detail");
  const tCommon = useTranslations("Common");
  const format = useFormatter();
  const framework = useFeatureInstallStore((state) => state.framework);
  const i18n = useFeatureInstallStore((state) => state.i18n);
  const setFramework = useFeatureInstallStore((state) => state.setFramework);
  const setI18n = useFeatureInstallStore((state) => state.setI18n);

  // The picker shares its choice with the Code tab, which keeps it in localStorage.
  useEffect(() => {
    void useFeatureInstallStore.persist.rehydrate();
  }, []);

  const picked = FRAMEWORKS.find(({ value }) => value === framework) ?? FRAMEWORKS[0];
  const variant: InstallVariant = i18n ? `${framework}-i18n` : framework;
  const command = buildStartCliCommand({
    name: ".",
    template: framework,
    agents: [...START_CLI_AGENTS],
    i18n,
    tools: [],
    turkishPrompts: false,
    skipInstall: false,
  });
  const project = i18n
    ? t("promptProjectI18n", { framework: picked.label, library: picked.i18nLibrary, command })
    : t("promptProject", { framework: picked.label, command });
  const i18nNote = i18n ? t("promptI18nNote") : "";
  const [firstPage] = pages ?? [];

  const prompt =
    pages && firstPage
      ? t("readyPromptPages", {
          feature,
          project,
          i18nNote,
          pages: format.list(
            pages.map((page) => `\`${page}\``),
            { type: "conjunction" },
          ),
          page: firstPage,
        })
      : t("readyPrompt", {
          feature,
          project,
          i18nNote,
          component,
          file: PAGE_FILES[variant](feature),
          notes: [
            framework === "nextjs" && fallback
              ? t("readyPromptFallback", { component, fallback })
              : "",
            framework === "tanstack" && routeSearch
              ? t("readyPromptSearch", { feature, ...routeSearch })
              : "",
          ].join(""),
        });

  return (
    <Dialog>
      <DialogTrigger render={<Button size="lg" className={brandButtonClassName} />}>
        <SparklesIcon aria-hidden />
        {t("promptButton")}
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("promptButton")}</DialogTitle>
          <DialogDescription>{t("promptDialogDesc")}</DialogDescription>
        </DialogHeader>

        <div className="grid min-w-0 gap-4">
          {/* One row with fixed columns, so a choice never moves its neighbours. */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <RadioGroup
              aria-label={t("promptFramework")}
              value={framework}
              onValueChange={(value) => {
                if (isOneOf(FRAMEWORK_VALUES, value)) setFramework(value);
              }}
              className="contents"
            >
              {FRAMEWORKS.map(({ value, label }) => (
                <label key={value} className={cn(optionClassName, checkedClassName, "group")}>
                  {/* A radio for the keyboard and screen readers, drawn as a checkbox. */}
                  <RadioGroupItem value={value} className="sr-only absolute" />
                  {value === "nextjs" ? (
                    <NextjsIconDark className="size-4 shrink-0 dark:invert" aria-hidden />
                  ) : (
                    <TanstackLogo className="size-4 shrink-0" />
                  )}
                  <span className="truncate">{label}</span>
                  <span
                    aria-hidden
                    className="ml-auto flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input text-primary-foreground group-has-data-checked:border-primary group-has-data-checked:bg-primary"
                  >
                    <CheckIcon className="size-3 opacity-0 group-has-data-checked:opacity-100" />
                  </span>
                </label>
              ))}
            </RadioGroup>
            <label className={cn(optionClassName, "max-sm:col-span-2")}>
              <Switch checked={i18n} onCheckedChange={setI18n} />
              {t("promptI18n")}
            </label>
          </div>

          <pre
            aria-label={t("promptLabel")}
            className="h-72 overflow-y-auto rounded-md border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground"
          >
            {prompt}
          </pre>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>{tCommon("close")}</DialogClose>
          <CopyButton
            text={prompt}
            size="default"
            idleIcon={<SparklesIcon />}
            className={brandButtonClassName}
          >
            {t("promptButton")}
          </CopyButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
