export const ACADEMY_RESOURCE_KINDS = [
  "doc",
  "article",
  "research",
  "repo",
  "video",
  "podcast",
] as const;

export type AcademyResourceKind = (typeof ACADEMY_RESOURCE_KINDS)[number];

const ACADEMY_RESOURCE_KIND_ALIASES: Record<string, AcademyResourceKind> = {
  doc: "doc",
  docs: "doc",
  document: "doc",
  documentation: "doc",
  doküman: "doc",
  dokuman: "doc",
  article: "article",
  makale: "article",
  research: "research",
  araştırma: "research",
  arastirma: "research",
  repo: "repo",
  repository: "repo",
  video: "video",
  podcast: "podcast",
};

export function isAcademyResourceKind(value: string): value is AcademyResourceKind {
  return (ACADEMY_RESOURCE_KINDS as readonly string[]).includes(value);
}

/**
 * Maps a resource-kind token or localized label to a canonical kind.
 */
export function parseAcademyResourceKind(value: string): AcademyResourceKind | undefined {
  const normalized = value.trim().toLocaleLowerCase("tr");
  const unwrapped = /^\(([^)]+)\)$/.exec(normalized)?.[1]?.trim() ?? normalized;
  return ACADEMY_RESOURCE_KIND_ALIASES[unwrapped];
}
