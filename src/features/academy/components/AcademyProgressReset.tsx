"use client";

import { RotateCcwIcon } from "lucide-react";
import { useTranslations } from "next-intl";

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
import { useHasAnyProgress } from "@/features/academy/hooks/use-academy-progress";
import { useAcademyProgressStore } from "@/features/academy/stores/academy-progress.store";

/** Clears every lesson mark and quiz result, after a confirmation. Shown only when there is progress. */
export function AcademyProgressReset() {
  const t = useTranslations("Academy");
  const hasProgress = useHasAnyProgress();
  const reset = useAcademyProgressStore((state) => state.reset);

  if (!hasProgress) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      <span>{t("progressStoredLocally")}</span>
      <Dialog>
        <DialogTrigger render={<Button variant="ghost" size="sm" />}>
          <RotateCcwIcon aria-hidden />
          {t("progressReset")}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("progressResetTitle")}</DialogTitle>
            <DialogDescription>{t("progressResetBody")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              {t("progressResetCancel")}
            </DialogClose>
            <DialogClose render={<Button variant="destructive" />} onClick={reset}>
              {t("progressResetConfirm")}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
