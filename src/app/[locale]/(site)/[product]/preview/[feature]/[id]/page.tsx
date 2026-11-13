import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { setRequestLocale } from "next-intl/server";

import { ProductDetailDemo } from "@/features/start/demos/products/ProductDetailDemo";

type PageProps = {
  params: Promise<{ locale: string; product: string; feature: string; id: string }>;
};

/** The products demo's product page, which its cards open inside the module page's iframe. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: PageProps) {
  const { locale, product, feature } = await params;
  setRequestLocale(locale);

  if (product !== "start" || feature !== "products") notFound();

  return (
    <main data-feature-preview className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <ProductDetailDemo params={params} />
      </div>
    </main>
  );
}
