import { describe, expect, it } from "vitest";

import { buildAcademyLessonMarkdown } from "@/features/academy/lib/lesson-markdown";
import type { AcademyLessonDocument } from "@/features/academy/types/academy.types";

const document = {
  frontmatter: {
    title: "Controlled forms",
    description: "Who holds the value.[^1]",
    lastVerified: "2026-11-03",
    translationKey: "forms/controlled",
    quiz: [{ question: "Secret question?", options: ["a", "b"], answer: 1 }],
  },
  body: "See [folder structure](/academy/architecture/folder-structure) and [MDN](https://developer.mozilla.org).[^1]\n\n[^1]: A source.",
  locale: "tr",
  relativePath: "content/tr/forms/controlled.md",
} as unknown as AcademyLessonDocument;

const SITE = "https://virastack.com/tr";

describe("buildAcademyLessonMarkdown", () => {
  const markdown = buildAcademyLessonMarkdown(document, {
    path: "/academy/forms/controlled",
    toUrl: (path) => `${SITE}${path}`,
    sourceLabel: "Kaynak",
  });

  it("opens with the title, the description and the lesson URL", () => {
    expect(markdown.startsWith("# Controlled forms\n\n> Who holds the value.\n\n")).toBe(true);
    expect(markdown).toContain("Kaynak: https://virastack.com/tr/academy/forms/controlled");
  });

  it("makes site links absolute and keeps the rest of the body", () => {
    expect(markdown).toContain(
      "[folder structure](https://virastack.com/tr/academy/architecture/folder-structure)",
    );
    expect(markdown).toContain("[MDN](https://developer.mozilla.org)");
    expect(markdown).toContain("[^1]: A source.");
  });

  it("leaves the quiz out", () => {
    expect(markdown).not.toContain("Secret question");
  });
});
