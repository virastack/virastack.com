"use client";

import { cn } from "@/lib/utils";

import { Link } from "@/i18n/routing";

export type SectionSubNavItem = {
  id: string;
  href: string;
  label: string;
  active: boolean;
};

type SectionSubHeaderProps = {
  ariaLabel: string;
  items: readonly SectionSubNavItem[];
};

export function SectionSubHeader({ ariaLabel, items }: SectionSubHeaderProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-border/80">
      <div className="mx-auto flex h-11 max-w-7xl items-center px-4 sm:px-6">
        <nav
          className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto"
          aria-label={ariaLabel}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "inline-flex h-8 shrink-0 items-center rounded-md px-2.5 text-sm text-foreground/80 transition-colors",
                "hover:bg-muted hover:text-foreground",
                item.active && "bg-muted font-medium text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
