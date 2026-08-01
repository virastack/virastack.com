"use client";

import { useState, type ReactNode } from "react";

import { PanelLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DocsSidebar } from "@/features/docs/components/DocsSidebar";
import type { DocsNavSection } from "@/features/docs/types/docs.types";
import { usePathname } from "@/i18n/routing";

type DocsMobileNavProps = {
  sections: DocsNavSection[];
  productLabel: ReactNode;
  /** @deprecated Kept for call-site compatibility; active state is exact pathname match. */
  docsIndexHref?: string;
};

export function DocsMobileNav({ sections, productLabel, docsIndexHref }: DocsMobileNavProps) {
  const t = useTranslations("Docs");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <div className="mb-6 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="outline" size="sm" className="gap-1.5 bg-background" />}
        >
          <PanelLeftIcon data-icon="inline-start" />
          {t("docsNav")}
        </SheetTrigger>
        <SheetContent side="left" className="w-[min(100%,16rem)] gap-0 p-0 sm:max-w-60">
          <SheetHeader className="sr-only">
            <SheetTitle>{t("docsNav")}</SheetTitle>
          </SheetHeader>
          <div className="h-full overflow-y-auto overscroll-contain px-3 pt-12 pb-6">
            <DocsSidebar
              sections={sections}
              productLabel={productLabel}
              docsIndexHref={docsIndexHref}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
