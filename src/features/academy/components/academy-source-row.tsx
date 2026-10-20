"use client";

import { useId, useState } from "react";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { withUtm } from "@/lib/external-link";
import { cn } from "@/lib/utils";

import { AcademyBadgeLogo } from "@/features/academy/components/academy-badge";
import { AcademySourceGuides } from "@/features/academy/components/academy-source-guides";
import { resolveAcademySourceVisual } from "@/features/academy/constants/source-visual.constants";
import type { AcademySourceEntry } from "@/features/academy/lib/collect-academy-sources";
import { Avatar, AvatarFallback, AvatarImage, TableCell, TableRow } from "@/ui";

type AcademySourceRowProps = {
  source: AcademySourceEntry;
};

function SourceLogo({ source }: { source: AcademySourceEntry }) {
  const visual = resolveAcademySourceVisual(
    source.name,
    source.kind === "engineer" ? "person" : "organization",
  );

  if (visual.type === "badge") {
    return (
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-background outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10">
        <AcademyBadgeLogo kind={visual.badgeKind} className="size-4" />
      </span>
    );
  }

  if (visual.type === "logo") {
    return (
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-background outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={visual.imageSrc}
          alt=""
          className="size-6 object-contain outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </span>
    );
  }

  if (visual.type === "avatar") {
    return (
      <Avatar size="default" className="after:hidden">
        <AvatarImage
          src={visual.imageSrc}
          alt={source.name}
          className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <AvatarFallback>{visual.initials}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar size="default">
      <AvatarFallback>{visual.initials}</AvatarFallback>
    </Avatar>
  );
}

function trustLabel(
  source: AcademySourceEntry,
  t: ReturnType<typeof useTranslations<"Academy">>,
): string {
  if (source.trustReason) {
    return source.trustReason;
  }
  if (source.kind === "official") {
    return t("sourcesTrustOfficial");
  }
  if (source.kind === "engineer") {
    return t("sourcesTrustEngineer");
  }
  return t("sourcesTrustInstitution");
}

export function AcademySourceRow({ source }: AcademySourceRowProps) {
  const t = useTranslations("Academy");
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const reason = trustLabel(source, t);

  return (
    <>
      <TableRow className={cn("duration-100", open && "border-b-0")}>
        <TableCell className="overflow-hidden">
          <div className="flex min-w-0 items-center gap-3">
            <SourceLogo source={source} />
            <span className="truncate font-medium text-foreground">{source.name}</span>
          </div>
        </TableCell>
        <TableCell className="text-pretty text-muted-foreground">{reason}</TableCell>
        <TableCell className="text-right text-muted-foreground tabular-nums">
          {source.guideCount}
        </TableCell>
        <TableCell className="text-right text-muted-foreground tabular-nums">
          {source.citationCount}
        </TableCell>
        <TableCell className="w-10 px-1 text-right">
          <button
            type="button"
            className="relative inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-[scale,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.96] motion-reduce:active:scale-100"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={t("sourcesToggleGuides", { name: source.name })}
            onClick={() => {
              setOpen((current) => !current);
            }}
          >
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                open && "rotate-180",
              )}
            />
          </button>
        </TableCell>
      </TableRow>
      {open ? (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={5} className="bg-muted/30 p-0">
            <div id={panelId} className="py-4 pr-4 pl-14">
              <p className="text-sm text-foreground">
                <span className="font-medium">{source.name}</span>
                {source.hostLabel && source.href ? (
                  <>
                    <span className="text-muted-foreground"> · </span>
                    <a
                      href={withUtm(source.href, "sources")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {source.hostLabel}
                      <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.5} />
                    </a>
                  </>
                ) : null}
              </p>
              <div className="mt-4">
                <AcademySourceGuides guides={source.guides} />
              </div>
            </div>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}
