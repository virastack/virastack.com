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
    id: "start-1-1-1-nextjs-security",
    date: "2026-10-31",
    products: [{ id: "start", version: "1.1.1" }],
    sources: [
      {
        title: "Next.js Security Update, August 2026 (Next.js)",
        url: "https://nextjs.org/blog/august-2026-security-release",
      },
      {
        title:
          "Next.js Security Update for a Critical Upstream Issue, September 22, 2026 (Next.js)",
        url: "https://nextjs.org/blog/nextjs-security-update-september-22-2026",
      },
      {
        title: "Next.js Security Update, October 14, 2026 (Next.js)",
        url: "https://nextjs.org/blog/nextjs-security-update-october-14-2026",
      },
    ],
    migrationCode: `pnpm add next@16.4.3 react@19.3.1 react-dom@19.3.1
pnpm add -D eslint-config-next@16.4.3`,
    copy: {
      tr: {
        title: "Next.js şablonları güvenlik güncellemesi aldı",
        whatChanged:
          "Yeni Next.js projeleri artık 16.2.11 yerine Next.js ~16.4.3 ve React ^19.3.1 ile kuruluyor. Next.js sürüm aralığı sayesinde yeni projeler 16.4 hattının patch sürümlerini kendiliğinden alıyor.",
        why: "Next.js 2026'da Image Optimization API ve next/og gibi alanlarda kritik remote code execution açıklarını yamaladı. 16.2.11 bu yamaların dışında kalıyor.",
        migration:
          "Bu sürüm mevcut projeleri değiştirmez. Next.js 16.2 veya 16.3 kullanan projeleri kendin yükselt.",
      },
      en: {
        title: "Security update for the Next.js templates",
        whatChanged:
          "New Next.js projects now install Next.js ~16.4.3 and React ^19.3.1 instead of 16.2.11. The version range lets new projects pick up patch releases on the 16.4 line automatically.",
        why: "In 2026 Next.js patched critical remote code execution vulnerabilities in areas such as the Image Optimization API and next/og. Version 16.2.11 misses those patches.",
        migration:
          "This release does not change existing projects. Upgrade projects on Next.js 16.2 or 16.3 yourself.",
      },
    },
  },
  {
    id: "start-1-1-1-tanstack-csrf",
    date: "2026-10-31",
    products: [{ id: "start", version: "1.1.1" }],
    sources: [
      {
        title: "CSRF Middleware (TanStack Start)",
        url: "https://tanstack.com/start/latest/docs/framework/react/guide/middleware",
      },
    ],
    migrationCode: `// src/start.ts
import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));`,
    copy: {
      tr: {
        title: "TanStack Start şablonlarına CSRF koruması eklendi",
        whatChanged:
          "Yeni TanStack Start projelerinde src/start.ts artık server function'ları createCsrfMiddleware ile koruyor. Başka siteden gelen istekler 403 alıyor.",
        why: "TanStack Start, CSRF korumasını otomatik kuruyor, ama proje kendi src/start.ts dosyasını tanımlarsa bunu yapmıyor. Şablonda bu dosya vardı, bu yüzden server function ekleyen projeler korumasız kalıyordu.",
        migration:
          "Mevcut bir projede src/start.ts varsa middleware'i kendin ekle ve requestMiddleware listende bulunan diğer middleware'leri koru.",
      },
      en: {
        title: "CSRF protection added to the TanStack Start templates",
        whatChanged:
          "In new TanStack Start projects, src/start.ts now protects server functions with createCsrfMiddleware. Cross-site requests get a 403.",
        why: "TanStack Start installs CSRF protection automatically, but not when a project defines its own src/start.ts. The template had that file, so projects that added server functions were left unprotected.",
        migration:
          "If an existing project has src/start.ts, add the middleware yourself and keep the other entries in your requestMiddleware list.",
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
