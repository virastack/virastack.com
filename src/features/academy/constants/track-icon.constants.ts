export const TRACK_ICON_TAGS: Record<string, string | readonly string[]> = {
  "web-fundamentals": ["HTML", "CSS", "Tailwind", "shadcn/ui", "JavaScript", "Git"],
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.js",
  "tanstack-query": "TanStack Query",
  zustand: "Zustand",
  forms: ["React Hook Form", "Zod"],
  vitest: "Vitest",
  playwright: "Playwright",
  "performance-accessibility": "Web Performansı",
  architecture: "Mimari",
  "auth-security": "Auth ve Güvenlik",
  production: "Production",
  ai: "Yapay Zekâ",
  glossary: "Sözlük",
};

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
