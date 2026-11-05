import { getTranslations } from "next-intl/server";

import { getRecentDownloads } from "@/lib/npm-downloads";

import { CountUp } from "@/components/shared/CountUp";
import { NPM_PACKAGES } from "@/features/home/constants/npm-packages.constants";

/** The npm download figure under the hero buttons; renders nothing when npm cannot be reached. */
export async function HeroStats() {
  const downloads = await getRecentDownloads(NPM_PACKAGES);
  if (downloads === null) return null;

  const t = await getTranslations("Home");

  return (
    <p className="-mt-2 text-sm text-muted-foreground">
      <CountUp value={downloads} className="font-semibold text-foreground" /> {t("heroDownloads")}
    </p>
  );
}
