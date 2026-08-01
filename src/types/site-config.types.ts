export type SiteConfig = {
  /** Title-case brand for SEO, metadata, and running copy. */
  name: string;
  /** Locale-safe uppercase brand mark for logos/H1; never use CSS `uppercase` on `name`. */
  brandMark: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    twitter: string;
  };
  author: {
    name: string;
    website: string;
    github: string;
    avatar: string;
  };
};
