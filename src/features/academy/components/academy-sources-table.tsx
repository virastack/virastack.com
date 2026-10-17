"use client";

import { useMemo, useState } from "react";

import { Info } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { formatMonthYear } from "@/helpers";

import { AcademySourceRow } from "@/features/academy/components/academy-source-row";
import type { AcademySourceEntry } from "@/features/academy/lib/collect-academy-sources";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/ui";

const SOURCE_FILTERS = ["all", "official", "engineer", "institution"] as const;

type FilterValue = (typeof SOURCE_FILTERS)[number];

type AcademySourcesTableProps = {
  sources: readonly AcademySourceEntry[];
  lastVerified: string | null;
};

function isFilterValue(value: unknown): value is FilterValue {
  return typeof value === "string" && (SOURCE_FILTERS as readonly string[]).includes(value);
}

function ColumnHint({ label }: { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        closeOnClick={false}
        aria-label={label}
        className="relative inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Info aria-hidden className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent className="max-w-64 text-pretty">{label}</TooltipContent>
    </Tooltip>
  );
}

export function AcademySourcesTable({ sources, lastVerified }: AcademySourcesTableProps) {
  const t = useTranslations("Academy");
  const locale = useLocale();
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(() => {
    if (filter === "all") {
      return sources;
    }
    return sources.filter((source) => source.kind === filter);
  }, [filter, sources]);

  const updatedLabel = lastVerified ? formatMonthYear(lastVerified, locale) : null;

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        value={filter}
        onValueChange={(value) => {
          if (isFilterValue(value)) {
            setFilter(value);
          }
        }}
      >
        <TabsList
          aria-label={t("sourcesFilterAria")}
          className="grid h-auto w-full grid-cols-4 rounded-[9px]"
        >
          <TabsTrigger value="all" className="min-w-0 rounded-[6px] px-1 whitespace-normal">
            {t("sourcesFilterAll")}
          </TabsTrigger>
          <TabsTrigger value="official" className="min-w-0 rounded-[6px] px-1 whitespace-normal">
            {t("sourcesFilterOfficial")}
          </TabsTrigger>
          <TabsTrigger value="engineer" className="min-w-0 rounded-[6px] px-1 whitespace-normal">
            {t("sourcesFilterEngineer")}
          </TabsTrigger>
          <TabsTrigger value="institution" className="min-w-0 rounded-[6px] px-1 whitespace-normal">
            {t("sourcesFilterInstitution")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Table className="min-w-2xl table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto whitespace-nowrap">{t("sourcesColumnSource")}</TableHead>
            <TableHead className="w-1/3 whitespace-nowrap">
              <span className="inline-flex items-center gap-1">
                {t("sourcesColumnTrust")}
                <ColumnHint label={t("sourcesTrustTooltip")} />
              </span>
            </TableHead>
            <TableHead className="w-20 text-right whitespace-nowrap">
              {t("sourcesColumnGuides")}
            </TableHead>
            <TableHead className="w-28 text-right whitespace-nowrap">
              <span className="inline-flex w-full items-center justify-end gap-1">
                {t("sourcesColumnCitations")}
                <ColumnHint label={t("sourcesCitationsTooltip")} />
              </span>
            </TableHead>
            <TableHead className="w-10">
              <span className="sr-only">{t("sourcesExpandColumn")}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                {t("sourcesEmpty")}
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((source) => (
              <AcademySourceRow key={`${source.kind}:${source.name}`} source={source} />
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-1 text-sm text-pretty text-muted-foreground">
        <p>{t("sourcesGeneratedNote")}</p>
        {updatedLabel ? <p>{t("sourcesLastUpdated", { date: updatedLabel })}</p> : null}
      </div>
    </div>
  );
}
