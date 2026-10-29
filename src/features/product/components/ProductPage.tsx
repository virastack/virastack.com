import type { Product } from "@/types/product.types";

import { AddressDemo } from "@/components/shared/AddressDemo";
import { AddressFeatures } from "@/features/address";
import { AiLanding } from "@/features/ai";
import { GuideLanding } from "@/features/guide";
import { MaskDemo, MaskLanding } from "@/features/mask";
import { PasswordDemo, PasswordLanding } from "@/features/password";
import { ProductHero } from "@/features/product/components/ProductHero";
import { StartDemoVideo, StartFeatures } from "@/features/start";

type ProductPageProps = {
  product: Product;
};

/** Products with a live demo show it beside the hero copy instead of further down. */
const heroDemos = {
  mask: <MaskDemo inHero />,
  password: <PasswordDemo inHero />,
  address: <AddressDemo inHero />,
} as const;

export function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <ProductHero
        product={product}
        aside={
          product.id === "mask" || product.id === "password" || product.id === "address"
            ? heroDemos[product.id]
            : null
        }
      />
      {product.id === "start" ? (
        <>
          <StartDemoVideo />
          <StartFeatures />
        </>
      ) : null}
      {product.id === "mask" ? <MaskLanding /> : null}
      {product.id === "password" ? <PasswordLanding /> : null}
      {product.id === "address" ? <AddressFeatures /> : null}
      {product.id === "guide" ? <GuideLanding /> : null}
      {product.id === "ai" ? <AiLanding /> : null}
    </>
  );
}
