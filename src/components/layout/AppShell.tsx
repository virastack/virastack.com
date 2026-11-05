"use client";

import type { ReactNode } from "react";

import { SkipLink } from "@/components/layout/SkipLink";
import { usePathname } from "@/i18n/routing";

type AppShellProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

function isGuidePlayPath(pathname: string) {
  return pathname === "/guide/play" || pathname.endsWith("/guide/play");
}

/** A module's demo alone, opened in the module page's iframe. */
function isFeaturePreviewPath(pathname: string) {
  return pathname.startsWith("/start/preview/");
}

export function AppShell({ children, header, footer }: AppShellProps) {
  const pathname = usePathname();
  const immersive = isGuidePlayPath(pathname) || isFeaturePreviewPath(pathname);

  return (
    <>
      <SkipLink />
      {immersive ? null : header}
      {/* tabIndex lets the skip link move focus here, not just scroll. */}
      <div id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </div>
      {immersive ? null : footer}
    </>
  );
}
