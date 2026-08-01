"use client";

import type { ReactNode } from "react";

import { usePathname } from "@/i18n/routing";

type AppShellProps = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

function isGuidePlayPath(pathname: string) {
  return pathname === "/guide/play" || pathname.endsWith("/guide/play");
}

function isDocsPath(pathname: string) {
  return pathname.includes("/docs");
}

export function AppShell({ children, header, footer }: AppShellProps) {
  const pathname = usePathname();
  const immersive = isGuidePlayPath(pathname);
  const docs = isDocsPath(pathname);

  return (
    <>
      {immersive ? null : header}
      <div className="flex flex-1 flex-col">{children}</div>
      {immersive || docs ? null : footer}
    </>
  );
}
