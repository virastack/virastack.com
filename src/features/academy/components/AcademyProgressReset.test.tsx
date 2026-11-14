import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { AcademyProgressReset } from "@/features/academy/components/AcademyProgressReset";
import { useAcademyProgressStore } from "@/features/academy/stores/academy-progress.store";
import { renderWithProviders } from "@/test/render";

describe("AcademyProgressReset", () => {
  beforeEach(() => useAcademyProgressStore.getState().reset());

  it("renders nothing without progress", () => {
    renderWithProviders(<AcademyProgressReset />);

    expect(screen.queryByRole("button", { name: "Reset progress" })).not.toBeInTheDocument();
  });

  it("keeps the progress when the reset is cancelled", async () => {
    const user = userEvent.setup();
    useAcademyProgressStore.getState().setLessonCompleted("react/state", true);
    renderWithProviders(<AcademyProgressReset />);

    await user.click(await screen.findByRole("button", { name: "Reset progress" }));
    await user.click(await screen.findByRole("button", { name: "Cancel" }));

    expect(useAcademyProgressStore.getState().lessons["react/state"]?.completed).toBe(true);
    expect(screen.getByRole("button", { name: "Reset progress" })).toBeInTheDocument();
  });

  it("clears every lesson after the confirmation", async () => {
    const user = userEvent.setup();
    useAcademyProgressStore.getState().setLessonCompleted("react/state", true);
    renderWithProviders(<AcademyProgressReset />);

    await user.click(await screen.findByRole("button", { name: "Reset progress" }));
    expect(await screen.findByRole("dialog", { name: "Reset your progress?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(useAcademyProgressStore.getState().lessons).toEqual({});
    await waitFor(() =>
      expect(screen.queryByRole("button", { name: "Reset progress" })).not.toBeInTheDocument(),
    );
  });
});
