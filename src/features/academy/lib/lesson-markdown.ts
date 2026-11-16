import type { AcademyLessonDocument } from "@/features/academy/types/academy.types";

/** Footnote markers in the description point at footnotes that only live in the body. */
const FOOTNOTE_MARKER = /\[\^\d+\]/g;

/** Root-relative links such as `](/academy/react)`, which die once pasted outside the site. */
const SITE_LINK = /\]\((\/[^)\s]*)/g;

type LessonMarkdownOptions = {
  /** Site path of the lesson, e.g. `/academy/forms/controlled-and-uncontrolled-forms`. */
  path: string;
  /** Turns a site path into an absolute URL for the page locale. */
  toUrl: (path: string) => string;
  /** Localized label for the line that links back to the lesson. */
  sourceLabel: string;
};

/**
 * The lesson as one Markdown document for pasting into an AI tool: title,
 * description, source URL and body. Quiz frontmatter stays out on purpose:
 * it holds the answers and is not lesson prose.
 */
export function buildAcademyLessonMarkdown(
  document: AcademyLessonDocument,
  { path, toUrl, sourceLabel }: LessonMarkdownOptions,
): string {
  const { title, description } = document.frontmatter;
  const body = document.body.replace(SITE_LINK, (_, href: string) => `](${toUrl(href)}`);

  return [
    `# ${title}`,
    `> ${description.replace(FOOTNOTE_MARKER, "")}`,
    `${sourceLabel}: ${toUrl(path)}`,
    body,
  ].join("\n\n");
}
