import { useTranslations } from "next-intl";

import { ProductDemoVideo } from "@/features/product/components/ProductDemoVideo";

/** Source and renderer of the loop: `scripts/video/password-intro.html`. */
export function PasswordDemoVideo() {
  const t = useTranslations("Password");

  return (
    <ProductDemoVideo
      src="/password/password-intro.mp4"
      poster="/password/password-intro-poster.webp"
      label={t("demoVideoLabel")}
    />
  );
}
