"use client";

import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocsVersionLink } from "@/features/docs/lib/docs-versions";
import { useRouter } from "@/i18n/routing";

type DocsVersionSelectProps = {
  current: string;
  links: DocsVersionLink[];
};

export function DocsVersionSelect({ current, links }: DocsVersionSelectProps) {
  const t = useTranslations("Docs");
  const router = useRouter();

  const items = links.map((link) => ({
    value: link.id,
    label: link.latest ? t("versionLatest", { version: link.label }) : link.label,
  }));

  return (
    <Select
      value={current}
      items={items}
      onValueChange={(id) => {
        const target = links.find((link) => link.id === id);
        if (target && target.id !== current) router.push(target.href);
      }}
    >
      <SelectTrigger size="sm" aria-label={t("versionLabel")} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
