"use client";

import type { ReactNode } from "react";

import { DownloadIcon, PaletteIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/ui/context-menu";
import { Link } from "@/i18n/routing";

function downloadFile(href: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

type HeaderLogoContextMenuProps = {
  children: ReactNode;
};

export function HeaderLogoContextMenu({ children }: HeaderLogoContextMenuProps) {
  const t = useTranslations("Navigation");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="inline-flex">{children}</ContextMenuTrigger>
      <ContextMenuContent className="min-w-52">
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              downloadFile("/logo-icon.svg", "virastack-logo-icon.svg");
            }}
          >
            <DownloadIcon />
            {t("logoContextDownload")}
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem render={<Link href="/brand" />}>
            <PaletteIcon />
            {t("logoContextBrand")}
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
