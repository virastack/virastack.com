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
  const navLabel = (item: (typeof headerNavLinks)[number]) => (
    <span className="relative inline-block">
      {item.href === "/academy" ? (
        <span className={cn("font-semibold", academyPalette.textClass)}>{t(item.labelKey)}</span>
      ) : (
        t(item.labelKey)
      )}
      {item.isNew ? (
        <span className="absolute -top-2.5 -right-4 rounded-full bg-foreground/10 px-1 py-px text-[9px] leading-3 font-medium text-muted-foreground">
          {t("new")}
        </span>
      ) : null}
    </span>
  );
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = () => setMobileOpen(false);
  const activeProduct = getProductByPathname(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-items-stretch">
        <div className="flex items-center lg:justify-self-start">
          <HeaderLogoContextMenu>
            <Link href="/" className="inline-flex shrink-0 items-center gap-2 tracking-tight">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-sm.webp"
                alt=""
                width={24}
                height={24}
                className="block size-6 shrink-0"
              />
              <span className="text-lg leading-none font-semibold text-primary">
                {siteConfig.name}
                {activeProduct ? (
                  // Between lg and xl the nav leaves no room; the product sub-header still names it.
                  <span className="lg:max-xl:hidden">
                    {" "}
                    <span className={cn("font-bold", activeProduct.colorClass)}>
                      {t(productNameKeys[activeProduct.id])}
                    </span>
                  </span>
                ) : null}
              </span>
            </Link>
          </HeaderLogoContextMenu>
        </div>

        <nav className="hidden justify-self-center lg:block" aria-label={t("primaryNav")}>
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

        <div className="flex items-center gap-0.5 lg:justify-self-end">
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
            className="mx-0.5 lg:hidden data-vertical:h-4 data-vertical:self-auto"
          />

          <Drawer open={mobileOpen} onOpenChange={setMobileOpen} showSwipeHandle>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
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
                    <Link
                      href="/"
                      onClick={closeMobileMenu}
                      className={cn(
                        "block rounded-md px-2 py-2 text-sm font-semibold transition-colors hover:bg-muted",
                        pathname === "/" && "bg-muted",
                      )}
                    >
                      {t("home")}
                    </Link>
                  </li>
                  {products.map((product) => {
                    const Icon = productIcons[product.id];
                    const active = activeProduct?.id === product.id;

                    return (
                      <li key={product.id}>
                        <Link
                          href={product.href}
                          onClick={closeMobileMenu}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted",
                            active && "bg-muted font-medium",
                          )}
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                          {t(productNameKeys[product.id])}
                        </Link>
                      </li>
                    );
                  })}
                  {headerNavLinks.map((item) => {
                    const active =
                      item.href === "/academy" ? isAcademyPath(pathname) : pathname === item.href;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={cn(
                            "block rounded-md px-2 py-2 text-sm font-semibold transition-colors hover:bg-muted",
                            active && "bg-muted",
                          )}
                        >
                          {navLabel(item)}
                        </Link>
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
