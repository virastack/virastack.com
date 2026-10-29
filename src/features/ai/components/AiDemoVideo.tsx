import { useTranslations } from "next-intl";

import { ProductDemoVideo } from "@/features/product/components/ProductDemoVideo";

/**
 * Both files carry the hash of the video (`render-ai-intro.mjs` prints the new names),
 * so a re-render gets a new URL and the one-year `immutable` cache never serves a stale loop.
 */
const SRC = "/ai/ai-intro.8b91c145.mp4";
const POSTER = "/ai/ai-intro-poster.8b91c145.webp";

export function AiDemoVideo() {
  const t = useTranslations("Ai");

  return <ProductDemoVideo src={SRC} poster={POSTER} label={t("demoVideoLabel")} />;
}
