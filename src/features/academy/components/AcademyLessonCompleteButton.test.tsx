import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { AcademyLessonCompleteButton } from "@/features/academy/components/AcademyLessonCompleteButton";
import { useAcademyProgressStore } from "@/features/academy/stores/academy-progress.store";
import { renderWithProviders } from "@/test/render";

describe("AcademyLessonCompleteButton", () => {
  beforeEach(() => useAcademyProgressStore.getState().reset());

  it("marks the lesson complete and unmarks it again", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AcademyLessonCompleteButton lessonId="react/state" />);

    const button = await screen.findByRole("button", { name: "Mark as complete" });
    expect(button).toBeEnabled();

    await user.click(button);
    expect(screen.getByRole("button", { name: "Completed" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByRole("button", { name: "Mark as complete" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("shows a lesson completed earlier as completed", async () => {
    useAcademyProgressStore.getState().setLessonCompleted("react/state", true);
    renderWithProviders(<AcademyLessonCompleteButton lessonId="react/state" />);

    expect(await screen.findByRole("button", { name: "Completed" })).toBeEnabled();
  });
});
