import type { SearchParams } from "nuqs/server";

import { keysOf } from "@/lib/object";
import { cn } from "@/lib/utils";

import { PreviewLinkGuard } from "@/features/start/components/PreviewLinkGuard";
import { CartDemo } from "@/features/start/demos/cart/CartDemo";
import { CheckoutAddressDemo } from "@/features/start/demos/checkout-address/CheckoutAddressDemo";
import { CheckoutCardDemo } from "@/features/start/demos/checkout-card/CheckoutCardDemo";
import { ProductListDemo } from "@/features/start/demos/products/ProductListDemo";
import { UsersDemo } from "@/features/start/demos/users/UsersDemo";

/** The live demo of each ready module, shown alone on `/start/preview/<name>`. */
const FEATURE_DEMOS = {
  users: UsersDemo,
  "checkout-address": CheckoutAddressDemo,
  "checkout-card": CheckoutCardDemo,
  products: ProductListDemo,
  cart: CartDemo,
} as const;

/**
 * A grid or a two-column page needs the room a form does not: the same width as the page Start
 * writes for it.
 */
const WIDE_DEMOS = new Set<DemoFeature>(["products", "cart"]);

/** Demos whose links would take the visitor off the module they came to see. */
const LINKLESS_DEMOS = new Set<DemoFeature>(["cart"]);

export type DemoFeature = keyof typeof FEATURE_DEMOS;

export const demoFeatures = keysOf(FEATURE_DEMOS);

export function isDemoFeature(feature: string): feature is DemoFeature {
  return feature in FEATURE_DEMOS;
}

/**
 * The demo alone, for the detail page's iframe: the iframe is its viewport, so Tailwind's
 * breakpoints follow the device width picked there. `data-feature-preview` is what it measures.
 */
type FeatureDemoPageProps = {
  feature: DemoFeature;
  /** Passed on to demos that render their first data on the server. */
  searchParams: Promise<SearchParams>;
};

export function FeatureDemoPage({ feature, searchParams }: FeatureDemoPageProps) {
  const Demo = FEATURE_DEMOS[feature];

  return (
    <main data-feature-preview className="px-4 py-10 sm:px-6 sm:py-16">
      <div className={cn("mx-auto w-full", WIDE_DEMOS.has(feature) ? "max-w-4xl" : "max-w-xl")}>
        {LINKLESS_DEMOS.has(feature) ? (
          <PreviewLinkGuard>
            <Demo searchParams={searchParams} />
          </PreviewLinkGuard>
        ) : (
          <Demo searchParams={searchParams} />
        )}
      </div>
    </main>
  );
}
