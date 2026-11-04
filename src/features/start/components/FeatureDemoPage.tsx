import { keysOf } from "@/lib/object";

import { CheckoutAddressDemo } from "@/features/start/demos/checkout-address/CheckoutAddressDemo";
import { CheckoutCardDemo } from "@/features/start/demos/checkout-card/CheckoutCardDemo";
import { UsersDemo } from "@/features/start/demos/users/UsersDemo";

/** The live demo of each ready module, shown alone on `/start/preview/<name>`. */
const FEATURE_DEMOS = {
  users: UsersDemo,
  "checkout-address": CheckoutAddressDemo,
  "checkout-card": CheckoutCardDemo,
} as const;

export type DemoFeature = keyof typeof FEATURE_DEMOS;

export const demoFeatures = keysOf(FEATURE_DEMOS);

export function isDemoFeature(feature: string): feature is DemoFeature {
  return feature in FEATURE_DEMOS;
}

/**
 * The demo alone, for the detail page's iframe: the iframe is its viewport, so Tailwind's
 * breakpoints follow the device width picked there. `data-feature-preview` is what it measures.
 */
export function FeatureDemoPage({ feature }: { feature: DemoFeature }) {
  const Demo = FEATURE_DEMOS[feature];

  return (
    <main data-feature-preview className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        <Demo />
      </div>
    </main>
  );
}
