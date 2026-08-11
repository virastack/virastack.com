export type SiteConfig = {
  /** Canonical brand spelling for logos, H1, SEO, and running copy. Never CSS `uppercase`. */
  name: string;
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
