import type { SiteConfig } from "@/types/site-config.types";
import { env } from "@/env";

export const siteConfig: SiteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description:
    "An open-source frontend ecosystem: free guides, Next.js and TanStack Start templates, AI rules, and form components. Learn, start, build.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og`,
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
