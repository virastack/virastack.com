import { getLocale } from "next-intl/server";

import { docsMdxComponents } from "@/features/docs/lib/docs-mdx-components";
import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

type DocsMdxProps = {
  content: LocalizedDocsContent;
};

/** Renders the MDX page for the current locale with the docs components. */
export async function DocsMdx({ content }: DocsMdxProps) {
  const locale = await getLocale();
  const Content = locale === "tr" ? content.tr : content.en;
  return <Content components={docsMdxComponents} />;
}
