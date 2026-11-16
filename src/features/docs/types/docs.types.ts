import type { MDXContent } from "mdx/types";

export type DocsHeading = {
  id: string;
  title: string;
  level?: 2 | 3;
};

export type DocsNavItem = {
  slug: string;
  title: string;
  href: string;
  /** Static / non-locale file (e.g. /mask/llms.txt); use a plain anchor. */
  external?: boolean;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export type DocsPageMeta = {
  slug: string;
  title: string;
  description: string;
  /** Left out for MDX pages, whose headings are read from the MDX file (`readDocsMdxHeadings`). */
  headings?: DocsHeading[];
};

/** One docs page written in MDX, once per locale. */
export type LocalizedDocsContent = {
  en: MDXContent;
  tr: MDXContent;
};
