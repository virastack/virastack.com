"use client";

import { Fragment, useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { createMask, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import type { ThemedToken } from "shiki/core";

import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/copy-button";
import { TanstackLogo } from "@/components/shared/TanstackLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_PATH_MASK } from "@/features/start/constants/page-path-mask.constants";
import { buildFeatureRoute, type FeatureRouteInfo } from "@/features/start/helpers/feature-route";
import {
  filterPillClassName,
  filterPillStateClassName,
} from "@/features/start/helpers/filter-pill";
import { tokenizeTsx } from "@/features/start/helpers/highlight-tsx";
import {
  useFeatureInstallStore,
  type InstallFramework,
} from "@/features/start/stores/feature-install.store";

const FRAMEWORKS = [
  {
    id: "nextjs",
    label: "Next.js",
    icon: <NextjsIconDark className="size-4 shrink-0 dark:invert" aria-hidden />,
  },
  { id: "tanstack", label: "TanStack Start", icon: <TanstackLogo className="size-4 shrink-0" /> },
] as const satisfies readonly { id: InstallFramework; label: string; icon: ReactNode }[];

const pageMask = createMask(PAGE_PATH_MASK);

/** Highlighted lines once Shiki has loaded; plain text until then and if it fails. */
function useTsxTokens(code: string) {
  const [result, setResult] = useState<{ code: string; tokens: ThemedToken[][] } | null>(null);

  useEffect(() => {
    let isCurrent = true;
    tokenizeTsx(code)
      .then((tokens) => {
        if (isCurrent) setResult({ code, tokens });
      })
      .catch(() => {});

    return () => {
      isCurrent = false;
    };
  }, [code]);

  // Tokens of an older code would show stale text, so they wait for their own code.
  return result?.code === code ? result.tokens : null;
}

function CopyableCode({
  code,
  disabled,
  label,
  wrap = false,
  tokens,
}: {
  code: string;
  disabled: boolean;
  label?: string;
  wrap?: boolean;
  tokens?: ThemedToken[][] | null;
}) {
  return (
    <div className="relative min-w-0 rounded-lg border border-border bg-muted/30">
      <pre
        className={cn(
          "max-h-96 overflow-auto p-3 pr-11 font-mono text-xs leading-relaxed text-foreground",
          wrap ? "whitespace-pre-wrap" : "whitespace-pre",
          disabled && "opacity-50",
          "[&_span]:text-(color:--shiki-light) dark:[&_span]:text-(color:--shiki-dark)",
        )}
      >
        {tokens
          ? tokens.map((line, index) => (
              <Fragment key={index}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} style={token.htmlStyle as CSSProperties}>
                    {token.content}
                  </span>
                ))}
                {index < tokens.length - 1 ? "\n" : null}
              </Fragment>
            ))
          : code}
      </pre>
      <CopyButton
        text={code}
        disabled={disabled}
        variant="ghost"
        size="icon-sm"
        className="absolute top-1.5 right-1.5"
        {...(label ? { "aria-label": label } : {})}
      />
    </div>
  );
}

/** Builds the page for a person's stack. Nothing here writes to a project; it only makes text. */
export function FeatureInstall({ route }: { route: FeatureRouteInfo }) {
  const t = useTranslations("StartFeatureCatalog.detail");
  const { framework, i18n, setFramework, setI18n } = useFeatureInstallStore();
  const defaultPath = `/${route.feature}`;
  const form = useForm<{ path: string }>({
    defaultValues: { path: defaultPath },
    mode: "onTouched",
  });
  const { path: pathField } = useViraMask(form, { path: PAGE_PATH_MASK });
  const typedPath = useWatch({ control: form.control, name: "path" });

  useEffect(() => {
    void useFeatureInstallStore.persist.rehydrate();
  }, []);

  const isValid = Boolean(typedPath) && !pageMask.validate(typedPath);
  // While someone types `/team/`, the error waits until they leave the field.
  const showError = !isValid && Boolean(form.formState.touchedFields.path);
  const path = isValid ? typedPath : defaultPath;
  const { file, code } = buildFeatureRoute(route, { framework, i18n, path });
  const frameworkLabel = FRAMEWORKS.find(({ id }) => id === framework)?.label;
  const command = `npx virastack add ${route.feature}`;
  const tokens = useTsxTokens(code);
  const prompt = t("setupPrompt", {
    feature: route.feature,
    component: route.component,
    stack: i18n ? `${frameworkLabel} + i18n` : `${frameworkLabel}`,
    framework,
    file,
    code: code.trimEnd(),
  });

  return (
    <section aria-labelledby="feature-install" className="mt-6 space-y-4">
      <h2 id="feature-install" className="text-xl font-semibold text-foreground">
        {t("installTitle")}
      </h2>
      <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
        {t("installIntro")}
      </p>

      <div className="grid gap-4 md:grid-cols-[auto_auto_minmax(0,1fr)] md:items-start">
        <div role="group" aria-labelledby="install-framework" className="space-y-2">
          <p id="install-framework" className="text-sm font-medium text-foreground">
            {t("frameworkLabel")}
          </p>
          <div className="flex flex-wrap gap-2">
            {FRAMEWORKS.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={framework === id}
                onClick={() => setFramework(id)}
                className={cn(
                  filterPillClassName,
                  filterPillStateClassName(framework === id),
                  "gap-1.5",
                )}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        <div role="group" aria-labelledby="install-i18n" className="space-y-2">
          <p id="install-i18n" className="text-sm font-medium text-foreground">
            i18n
          </p>
          <div className="flex flex-wrap gap-2">
            {[false, true].map((value) => (
              <button
                key={String(value)}
                type="button"
                aria-pressed={i18n === value}
                onClick={() => setI18n(value)}
                className={cn(filterPillClassName, filterPillStateClassName(i18n === value))}
              >
                {t(value ? "i18nOn" : "i18nOff")}
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="install-path">{t("pathLabel")}</Label>
          <Input
            {...pathField}
            id="install-path"
            spellCheck={false}
            aria-invalid={showError}
            aria-describedby={showError ? "install-path-error" : undefined}
            className="font-mono"
          />
          {showError ? (
            <p id="install-path-error" role="alert" className="text-xs text-destructive">
              {t("pathError")}
            </p>
          ) : null}
        </div>
      </div>

      <Tabs defaultValue="prompt">
        <TabsList>
          <TabsTrigger value="prompt">{t("tabPrompt")}</TabsTrigger>
          <TabsTrigger value="manual">{t("tabManual")}</TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="min-w-0">
          <CopyableCode code={prompt} disabled={!isValid} label={t("copyPrompt")} wrap />
        </TabsContent>

        <TabsContent value="manual" className="min-w-0">
          <ol className="list-decimal space-y-4 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/60">
            <li className="space-y-2">
              <p>{t("manualAdd")}</p>
              <CopyableCode code={command} disabled={false} />
            </li>
            <li className="space-y-2">
              <p>
                {t.rich("manualPage", {
                  file,
                  code: (chunks) => (
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs break-all text-foreground">
                      {chunks}
                    </code>
                  ),
                })}
              </p>
              <CopyableCode code={code} disabled={!isValid} tokens={tokens} />
            </li>
            <li>
              {t.rich("manualRun", {
                path,
                code: (chunks) => (
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs break-all text-foreground">
                    {chunks}
                  </code>
                ),
              })}
            </li>
          </ol>
        </TabsContent>
      </Tabs>
    </section>
  );
}
