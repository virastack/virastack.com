"use client";

import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import type { DocsNavItem, DocsNavSection } from "@/features/docs/types/docs.types";
import { Link, usePathname } from "@/i18n/routing";

type DocsMobileNavProps = {
  sections: DocsNavSection[];
  /** @deprecated Kept for call-site compatibility; active state is exact pathname match. */
  docsIndexHref?: string;
};

function DocsNavLink({ item, className }: { item: DocsNavItem; className: string }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className, "inline-flex items-center gap-1.5 whitespace-nowrap")}
      >
        <span>{item.title}</span>
        <ExternalLinkIcon className="size-3 shrink-0 opacity-70" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.title}
    </Link>
  );
}

export function DocsMobileNav({ sections }: DocsMobileNavProps) {
  const t = useTranslations("Docs");
  const pathname = usePathname();
  const items = sections.flatMap((section) => section.items);

  return (
    <nav
      aria-label={t("docsPages")}
      className="-mx-1 mb-8 flex gap-1 overflow-x-auto pb-2 lg:hidden"
    >
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <DocsNavLink
            key={item.slug}
            item={item}
            className={cn(
              "shrink-0 rounded-md border px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
              active
                ? "border-foreground/20 bg-muted font-medium text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          />
        );
      })}
    </nav>
  );
}
