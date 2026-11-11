import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AcademyQuizResult = {
  /** Correct answers on the best attempt. */
  score: number;
  total: number;
};

export type AcademyLessonProgress = {
  completed: boolean;
  quiz?: AcademyQuizResult;
};

type AcademyProgressState = {
  /** Keyed by `track/lesson`. */
  lessons: Record<string, AcademyLessonProgress>;
  setLessonCompleted: (lessonId: string, completed: boolean) => void;
  /** Finishing a quiz completes the lesson, whatever the score; the best score is kept. */
  recordQuiz: (lessonId: string, result: AcademyQuizResult) => void;
  reset: () => void;
};

function bestOf(previous: AcademyQuizResult | undefined, next: AcademyQuizResult) {
  return previous && previous.score >= next.score ? previous : next;
}

// Progress lives only in this browser: there are no accounts. `skipHydration`
// keeps the first client render equal to the server HTML;
// `useAcademyProgressHydrated` rehydrates from localStorage after mount.
export const useAcademyProgressStore = create<AcademyProgressState>()(
  persist(
    (set) => ({
      lessons: {},
      setLessonCompleted: (lessonId, completed) =>
        set((state) => ({
          lessons: { ...state.lessons, [lessonId]: { ...state.lessons[lessonId], completed } },
        })),
      recordQuiz: (lessonId, result) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: { completed: true, quiz: bestOf(state.lessons[lessonId]?.quiz, result) },
          },
        })),
      reset: () => set({ lessons: {} }),
    }),
    {
      name: "academyProgress",
      version: 1,
      partialize: ({ lessons }) => ({ lessons }),
      skipHydration: true,
    },
  ),
);
