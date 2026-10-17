import { join } from "node:path";

export const ACADEMY_CONTENT_ROOT = join(process.cwd(), ".content/academy");
export const ACADEMY_GITHUB_REPO = "https://github.com/virastack/academy";
export const ACADEMY_EDIT_BASE = `${ACADEMY_GITHUB_REPO}/edit/main`;
export const ACADEMY_GITHUB_ISSUES_NEW = `${ACADEMY_GITHUB_REPO}/issues/new`;

export function getCurriculumPath(locale: string): string {
  const contentLocale = locale === "tr" ? "tr" : "en";
  return join(ACADEMY_CONTENT_ROOT, "content", contentLocale, "curriculum.json");
}

export function getLessonFilePath(
  locale: string,
  trackSlug: string,
  lessonSlug: string,
): string {
  return join(ACADEMY_CONTENT_ROOT, "content", locale, trackSlug, `${lessonSlug}.md`);
}

export function getLessonEditUrl(
  locale: string,
  trackSlug: string,
  lessonSlug: string,
): string {
  return `${ACADEMY_EDIT_BASE}/content/${locale}/${trackSlug}/${lessonSlug}.md`;
}
