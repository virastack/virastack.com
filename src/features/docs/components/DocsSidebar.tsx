"use client";

import type { ReactNode } from "react";

import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import type { DocsNavItem, DocsNavSection } from "@/features/docs/types/docs.types";
import { Link, usePathname } from "@/i18n/routing";

type DocsSidebarProps = {
  sections: DocsNavSection[];
  productLabel: ReactNode;
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

export function DocsSidebar({ sections, productLabel }: DocsSidebarProps) {
  const t = useTranslations("Docs");
  const pathname = usePathname();

  return (
    <nav aria-label={t("docsNav")} className="flex flex-col gap-6">
      <div className="px-2 text-sm tracking-tight">{productLabel}</div>
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">{section.title}</p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.slug}>
                  <DocsNavLink
                    item={item}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
