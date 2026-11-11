"use client";

import { CircleCheckIcon, CircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useLessonProgress } from "@/features/academy/hooks/use-academy-progress";
import { useAcademyProgressStore } from "@/features/academy/stores/academy-progress.store";

type AcademyLessonCompleteButtonProps = {
  lessonId: string;
};

/** Toggles the lesson's completed mark. Disabled until progress is read, so it never flips on load. */
export function AcademyLessonCompleteButton({ lessonId }: AcademyLessonCompleteButtonProps) {
  const t = useTranslations("Academy");
  const progress = useLessonProgress(lessonId);
  const setLessonCompleted = useAcademyProgressStore((state) => state.setLessonCompleted);
  const completed = progress?.completed ?? false;

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        variant="outline"
        size="lg"
        disabled={progress === null}
        aria-pressed={completed}
        onClick={() => setLessonCompleted(lessonId, !completed)}
        className={cn(completed && "border-success/50 text-success hover:text-success")}
      >
        {completed ? <CircleCheckIcon aria-hidden /> : <CircleIcon aria-hidden />}
        {completed ? t("lessonCompleted") : t("lessonMarkComplete")}
      </Button>
      <p className="text-xs text-muted-foreground">{t("progressStoredLocally")}</p>
    </div>
  );
}
