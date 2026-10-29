import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import {
  brandPalettes,
  getBrandPalette,
  virastackColor,
  type BrandPalette,
} from "@/config/brand-palettes.config";
import { productIcons, productIconSlugs } from "@/config/product-icons.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { BrandLockup } from "@/components/shared/BrandLockup";
import { ProductDots } from "@/components/shared/ProductDots";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { BrandLogoSection } from "@/features/brand/components/BrandLogoSection";

const linkClassName =
  "font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/60";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={linkClassName}>
      {children}
    </a>
  );
}

type BrandMarkTone = "heading" | "body";

const brandWeightClass: Record<BrandMarkTone, string> = {
  heading: "font-black",
  body: "font-semibold",
};

const productWeightClass: Record<BrandMarkTone, string> = {
  heading: "font-black",
  body: "font-bold",
};

function BrandMarkPreview({
  productName,
  textClass,
  tone,
}: {
  productName: string;
  textClass: string;
  tone: BrandMarkTone;
}) {
  return (
    <span className="whitespace-nowrap">
      <span className={cn("text-primary", brandWeightClass[tone])}>{siteConfig.name}</span>{" "}
      <span className={cn(productWeightClass[tone], textClass)}>{productName}</span>
    </span>
  );
}

type ColorValuesProps = {
  color: Pick<BrandPalette, "lightShade" | "darkShade" | "lightHex" | "darkHex">;
};

function ColorValues({ color }: ColorValuesProps) {
  const t = useTranslations("BrandPage");
  const rows =
    color.lightHex === color.darkHex
      ? [[t("colorsBothThemes"), color.lightShade, color.lightHex]]
      : [
          [t("colorsLight"), color.lightShade, color.lightHex],
          [t("colorsDark"), color.darkShade, color.darkHex],
        ];

  return (
    <div className="space-y-0.5 font-mono text-xs text-muted-foreground">
      {rows.map(([label, shade, hex]) => (
        <p key={label}>
          {label}: {shade} · {hex}
        </p>
      ))}
    </div>
  );
}

