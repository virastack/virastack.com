"use client";

import { useMemo, useState } from "react";

import { FileTextIcon } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

import type { ProductId } from "@/types/product.types";
import { productIcons } from "@/config/product-icons.config";
import { products } from "@/config/products.config";
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
import { productNameKeys } from "@/features/search/constants/product-name-keys.constants";
import {
  buildSearchDocuments,
  filterSearchDocuments,
  groupSearchDocumentsByProduct,
} from "@/features/search/helpers/build-search-documents";
import { useRouter } from "@/i18n/routing";

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
  const messages = useMessages() as Record<string, unknown>;
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [productFilter, setProductFilter] = useState<Set<ProductId>>(() => new Set());

  const documents = useMemo(
    () =>
      buildSearchDocuments(
        messages,
        (key) => String(tProducts.raw(key as "startDesc")),
        (key) => String(tNav.raw(key as "startName")),
      ),
    [messages, tNav, tProducts],
  );

  const results = useMemo(
    () => filterSearchDocuments(documents, query, productFilter),
    [documents, productFilter, query],
  );

  const groups = useMemo(() => groupSearchDocumentsByProduct(results), [results]);

  const toggleProduct = (productId: ProductId) => {
    setProductFilter((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
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
          {products.map((product) => {
            const active = productFilter.has(product.id);
            const Icon = productIcons[product.id];

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggleProduct(product.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors",
                  active
                    ? "border-foreground/20 bg-muted text-foreground"
                    : "border-transparent bg-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <Icon className={cn("size-3", product.colorClass)} aria-hidden />
                <span className={cn("font-bold", active && product.colorClass)}>
                  {tNav(productNameKeys[product.id])}
                </span>
              </button>
            );
          })}
        </div>

        <CommandList>
          <CommandEmpty>{t("empty")}</CommandEmpty>

          {groups.map((group) => {
            const product = products.find((item) => item.id === group.productId);
            if (!product) return null;

            return (
              <CommandGroup
                key={group.productId}
                heading={`${siteConfig.name} ${tNav(productNameKeys[group.productId])}`}
              >
                {group.items.map((doc) => {
                  const ProductIcon = productIcons[doc.productId];
                  const ItemIcon = doc.kind === "landing" ? ProductIcon : FileTextIcon;

                  return (
                    <CommandItem
                      key={doc.id}
                      value={doc.id}
                      onSelect={() => {
                        onOpenChange(false);
                        router.push(doc.href);
                      }}
                    >
                      <ItemIcon className={cn("size-4", product.colorClass)} aria-hidden />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate font-medium">{doc.title}</span>
                        {doc.description ? (
                          <span className="truncate text-xs text-muted-foreground">
                            {doc.description}
                          </span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-[10px] tracking-wide text-muted-foreground uppercase">
                        {doc.kind === "landing" ? t("kindLanding") : t("kindDocs")}
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
