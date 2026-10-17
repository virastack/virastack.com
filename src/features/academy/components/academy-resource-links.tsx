import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { cn } from "@/lib/utils";

import { AcademyResourceBadge } from "@/features/academy/components/academy-resource-badge";
import type { AcademyResourceKind } from "@/features/academy/constants/resource.constants";

export type AcademyResourceLinkItem = {
  href: string;
  label: string;
  kind?: AcademyResourceKind;
  note?: string;
  citationId?: string;
};

type AcademyResourceLinksProps = {
  title: string;
  items: readonly AcademyResourceLinkItem[];
  numbered?: boolean;
};

function resourceKindLabel(
  t: Awaited<ReturnType<typeof getTranslations<"Academy">>>,
  kind: AcademyResourceKind,
): string {
  switch (kind) {
    case "doc":
      return t("resourceDocument");
    case "article":
      return t("resourceArticle");
    case "research":
      return t("resourceResearch");
    case "repo":
      return t("resourceRepo");
    case "video":
      return t("resourceVideo");
  }
}

export async function AcademyResourceLinks({
  title,
  items,
  numbered = true,
}: AcademyResourceLinksProps) {
  const t = await getTranslations("Academy");

  return (
    <nav
      aria-label={title}
      className="flex flex-col gap-2 rounded-xl border border-border p-3 md:p-4"
    >
      <p className="text-xs font-medium text-muted-foreground md:text-sm">{title}</p>
      <ul
        className={cn(
          "grid divide-y divide-dashed border-border",
          numbered
            ? "grid-cols-[auto_max-content_minmax(0,1fr)]"
            : "grid-cols-[max-content_minmax(0,1fr)]",
        )}
      >
        {items.map((item, itemIndex) => (
          <li
            key={`${item.href}-${itemIndex}`}
            className="col-span-full grid grid-cols-subgrid gap-y-1 py-3 text-sm first:pt-2 last:pb-0"
          >
            <div className="col-span-full grid grid-cols-subgrid items-center gap-x-2">
              {numbered ? (
                <span
                  id={item.citationId}
                  tabIndex={item.citationId ? -1 : undefined}
                  className={cn(
                    "text-xs font-medium text-muted-foreground tabular-nums",
                    item.citationId && "scroll-mt-24 focus:outline-none",
                  )}
                >
                  {itemIndex + 1}
                </span>
              ) : null}
              {item.kind ? (
                <AcademyResourceBadge
                  kind={item.kind}
                  label={resourceKindLabel(t, item.kind)}
                  className="w-full justify-center"
                />
              ) : (
                <span />
              )}
              <a
                href={item.href}
                className="inline-flex w-full min-w-0 items-center gap-1.5 font-medium text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <ExternalLink
                  className="size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span className="min-w-0 underline underline-offset-4">{item.label}</span>
              </a>
            </div>
            {item.note ? (
              <p
                className={cn(
                  "text-xs leading-5 text-muted-foreground",
                  numbered ? "col-start-3" : "col-start-2",
                )}
              >
                {item.note}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
