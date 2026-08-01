import type { SiteConfig } from "@/types/site-config.types";
import { env } from "@/env";

export const siteConfig: SiteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  // Literal uppercase: CSS `uppercase` turns "i" into "İ" under `lang=tr`.
  brandMark: "VIRASTACK",
  description:
    "A DX-first toolkit for frontend developers: modern-stack starters and focused React hooks built on Next.js, TanStack, and React.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
  links: {
    github: "https://github.com/virastack",
    twitter: "https://x.com/virastack",
  },
  author: {
    name: "Ömer Gülçiçek",
    website: "https://omergulcicek.com/",
    github: "https://github.com/omergulcicek",
    avatar: "https://github.com/omergulcicek.png",
  },
};
