import { beforeEach, describe, expect, it } from "vitest";

import { useAcademyProgressStore } from "@/features/academy/stores/academy-progress.store";

const { getState } = useAcademyProgressStore;

describe("academy progress store", () => {
  beforeEach(() => getState().reset());

  it("marks and unmarks a lesson", () => {
    getState().setLessonCompleted("react/state", true);
    expect(getState().lessons["react/state"]?.completed).toBe(true);

    getState().setLessonCompleted("react/state", false);
    expect(getState().lessons["react/state"]?.completed).toBe(false);
  });

  it("completes the lesson when a quiz is finished, whatever the score", () => {
    getState().recordQuiz("react/state", { score: 0, total: 3 });
    expect(getState().lessons["react/state"]).toEqual({
      completed: true,
      quiz: { score: 0, total: 3 },
    });
  });

  it("keeps the best quiz score", () => {
    getState().recordQuiz("react/state", { score: 2, total: 3 });
    getState().recordQuiz("react/state", { score: 1, total: 3 });
    expect(getState().lessons["react/state"]?.quiz?.score).toBe(2);

    getState().recordQuiz("react/state", { score: 3, total: 3 });
    expect(getState().lessons["react/state"]?.quiz?.score).toBe(3);
  });

  it("keeps the quiz result when the lesson is unmarked", () => {
    getState().recordQuiz("react/state", { score: 3, total: 3 });
    getState().setLessonCompleted("react/state", false);
    expect(getState().lessons["react/state"]).toEqual({
      completed: false,
      quiz: { score: 3, total: 3 },
    });
  });

  it("resets every lesson", () => {
    getState().setLessonCompleted("react/state", true);
    getState().recordQuiz("web-fundamentals/css", { score: 3, total: 3 });
    getState().reset();
    expect(getState().lessons).toEqual({});
  });
});
