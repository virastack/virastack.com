"use client";

import { useState } from "react";

import {
  BookOpenIcon,
  FormIcon,
  MenuIcon,
  RocketIcon,
  SparklesIcon,
  SquareAsteriskIcon,
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SiteSearch } from "@/features/search";
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
          <Link href="/" className="flex shrink-0 items-center gap-2 tracking-tight">
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
          <SiteSearch />
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

          <Drawer open={mobileOpen} onOpenChange={setMobileOpen} showSwipeHandle>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </Button>

            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle className="font-black tracking-tight text-primary">
                  {siteConfig.brandMark}
                </DrawerTitle>
              </DrawerHeader>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4">
                <ul className="mb-10 flex flex-col gap-1">
                  <li>
                    <DrawerClose
                      render={
                        <Link
                          href="/"
                          className={cn(
                            "block rounded-md px-2 py-2 text-sm font-semibold transition-colors hover:bg-muted",
                            pathname === "/" && "bg-muted",
                          )}
                        />
                      }
                    >
                      {t("home")}
                    </DrawerClose>
                  </li>
                  {products.map((product) => {
                    const active = pathname === product.href;

                    return (
                      <li key={product.id}>
                        <DrawerClose
                          render={
                            <Link
                              href={product.href}
                              className={cn(
                                "block rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted",
                                active && "bg-muted",
                              )}
                            />
                          }
                        >
                          <span className="font-semibold">{siteConfig.name}</span>{" "}
                          <span className={cn("font-medium italic", product.colorClass)}>
                            {t(productNameKeys[product.id])}
                          </span>
                        </DrawerClose>
                      </li>
                    );
                  })}
                  {headerNavLinks.map((item) => {
                    const active = pathname === item.href;

                    return (
                      <li key={item.href}>
                        <DrawerClose
                          render={
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-md px-2 py-2 text-sm font-semibold transition-colors hover:bg-muted",
                                active && "bg-muted",
                              )}
                            />
                          }
                        >
                          {t(item.labelKey)}
                        </DrawerClose>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <DrawerFooter className="border-t border-border p-4 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5">
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
                      render={
                        <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" />
                      }
                      aria-label={t("twitter")}
                    >
                      <XLogo className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
