import type { ReactNode } from "react";

import type { Product } from "@/types/product.types";

import { parseGithubLink } from "@/lib/github";
import { getGithubStars } from "@/lib/github-stars";

import { ProductHero } from "@/features/product/components/ProductHero";
import { ProductHeroDemo } from "@/features/product/components/ProductHeroDemo";

type ProductPageProps = {
  product: Product;
  /** The product's own sections under the hero, composed by the route. */
  children?: ReactNode;
};

/**
 * Products whose repository stars show on the hero GitHub button. Mask, Password and
 * Address share one repository, so their count would not say anything about each product.
 */
const PRODUCTS_WITH_STARS: readonly Product["id"][] = ["start"];

export async function ProductPage({ product, children }: ProductPageProps) {
  const githubStars = PRODUCTS_WITH_STARS.includes(product.id)
    ? await getGithubStars([parseGithubLink(product.github).slug])
    : null;

  return (
    <>
      <ProductHero
        product={product}
        githubStars={githubStars ?? undefined}
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
