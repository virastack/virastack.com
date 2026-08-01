"use client";

import {
  ChevronDownIcon,
  FileArchiveIcon,
  FileCode2Icon,
  FileImageIcon,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

type LogoDownloadLabelKey =
  "logoDownloadPng" | "logoDownloadWebp" | "logoDownloadSvg" | "logoDownloadZip";

const logoFormats: {
  labelKey: LogoDownloadLabelKey;
  href: string;
  filename: string;
  icon: LucideIcon;
}[] = [
  {
    labelKey: "logoDownloadPng",
    href: "/logo-icon.png",
    filename: "virastack-logo-icon.png",
    icon: FileImageIcon,
  },
  {
    labelKey: "logoDownloadWebp",
    href: "/logo-icon.webp",
    filename: "virastack-logo-icon.webp",
    icon: FileImageIcon,
  },
  {
    labelKey: "logoDownloadSvg",
    href: "/logo-icon.svg",
    filename: "virastack-logo-icon.svg",
    icon: FileCode2Icon,
  },
  {
    labelKey: "logoDownloadZip",
    href: "/virastack-brand.zip",
    filename: "virastack-brand.zip",
    icon: FileArchiveIcon,
  },
];

export function LogoDownloadSelect() {
  const t = useTranslations("BrandPage");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" className="bg-background" />}
      >
        {t("logoDownload")}
        <ChevronDownIcon data-icon="inline-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuGroup>
          {logoFormats.map((format) => {
            const Icon = format.icon;
            return (
              <DropdownMenuItem
                key={format.labelKey}
                render={<a href={format.href} download={format.filename} />}
              >
                <span className="flex-1">{t(format.labelKey)}</span>
                <Icon className="text-muted-foreground" />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
