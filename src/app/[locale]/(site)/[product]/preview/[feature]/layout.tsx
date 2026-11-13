import type { ReactNode } from "react";

import { ProductsDemoProviders } from "@/features/start/demos/products/ProductsDemoProviders";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ feature: string }>;
};

/**
 * The products demo's list and product pages share one QueryClient here, as a Start app's layout
 * gives them, so a product opened from the list shows its card at once and Back finds the list.
 */
export default async function Layout({ children, params }: LayoutProps) {
  const { feature } = await params;

  return feature === "products" ? (
    <ProductsDemoProviders>{children}</ProductsDemoProviders>
  ) : (
    children
  );
}
