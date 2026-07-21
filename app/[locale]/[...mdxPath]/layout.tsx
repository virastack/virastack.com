import { Layout, LastUpdated } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PageMapItem } from "nextra";

import { routing } from "@/i18n/routing";

const PROJECT_NAMES: Record<string, string> = {
  "nextjs-boilerplate": "Next.js Boilerplate",
  "ai": "ViraStack AI",
  "mask": "Input Mask",
  "password": "Password Toggle",
  "modern-web-in-3-minutes": "Modern Web in 3 Minutes",
};

export async function generateMetadata(props: {
  params: Promise<{ locale: string; mdxPath?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const mdxPath = params.mdxPath ?? [];
  const projectSlug = mdxPath[0];

  let projectName = "";
  if (projectSlug) {
    projectName =
      PROJECT_NAMES[projectSlug] ||
      projectSlug.charAt(0).toUpperCase() + projectSlug.slice(1);
  }

  return {
    title: projectName ? `${projectName} | ViraStack` : "ViraStack",
    description: "ViraStack Open Source Projects",
  };
}

const banner = <></>;
const footer = (
  <div className="w-full max-w-360 mx-auto flex flex-col items-center justify-between gap-4 py-8 md:flex-row px-6">
    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} ViraStack. MIT License.
    </p>
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <span>
        Created by{" "}
        <a
          href="https://omergulcicek.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-black dark:hover:text-white transition-colors"
        >
          Ömer Gülçiçek
        </a>
      </span>
      <span className="text-gray-300">|</span>
      <a
        href="https://github.com/virastack"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium hover:text-black dark:hover:text-white transition-colors"
      >
        GitHub
      </a>
    </div>
  </div>
);

function resolveLocaleInPageMap(
  pageMap: PageMapItem[],
  locale: string,
): PageMapItem[] {
  return pageMap.map((item) => {
    const cloned = { ...item } as PageMapItem & { href?: string };
    if ("route" in cloned && cloned.route) {
      cloned.route = cloned.route.replace(/\[locale\]/g, locale);
    }
    if ("href" in cloned && cloned.href) {
      cloned.href = cloned.href.replace(/\[locale\]/g, locale);
    }
    if ("children" in cloned && cloned.children) {
      cloned.children = resolveLocaleInPageMap(cloned.children, locale);
    }
    return cloned as PageMapItem;
  });
}

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; mdxPath?: string[] }>;
}) {
  const { locale: rawLocale, mdxPath } = await params;
  const projectKey = mdxPath?.[0];
  const locale =
    typeof rawLocale === "string" && rawLocale.trim().length > 0
      ? rawLocale.trim()
      : "";

  if (!locale || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const rawPageMap = await getPageMap(`/${locale}`);
  const pageMap = resolveLocaleInPageMap(rawPageMap, locale);

  const t = await getTranslations({ locale, namespace: "Common.Nextra" });

  // Theme schema only allows `prev` / `next` booleans (no prevText/nextText).
  const docsNavigation = {
    prev: true,
    next: true,
  };

  return (
    <>
      <Layout
        banner={banner}
        pageMap={pageMap}
        docsRepositoryBase="https://github.com/virastack/virastack.com"
        footer={footer}
        editLink={false}
        feedback={{
          content: t("feedback"),
          labels: "feedback",
          link: projectKey
            ? `https://github.com/virastack/${projectKey}/issues`
            : "https://github.com/virastack/virastack.com/issues",
        }}
        toc={{
          title: t("tocTitle"),
          backToTop: t("backToTop"),
          float: true,
        }}
        themeSwitch={{
          dark: t("themeDark"),
          light: t("themeLight"),
          system: t("themeSystem"),
        }}
        lastUpdated={
          <LastUpdated locale={locale}>{t("lastUpdated")}</LastUpdated>
        }
        search={t("search")}
        navigation={docsNavigation}
        copyPageButton={false}
      >
        <div className="px-4">{children}</div>
      </Layout>
    </>
  );
}
