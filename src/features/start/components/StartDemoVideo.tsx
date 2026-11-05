import { useTranslations } from "next-intl";

import { ProductDemoVideo } from "@/components/shared/ProductDemoVideo";

/**
 * Both files carry the hash of the video (`render-start-intro.mjs` prints the new names),
 * so a re-render gets a new URL and the one-year `immutable` cache never serves a stale loop.
 */
const SRC = "/start/start-intro.56ffb14a.mp4";
const POSTER = "/start/start-intro-poster.56ffb14a.webp";

export function StartDemoVideo() {
  const t = useTranslations("Start");

  return <ProductDemoVideo src={SRC} poster={POSTER} label={t("demoVideoLabel")} />;
}
