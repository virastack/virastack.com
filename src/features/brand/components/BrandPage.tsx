import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { brandPalettes } from "@/features/brand/brand-colors";
import { BrandLogoSection } from "@/features/brand/components/BrandLogoSection";

type BrandMarkTone = "heading" | "body";

const brandWeightClass: Record<BrandMarkTone, string> = {
  heading: "font-black",
  body: "font-semibold",
};

function BrandMarkPreview({
  productName,
  textClass,
  tone,
}: {
  productName: string | null;
  textClass: string;
  tone: BrandMarkTone;
}) {
  return (
    <span className="whitespace-nowrap">
      <span className={cn("text-primary", brandWeightClass[tone])}>{siteConfig.name}</span>
      {productName ? (
        <>
          {" "}
          <span className={cn("font-medium italic", textClass)}>{productName}</span>
        </>
      ) : null}
    </span>
  );
}

const startPalette = brandPalettes.find((palette) => palette.id === "start");

if (!startPalette?.productName) {
  throw new Error("Start brand palette is required for typography examples");
}

const startName = startPalette.productName;
const startTextClass = startPalette.textClass;

export function BrandPage() {
  const t = useTranslations("BrandPage");

  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-28 sm:pt-28">
      <RevealGroup className="space-y-16">
        <RevealItem>
          <header className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
              {t("intro")}
            </p>
          </header>
        </RevealItem>

        <RevealItem>
          <BrandLogoSection />
        </RevealItem>

        <RevealItem>
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("namingTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t.rich("namingBody", {
                  wrong: (chunks) => (
                    <span className="font-medium text-muted-foreground line-through decoration-muted-foreground/80">
                      {chunks}
                    </span>
                  ),
                  mask: () => (
                    <BrandMarkPreview productName="Mask" textClass="text-indigo-500" tone="body" />
                  ),
                })}
              </p>
            </div>

            <ul className="space-y-3 rounded-2xl border border-border bg-card px-5 py-5 ring-1 ring-border ring-offset-4 ring-offset-background sm:px-6">
              {brandPalettes
                .filter((palette) => palette.productName)
                .map((palette) => (
                  <li
                    key={palette.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <BrandMarkPreview
                      productName={palette.productName}
                      textClass={palette.textClass}
                      tone="body"
                    />
                    <span className="font-mono text-xs text-muted-foreground">{palette.shade}</span>
                  </li>
                ))}
            </ul>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("typeTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">{t("typeBody")}</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-border bg-card px-5 py-5 ring-1 ring-border ring-offset-4 ring-offset-background sm:px-6">
              <div className="space-y-1">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t("typeHeadingLabel")}
                </p>
                <p className="text-4xl tracking-tight lg:text-6xl">
                  <BrandMarkPreview
                    productName={startName}
                    textClass={startTextClass}
                    tone="heading"
                  />
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  font-black · text-4xl / lg:text-6xl · font-medium italic · {startTextClass}
                </p>
              </div>
              <div className="space-y-1 border-t border-border pt-4">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t("typeLogoLabel")}
                </p>
                <p className="text-lg leading-none">
                  <BrandMarkPreview
                    productName={startName}
                    textClass={startTextClass}
                    tone="body"
                  />
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  font-semibold · text-lg · font-medium italic · {startTextClass}
                </p>
              </div>
              <div className="space-y-1 border-t border-border pt-4">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t("typeBodyLabel")}
                </p>
                <p className="text-base">
                  <BrandMarkPreview
                    productName={startName}
                    textClass={startTextClass}
                    tone="body"
                  />
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  font-semibold · inherit (text-base) · font-medium italic · {startTextClass}
                </p>
              </div>
            </div>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="space-y-10">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("colorsTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">{t("colorsBody")}</p>
            </div>

            <div className="grid grid-cols-3 gap-x-6 gap-y-10">
              {brandPalettes.map((palette) => (
                <div key={palette.id} className="space-y-2">
                  <div
                    className={cn("size-8 rounded-lg ring-1 ring-foreground/10", palette.bgClass)}
                    title={palette.hex ?? palette.shade}
                  />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground">
                      <BrandMarkPreview
                        productName={palette.productName}
                        textClass={palette.textClass}
                        tone="body"
                      />
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {palette.darkHex
                        ? `primary · ${palette.shade} / ${palette.darkHex}`
                        : palette.hex
                          ? `${palette.shade} · ${palette.hex}`
                          : palette.shade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealItem>
      </RevealGroup>
    </div>
  );
}
