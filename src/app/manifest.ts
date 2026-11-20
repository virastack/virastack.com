import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/brand/virastack-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/virastack-icon.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
