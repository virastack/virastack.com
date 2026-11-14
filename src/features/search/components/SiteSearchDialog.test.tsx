import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { SearchDocument } from "@/types/search.types";

import { SiteSearchDialog } from "@/features/search/components/SiteSearchDialog";
import { renderWithProviders } from "@/test/render";
import { server } from "@/test/server";

const push = vi.fn();
vi.mock("@/i18n/routing", () => ({ useRouter: () => ({ push }) }));

const lesson: SearchDocument = {
  id: "academy-react-state",
  sectionId: "academy",
  href: "/academy/react/state",
  title: "State and events",
  description: "Keep values between renders",
  body: "useState returns the current value and a setter",
  kind: "lesson",
};

function renderDialog() {
  const onOpenChange = vi.fn();
  renderWithProviders(<SiteSearchDialog open onOpenChange={onOpenChange} shortcutLabel="⌘K" />);
  return { onOpenChange };
}

describe("SiteSearchDialog", () => {
  beforeEach(() => {
    push.mockReset();
    server.use(http.get("*/api/search/en", () => HttpResponse.json([lesson])));
  });

  it("finds a lesson by its text and opens it", async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderDialog();

    await user.type(screen.getByRole("combobox"), "usestate setter");
    await user.click(await screen.findByRole("option", { name: /State and events/ }));

    expect(push).toHaveBeenCalledWith("/academy/react/state");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("says so when nothing matches", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.type(screen.getByRole("combobox"), "zzqqxx");

    expect(await screen.findByText("No results found.")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("limits the results to the chosen section", async () => {
    const user = userEvent.setup();
    renderDialog();
    await screen.findByRole("option", { name: /State and events/ });

    const academy = screen.getByRole("button", { name: "Academy" });
    await user.click(academy);

    expect(academy).toHaveAttribute("aria-pressed", "true");
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(0);
    expect(screen.queryByRole("option", { name: /Mask/ })).not.toBeInTheDocument();
  });
});
