import type { Product } from "@/types/product.types";

import { AiLanding } from "@/features/ai";
import { GuideLanding } from "@/features/guide";
import { MaskLanding } from "@/features/mask";
import { PasswordLanding } from "@/features/password";
import { ProductHero } from "@/features/product/components/ProductHero";
import { StartFeatures } from "@/features/start";

type ProductPageProps = {
  product: Product;
};

export function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <ProductHero product={product} />
      {product.id === "start" ? <StartFeatures /> : null}
      {product.id === "mask" ? <MaskLanding /> : null}
      {product.id === "password" ? <PasswordLanding /> : null}
      {product.id === "guide" ? <GuideLanding /> : null}
      {product.id === "ai" ? <AiLanding /> : null}
    </>
  );
}
