import { useTranslations } from "next-intl";

import { ProductDemoVideo } from "@/components/shared/ProductDemoVideo";

/**
 * Both files carry the hash of the video (`render-ai-intro.mjs` prints the new names),
 * so a re-render gets a new URL and the one-year `immutable` cache never serves a stale loop.
 */
const SRC = "/ai/ai-intro.fe5762de.mp4";
const POSTER = "/ai/ai-intro-poster.fe5762de.webp";

export function AiDemoVideo() {
  const t = useTranslations("Ai");

  return <ProductDemoVideo src={SRC} poster={POSTER} label={t("demoVideoLabel")} />;
}
