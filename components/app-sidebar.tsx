"use client";

import * as React from "react";
import { usePathname, Link } from "@/i18n/navigation";
import {
  createLucideIcon,
  BookOpen,
  Code2,
  Component,
  Github,
  Home,
  Info,
  LayoutTemplate,
  Map,
  Settings2,
  Star,
  ShieldAlert,
  Terminal,
  Twitter,
  Users,
  ChevronRight,
  Bot,
  ExternalLink,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import { XIcon } from "@/components/icons/X";

import { projects } from "@/data/projects";

// Define the data for different contexts
const statusOrder = {
  "In Dev": 1,
  Research: 2,
  "Coming Soon": 3,
};

const sortedProjects = [...projects].sort((a, b) => {
  const aStatus = a.status ? statusOrder[a.status] : 0;
  const bStatus = b.status ? statusOrder[b.status] : 0;
  return aStatus - bStatus;
});

const data: Record<string, any> = {
  home: {
    projects: sortedProjects,
    links: [
      {
        name: "About",
        url: "/about",
        icon: Info,
        translationKey: "Common.Navigation.about",
      },
      {
        name: "Roadmap",
        url: "/roadmap",
        icon: Map,
        translationKey: "Common.Navigation.roadmap",
      },
      {
        name: "Maintainers",
        url: "/maintainers",
        icon: Users,
        translationKey: "Common.Navigation.maintainers",
      },
      {
        name: "Community",
        url: "/community",
        icon: Star,
        translationKey: "Common.Navigation.community",
      },
      {
        name: "GitHub",
        url: "https://github.com/virastack",
        icon: Github,
        external: true,
      },
      {
        name: "X (Twitter)",
        url: "https://x.com/virastack",
        icon: XIcon,
        external: true,
      },
    ],
  },
  "mask": {
    nav: [
      {
        title: "Getting Started",
        translationKey: "InputMask.navigation.gettingStarted",
        url: "/mask/getting-started",
        icon: BookOpen,
      },
      {
        title: "Examples",
        translationKey: "InputMask.navigation.examples",
        url: "/mask/examples",
        icon: Component,
        isActive: false,
        items: [
          {
            title: "Overview",
            translationKey: "InputMask.navigation.overview",
            url: "/mask/examples",
          },
          {
            title: "Credit Card",
            translationKey: "InputMask.navigation.creditCard",
            url: "/mask/examples/credit-card",
          },
          {
            title: "Card Number",
            translationKey: "InputMask.navigation.cardNumber",
            url: "/mask/examples/card",
          },
          {
            title: "Expiry",
            translationKey: "InputMask.navigation.expiry",
            url: "/mask/examples/expiry",
          },
          {
            title: "CVV",
            translationKey: "InputMask.navigation.cvv",
            url: "/mask/examples/cvv",
          },
          {
            title: "IBAN",
            translationKey: "InputMask.navigation.iban",
            url: "/mask/examples/iban",
          },
          {
            title: "Currency",
            translationKey: "InputMask.navigation.currency",
            url: "/mask/examples/currency",
          },
          {
            title: "TCKN",
            translationKey: "InputMask.navigation.tckn",
            url: "/mask/examples/tckn",
          },
          {
            title: "Tax Number",
            translationKey: "InputMask.navigation.taxNumber",
            url: "/mask/examples/tax-number",
          },
          {
            title: "Phone",
            translationKey: "InputMask.navigation.phone",
            url: "/mask/examples/phone",
          },
          {
            title: "Email",
            translationKey: "InputMask.navigation.email",
            url: "/mask/examples/email",
          },
          {
            title: "Zip Code",
            translationKey: "InputMask.navigation.zipCode",
            url: "/mask/examples/zip-code",
          },
          {
            title: "Date",
            translationKey: "InputMask.navigation.date",
            url: "/mask/examples/date",
          },
          {
            title: "Password",
            translationKey: "InputMask.navigation.password",
            url: "/mask/examples/password",
          },
          {
            title: "URL",
            translationKey: "InputMask.navigation.url",
            url: "/mask/examples/url",
          },
          {
            title: "Username",
            translationKey: "InputMask.navigation.username",
            url: "/mask/examples/username",
          },
          {
            title: "Alpha",
            translationKey: "InputMask.navigation.alpha",
            url: "/mask/examples/alpha",
          },
          {
            title: "Numeric",
            translationKey: "InputMask.navigation.numeric",
            url: "/mask/examples/numeric",
          },
          {
            title: "Text",
            translationKey: "InputMask.navigation.text",
            url: "/mask/examples/text",
          },
          {
            title: "Custom Mask",
            translationKey: "InputMask.navigation.customMask",
            url: "/mask/examples/custom-mask",
          },
        ],
      },
      {
        title: "Schema & Presets",
        translationKey: "InputMask.navigation.schemaPresets",
        url: "/mask/schema",
        icon: Code2,
      },
      {
        title: "Mask Options",
        translationKey: "InputMask.navigation.maskOptions",
        url: "/mask/mask-options",
        icon: Settings2,
      },
      {
        title: "Custom Masks",
        translationKey: "InputMask.navigation.customMasks",
        url: "/mask/custom-masks",
        icon: Terminal,
      },
      {
        title: "Currency",
        translationKey: "InputMask.navigation.currency",
        url: "/mask/currency",
        icon: Terminal,
      },
      {
        title: "Built-in Validation",
        translationKey: "InputMask.navigation.builtInValidation",
        url: "/mask/validation",
        icon: ShieldAlert,
      },
      {
        title: "Integrations",
        translationKey: "InputMask.navigation.integrations",
        url: "/mask/integrations",
        icon: LayoutTemplate,
        items: [
          {
            title: "Libraries",
            translationKey: "InputMask.navigation.libraries",
            url: "/mask/integrations/libraries",
          },
          {
            title: "Validation",
            translationKey: "InputMask.navigation.validation",
            url: "/mask/integrations/validation",
          },
        ],
      },
      {
        title: "API Reference",
        translationKey: "InputMask.navigation.apiReference",
        url: "/mask/api",
        icon: BookOpen,
        items: [
          {
            title: "Engine",
            translationKey: "InputMask.navigation.engine",
            url: "/mask/api/engine",
          },
          {
            title: "Currency",
            translationKey: "InputMask.navigation.currency",
            url: "/mask/api/currency",
          },
          {
            title: "Utilities",
            translationKey: "InputMask.navigation.utilities",
            url: "/mask/api/utilities",
          },
        ],
      },
      {
        title: "Types",
        translationKey: "InputMask.navigation.types",
        url: "/mask/types",
        icon: Code2,
      },
    ],
  },
  "password": {
    nav: [
      {
        title: "Getting Started",
        translationKey: "PasswordToggle.navigation.gettingStarted",
        url: "/password/getting-started",
        icon: BookOpen,
      },
      {
        title: "Examples",
        translationKey: "PasswordToggle.navigation.examples",
        url: "/password/examples",
        icon: Component,
        isActive: true,
        items: [
          {
            title: "Overview",
            translationKey: "PasswordToggle.navigation.overview",
            url: "/password/examples",
          },
          {
            title: "Basic",
            translationKey: "PasswordToggle.navigation.basic",
            url: "/password/examples/basic",
          },
          {
            title: "Custom Icons",
            translationKey: "PasswordToggle.navigation.customIcons",
            url: "/password/examples/custom-icons",
          },
          {
            title: "Custom Text",
            translationKey: "PasswordToggle.navigation.customText",
            url: "/password/examples/custom-text",
          },
          {
            title: "Self Closing",
            translationKey: "PasswordToggle.navigation.selfClosing",
            url: "/password/examples/self-closing",
          },
          {
            title: "Shadcn UI",
            translationKey: "PasswordToggle.navigation.shadcn",
            url: "/password/examples/shadcn",
          },
        ],
      },
      {
        title: "API Reference",
        translationKey: "PasswordToggle.navigation.apiReference",
        url: "/password/api",
        icon: BookOpen,
      },
    ],
  },
};

import { useTranslations } from "next-intl";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpen, isMobile } = useSidebar();
  const t = useTranslations();

  // Determine context
  let context = "home";

  const activeProject = data.home.projects.find(
    (p: any) =>
      p.url !== "/" &&
      p.url.startsWith("/") &&
      (pathname === p.url || pathname.startsWith(p.url.split("#")[0])) &&
      !p.status,
  );

  if (activeProject) {
    if (activeProject.name === "Input Mask") context = "mask";
    else if (activeProject.name === "Password Toggle")
      context = "password";
    else context = "home";
  }

  // Effect to open sidebar when context changes (project changes)
  React.useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, isMobile]);

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "top-12 h-[calc(100svh-3rem)]",
        (context === "mask" || context === "password") &&
          "md:left-14",
      )}
      {...props}
    >
      <SidebarContent>
        {context === "home" && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>
                {t("Common.Navigation.projects")}
              </SidebarGroupLabel>
              <SidebarMenu>
                {data.home.projects.map((item: any) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild tooltip={item.name}>
                      {item.status ? (
                        <></>
                      ) : (
                        // <Link href={item.url}>
                        //   <div
                        //     className={`size-3 min-w-3 rounded ${item.color}`}
                        //   />
                        //   <span
                        //     className={cn(
                        //       "group-data-[collapsible=icon]:hidden",
                        //       "text-muted-foreground",
                        //     )}
                        //   >
                        //     {item.name}
                        //   </span>
                        //   <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground group-data-[collapsible=icon]:hidden">
                        //     Soon
                        //   </span>
                        // </Link>
                        <Link href={item.url}>
                          <div
                            className={`size-3 min-w-3 rounded ${item.color}`}
                          />
                          <span>
                            {t(`Projects.titles.${item.descriptionKey}`)}
                          </span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>
                {t("Common.Navigation.explore")}
              </SidebarGroupLabel>
              <SidebarMenu>
                {data.home.links.map((item: any) => {
                  const displayName = item.translationKey
                    ? t(item.translationKey)
                    : item.name;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        tooltip={displayName}
                        isActive={pathname === item.url}
                      >
                        <Link
                          href={item.url}
                          target={
                            item.url.startsWith("http") ? "_blank" : undefined
                          }
                        >
                          <item.icon />
                          <span>{displayName}</span>
                          {item.external && (
                            <ExternalLink className="ml-auto size-3 text-muted-foreground" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}

        {(context === "mask" || context === "password") && (
          <SidebarGroup>
            <SidebarMenu className="mt-2">
              {data[context].nav.map((item: any) => {
                const itemTitle = item.translationKey
                  ? t(item.translationKey)
                  : item.title;
                return item.items ? (
                  <Collapsible
                    key={`${context}-${item.title}`}
                    asChild
                    defaultOpen={
                      item.isActive ||
                      (pathname.startsWith(item.url) && pathname !== item.url)
                    }
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={itemTitle}>
                          {item.icon && <item.icon />}
                          <span>{itemTitle}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem: any) => {
                            const subItemTitle = subItem.translationKey
                              ? t(subItem.translationKey)
                              : subItem.title;
                            return (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItemTitle}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={`${context}-${item.title}`}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={itemTitle}
                    >
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{itemTitle}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
        {/* {context === "ai" && (
          <SidebarGroup>
            <SidebarMenu className="mt-2">
            </SidebarMenu>
          </SidebarGroup>
        )} */}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          © {new Date().getFullYear()} ViraStack
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
