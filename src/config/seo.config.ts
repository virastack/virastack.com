import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

import { buildOgImagePath, buildOgImages } from "@/lib/og";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    "Next.js",
    "TanStack Start",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Boilerplate",
    "CLI",
    "Feature-Sliced Design",
    "Developer Experience",
    "Developer Tools",
  ],
  authors: [
    { name: siteConfig.author.name, url: siteConfig.author.website },
    { name: siteConfig.name, url: siteConfig.url },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: buildOgImages({ description: siteConfig.description }),
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [buildOgImagePath({ description: siteConfig.description })],
  },
  icons: {
    icon: "/logo-icon.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
};
