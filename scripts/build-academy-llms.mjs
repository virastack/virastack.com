import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://virastack.com";
const curriculum = JSON.parse(
  readFileSync(join(ROOT, ".content/academy/content/en/curriculum.json"), "utf8"),
);

const lines = [
  "# ViraStack Academy",
  "",
  "> Free, open-source frontend curriculum: web fundamentals, React, Next.js, TypeScript, forms, testing, auth and security, performance and AI-assisted development. Lessons are written in Turkish and English. MIT licensed.",
  "",
  "Each lesson is one page at `https://virastack.com/academy/<track>/<lesson>`. Turkish versions live under `https://virastack.com/tr/academy/...`. Only published lessons are listed.",
  "",
  `- [Academy home](${SITE}/academy): All tracks`,
  `- [Sources](${SITE}/academy/sources): References behind the lessons`,
  `- [Contribute](${SITE}/academy/contribute): How to write or translate a lesson`,
];

for (const group of curriculum.groups) {
  for (const track of group.tracks) {
    if (track.status !== "published") continue;
    const published = track.lessonGroups
      .flatMap((g) => g.lessons)
      .filter((l) => l.status === "published");
    if (published.length === 0) continue;
    lines.push("", `## ${track.title}`, "", `${track.description}`, "");
    lines.push(`- [${track.title} overview](${SITE}/academy/${track.slug}): Track page`);
    for (const lesson of published) {
      lines.push(
        `- [${lesson.title}](${SITE}/academy/${track.slug}/${lesson.slug}): ${lesson.description}`,
      );
    }
  }
}

lines.push(
  "",
  "## Related",
  "",
  `- [ViraStack llms.txt](${SITE}/llms.txt): Ecosystem map`,
  "- [GitHub](https://github.com/virastack/academy): Lesson sources (Markdown)",
  "",
);

writeFileSync(join(ROOT, "public/academy/llms.txt"), lines.join("\n"));
process.stdout.write(`Academy llms.txt written (${lines.length} lines).\n`);
