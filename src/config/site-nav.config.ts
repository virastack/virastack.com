/**
 * Site-level nav links for the footer (not product routes; Academy is listed with the products).
 */
export const siteNavLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/brand", labelKey: "brand" },
  { href: "/releases", labelKey: "releases" },
  { href: "/support", labelKey: "support" },
] as const;

export type SiteNavLabelKey = (typeof siteNavLinks)[number]["labelKey"];

type HeaderNavLink = {
  href: string;
  labelKey: SiteNavLabelKey | "academy";
  /** Shows the "new" badge. A launch marker, not a feature: remove it about a month after launch. */
  isNew?: boolean;
};

/**
 * Primary header links beside the Products dropdown (also used in the mobile drawer).
 */
export const headerNavLinks: readonly HeaderNavLink[] = [
  { href: "/academy", labelKey: "academy", isNew: true },
  { href: "/about", labelKey: "about" },
  { href: "/support", labelKey: "support" },
  { href: "/releases", labelKey: "releases", isNew: true },
];
