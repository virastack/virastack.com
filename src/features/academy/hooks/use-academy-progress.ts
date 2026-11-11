"use client";

import { useEffect, useSyncExternalStore } from "react";

import {
  useAcademyProgressStore,
  type AcademyLessonProgress,
} from "@/features/academy/stores/academy-progress.store";

const { persist } = useAcademyProgressStore;

function subscribeToHydration(callback: () => void) {
  return persist.onFinishHydration(callback);
}

/**
 * False on the server and on the first client render, true once the progress
 * has been read from localStorage. Progress UI renders nothing until then, so
 * the server HTML and the first client render match.
 */
export function useAcademyProgressHydrated(): boolean {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => persist.hasHydrated(),
    () => false,
  );

  useEffect(() => {
    if (!persist.hasHydrated()) void persist.rehydrate();
  }, []);

  return hydrated;
}

const EMPTY: AcademyLessonProgress = { completed: false };

export function useLessonProgress(lessonId: string): AcademyLessonProgress | null {
  const hydrated = useAcademyProgressHydrated();
  const progress = useAcademyProgressStore((state) => state.lessons[lessonId]) ?? EMPTY;
  return hydrated ? progress : null;
}

/** Completed lessons among `lessonIds`, or null before hydration. */
export function useCompletedCount(lessonIds: readonly string[]): number | null {
  const hydrated = useAcademyProgressHydrated();
  const count = useAcademyProgressStore(
    (state) => lessonIds.filter((id) => state.lessons[id]?.completed).length,
  );
  return hydrated ? count : null;
}

/** True when any lesson has progress, or null before hydration. */
export function useHasAnyProgress(): boolean | null {
  const hydrated = useAcademyProgressHydrated();
  const any = useAcademyProgressStore((state) =>
    Object.values(state.lessons).some((lesson) => lesson.completed || lesson.quiz),
  );
  return hydrated ? any : null;
}
