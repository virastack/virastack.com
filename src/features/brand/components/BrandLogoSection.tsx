"use client";

import { DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { LogoDownloadSelect } from "@/features/brand/components/LogoDownloadSelect";
import { Button } from "@/ui/button";

type LogoVariant = {
  id: "icon" | "wordmarkLight" | "wordmarkDark";
  src: string;
  downloadHref: string;
  downloadFilename: string;
  /** Preview panel background. */
  panel: "muted" | "light" | "dark";
  kind: "icon" | "wordmark";
  hasDropdown: boolean;
  spanFull?: boolean;
};

const logoVariants: readonly LogoVariant[] = [
  {
    id: "icon",
    src: "/logo-icon.svg",
    downloadHref: "/logo-icon.png",
    downloadFilename: "virastack-logo-icon.png",
    panel: "muted",
    kind: "icon",
    hasDropdown: true,
    spanFull: true,
  },
  {
    id: "wordmarkLight",
    src: "/logo-wordmark-light.png",
    downloadHref: "/logo-wordmark-light.png",
    downloadFilename: "virastack-logo-wordmark-light.png",
    panel: "light",
    kind: "wordmark",
    hasDropdown: false,
  },
  {
    id: "wordmarkDark",
    src: "/logo-wordmark-dark.png",
    downloadHref: "/logo-wordmark-dark.png",
    downloadFilename: "virastack-logo-wordmark-dark.png",
    panel: "dark",
    kind: "wordmark",
    hasDropdown: false,
  },
];

const labelKeys = {
  icon: "logoVariantIcon",
  wordmarkLight: "logoVariantWordmarkLight",
  wordmarkDark: "logoVariantWordmarkDark",
} as const;

export function BrandLogoSection() {
  const t = useTranslations("BrandPage");

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{t("logoTitle")}</h2>
        <p className="text-base leading-relaxed text-muted-foreground">{t("logoBody")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {logoVariants.map((variant) => (
          <div
            key={variant.id}
            className={cn(
              "flex flex-col overflow-hidden rounded-2xl border border-border bg-card ring-1 ring-border ring-offset-4 ring-offset-background",
              variant.spanFull && "sm:col-span-2",
            )}
          >
            <div
              className={cn(
                "flex min-h-52 flex-1 items-center justify-center px-6 py-14 sm:min-h-60",
                variant.panel === "muted" && "bg-muted/40",
                variant.panel === "light" && "bg-white",
                variant.panel === "dark" && "bg-black",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={variant.src}
                alt=""
                className={cn(
                  variant.kind === "icon"
                    ? "size-48 sm:size-56"
                    : "h-16 w-auto max-w-[90%] sm:h-20",
                )}
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
              <p className="text-sm font-medium text-foreground">{t(labelKeys[variant.id])}</p>
              {variant.hasDropdown ? (
                <LogoDownloadSelect />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<a href={variant.downloadHref} download={variant.downloadFilename} />}
                >
                  {t("logoDownload")}
                  <DownloadIcon data-icon="inline-end" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
