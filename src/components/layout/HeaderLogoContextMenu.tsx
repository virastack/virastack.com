"use client";

import { useEffect, useState, type ReactNode } from "react";

import { CheckIcon, CircleXIcon, CopyIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Link } from "@/i18n/routing";

type Target = "logo" | "wordmark";
type CopyStatus = { target: Target; state: "done" | "error" };

const ICON_PATH = "/brand/virastack-icon.svg";
const CLOSE_DELAY_MS = 700;

type HeaderLogoContextMenuProps = {
  children: ReactNode;
};

/**
 * Right-click menu on the header logo. Hovering an item tints the part of the logo it copies:
 * the header draws one highlight that follows `data-active` and `data-shape` (logo or wordmark).
 */
export function HeaderLogoContextMenu({ children }: HeaderLogoContextMenuProps) {
  const t = useTranslations("Navigation");
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<Target | null>(null);
  // Last highlighted target: the highlight keeps its shape while it fades out.
  const [shape, setShape] = useState<Target>("logo");
  const [status, setStatus] = useState<CopyStatus | null>(null);

  // Closes the menu shortly after a copy, so the check or error icon is seen first.
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => {
      setOpen(false);
      setHighlight(null);
      setStatus(null);
    }, CLOSE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setShape("logo");
    } else {
      setHighlight(null);
      setStatus(null);
    }
  }

  function show(target: Target) {
    setHighlight(target);
    setShape(target);
  }

  async function copy(target: Target) {
    const path =
      target === "logo"
        ? ICON_PATH
        : `/brand/virastack-wordmark-${resolvedTheme === "dark" ? "dark" : "light"}.svg`;
    let next: CopyStatus;

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Could not load ${path}`);
      await navigator.clipboard.writeText(await response.text());
      next = { target, state: "done" };
    } catch {
      // Reported through the item's icon and label, not swallowed.
      next = { target, state: "error" };
    }

    setStatus(next);
  }

  function copyItemProps(target: Target) {
    return {
      closeOnClick: false,
      onClick: () => void copy(target),
      onMouseEnter: () => show(target),
      onFocus: () => show(target),
      onMouseLeave: () => setHighlight(null),
      onBlur: () => setHighlight(null),
    };
  }

  function label(target: Target, idle: string) {
    if (status?.target !== target) return idle;
    return status.state === "done" ? t("logoContextCopied") : t("logoContextCopyFailed");
  }

  function icon(target: Target, idle: ReactNode) {
    if (status?.target !== target) return idle;
    return status.state === "done" ? <CheckIcon /> : <CircleXIcon />;
  }

  return (
    <ContextMenu open={open} onOpenChange={handleOpenChange}>
      <ContextMenuTrigger
        className="group/logo inline-flex items-center"
        data-active={highlight ? "true" : undefined}
        data-shape={shape}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-52">
        <ContextMenuGroup>
          <ContextMenuItem {...copyItemProps("logo")}>
            {icon(
              "logo",
              // eslint-disable-next-line @next/next/no-img-element
              <img src={ICON_PATH} alt="" width={16} height={16} className="size-4" />,
            )}
            {label("logo", t("logoContextCopyLogo"))}
          </ContextMenuItem>
          <ContextMenuItem {...copyItemProps("wordmark")}>
            {icon("wordmark", <CopyIcon />)}
            {label("wordmark", t("logoContextCopyWordmark"))}
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem render={<Link href="/brand" />} onMouseEnter={() => setHighlight(null)}>
            {t("logoContextBrand")}
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
