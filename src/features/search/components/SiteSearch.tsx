"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import {
  BookOpenIcon,
  FileTextIcon,
  FormIcon,
  RocketIcon,
  SparklesIcon,
  SquareAsteriskIcon,
} from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

import type { ProductId } from "@/types/product.types";
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
import {
  buildSearchDocuments,
  filterSearchDocuments,
  groupSearchDocumentsByProduct,
} from "@/features/search/helpers/build-search-documents";
import { useRouter } from "@/i18n/routing";

const productIcons: Record<ProductId, typeof RocketIcon> = {
  start: RocketIcon,
  ai: SparklesIcon,
  mask: FormIcon,
  password: SquareAsteriskIcon,
  guide: BookOpenIcon,
};

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const satisfies Record<ProductId, string>;

function isMacPlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

function subscribeNoop() {
  return () => {};
}

function useIsMac() {
  return useSyncExternalStore(subscribeNoop, isMacPlatform, () => true);
}

export function SiteSearch() {
  const t = useTranslations("Search");
  const tNav = useTranslations("Navigation");
  const tProducts = useTranslations("Products");
  const messages = useMessages() as Record<string, unknown>;
  const router = useRouter();
  const isMac = useIsMac();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [productFilter, setProductFilter] = useState<Set<ProductId>>(() => new Set());

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
    }
  };

  const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("open")}
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        className={cn(
          "inline-flex h-8 w-auto items-center gap-2 rounded-md border-transparent bg-transparent px-2 text-xs text-muted-foreground transition-colors sm:w-44 sm:border sm:border-input sm:px-2.5 sm:shadow-xs",
          "hover:bg-muted/50 hover:text-foreground",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        )}
      >
        <span className="hidden min-w-0 flex-1 truncate text-left sm:inline">{t("open")}</span>
        <kbd className="pointer-events-none inline-flex h-5 shrink-0 items-center rounded border border-border bg-muted px-1 font-mono text-[10px] text-muted-foreground">
          {shortcutLabel}
        </kbd>
      </button>

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
                  <span className={cn("font-medium italic", active && product.colorClass)}>
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
                          setOpen(false);
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
    </>
  );
}
