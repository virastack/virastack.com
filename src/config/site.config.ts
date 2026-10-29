import type { SiteConfig } from "@/types/site-config.types";
import { publicEnv } from "@/config/public-env";

export const siteConfig: SiteConfig = {
  name: publicEnv.NEXT_PUBLIC_APP_NAME,
  description:
    "An open-source frontend ecosystem: free guides, Next.js and TanStack Start templates, AI rules, and headless form hooks. Learn, start, build.",
  url: publicEnv.NEXT_PUBLIC_APP_URL,
  ogImage: `${publicEnv.NEXT_PUBLIC_APP_URL}/og`,
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
