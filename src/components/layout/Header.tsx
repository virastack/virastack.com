"use client";

import { useState } from "react";

import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ProductId } from "@/types/product.types";
import { isAcademyPath } from "@/config/academy-subnav.config";
import { getBrandPalette } from "@/config/brand-palettes.config";
import { productIcons } from "@/config/product-icons.config";
import { getProductByPathname, products } from "@/config/products.config";
import { headerNavLinks } from "@/config/site-nav.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { GithubIcon, XLogo } from "@/components/icons";
import { AcademySubHeader } from "@/components/layout/AcademySubHeader";
import { HeaderLogoContextMenu } from "@/components/layout/HeaderLogoContextMenu";
import { ProductSubHeader } from "@/components/layout/ProductSubHeader";
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

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  address: "addressName",
  guide: "guideName",
} as const satisfies Record<ProductId, string>;

const productDescKeys = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  address: "addressDesc",
  guide: "guideDesc",
} as const satisfies Record<ProductId, string>;

const academyPalette = getBrandPalette("academy");

export function Header() {
  const t = useTranslations("Navigation");

  /** Academy is a product, so its name carries the product color instead of plain text. */
  const navLabel = (item: (typeof headerNavLinks)[number]) =>
    item.href === "/academy" ? (
      <span className={cn("font-semibold", academyPalette.textClass)}>{t(item.labelKey)}</span>
    ) : (
      t(item.labelKey)
    );
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeProduct = getProductByPathname(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch">
        <div className="flex items-center md:justify-self-start">
          <HeaderLogoContextMenu>
            <Link href="/" className="inline-flex shrink-0 items-center gap-2 tracking-tight">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="" className="block size-6 shrink-0" />
              <span className="text-lg leading-none font-semibold text-primary">
                {siteConfig.name}
                {activeProduct ? (
                  <>
                    {" "}
                    <span className={cn("font-bold", activeProduct.colorClass)}>
                      {t(productNameKeys[activeProduct.id])}
                    </span>
                  </>
                ) : null}
              </span>
            </Link>
          </HeaderLogoContextMenu>
        </div>

        <nav className="hidden justify-self-center md:block" aria-label={t("primaryNav")}>
          <NavigationMenu align="center">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("products")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[min(100vw-2rem,36rem)] grid-cols-1 gap-1 p-2 sm:grid-cols-2">
                    {products.map((product) => {
                      const Icon = productIcons[product.id];
                      const active = activeProduct?.id === product.id;

                      return (
                        <li key={product.id} className="flex">
                          <NavigationMenuLink
                            active={active}
                            closeOnClick
                            className="flex h-full w-full items-start gap-3 p-3"
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
                                <span className="font-semibold text-primary">
                                  {siteConfig.name}
                                </span>{" "}
                                <span className={cn("font-bold", product.colorClass)}>
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
              {headerNavLinks.map((item) => {
                const active =
                  item.href === "/academy" ? isAcademyPath(pathname) : pathname === item.href;

                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      active={active}
                      className={navigationMenuTriggerStyle()}
                      render={<Link href={item.href} />}
                    >
                      {navLabel(item)}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-0.5 md:justify-self-end">
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
                <DrawerTitle className="text-lg font-semibold tracking-tight text-primary">
                  {siteConfig.name}
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
                    const Icon = productIcons[product.id];
                    const active = activeProduct?.id === product.id;

                    return (
                      <li key={product.id}>
                        <DrawerClose
                          render={
                            <Link
                              href={product.href}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted",
                                active && "bg-muted font-medium",
                              )}
                            />
                          }
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                          {t(productNameKeys[product.id])}
                        </DrawerClose>
                      </li>
                    );
                  })}
                  {headerNavLinks.map((item) => {
                    const active =
                      item.href === "/academy" ? isAcademyPath(pathname) : pathname === item.href;

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
                          {navLabel(item)}
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

      {activeProduct ? (
        <ProductSubHeader product={activeProduct} />
      ) : isAcademyPath(pathname) ? (
        <AcademySubHeader />
      ) : null}
    </header>
  );
}
