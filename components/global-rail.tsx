"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Users, Github, Info, Map, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { XIcon } from "@/components/icons/X";
import { projects } from "@/data/projects";

const internalLinks = [
  { translationKey: "about" as const, url: "/about", icon: Info },
  { translationKey: "roadmap" as const, url: "/roadmap", icon: Map },
  { translationKey: "maintainers" as const, url: "/maintainers", icon: Users },
  { translationKey: "community" as const, url: "/community", icon: Star },
];

const externalLinks = [
  {
    name: "GitHub",
    url: "https://github.com/virastack",
    icon: Github,
    external: true,
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/omergulcicek",
    icon: XIcon,
    external: true,
  },
];

export function GlobalRail() {
  const pathname = usePathname();
  const tNav = useTranslations("Common.Navigation");

  const isMask = pathname.startsWith("/mask");
  const isPassword = pathname.startsWith("/password");

  if (!isMask && !isPassword) return null;

  return (
    <>
      <div className="hidden md:block w-14 shrink-0 transition-all duration-300 group-[.hide-mini-sidebar]/body:w-0 group-[.hide-mini-sidebar]/body:opacity-0" />
      <div className="hidden md:flex flex-col items-center w-14 h-[calc(100svh-3rem)] fixed left-0 top-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-r border-border/40 bg-sidebar py-4 gap-2 z-20 shrink-0 transition-transform duration-300 group-[.hide-mini-sidebar]/body:-translate-x-full">
        {/* Projects */}
        <div className="flex flex-col gap-1 w-full items-center">
          <TooltipProvider delayDuration={0}>
            {[...projects]
              .sort((a, b) => {
                const statusOrder = {
                  "In Dev": 1,
                  Research: 2,
                  "Coming Soon": 3,
                };
                const aStatus = a.status ? statusOrder[a.status] : 0;
                const bStatus = b.status ? statusOrder[b.status] : 0;
                return aStatus - bStatus;
              })
              .map((item) => {
                if (item.status) {
                  return <React.Fragment key={item.name}></React.Fragment>;
                }

                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center justify-center size-8 rounded-lg transition-colors hover:bg-sidebar-accent",
                          isActive && "bg-sidebar-accent",
                        )}
                      >
                        <div className={cn(`size-3 rounded`, item.color)} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      {item.name}{" "}
                      {item.status && (
                        <span className="text-muted-foreground ml-1">
                          ({item.status})
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
          </TooltipProvider>
        </div>

        {/* Separator */}
        <div className="w-8 h-px bg-border/40 my-2" />

        {/* Links */}
        <div className="flex flex-col gap-1 w-full items-center">
          <TooltipProvider delayDuration={0}>
            {internalLinks.map((item) => {
              const label = tNav(item.translationKey);
              const isActive =
                pathname === item.url || pathname.startsWith(`${item.url}/`);
              return (
                <Tooltip key={item.url}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center justify-center size-8 rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        isActive && "bg-sidebar-accent text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    {label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
            {externalLinks.map((item) => {
              const isActive =
                pathname === item.url || pathname.startsWith(`${item.url}/`);
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      target={item.external ? "_blank" : undefined}
                      className={cn(
                        "flex items-center justify-center size-8 rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        isActive && "bg-sidebar-accent text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}
