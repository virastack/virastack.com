"use client";

import { useState, type FormEvent } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { convertNpmCommand } from "@/lib/convert-npm-command";
import { cn } from "@/lib/utils";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { CodeBlockCommand, usePackageManager } from "@/components/code-block-command";
import { Button } from "@/components/ui/button";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import {
  buildStartCliCommand,
  type StartCliTemplate,
  type StartCliTool,
} from "@/features/docs/lib/build-start-cli-command";
import { guideProductTags, guideStackTags } from "@/features/guide/components/GuideRichText";

const NAME_PLACEHOLDER = "my-app";
const DEFAULT_PACKAGE_COMMANDS = convertNpmCommand("npx virastack@latest");

const QUESTIONNAIRE_ITEMS = [
  { name: "name", required: true },
  {
    name: "template",
    required: true,
    choices: [{ value: "nextjs" }, { value: "tanstack" }],
  },
  {
    name: "i18n",
    required: true,
    choices: [{ value: "yes" }, { value: "no" }],
  },
  {
    name: "tools",
    required: false,
    choices: [{ value: "none" }, { value: "mask" }, { value: "password" }],
  },
  {
    name: "result",
    required: false,
    choices: [{ value: "ready" }],
  },
] as const;

/**
 * Step-by-step CLI questionnaire with a live install command.
 */