const richTags = {
  bold: (chunks: ReactNode) => <strong className="font-semibold text-foreground">{chunks}</strong>,
  italic: (chunks: ReactNode) => <em className="italic">{chunks}</em>,
  code: (chunks: ReactNode) => (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
      {chunks}
    </code>
  ),
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/** Short, medium and long descriptions of every product, read from `ecosystem.config.ts`. */
function ProductCopyList() {
  const t = useTranslations("BrandPage");
  const tNav = useTranslations("Navigation");
  const tHome = useTranslations("Home");
  const tProducts = useTranslations("Products");
  const tAcademy = useTranslations("Academy");

  return (
    <ul className="space-y-4">
      {brandPalettes.map((palette) => {
        const Icon = productIcons[palette.id];
        const rows: [string, ReactNode][] = [
          [t("copyShort"), tNav(`${palette.id}Desc`)],
          [t("copyMedium"), tHome.rich(`ecosystem${capitalize(palette.id)}Desc`, richTags)],
          [
            t("copyLong"),
            palette.id === "academy"
              ? tAcademy("description")
              : tProducts.rich(`${palette.id}Desc`, richTags),
          ],
        ];

        return (
          <li
            key={palette.id}
            className="space-y-4 rounded-2xl border border-border bg-card px-5 py-5 ring-1 ring-border ring-offset-4 ring-offset-background sm:px-6"
          >
            <p className="flex items-center gap-2.5 text-base">
              <Icon className={cn("size-5", palette.textClass)} strokeWidth={1.75} aria-hidden />
              <BrandMarkPreview
                productName={palette.productName}
                textClass={palette.textClass}
                tone="body"
              />
            </p>
            <dl className="space-y-3">
              {rows.map(([label, text]) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[3.5rem_1fr] sm:gap-4">
                  <dt className="font-mono text-xs leading-6 text-muted-foreground">{label}</dt>
                  <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {text}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        );
      })}
    </ul>
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
                  mask: () => (
                    <BrandMarkPreview
                      productName="Mask"
                      textClass={getBrandPalette("mask").textClass}
                      tone="body"
                    />
                  ),
                })}
              </p>
            </div>

            <ul className="space-y-3 rounded-2xl border border-border bg-card px-5 py-5 ring-1 ring-border ring-offset-4 ring-offset-background sm:px-6">
              {brandPalettes.map((palette) => (
                <li
                  key={palette.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                >
                  <BrandMarkPreview
                    productName={palette.productName}
                    textClass={palette.textClass}
                    tone="body"
                  />
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-muted-foreground">{palette.shade}</span>
                    <span
                      aria-hidden
                      className={cn("block size-2.5 shrink-0 rounded-full", palette.bgClass)}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("lockupTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">{t("lockupBody")}</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card px-5 pt-4 pb-9 ring-1 ring-border ring-offset-4 ring-offset-background sm:px-6">
              <BrandLockup as="div" sizeClassName="[--f:15vw] sm:[--f:104px]">
                <span className={startTextClass}>{startName}</span>
              </BrandLockup>
            </div>
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
                  font-black · text-4xl / lg:text-6xl · font-black · {startTextClass}
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
                  font-semibold · text-lg · font-bold · {startTextClass}
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
                  font-semibold · inherit (text-base) · font-bold · {startTextClass}
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
              <p className="text-base leading-relaxed text-muted-foreground">
                {t.rich("colorsBody", {
                  tailwind: (chunks) => (
                    <ExternalLink href="https://tailwindcss.com/docs/colors">{chunks}</ExternalLink>
                  ),
                })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
              <div className="space-y-2 text-center">
                <div
                  className={cn(
                    "mx-auto size-8 rounded-lg ring-1 ring-foreground/10",
                    virastackColor.bgClass,
                  )}
                  title={virastackColor.hex}
                />
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-primary">{siteConfig.name}</p>
                  <ColorValues color={virastackColor} />
                </div>
              </div>
              {brandPalettes.map((palette) => (
                <div key={palette.id} className="space-y-2 text-center">
                  <div
                    className={cn(
                      "mx-auto size-8 rounded-lg ring-1 ring-foreground/10",
                      palette.bgClass,
                    )}
                    title={palette.hex}
                  />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground">
                      <BrandMarkPreview
                        productName={palette.productName}
                        textClass={palette.textClass}
                        tone="body"
                      />
                    </p>
                    <ColorValues color={palette} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="space-y-10">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("iconsTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t.rich("iconsBody", {
                  lucide: (chunks) => (
                    <ExternalLink href="https://lucide.dev">{chunks}</ExternalLink>
                  ),
                })}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-x-6 gap-y-10">
              {brandPalettes.map((palette) => {
                const Icon = productIcons[palette.id];
                const slug = productIconSlugs[palette.id];

                return (
                  <div key={palette.id} className="space-y-3 text-center">
                    <Icon
                      className={cn("mx-auto size-8", palette.textClass)}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-foreground">
                        <BrandMarkPreview
                          productName={palette.productName}
                          textClass={palette.textClass}
                          tone="body"
                        />
                      </p>
                      <a
                        href={`https://lucide.dev/icons/${slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {slug}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("dotsTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">{t("dotsBody")}</p>
            </div>

            <div className="flex justify-center rounded-2xl border border-border bg-card px-5 pt-12 pb-8 ring-1 ring-border ring-offset-4 ring-offset-background sm:px-6">
              <ProductDots label={t("dotsLabel")} autoplay align="center" />
            </div>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {t("copyTitle")}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">{t("copyBody")}</p>
            </div>

            <ProductCopyList />
          </section>
        </RevealItem>
      </RevealGroup>
    </div>
  );
}
