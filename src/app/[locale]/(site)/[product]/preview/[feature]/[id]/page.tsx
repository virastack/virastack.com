import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { setRequestLocale } from "next-intl/server";

import { RegisterDemo } from "@/features/start/demos/auth/RegisterDemo";
import { ProductDetailDemo } from "@/features/start/demos/products/ProductDetailDemo";

type PageProps = {
  params: Promise<{ locale: string; product: string; feature: string; id: string }>;
};

/**
 * The products demo's product page, which its cards open inside the module page's iframe, and the
 * auth demo's sign-up page, which its sign-in page links to.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: PageProps) {
  const { locale, product, feature, id } = await params;
  setRequestLocale(locale);

  if (product !== "start") notFound();

  if (feature === "auth") {
    if (id !== "register") notFound();
    return (
      <main data-feature-preview className="px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-xl">
          <RegisterDemo />
        </div>
      </main>
    );
  }

  if (feature !== "products") notFound();

  return (
    <main data-feature-preview className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <ProductDetailDemo params={params} />
      </div>
    </main>
  );
}