export function StartCliCommandBuilder() {
  const t = useTranslations("DocsStart");
  const [packageManager] = usePackageManager();
  const [name, setName] = useState("");
  const [template, setTemplate] = useState<StartCliTemplate | null>(null);
  const [i18n, setI18n] = useState<boolean | null>(null);
  const [tools, setTools] = useState<StartCliTool[]>([]);
  const [activeItem, setActiveItem] = useState("name");
  const { copy } = useCopyToClipboard({
    onCopySuccess: () => {
      toast.success(t("cliBuilderCopied"));
    },
    onCopyError: () => {
      toast.error(t("cliBuilderCopyFailed"));
    },
  });

  const stackTags = guideStackTags({ linked: false });
  const productTags = guideProductTags({
    ids: ["mask", "password"] as const,
    linked: false,
  });

  const command = buildStartCliCommand({
    name,
    template,
    i18n,
    tools,
    turkishPrompts: false,
    skipInstall: false,
  });
  const packageCommands = convertNpmCommand(command);

  const stepCount = QUESTIONNAIRE_ITEMS.length;
  const stepIndex = Math.max(
    0,
    QUESTIONNAIRE_ITEMS.findIndex((item) => item.name === activeItem),
  );
  const currentStep = stepIndex + 1;

  function toggleTool(tool: StartCliTool, checked: boolean): void {
    setTools((current) => {
      if (checked) {
        return current.includes(tool) ? current : [...current, tool];
      }
      return current.filter((item) => item !== tool);
    });
  }

  function resolveCommandToCopy(): string {
    if (packageManager === "prompt") {
      return packageCommands.pnpm;
    }
    return packageCommands[packageManager] || packageCommands.pnpm;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void copy(resolveCommandToCopy());
  }

  function handleReset(): void {
    setName("");
    setTemplate(null);
    setI18n(null);
    setTools([]);
    setActiveItem("name");
  }

  return (
    <div className="not-prose my-6 space-y-6">
      <CodeBlockCommand wrap {...DEFAULT_PACKAGE_COMMANDS} />

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="mt-0 text-lg font-semibold tracking-tight text-foreground">
            {t("cliBuilderTitle")}
          </h3>
          <div className="flex max-w-xs flex-col gap-1.5">
            <p className="text-sm text-muted-foreground">
              {t("cliBuilderProgress", { current: currentStep, total: stepCount })}
            </p>
            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={stepCount}
              aria-valuenow={currentStep}
              aria-label={t("cliBuilderProgress", {
                current: currentStep,
                total: stepCount,
              })}
              className="flex gap-1"
            >
              {QUESTIONNAIRE_ITEMS.map((item, index) => (
                <div
                  key={item.name}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-200 ease-out",
                    index < currentStep ? "bg-foreground" : "bg-muted",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <Questionnaire
          items={QUESTIONNAIRE_ITEMS}
          onItemChange={setActiveItem}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <QuestionnaireItem name="name" required>
            <QuestionnaireTitle>{t("cliBuilderName")}</QuestionnaireTitle>
            <QuestionnaireDescription>{t("cliBuilderNameDesc")}</QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireInput
                aria-label={t("cliBuilderName")}
                placeholder={NAME_PLACEHOLDER}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
            </QuestionnaireChoices>
            <QuestionnaireError>{t("cliBuilderErrorRequired")}</QuestionnaireError>
          </QuestionnaireItem>

          <QuestionnaireItem name="template" required>
            <QuestionnaireTitle>{t("cliBuilderTemplate")}</QuestionnaireTitle>
            <QuestionnaireDescription>{t("cliBuilderTemplateDesc")}</QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice
                value="nextjs"
                checked={template === "nextjs"}
                onChange={() => setTemplate("nextjs")}
              >
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-medium [&_span[aria-hidden]]:size-5 [&_span[aria-hidden]]:align-middle">
                    {t.rich("cliBuilderTemplateNext", {
                      nextjs: stackTags.nextjs,
                    })}
                  </span>
                  <span className="text-muted-foreground">{t("cliBuilderTemplateNextHint")}</span>
                </span>
              </QuestionnaireChoice>
              <QuestionnaireChoice
                value="tanstack"
                checked={template === "tanstack"}
                onChange={() => setTemplate("tanstack")}
              >
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-medium [&_span[aria-hidden]]:size-5 [&_span[aria-hidden]]:align-middle">
                    {t.rich("cliBuilderTemplateTanstack", {
                      tanstack: stackTags.tanstack,
                    })}
                  </span>
                  <span className="text-muted-foreground">
                    {t("cliBuilderTemplateTanstackHint")}
                  </span>
                </span>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError>{t("cliBuilderErrorRequired")}</QuestionnaireError>
          </QuestionnaireItem>

          <QuestionnaireItem name="i18n" required>
            <QuestionnaireTitle>{t("cliBuilderI18n")}</QuestionnaireTitle>
            <QuestionnaireDescription>{t("cliBuilderI18nDesc")}</QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice
                value="yes"
                checked={i18n === true}
                onChange={() => setI18n(true)}
              >
                <span className="font-medium">{t("cliBuilderI18nYes")}</span>
              </QuestionnaireChoice>
              <QuestionnaireChoice
                value="no"
                checked={i18n === false}
                onChange={() => setI18n(false)}
              >
                <span className="font-medium">{t("cliBuilderI18nNo")}</span>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError>{t("cliBuilderErrorRequired")}</QuestionnaireError>
          </QuestionnaireItem>

          <QuestionnaireItem name="tools" multiple>
            <QuestionnaireTitle>{t("cliBuilderTools")}</QuestionnaireTitle>
            <QuestionnaireDescription>{t("cliBuilderToolsDesc")}</QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice
                value="none"
                checked={tools.length === 0}
                onChange={() => setTools([])}
                className="hidden"
                aria-hidden
              >
                <span>{t("cliBuilderToolsNone")}</span>
              </QuestionnaireChoice>
              <QuestionnaireChoice
                value="mask"
                checked={tools.includes("mask")}
                onChange={(event) => toggleTool("mask", event.target.checked)}
              >
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-medium">
                    {t.rich("cliBuilderToolMask", {
                      mask: productTags.mask,
                    })}
                  </span>
                  <span className="text-muted-foreground">{t("cliBuilderToolMaskHint")}</span>
                </span>
              </QuestionnaireChoice>
              <QuestionnaireChoice
                value="password"
                checked={tools.includes("password")}
                onChange={(event) => toggleTool("password", event.target.checked)}
              >
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-medium">
                    {t.rich("cliBuilderToolPassword", {
                      password: productTags.password,
                    })}
                  </span>
                  <span className="text-muted-foreground">{t("cliBuilderToolPasswordHint")}</span>
                </span>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
          </QuestionnaireItem>

          <QuestionnaireItem name="result">
            <QuestionnaireTitle>{t("cliBuilderResult")}</QuestionnaireTitle>
            <QuestionnaireDescription>{t("cliBuilderResultDesc")}</QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="ready" checked className="hidden" aria-hidden>
                <span>{t("cliBuilderResultReady")}</span>
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <div data-slot="questionnaire-result">
              <CodeBlockCommand wrap {...packageCommands} />
            </div>
          </QuestionnaireItem>

          <QuestionnaireActions>
            <QuestionnairePrevious>{t("cliBuilderPrevious")}</QuestionnairePrevious>
            {activeItem !== "name" ? (
              <Button
                type="reset"
                variant="outline"
                className="col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0"
              >
                {t("cliBuilderReset")}
              </Button>
            ) : null}
            <QuestionnaireNext>{t("cliBuilderNext")}</QuestionnaireNext>
            <QuestionnaireSubmit>{t("cliBuilderCopy")}</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      </div>
    </div>
  );
}
