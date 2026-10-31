import type { EcosystemId, EcosystemLocale } from "@/config/ecosystem.config";

export type ReleaseCopy = {
  title: string;
  whatChanged: string;
  why: string;
  migration?: string;
};

export type Release = {
  /** Stable anchor of the note (`/releases#id`); never change it once published. */
  id: string;
  /** ISO date of the release. */
  date: string;
  /** Drafts show up in development only, so placeholder notes never reach production. */
  draft?: boolean;
  /** One note can cover several products, since one decision often affects more than one. */
  products: readonly { id: EcosystemId; version: string }[];
  sources: readonly { title: string; url: string }[];
  migrationCode?: string;
  copy: Record<EcosystemLocale, ReleaseCopy>;
};

const releases: readonly Release[] = [
  {
    id: "start-2-0-0-barrel-files",
    date: "2026-10-31",
    draft: true,
    products: [{ id: "start", version: "2.0.0" }],
    sources: [
      {
        title: "Please Stop Using Barrel Files (Dominik Dorfmeister)",
        url: "https://tkdodo.eu/blog/please-stop-using-barrel-files",
      },
      {
        title: "How we optimized package imports in Next.js (Vercel)",
        url: "https://vercel.com/blog/how-we-optimized-package-imports-in-next-js",
      },
    ],
    migrationCode: `// Before
import { Button } from "@/components/ui";

// After
import { Button } from "@/components/ui/button";`,
    copy: {
      tr: {
        title: "Barrel files kaldırıldı",
        whatChanged:
          "Şablonlardaki index.ts barrel dosyaları kaldırıldı. Import'lar artık doğrudan modülün kendi dosyasını gösteriyor.",
        why: "Barrel dosyası, tek bir export için bile arkasındaki tüm modüllerin yüklenmesine yol açabiliyor. Bu da dev server ve test sürelerini uzatıyor, tree shaking'i zorlaştırıyor.",
        migration: "Barrel üzerinden yapılan import'ları modülün kendi dosyasına taşı.",
      },
      en: {
        title: "Barrel files removed",
        whatChanged:
          "The index.ts barrel files in the templates are gone. Imports now point straight at the module's own file.",
        why: "A barrel file can load every module behind it, even for a single export. That slows down the dev server and tests, and makes tree shaking harder.",
        migration: "Move imports that go through a barrel to the module's own file.",
      },
    },
  },
];

/** Newest first; drafts are left out of production builds. */
export function getReleases(): readonly Release[] {
  return releases
    .filter((release) => !release.draft || process.env.NODE_ENV !== "production")
    .toSorted((a, b) => b.date.localeCompare(a.date));
}
