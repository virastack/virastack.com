/**
 * Site-level nav links for the footer (not product routes).
 */
export const siteNavLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/brand", labelKey: "brand" },
  { href: "/support", labelKey: "support" },
] as const;

/**
 * Primary header links beside the Products dropdown (also used in the mobile drawer).
 */
export const headerNavLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/support", labelKey: "support" },
] as const;

export type SiteNavLabelKey = (typeof siteNavLinks)[number]["labelKey"];
