import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

import { routing } from "@/i18n/routing";

/** Skip SSG prerender for MDX (avoids production-only Server Component errors on Vercel/Docker). */
export const dynamic = "force-dynamic";

function resolveLocale(params: { locale?: string }): string {
  const raw = params.locale;
  const locale =
    typeof raw === "string" && raw.trim().length > 0 ? raw.trim() : "";
  if (!locale || !hasLocale(routing.locales, locale)) {
    notFound();
  }
  return locale;
}

export async function generateStaticParams() {
  const params = await generateStaticParamsFor("mdxPath", "locale")();
  if (!Array.isArray(params)) {
    throw new Error("generateStaticParamsFor returned invalid value");
  }
  return params;
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; mdxPath?: string[] }>;
}) {
  const params = await props.params;
  const locale = resolveLocale(params);
  const { metadata } = await importPage(params.mdxPath ?? [], locale);

  const mdxPath = params.mdxPath ?? [];
  const projectSlug = mdxPath[0];

  const PROJECT_NAMES: Record<string, string> = {
    "nextjs-boilerplate": "Next.js Boilerplate",
    "ai": "ViraStack AI",
    "mask": "Input Mask",
    "password": "Password Toggle",
    "modern-web-in-3-minutes": "Modern Web in 3 Minutes",
  };

  let projectName = "";
  if (projectSlug) {
    projectName =
      PROJECT_NAMES[projectSlug] ||
      projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1);
  }

  if (metadata?.title && typeof metadata.title === "string") {
    const isIndexPage = mdxPath.length === 1;

    let absoluteTitle = `${metadata.title} | ViraStack`;
    if (projectName) {
      if (isIndexPage) {
        absoluteTitle = `${projectName} | ViraStack`;
      } else {
        absoluteTitle = `${metadata.title} | ViraStack ${projectName}`;
      }
    }

    return {
      ...metadata,
      title: {
        absolute: absoluteTitle,
      },
    };
  }

  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: {
  params: Promise<{ locale: string; mdxPath?: string[] }>;
  children?: React.ReactNode;
}) {
  const params = await props.params;
  const locale = resolveLocale(params);
  setRequestLocale(locale);

  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath ?? [], locale);

  const safeToc = Array.isArray(toc) ? toc : [];

  return (
    <Wrapper toc={safeToc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
