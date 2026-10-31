import { getTranslations } from "next-intl/server";

import { getBrandPalette } from "@/config/brand-palettes.config";
import type { EcosystemId } from "@/config/ecosystem.config";

import { ReleaseCard } from "@/features/releases/components/ReleaseCard";
import { ReleasesFeed } from "@/features/releases/components/ReleasesFeed";
import { getReleases } from "@/features/releases/data/releases";

export async function ReleasesPage({ product = null }: { product?: EcosystemId | null }) {
  const t = await getTranslations("ReleasesPage");

  const entries = getReleases()
    .filter((release) => !product || release.products.some((item) => item.id === product))
    .map((release) => ({
      id: release.id,
      content: <ReleaseCard release={release} />,
    }));

  return (
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-10 px-6 pt-28 pb-24">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl">
          {product
            ? t("productTitle", { product: getBrandPalette(product).productName })
            : t("title")}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {t("description")}
        </p>
      </header>

      <ReleasesFeed entries={entries} activeProduct={product} />
    </div>
  );
}
