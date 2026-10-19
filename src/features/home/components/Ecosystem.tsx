import {
  BookOpenIcon,
  ChevronRight,
  FormIcon,
  GraduationCapIcon,
  RocketIcon,
  SparklesIcon,
  SquareAsteriskIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import type { ProductId } from "@/types/product.types";
import { products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { featureCardChevronClassName, featureCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Link } from "@/i18n/routing";

type EcosystemItemId = "academy" | ProductId;

type EcosystemItem = {
  id: EcosystemItemId;
  href: "/academy" | `/${ProductId}`;
  colorClass: string;
};

const ecosystemNameKeys = {
  academy: "academyName",
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const satisfies Record<EcosystemItemId, string>;

const ecosystemDescKeys = {
  academy: "ecosystemAcademyDesc",
  start: "ecosystemStartDesc",
  ai: "ecosystemAiDesc",
  mask: "ecosystemMaskDesc",
  password: "ecosystemPasswordDesc",
  guide: "ecosystemGuideDesc",
} as const satisfies Record<EcosystemItemId, string>;

/** Same icons as the omergulcicek.com project cards, keeping both sites consistent. */
const ecosystemIcons = {
  academy: GraduationCapIcon,
  start: RocketIcon,
  ai: SparklesIcon,
  mask: FormIcon,
  password: SquareAsteriskIcon,
  guide: BookOpenIcon,
} as const satisfies Record<EcosystemItemId, typeof RocketIcon>;

const academyItem = {
  id: "academy",
  href: "/academy",
  colorClass: "text-green-500",
} as const satisfies EcosystemItem;

const ecosystemItems: readonly EcosystemItem[] = [academyItem, ...products];

export function Ecosystem() {
  const t = useTranslations("Home");
  const tNav = useTranslations("Navigation");

  return (
    <section id="ecosystem" className="mx-auto max-w-5xl px-6 py-16">
      <RevealGroup className="mb-16 text-center">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            {t("ecosystemTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-balance text-muted-foreground">
            {t("ecosystemDesc")}
          </p>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ecosystemItems.map((item) => {
          const Icon = ecosystemIcons[item.id];

          return (
            <RevealItem key={item.id}>
              <Link
                href={item.href}
                className={cn(featureCardClassName, "h-full transition-colors hover:bg-accent/30")}
              >
                <div className="flex items-start gap-4">
                  <Icon
                    className={cn("mt-0.5 size-8 shrink-0 md:size-10", item.colorClass)}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 md:gap-3">
                      <h3 className="text-base font-semibold text-balance md:text-lg">
                        <span className="text-foreground">{siteConfig.name}</span>{" "}
                        <span className={cn("font-medium italic", item.colorClass)}>
                          {tNav(ecosystemNameKeys[item.id])}
                        </span>
                      </h3>
                      <ChevronRight className={featureCardChevronClassName} aria-hidden />
                    </div>
                    <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {t(ecosystemDescKeys[item.id])}
                    </p>
                  </div>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
