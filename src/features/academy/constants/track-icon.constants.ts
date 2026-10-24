export const TRACK_ICON_TAGS: Record<string, string | readonly string[]> = {
  "web-fundamentals": "Web Temelleri",
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.js",
  "tanstack-query": "TanStack Query",
  zustand: "Zustand",
  forms: "React Hook Form",
  vitest: "Vitest",
  playwright: "Playwright",
  "performance-accessibility": "Web Performansı",
  architecture: "Mimari",
  principles: "Prensipler",
  "auth-security": "Auth ve Güvenlik",
  production: "Production",
  ai: "Yapay Zekâ",
  glossary: "Sözlük",
};

/** Logo tag per lesson, keyed by `${trackSlug}/${lessonSlug}`. */
export const LESSON_ICON_TAGS: Record<string, string> = {
  "web-fundamentals/how-the-web-works": "Chromium",
  "web-fundamentals/terminal-and-npm": "npm",
  "web-fundamentals/html": "HTML",
  "web-fundamentals/css": "CSS",
  "web-fundamentals/tailwind": "Tailwind",
  "web-fundamentals/javascript": "JavaScript",
  "web-fundamentals/git": "Git",
};

export function getLessonIconTag(trackSlug: string, lessonSlug: string): string | null {
  return LESSON_ICON_TAGS[`${trackSlug}/${lessonSlug}`] ?? null;
}

export function getTrackIconTags(trackSlug: string): string[] {
  const iconTag = TRACK_ICON_TAGS[trackSlug];

  if (typeof iconTag === "string") {
    return [iconTag];
  }

  if (!iconTag) {
    return [];
  }

  return [...iconTag];
}
