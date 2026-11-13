"use client";

import type { MouseEvent, ReactNode } from "react";

/**
 * Keeps a demo on its own page inside the module page's iframe: a link inside it does not open,
 * by click, keyboard or middle click, while its buttons work as they do. It listens in the
 * capture phase, so the framework's link sees the event already handled and does not navigate.
 */
export function PreviewLinkGuard({ children }: { children: ReactNode }) {
  const stopLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) event.preventDefault();
  };

  return (
    <div onClickCapture={stopLink} onAuxClickCapture={stopLink}>
      {children}
    </div>
  );
}
