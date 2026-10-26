import { useTranslations } from "next-intl";

import { ProductDemoVideo } from "@/features/product/components/ProductDemoVideo";

export function StartDemoVideo() {
  const t = useTranslations("Start");

  return (
    <ProductDemoVideo
      src="/start/start-intro.mp4"
      poster="/start/start-intro-poster.webp"
      label={t("demoVideoLabel")}
    />
  );
}
