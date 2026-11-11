"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { CheckIcon, PartyPopperIcon, RotateCcwIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { useLessonProgress } from "@/features/academy/hooks/use-academy-progress";
import { useAcademyProgressStore } from "@/features/academy/stores/academy-progress.store";
import type { AcademyQuizItem } from "@/features/academy/types/academy.types";

const INLINE_CODE_CLASS =
  "rounded-md border border-border bg-muted/40 px-1 py-0.5 font-mono text-[0.85em] font-normal text-foreground";

/** Quiz copy keeps the lesson's inline code: text between backticks renders as `<code>`. */
function withInlineCode(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.length > 2 && part.startsWith("`") && part.endsWith("`") ? (
      <code key={`${index}-${part}`} className={INLINE_CODE_CLASS}>
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

// The choice's own indicator is restyled from outside, so `components/ui` stays as shadcn ships it.
const choiceResultClass = {
  correct:
    "border-success bg-success/10 data-checked:border-success data-checked:bg-success/10 dark:data-checked:bg-success/10 [&_[data-slot=questionnaire-choice-indicator]]:border-success [&_[data-slot=questionnaire-choice-indicator]]:bg-success",
  wrong:
    "border-destructive bg-destructive/10 data-checked:border-destructive data-checked:bg-destructive/10 dark:data-checked:bg-destructive/10 [&_[data-slot=questionnaire-choice-indicator]]:border-destructive [&_[data-slot=questionnaire-choice-indicator]]:bg-destructive",
  idle: "text-muted-foreground",
} as const;

type ChoiceResult = keyof typeof choiceResultClass;

function getChoiceResult(option: number, picked: number, answer: number): ChoiceResult {
  if (option === answer) return "correct";
  if (option === picked) return "wrong";
  return "idle";
}

const itemName = (index: number) => `question-${index + 1}`;

type QuizRunProps = {
  questions: readonly AcademyQuizItem[];
  onFinish: (score: number) => void;
};

function QuizRun({ questions, onFinish }: QuizRunProps) {
  const t = useTranslations("Academy");
  const [current, setCurrent] = useState(0);
  const [picks, setPicks] = useState<readonly (number | null)[]>(() => questions.map(() => null));

  function pick(questionIndex: number, option: number) {
    // The first pick is final: the answer is revealed at once.
    if (picks[questionIndex] !== null) return;
    setPicks(picks.map((value, index) => (index === questionIndex ? option : value)));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const score = questions.filter((question, index) => picks[index] === question.answer).length;
    onFinish(score);
  }

  const answered = picks[current] !== null && picks[current] !== undefined;

  return (
    <Questionnaire
      item={itemName(current)}
      onItemChange={(name) => setCurrent(Number(name.replace("question-", "")) - 1)}
      onSubmit={handleSubmit}
      aria-label={t("quizTitle")}
    >
      <QuestionnaireProgress aria-label={t("quizProgressAria")}>
        {t("quizProgress", { current: current + 1, total: questions.length })}
      </QuestionnaireProgress>

      {questions.map((question, questionIndex) => {
        const picked = picks[questionIndex] ?? null;

        return (
          <QuestionnaireItem key={question.question} name={itemName(questionIndex)} required>
            <QuestionnaireTitle className="text-base leading-relaxed md:text-lg">
              {withInlineCode(question.question)}
            </QuestionnaireTitle>

            {question.codeHtml ? (
              <div
                className="academy-code not-prose my-1 text-sm"
                dangerouslySetInnerHTML={{ __html: question.codeHtml }}
              />
            ) : null}

            <QuestionnaireChoices>
              {question.options.map((option, optionIndex) => {
                const result =
                  picked === null ? null : getChoiceResult(optionIndex, picked, question.answer);

                return (
                  <QuestionnaireChoice
                    key={option}
                    value={String(optionIndex)}
                    checked={picked === optionIndex}
                    onChange={() => pick(questionIndex, optionIndex)}
                    data-result={result ?? undefined}
                    className={cn(
                      result && "cursor-default hover:bg-transparent",
                      result && choiceResultClass[result],
                    )}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0 text-pretty">{withInlineCode(option)}</span>
                      {result === "correct" ? (
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                      ) : null}
                      {result === "wrong" ? (
                        <XIcon className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                      ) : null}
                    </span>
                  </QuestionnaireChoice>
                );
              })}
            </QuestionnaireChoices>

            <div aria-live="polite">
              {picked === null ? null : (
                <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                  <p
                    className={cn(
                      "flex items-center gap-1.5 font-medium",
                      picked === question.answer ? "text-success" : "text-destructive",
                    )}
                  >
                    {picked === question.answer ? (
                      <CheckIcon className="size-4" aria-hidden />
                    ) : (
                      <XIcon className="size-4" aria-hidden />
                    )}
                    {picked === question.answer ? t("quizCorrect") : t("quizWrong")}
                  </p>
                  <p className="leading-relaxed text-pretty text-muted-foreground">
                    {withInlineCode(question.explanation)}
                  </p>
                </div>
              )}
            </div>
          </QuestionnaireItem>
        );
      })}

      <QuestionnaireActions>
        <QuestionnaireNext disabled={!answered}>{t("quizNext")}</QuestionnaireNext>
        <QuestionnaireSubmit disabled={!answered}>{t("quizFinish")}</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}

type QuizResultProps = {
  score: number;
  total: number;
  onRetry: () => void;
};

function QuizResult({ score, total, onRetry }: QuizResultProps) {
  const t = useTranslations("Academy");
  const perfect = score === total;

  return (
    <div
      role="status"
      tabIndex={-1}
      // The result is shorter than the question it replaces; bring it into view and give it focus.
      ref={(node) => {
        node?.focus({ preventScroll: true });
        node?.scrollIntoView({ block: "nearest" });
      }}
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border p-5 outline-none",
        perfect ? "border-success/40 bg-success/5" : "border-border bg-muted/30",
      )}
    >
      <div className="flex items-center gap-3">
        <p className="font-mono text-3xl font-semibold text-foreground tabular-nums">
          {score}/{total}
        </p>
        {perfect ? (
          <p className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-success">
            <PartyPopperIcon className="size-5" aria-hidden />
            {t("quizPerfectTitle")}
          </p>
        ) : null}
      </div>
      <p className="text-sm text-pretty text-muted-foreground">
        {perfect ? t("quizPerfect", { total }) : t("quizPartial", { score, total })}
      </p>
      <Button variant={perfect ? "outline" : "default"} onClick={onRetry}>
        <RotateCcwIcon aria-hidden />
        {t("quizRetry")}
      </Button>
    </div>
  );
}

type AcademyLessonQuizProps = {
  lessonId: string;
  questions: readonly AcademyQuizItem[];
};

export function AcademyLessonQuiz({ lessonId, questions }: AcademyLessonQuizProps) {
  const t = useTranslations("Academy");
  const progress = useLessonProgress(lessonId);
  const recordQuiz = useAcademyProgressStore((state) => state.recordQuiz);
  const [attempt, setAttempt] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const best = progress?.quiz;

  function handleFinish(finalScore: number) {
    recordQuiz(lessonId, { score: finalScore, total: questions.length });
    setScore(finalScore);
  }

  function handleRetry() {
    setScore(null);
    setAttempt(attempt + 1);
  }

  return (
    <section aria-labelledby="lesson-quiz-title" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2
          id="lesson-quiz-title"
          className="text-xl font-semibold tracking-tight text-foreground md:text-2xl"
        >
          {t("quizTitle")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {best && score === null ? t("quizBest", best) : t("quizIntro")}
        </p>
      </div>

      {score === null ? (
        <QuizRun key={attempt} questions={questions} onFinish={handleFinish} />
      ) : (
        <QuizResult score={score} total={questions.length} onRetry={handleRetry} />
      )}
    </section>
  );
}
