import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PageToc } from "@/components/shared/PageToc";

const headings = [
  { id: "setup", title: "Setup", level: 2 },
  { id: "step-1", title: "Step 1", level: 3 },
  { id: "try-it", title: "Try it yourself", level: 2 },
] as const;

type ObserverCallback = (
  entries: { isIntersecting: boolean; intersectionRatio: number; target: Element }[],
) => void;

let notify: ObserverCallback = () => {};

beforeEach(() => {
  // jsdom has no IntersectionObserver; the test reports what is on screen itself.
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: ObserverCallback) {
        notify = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
});

function Page() {
  return (
    <>
      {headings.map((heading) => (
        <h2 key={heading.id} id={heading.id}>
          {heading.title}
        </h2>
      ))}
      <PageToc headings={headings} label="On this page" />
    </>
  );
}

describe("PageToc", () => {
  it("links every heading by its id, inside a named landmark", () => {
    render(<Page />);

    const nav = screen.getByRole("navigation", { name: "On this page" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Setup" })).toHaveAttribute("href", "#setup");
    expect(screen.getByRole("link", { name: "Step 1" })).toHaveAttribute("href", "#step-1");
    expect(screen.getByRole("link", { name: "Try it yourself" })).toHaveAttribute(
      "href",
      "#try-it",
    );
  });

  it("marks the heading on screen as the current one", () => {
    render(<Page />);
    expect(screen.getByRole("link", { name: "Setup" })).toHaveAttribute("aria-current", "location");

    const target = document.getElementById("try-it");
    if (!target) throw new Error("heading not rendered");
    act(() => notify([{ isIntersecting: true, intersectionRatio: 1, target }]));

    expect(screen.getByRole("link", { name: "Try it yourself" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Setup" })).not.toHaveAttribute("aria-current");
  });

  it("renders nothing for a page without headings", () => {
    render(<PageToc headings={[]} label="On this page" />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
