"use client";

import { CircleCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLessonProgress } from "@/features/academy/hooks/use-academy-progress";
import type { AcademyQuizResult } from "@/features/academy/stores/academy-progress.store";

type TrackLessonIndexProps = {
  lessonId: string;
  label: string;
};

const numberClassName = "mt-0.5 w-5 shrink-0 font-mono text-xs tabular-nums md:mt-1 md:text-sm";

/**
 * The lesson number at the start of a row. A completed lesson keeps its number,
 * which darkens and gets a green check on its corner; green small text would
 * miss AA contrast in light mode. A solved quiz adds one dot per question under
 * the number. The row is a link, so the tooltip trigger is a span, not a button.
 */
export function TrackLessonIndex({ lessonId, label }: TrackLessonIndexProps) {
  const t = useTranslations("Academy");
  const progress = useLessonProgress(lessonId);
  const completed = progress?.completed === true;
  const quiz = progress?.quiz;

  if (!completed && !quiz) {
    return <span className={cn(numberClassName, "text-muted-foreground")}>{label}</span>;
  }

  const labels = [
    completed ? t("lessonCompletedTooltip") : null,
    quiz ? t("quizScoreLabel", quiz) : null,
  ].filter((text) => text !== null);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            className={cn(
              numberClassName,
              "flex flex-col items-start gap-1.5",
              completed ? "font-medium text-foreground" : "text-muted-foreground",
            )}
          />
        }
      >
        <span className="relative inline-block">
          {label}
          {completed ? (
            <CircleCheckIcon
              strokeWidth={3}
              className="absolute -top-1 left-full -ml-px size-3 rounded-full fill-current text-success ring-2 ring-background [&>path]:fill-none [&>path]:stroke-background"
              aria-hidden
            />
          ) : null}
        </span>
        {quiz ? <QuizDots quiz={quiz} /> : null}
        <span className="sr-only"> · {labels.join(" · ")}</span>
      </TooltipTrigger>
      <TooltipContent>
        <span className="flex flex-col gap-0.5">
          {labels.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

/** Filled dots for correct answers, rings for the rest, so the score never rests on colour alone. */
function QuizDots({ quiz }: { quiz: AcademyQuizResult }) {
  return (
    <span className="flex gap-px" aria-hidden>
      {Array.from({ length: quiz.total }, (_, index) => (
        <span
          key={`dot-${index + 1}`}
          className={cn(
            "size-1.5 rounded-full",
            index < quiz.score ? "bg-success" : "border border-muted-foreground",
          )}
        />
      ))}
    </span>
  );
}
