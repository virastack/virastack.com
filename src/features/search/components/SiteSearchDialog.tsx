"use client";

import { useMemo, useState } from "react";

import { FileTextIcon } from "lucide-react";
import { useLocale, useMessages, useTranslations } from "next-intl";

import { productIcons } from "@/config/product-icons.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  searchFilterSections,
  searchSections,
  sectionNameKeys,
} from "@/features/search/constants/search-sections.constants";
import {
  buildSearchDocuments,
  filterSearchDocuments,
  groupSearchDocumentsBySection,
} from "@/features/search/helpers/build-search-documents";
import { useAcademySearchDocuments } from "@/features/search/hooks/use-academy-search-documents";
import type { SearchKind, SearchSectionId } from "@/features/search/types/search.types";
import { useRouter } from "@/i18n/routing";

const kindLabelKeys = {
  landing: "kindLanding",
  docs: "kindDocs",
  track: "kindTrack",
  lesson: "kindLesson",
  project: "kindProject",
} as const satisfies Record<SearchKind, string>;

type SiteSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortcutLabel: string;
};

/**
 * The search palette itself: cmdk, the dialog and the search index. Loaded on
 * first open (see `SiteSearch`) so none of it ships with the initial page.
 */
export function SiteSearchDialog({ open, onOpenChange, shortcutLabel }: SiteSearchDialogProps) {
  const t = useTranslations("Search");
  const tNav = useTranslations("Navigation");
  const tProducts = useTranslations("Products");
  const locale = useLocale();
  const messages = useMessages() as Record<string, unknown>;
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState<Set<SearchSectionId>>(() => new Set());
  const academyDocuments = useAcademySearchDocuments(locale);

  const staticDocuments = useMemo(
    () =>
      buildSearchDocuments(
        messages,
        (key) => String(tProducts.raw(key as "startDesc")),
        (key) => String(tNav.raw(key as "startName")),
      ),
    [messages, tNav, tProducts],
  );

  const results = useMemo(
    () => filterSearchDocuments([...staticDocuments, ...academyDocuments], query, sectionFilter),
    [academyDocuments, query, sectionFilter, staticDocuments],
  );

  const groups = useMemo(() => groupSearchDocumentsBySection(results), [results]);

  const toggleSection = (sectionId: SearchSectionId) => {
    setSectionFilter((current) => {
      const next = new Set(current);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setQuery("");
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={t("title")}
      description={t("description")}
    >
      <Command shouldFilter={false}>
        <CommandInput value={query} onValueChange={setQuery} placeholder={t("placeholder")} />

        <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-3 py-2">
          <span className="mr-1 hidden text-xs text-muted-foreground sm:inline">
            {t("filterLabel")}
          </span>
          {searchFilterSections.map((section) => {
            const active = sectionFilter.has(section.id);
            const Icon = productIcons[section.id];

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => toggleSection(section.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors",
                  active
                    ? "border-foreground/20 bg-muted text-foreground"
                    : "border-transparent bg-transparent text-foreground hover:bg-muted/60",
                )}
              >
                <Icon className={cn("size-3", section.colorClass)} aria-hidden />
                <span className={cn("font-bold", active && section.colorClass)}>
                  {tNav(sectionNameKeys[section.id])}
                </span>
              </button>
            );
          })}
        </div>

        <CommandList>
          <CommandEmpty>{t("empty")}</CommandEmpty>

          {groups.map((group) => {
            const section = searchSections.find((item) => item.id === group.sectionId);
            if (!section) return null;

            return (
              <CommandGroup
                key={group.sectionId}
                heading={`${siteConfig.name} ${tNav(sectionNameKeys[group.sectionId])}`}
              >
                {group.items.map((doc) => {
                  const SectionIcon = productIcons[doc.sectionId];
                  const ItemIcon =
                    doc.kind === "landing" || doc.kind === "track" ? SectionIcon : FileTextIcon;

                  return (
                    <CommandItem
                      key={doc.id}
                      value={doc.id}
                      onSelect={() => {
                        onOpenChange(false);
                        router.push(doc.href);
                      }}
                    >
                      <ItemIcon className={cn("size-4", section.colorClass)} aria-hidden />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate font-medium">{doc.title}</span>
                        {doc.description ? (
                          <span className="truncate text-xs text-muted-foreground">
                            {doc.description}
                          </span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-[10px] tracking-wide text-muted-foreground uppercase">
                        {t(kindLabelKeys[doc.kind])}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>

        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground">
          <span>{t("hintNavigate")}</span>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            {shortcutLabel}
          </kbd>
        </div>
      </Command>
    </CommandDialog>
  );
}
