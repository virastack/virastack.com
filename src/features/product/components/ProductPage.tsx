import type { ReactNode } from "react";

import type { Product } from "@/types/product.types";

import { ProductHero } from "@/features/product/components/ProductHero";
import { ProductHeroDemo } from "@/features/product/components/ProductHeroDemo";

type ProductPageProps = {
  product: Product;
  /** The product's own sections under the hero, composed by the route. */
  children?: ReactNode;
};

export function ProductPage({ product, children }: ProductPageProps) {
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
      {children}
    </>
  );
}
