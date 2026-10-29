import type { Product } from "@/types/product.types";

import { AddressFeatures } from "@/features/address";
import { AiLanding } from "@/features/ai";
import { GuideLanding } from "@/features/guide";
import { MaskLanding } from "@/features/mask";
import { PasswordLanding } from "@/features/password";
import { ProductHero } from "@/features/product/components/ProductHero";
import { ProductHeroDemo } from "@/features/product/components/ProductHeroDemo";
import { StartDemoVideo, StartFeatures } from "@/features/start";

type ProductPageProps = {
  product: Product;
};

export function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <ProductHero
        product={product}
        // Products with a live demo show it beside the hero copy instead of further down.
        aside={
          product.id === "mask" || product.id === "password" || product.id === "address" ? (
            <ProductHeroDemo productId={product.id} />
          ) : null
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
