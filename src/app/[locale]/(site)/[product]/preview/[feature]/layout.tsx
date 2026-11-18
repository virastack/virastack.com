import type { ReactNode } from "react";

import { ProductsDemoProviders } from "@/features/start/demos/products/ProductsDemoProviders";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ feature: string }>;
};

/**
 * The products demo's list and product pages share one QueryClient here, as a Start app's layout
 * gives them, so a product opened from the list shows its card at once and Back finds the list.
 * The cart demo gets the same providers, for its cache and its toasts, and the auth demo, so its
 * sign-in and sign-up pages share one session.
 */
export default async function Layout({ children, params }: LayoutProps) {
  const { feature } = await params;

  return feature === "products" || feature === "cart" || feature === "auth" ? (
    <ProductsDemoProviders>{children}</ProductsDemoProviders>
  ) : (
    children
  );
}
