import { getTranslations } from "next-intl/server";

import { MaskPasswordPinDemo } from "@/features/docs/components/MaskPasswordPinDemo";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";

/**
 * ViraStack Mask with ViraStack Password: a password and a masked PIN, both with show/hide.
 */
export async function MaskPasswordExample() {
  const t = await getTranslations("DocsMask");

  return (
    <div className="w-full space-y-2">
      <MaskPasswordPinDemo />
      <p className="text-xs text-muted-foreground">
        {t.rich("examplePasswordPromo", {
          password: (chunks) => <GuideProductMark id="password">{chunks}</GuideProductMark>,
        })}
      </p>
    </div>
  );
}
