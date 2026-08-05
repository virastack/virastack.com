/**
 * Site-level nav links for the footer (not product routes).
 */
export const siteNavLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/brand", labelKey: "brand" },
  { href: "/contribute", labelKey: "contribute" },
] as const;

/**
 * Primary header nav: brand stays in footer + logo context menu only.
 */
export const headerNavLinks = [
  { href: "/about", labelKey: "about" },
  { href: "/contribute", labelKey: "contribute" },
] as const;

export type SiteNavLabelKey = (typeof siteNavLinks)[number]["labelKey"];
