"use client";

import dynamic from "next/dynamic";

/*
 * Every product shares the `[product]` route, so static imports put all three demos
 * (and their packages: mask + react-hook-form, password, address data + select) on
 * every product page. `next/dynamic` from a Client Component splits them, so a page
 * fetches only its own demo; it is still server-rendered and preloaded.
 */
const MaskDemo = dynamic(() =>
  import("@/features/mask/components/MaskDemo").then((mod) => mod.MaskDemo),
);
const PasswordDemo = dynamic(() =>
  import("@/features/password/components/PasswordDemo").then((mod) => mod.PasswordDemo),
);
const AddressDemo = dynamic(() =>
  import("@/components/shared/AddressDemo").then((mod) => mod.AddressDemo),
);

export type HeroDemoProductId = "mask" | "password" | "address";

export function ProductHeroDemo({ productId }: { productId: HeroDemoProductId }) {
  switch (productId) {
    case "mask":
      return <MaskDemo inHero />;
    case "password":
      return <PasswordDemo inHero />;
    case "address":
      return <AddressDemo inHero />;
  }
}
