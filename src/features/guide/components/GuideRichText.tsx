import type { ReactNode } from "react";

import type { ProductId } from "@/types/product.types";
import { getProduct } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { TanstackLogo } from "@/components/shared/TanstackLogo";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Link } from "@/i18n/routing";

const STACK_URLS = {
  react: "https://react.dev",
  typescript: "https://www.typescriptlang.org",
  nextjs: "https://nextjs.org",
  tanstack: "https://tanstack.com",
  tailwind: "https://tailwindcss.com",
  shadcn: "https://ui.shadcn.com",
} as const;

type StackKey = keyof typeof STACK_URLS;

export function GuideStackIcon({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span className="mx-0.5 font-medium whitespace-nowrap text-foreground">
      {icon ? (
        <span
          className="mr-1 inline-block size-[1em] align-[-0.15em] [&>span]:block [&>span]:size-full [&>svg]:block [&>svg]:size-full"
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}

/** Brand lockup: ViraStack (primary) + product name (color, italic). */
export function GuideProductMark({
  id,
  children,
  linked = true,
  showBrand = true,
  /** Heading/hero: black; body and logo slots: semibold. */
  tone = "body",
  brandClassName,
}: {
  id: ProductId;
  children: ReactNode;
  linked?: boolean;
  showBrand?: boolean;
  tone?: "heading" | "body";
  brandClassName?: string;
}) {
  const product = getProduct(id);
  const brandWeight =
    brandClassName ??
    (tone === "heading" ? "font-black text-primary" : "font-semibold text-primary");

  const mark = (
    <>
      {showBrand ? (
        <>
          <span className={brandWeight}>{siteConfig.name}</span>{" "}
        </>
      ) : null}
      <span className={cn("font-medium italic", product.colorClass)}>{children}</span>
    </>
  );

  if (!linked) {
    return <span className="mx-0.5 inline whitespace-nowrap">{mark}</span>;
  }

  return (
    <Link
      href={product.href}
      className="mx-0.5 inline whitespace-nowrap underline-offset-2 transition-opacity hover:underline hover:opacity-90"
    >
      {mark}
    </Link>
  );
}

type RichChunk = (chunks: ReactNode) => ReactNode;

function stackTag(key: StackKey, icon: ReactNode, linked: boolean): RichChunk {
  function StackTag(chunks: ReactNode) {
    const mark = <GuideStackIcon icon={icon}>{chunks}</GuideStackIcon>;

    if (!linked) return mark;

    return (
      <a
        href={STACK_URLS[key]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 hover:underline"
      >
        {mark}
      </a>
    );
  }

  return StackTag;
}

export function guideStackTags(options: { linked?: boolean } = {}): Record<StackKey, RichChunk> {
  const linked = options.linked ?? true;

  return {
    react: stackTag("react", <ReactLight aria-hidden />, linked),
    typescript: stackTag("typescript", <Typescript aria-hidden />, linked),
    nextjs: stackTag("nextjs", <NextjsIconDark className="dark:invert" aria-hidden />, linked),
    tanstack: stackTag("tanstack", <TanstackLogo />, linked),
    tailwind: stackTag("tailwind", <Tailwindcss aria-hidden />, linked),
    shadcn: stackTag("shadcn", <ShadcnUi className="text-foreground" aria-hidden />, linked),
  };
}

export function guideProductTags<const T extends readonly ProductId[]>(options: {
  ids: T;
  linked?: boolean;
  showBrand?: boolean;
}): Record<T[number], RichChunk>;
export function guideProductTags(options?: {
  ids?: readonly ProductId[];
  linked?: boolean;
  showBrand?: boolean;
}): Partial<Record<ProductId, RichChunk>>;
export function guideProductTags(
  options: {
    ids?: readonly ProductId[];
    linked?: boolean;
    showBrand?: boolean;
  } = {},
): Partial<Record<ProductId, RichChunk>> {
  const ids = options.ids ?? (["start", "ai", "mask", "password"] as const);
  const linked = options.linked ?? true;
  const showBrand = options.showBrand ?? true;

  return Object.fromEntries(
    ids.map((id) => {
      function ProductTag(chunks: ReactNode) {
        return (
          <GuideProductMark id={id} linked={linked} showBrand={showBrand}>
            {chunks}
          </GuideProductMark>
        );
      }

      return [id, ProductTag as RichChunk];
    }),
  );
}
