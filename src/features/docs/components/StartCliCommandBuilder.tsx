"use client";

import { useState, type ReactNode } from "react";

import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";
import { cn } from "@/lib/utils";

import { CodeBlockCommand } from "@/components/code-block-command";
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
  QuestionnaireProgress,
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

const ITEM_LAYOUT_CLASS = cn(
  "grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2",
  "[&_[data-slot=questionnaire-title]]:col-start-1 [&_[data-slot=questionnaire-title]]:row-start-1",
  "[&_[data-slot=questionnaire-description]]:col-start-1 [&_[data-slot=questionnaire-description]]:row-start-2",
  "[&_[data-slot=questionnaire-progress]]:col-start-2 [&_[data-slot=questionnaire-progress]]:row-span-2 [&_[data-slot=questionnaire-progress]]:row-start-1 [&_[data-slot=questionnaire-progress]]:self-start [&_[data-slot=questionnaire-progress]]:justify-self-end",
  "[&_[data-slot=questionnaire-choices]]:col-span-2",
  "[&_[data-slot=questionnaire-error]]:col-span-2",
  "[&_[data-slot=questionnaire-result]]:col-span-2",
);

/**
 * Step-by-step CLI questionnaire with a live install command.
 */
export function StartCliCommandBuilder() {
  const t = useTranslations("DocsStart");
  const [name, setName] = useState("");
  const [template, setTemplate] = useState<StartCliTemplate | null>(null);
  const [i18n, setI18n] = useState<boolean | null>(null);
  const [tools, setTools] = useState<StartCliTool[]>([]);
  const [activeItem, setActiveItem] = useState("name");

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

  function toggleTool(tool: StartCliTool, checked: boolean): void {
    setTools((current) => {
      if (checked) {
        return current.includes(tool) ? current : [...current, tool];
      }
      return current.filter((item) => item !== tool);
    });
  }

  function handleReset(): void {
    setName("");
    setTemplate(null);
    setI18n(null);
    setTools([]);
    setActiveItem("name");
  }

  function progressLabel(current: number, total: number): string {
    return t("cliBuilderProgress", { current, total });
  }

  return (
    <div className="not-prose my-6 space-y-6">
      <CodeBlockCommand wrap {...DEFAULT_PACKAGE_COMMANDS} />

      <div className="space-y-4">
        <h3 className="mt-0 text-lg font-semibold tracking-tight text-foreground">
          {t("cliBuilderTitle")}
        </h3>

        <Questionnaire
          items={QUESTIONNAIRE_ITEMS}
          onItemChange={setActiveItem}
          onReset={handleReset}
        >
          <QuestionnaireItem name="name" required className={ITEM_LAYOUT_CLASS}>
            <QuestionnaireTitle>{t("cliBuilderName")}</QuestionnaireTitle>
            <QuestionProgress label={progressLabel} />
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

          <QuestionnaireItem name="template" required className={ITEM_LAYOUT_CLASS}>
            <QuestionnaireTitle>{t("cliBuilderTemplate")}</QuestionnaireTitle>
            <QuestionProgress label={progressLabel} />
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

          <QuestionnaireItem name="i18n" required className={ITEM_LAYOUT_CLASS}>
            <QuestionnaireTitle>{t("cliBuilderI18n")}</QuestionnaireTitle>
            <QuestionProgress label={progressLabel} />
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

          <QuestionnaireItem name="tools" multiple className={ITEM_LAYOUT_CLASS}>
            <QuestionnaireTitle>{t("cliBuilderTools")}</QuestionnaireTitle>
            <QuestionProgress label={progressLabel} />
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

          <QuestionnaireItem name="result" className={ITEM_LAYOUT_CLASS}>
            <QuestionnaireTitle>{t("cliBuilderResult")}</QuestionnaireTitle>
            <QuestionProgress label={progressLabel} />
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
          </QuestionnaireActions>
        </Questionnaire>
      </div>
    </div>
  );
}

type QuestionProgressProps = {
  label: (current: number, total: number) => string;
};

function QuestionProgress({ label }: QuestionProgressProps): ReactNode {
  return (
    <QuestionnaireProgress
      render={(props, state) => {
        const { className, ...rest } = props;
        return (
          <div
            {...rest}
            className={cn(typeof className === "string" ? className : undefined, "text-right")}
          >
            {label(state.current, state.total)}
          </div>
        );
      }}
    />
  );
}
