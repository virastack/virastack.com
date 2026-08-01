"use client";

import { useState } from "react";

import {
  BookOpenIcon,
  FormIcon,
  MenuIcon,
  RocketIcon,
  SparklesIcon,
  SquareAsteriskIcon,
  XIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import type { ProductId } from "@/types/product.types";
import { getProductByPathname, products } from "@/config/products.config";
import { headerNavLinks } from "@/config/site-nav.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { GithubIcon, XLogo } from "@/components/icons";
import { HeaderLogoContextMenu } from "@/components/layout/HeaderLogoContextMenu";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";
import { Separator } from "@/ui/separator";
import { Link, usePathname } from "@/i18n/routing";

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

const productDescKeys = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  guide: "guideDesc",
} as const satisfies Record<ProductId, string>;

export function Header() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeProduct = getProductByPathname(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <HeaderLogoContextMenu>
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt="" className="size-8" />
            <span className="flex items-baseline gap-1.5 text-base sm:text-lg">
              <span className="font-black text-primary">{siteConfig.brandMark}</span>
              {activeProduct ? (
                <span className={cn("font-medium italic", activeProduct.colorClass)}>
                  {t(productNameKeys[activeProduct.id])}
                </span>
              ) : null}
            </span>
          </Link>
        </HeaderLogoContextMenu>

        <nav className="hidden flex-1 md:block" aria-label={t("primaryNav")}>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("products")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[min(100vw-2rem,36rem)] grid-cols-1 gap-1 p-2 sm:grid-cols-2">
                    {products.map((product) => {
                      const Icon = productIcons[product.id];
                      const active = pathname === product.href;

                      return (
                        <li key={product.id}>
                          <NavigationMenuLink
                            active={active}
                            closeOnClick
                            className="flex items-start gap-3 p-3"
                            render={<Link href={product.href} />}
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted",
                                product.colorClass,
                              )}
                            >
                              <Icon className="size-4" aria-hidden />
                            </span>
                            <span className="flex min-w-0 flex-col gap-0.5">
                              <span className="text-sm leading-none">
                                <span className="font-semibold text-foreground">
                                  {siteConfig.name}
                                </span>{" "}
                                <span className={cn("font-medium italic", product.colorClass)}>
                                  {t(productNameKeys[product.id])}
                                </span>
                              </span>
                              <span className="text-xs leading-snug text-muted-foreground">
                                {t(productDescKeys[product.id])}
                              </span>
                            </span>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {headerNavLinks.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    active={pathname === item.href}
                    className={navigationMenuTriggerStyle()}
                    render={<Link href={item.href} />}
                  >
                    {t(item.labelKey)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="ml-auto flex items-center gap-0.5">
          <div className="hidden items-center gap-0.5 sm:flex">
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={<a href={siteConfig.links.github} target="_blank" rel="noreferrer" />}
              aria-label={t("github")}
            >
              <GithubIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={<a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" />}
              aria-label={t("twitter")}
            >
              <XLogo className="size-4" />
            </Button>
            <Separator
              orientation="vertical"
              className="mx-0.5 data-vertical:h-4 data-vertical:self-auto"
            />
            <LanguageSwitcher />
            <Separator
              orientation="vertical"
              className="mx-0.5 data-vertical:h-4 data-vertical:self-auto"
            />
          </div>
          <ThemeToggle />
          <Separator
            orientation="vertical"
            className="mx-0.5 md:hidden data-vertical:h-4 data-vertical:self-auto"
          />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border md:hidden"
          role="dialog"
          aria-label={t("primaryNav")}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-0.5 sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                nativeButton={false}
                render={<a href={siteConfig.links.github} target="_blank" rel="noreferrer" />}
                aria-label={t("github")}
              >
                <GithubIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                nativeButton={false}
                render={<a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" />}
                aria-label={t("twitter")}
              >
                <XLogo className="size-4" />
              </Button>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-vertical:h-4 data-vertical:self-auto"
              />
              <LanguageSwitcher />
            </div>

            <div>
              <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {t("products")}
              </p>
              <ul className="flex flex-col gap-1">
                {products.map((product) => {
                  const Icon = productIcons[product.id];
                  const active = pathname === product.href;

                  return (
                    <li key={product.id}>
                      <Link
                        href={product.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted",
                          active && "bg-muted",
                        )}
                      >
                        <Icon className={cn("size-4", product.colorClass)} aria-hidden />
                        <span>
                          <span className="font-semibold">{siteConfig.name}</span>{" "}
                          <span className={cn("font-medium italic", product.colorClass)}>
                            {t(productNameKeys[product.id])}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ul className="flex flex-col gap-1">
              {headerNavLinks.map((item) => {
                const active = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-muted",
                        active && "bg-muted",
                      )}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}
