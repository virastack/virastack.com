import { describe, expect, it } from "vitest";

import { readAcademyLessonHeadings } from "@/features/academy/lib/lesson-headings";
import {
  parseAcademyLesson,
  parseAcademyMarkdown,
} from "@/features/academy/lib/parse-academy-markdown";

async function headingsOf(markdown: string) {
  return readAcademyLessonHeadings(await parseAcademyLesson(markdown));
}

describe("lesson headings", () => {
  it("lists h2 and h3 in reading order with ids from their titles", async () => {
    const headings = await headingsOf(
      [
        "# Title",
        "## Senaryo",
        "Text.",
        "### Adım 1: Projeyi kurun",
        "#### Detail",
        "## Kendin dene",
      ].join("\n\n"),
    );

    expect(headings).toEqual([
      { id: "senaryo", title: "Senaryo", level: 2 },
      { id: "adim-1-projeyi-kurun", title: "Adım 1: Projeyi kurun", level: 3 },
      { id: "kendin-dene", title: "Kendin dene", level: 2 },
    ]);
  });

  it("reads code and badges as the text the reader sees", async () => {
    const headings = await headingsOf("## Next.js `<Image>`\n\n## [!nextjs] ile *hızlı* başla");

    expect(headings).toEqual([
      { id: "next-js-image", title: "Next.js <Image>", level: 2 },
      { id: "next-js-ile-hizli-basla", title: "Next.js ile hızlı başla", level: 2 },
    ]);
  });

  it("numbers a repeated title and names a title without letters", async () => {
    const headings = await headingsOf("## Setup\n\n## Setup\n\n### Setup\n\n## ?!\n\n## ?!");

    expect(headings.map((heading) => heading.id)).toEqual([
      "setup",
      "setup-2",
      "setup-3",
      "section",
      "section-2",
    ]);
  });

  it("keeps away from the ids of the source rows and the skip link", async () => {
    const headings = await headingsOf("## Fn 1\n\n## Main content");

    expect(headings.map((heading) => heading.id)).toEqual(["fn-1-2", "main-content-2"]);
  });

  it("leaves out headings nested in a list or a quote", async () => {
    const headings = await headingsOf("## Outside\n\n- item\n\n  ## In a list\n\n> ## In a quote");

    expect(headings).toEqual([{ id: "outside", title: "Outside", level: 2 }]);
  });

  it("leaves out the resources heading shown as a box, and keeps one without a list", async () => {
    const withList = await headingsOf(
      "## Intro\n\n## Kaynaklar\n\n1. [React docs](https://react.dev) - doc",
    );
    const withoutList = await headingsOf("## Intro\n\n## Kaynaklar\n\nA paragraph.");

    expect(withList.map((heading) => heading.id)).toEqual(["intro"]);
    expect(withoutList.map((heading) => heading.id)).toEqual(["intro", "kaynaklar"]);
  });

  it("gives no ids to a fragment parsed on its own", async () => {
    const fragment = await parseAcademyMarkdown("## Inside a details block");

    expect(readAcademyLessonHeadings(fragment)).toEqual([]);
  });
});
