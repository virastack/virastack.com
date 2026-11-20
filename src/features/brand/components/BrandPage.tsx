import { readFileSync } from "node:fs";
import path from "node:path";

import { DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  getBrandPalette,
  virastackColor,
  type BrandPaletteId,
} from "@/config/brand-palettes.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/shared/CopyButton";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { ClearSpaceFigure } from "@/features/brand/components/ClearSpaceFigure";
import { CopyBlock } from "@/features/brand/components/CopyBlock";
import {
  logoGroups,
  type LogoAsset,
  type LogoGroup,
} from "@/features/brand/constants/logo-assets.constants";
import { getColorFormats } from "@/features/brand/helpers/color-formats";

const cardClassName = "rounded-2xl border border-border bg-card";

/** Read on the server so the copy button needs no fetch and works without a network round trip. */
function readSvg(basePath: string): string {
  return readFileSync(path.join(process.cwd(), "public", `${basePath}.svg`), "utf8");
}

function SectionHeading({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="max-w-xl space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="text-base leading-relaxed text-pretty text-muted-foreground">{body}</p>
    </div>
  );
}

function LogoCard({
  asset,
  kind,
  name,
}: {
  asset: LogoAsset;
  kind: LogoGroup["kind"];
  name: string;
}) {
  const t = useTranslations("BrandPage");
  const filename = asset.basePath.split("/").at(-1);
  const label = asset.background === "light" ? t("light") : t("dark");
  const assetName = `${name} (${label})`;
  const actionClassName = cn(buttonVariants({ variant: "outline", size: "sm" }), "font-mono");

  return (
    <div className={cn(cardClassName, "p-1.5")}>
      <div
        className={cn(
          "flex h-56 items-center justify-center rounded-xl border px-6 sm:h-64",
          asset.background === "light"
            ? "border-black/10 bg-white"
            : "border-white/10 bg-neutral-900",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${asset.basePath}.svg`}
          alt={assetName}
          width={asset.width}
          height={asset.height}
          className={kind === "icon" ? "h-20 w-auto" : "h-9 w-auto max-w-[80%] sm:h-10"}
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-2.5 pt-2.5 pb-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-center gap-1.5">
          <CopyButton
            variant="outline"
            size="sm"
            className="font-mono"
            text={readSvg(asset.basePath)}
            aria-label={t("copySvg", { name: assetName })}
          >
            SVG
          </CopyButton>
          <a
            href={`${asset.basePath}.svg`}
            download={`${filename}.svg`}
            aria-label={t("downloadAs", { name: assetName, format: "SVG" })}
            className={actionClassName}
          >
            <DownloadIcon data-icon="inline-start" />
            .svg
          </a>
          <a
            href={`${asset.basePath}.png`}
            download={`${filename}.png`}
            aria-label={t("downloadAs", { name: assetName, format: "PNG" })}
            className={actionClassName}
          >
            <DownloadIcon data-icon="inline-start" />
            .png
          </a>
        </div>
      </div>
    </div>
  );
}

const groupCopyKeys = {
  icon: { title: "iconTitle", body: "iconBody" },
  wordmark: { title: "wordmarkTitle", body: "wordmarkBody" },
  mono: { title: "monoTitle", body: "monoBody" },
} as const satisfies Record<LogoGroup["id"], { title: string; body: string }>;

/** Same three groups, in the same order, as the homepage ecosystem section. */
const productGroups = [
  { id: "learn", ids: ["academy", "guide"] },
  { id: "start", ids: ["start", "ai"] },
  { id: "build", ids: ["mask", "password", "address"] },
] as const satisfies readonly { id: "learn" | "start" | "build"; ids: readonly BrandPaletteId[] }[];

const virastackFormats = getColorFormats(virastackColor.hex);

export function BrandPage() {
  const t = useTranslations("BrandPage");
  const tHome = useTranslations("Home");

  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-28 sm:pt-28">
      <RevealGroup className="space-y-20">
        <RevealItem>
          <header className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              {t("intro")}
            </p>
          </header>
        </RevealItem>

        {logoGroups.map((group) => {
          const title = t(groupCopyKeys[group.id].title);

          return (
            <RevealItem key={group.id}>
              <section className="space-y-6">
                <SectionHeading title={title} body={t(groupCopyKeys[group.id].body)} />
                <div className="grid gap-4 md:grid-cols-2">
                  {group.assets.map((asset) => (
                    <LogoCard key={asset.id} asset={asset} kind={group.kind} name={title} />
                  ))}
                </div>
              </section>
            </RevealItem>
          );
        })}

        <RevealItem>
          <section className="space-y-6">
            <SectionHeading title={t("clearSpaceTitle")} body={t("clearSpaceBody")} />
            <div className="grid gap-4 md:grid-cols-2">
              {(["light", "dark"] as const).map((background) => (
                <div key={background} className="space-y-4">
                  <ClearSpaceFigure
                    variant="icon"
                    background={background}
                    label={t("clearSpaceIcon")}
                  />
                  <ClearSpaceFigure
                    variant="wordmark"
                    background={background}
                    label={t("clearSpaceWordmark")}
                  />
                </div>
              ))}
            </div>
          </section>
        </RevealItem>

        <RevealItem>
          <section className="space-y-6">
            <SectionHeading title={t("colorsTitle")} body={t("colorsBody")} />

            <div className={cn(cardClassName, "grid gap-1.5 p-1.5 md:grid-cols-2")}>
              <div
                className={cn(
                  "flex min-h-44 flex-col justify-end rounded-xl p-5",
                  virastackColor.bgClass,
                )}
              >
                <p className="font-heading text-2xl font-semibold text-black">{siteConfig.name}</p>
                <p className="font-mono text-xs text-black/70">{virastackColor.shade}</p>
              </div>
              <ul className="grid grid-rows-4 divide-y divide-border px-1.5">
                {virastackFormats.map((format) => (
                  <li key={format.label} className="flex">
                    <CopyBlock
                      text={format.value}
                      label={t("copyValue", { name: format.label })}
                      className="rounded-none px-2 py-1.5"
                    >
                      <span className="w-14 font-mono text-xs text-muted-foreground">
                        {format.label}
                      </span>
                      <span className="flex-1 font-mono text-sm text-foreground">
                        {format.value}
                      </span>
                    </CopyBlock>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 pt-4">
              <h3 className="text-sm font-medium text-foreground">{t("productsTitle")}</h3>
              {productGroups.map((group) => (
                <div key={group.id} className="space-y-3">
                  <h4 className="text-sm text-muted-foreground">{tHome(`${group.id}Title`)}</h4>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.ids.map((id) => {
                      const palette = getBrandPalette(id);

                      return (
                        <li key={palette.id} className="rounded-xl border border-border bg-card">
                          <CopyBlock
                            text={palette.hex}
                            label={t("copyValue", {
                              name: `${siteConfig.name} ${palette.productName}`,
                            })}
                            className="rounded-xl p-3"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/brand/virastack-icon.svg"
                              alt=""
                              width={36}
                              height={36}
                              className="size-9 shrink-0"
                            />
                            <span className="min-w-0">
                              <span className="block truncate font-heading text-sm">
                                <span className="font-semibold text-primary">
                                  {siteConfig.name}
                                </span>{" "}
                                <span className={cn("font-bold", palette.textClass)}>
                                  {palette.productName}
                                </span>
                              </span>
                              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                                <span
                                  aria-hidden
                                  className={cn("size-2.5 shrink-0 rounded-full", palette.bgClass)}
                                />
                                <span className="truncate">
                                  {palette.hex} · {palette.shade}
                                </span>
                              </span>
                            </span>
                          </CopyBlock>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </RevealItem>

        <RevealItem>
          <section>
            <SectionHeading
              title={t("fontTitle")}
              body={t.rich("fontBody", {
                link: (chunks) => (
                  <a
                    href="https://fonts.google.com/specimen/Sora"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    {chunks}
                  </a>
                ),
              })}
            />
          </section>
        </RevealItem>

        <RevealItem>
          <section>
            <SectionHeading
              title={t("nameTitle")}
              body={t.rich("nameBody", {
                bold: (chunks) => (
                  <strong className="font-semibold text-foreground">{chunks}</strong>
                ),
              })}
            />
          </section>
        </RevealItem>
      </RevealGroup>
    </div>
  );
}
