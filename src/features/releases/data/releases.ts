import type { EcosystemId, EcosystemLocale } from "@/config/ecosystem.config";

import type { AcademyBadgeKind } from "@/features/academy/constants/badge.constants";

export type ReleaseCopy = {
  title: string;
  /** One sentence shown on the closed card. */
  summary: string;
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
  /** Public commits behind the note, linked on its page. */
  commits?: readonly { repo: string; hash: string; title: string }[];
  /** One block per technology, labeled with its badge. */
  migrationCode?: readonly { kind: AcademyBadgeKind; code: string }[];
  copy: Record<EcosystemLocale, ReleaseCopy>;
};

const releases: readonly Release[] = [
  {
    id: "start-1-2-0",
    date: "2026-10-31",
    products: [{ id: "start", version: "1.2.0" }],
    sources: [
      {
        title: "August 2026 Security Release (Next.js)",
        url: "https://nextjs.org/blog/august-2026-security-release",
      },
      {
        title: "Next.js Security Update for a Critical Upstream Issue (Next.js)",
        url: "https://nextjs.org/blog/nextjs-security-update-september-22-2026",
      },
      {
        title: "Next.js Security Update for Upstream Vulnerabilities (Next.js)",
        url: "https://nextjs.org/blog/nextjs-security-update-october-14-2026",
      },
      {
        title: "CSRF Middleware (TanStack Start)",
        url: "https://tanstack.com/start/latest/docs/framework/react/guide/middleware",
      },
    ],
    commits: [
      {
        repo: "virastack/start",
        hash: "670d487287bde687696fda5e32d69279ffc730fe",
        title: "Next.js and React security update",
      },
      {
        repo: "virastack/start",
        hash: "7e11e52420f1af7d113e7cc2296c3e2070064601",
        title: "TanStack Start CSRF protection",
      },
      {
        repo: "virastack/start",
        hash: "8109215682d3362f512905bfc1da975ef8d1bdd8",
        title: "@virastack/address option",
      },
    ],
    migrationCode: [
      {
        kind: "nextjs",
        code: `pnpm add next@16.4.3 react@19.3.1 react-dom@19.3.1
pnpm add -D eslint-config-next@16.4.3`,
      },
      {
        kind: "tanstack-start",
        code: `// src/start.ts
import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));`,
      },
    ],
    copy: {
      tr: {
        title: "Next.js ve TanStack Start için güvenlik güncellemesi, ViraStack Address desteği",
        summary:
          "Yeni Next.js projeleri yamalı Next.js 16.4 ile kuruluyor, TanStack Start projelerinde server function'lar CSRF'e karşı korunuyor; kurulumda ViraStack Address de seçilebiliyor.",
        whatChanged: `- Yeni [Next.js](badge:nextjs) projeleri artık \`16.2.11\` yerine [Next.js](badge:nextjs) \`~16.4.3\` ve [React](badge:react) \`^19.3.1\` ile kuruluyor; sürüm aralığı sayesinde 16.4 hattının patch sürümlerini kendiliğinden alıyor.
- Yeni [TanStack Start](badge:tanstack-start) projelerinde \`src/start.ts\` artık server function'ları \`createCsrfMiddleware\` ile koruyor, başka siteden gelen istekler \`403\` alıyor.
- CLI, kurulumdaki araç sorusunda \`@virastack/address\` paketini de sunuyor; \`--tools address\` ve \`add address\` ile de eklenebiliyor.`,
        why: `- [Next.js](badge:nextjs) 2026'da Image Optimization API ve \`next/og\` gibi alanlarda **kritik remote code execution** açıklarını yamaladı; \`16.2.11\` bu yamaların dışında kalıyor.
- [TanStack Start](badge:tanstack-start) CSRF korumasını otomatik kuruyor, ama proje *kendi* \`src/start.ts\` dosyasını tanımlarsa bunu yapmıyor. Şablonda bu dosya vardı, bu yüzden server function ekleyen projeler korumasız kalıyordu.
- \`@virastack/address\`, diğer ViraStack araçları gibi kurulumdan seçilebilsin diye eklendi.`,
        migration:
          "**Bu sürüm mevcut projeleri değiştirmez.** [Next.js](badge:nextjs) 16.2 veya 16.3 kullanan projeleri kendin yükselt. [TanStack Start](badge:tanstack-start) projende `src/start.ts` varsa middleware'i ekle ve `requestMiddleware` listendeki diğer middleware'leri koru.",
      },
      en: {
        title: "Security update for Next.js and TanStack Start, plus ViraStack Address support",
        summary:
          "New Next.js projects install patched Next.js 16.4, and server functions in TanStack Start projects are protected against CSRF; ViraStack Address can now be selected during setup.",
        whatChanged: `- New [Next.js](badge:nextjs) projects now install [Next.js](badge:nextjs) \`~16.4.3\` and [React](badge:react) \`^19.3.1\` instead of \`16.2.11\`, and the version range picks up patch releases on the 16.4 line automatically.
- In new [TanStack Start](badge:tanstack-start) projects, \`src/start.ts\` now protects server functions with \`createCsrfMiddleware\`, so cross-site requests get a \`403\`.
- The CLI also offers \`@virastack/address\` in its tools question, and you can add it with \`--tools address\` or \`add address\`.`,
        why: `- In 2026 [Next.js](badge:nextjs) patched **critical remote code execution** vulnerabilities in areas such as the Image Optimization API and \`next/og\`, and version \`16.2.11\` misses those patches.
- [TanStack Start](badge:tanstack-start) installs CSRF protection automatically, but not when a project defines *its own* \`src/start.ts\`. The template had that file, so projects that added server functions were left unprotected.
- \`@virastack/address\` was added so it can be selected during setup, like the other ViraStack tools.`,
        migration:
          "**This release does not change existing projects.** Upgrade projects on [Next.js](badge:nextjs) 16.2 or 16.3 yourself. If your [TanStack Start](badge:tanstack-start) project has `src/start.ts`, add the middleware and keep the other entries in your `requestMiddleware` list.",
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

/** A note lives under its first product: `/releases/start/v1.2.0`. */
export function getReleaseParams(release: Release) {
  const product = release.products[0];

  return { product: product?.id ?? "", version: `v${product?.version ?? ""}` };
}

export function getReleaseHref(release: Release) {
  const { product, version } = getReleaseParams(release);

  return `/releases/${product}/${version}`;
}

export function findRelease(product: string, version: string) {
  return getReleases().find((release) => {
    const params = getReleaseParams(release);

    return params.product === product && params.version === version;
  });
}

/** Derived from semver, so the label can never disagree with the version. */
export function getReleaseType(version: string): "major" | "minor" | "patch" {
  const [, minor, patch] = version.split(".");
  if (minor === "0" && patch === "0") return "major";

  return patch === "0" ? "minor" : "patch";
}
