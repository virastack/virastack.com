export type AcademySubNavId = "home" | "sources" | "contribute";

export type AcademySubNavItem = {
  id: AcademySubNavId;
  href: string;
};

const ACADEMY_BASE = "/academy";

export const academySubNavItems: readonly AcademySubNavItem[] = [
  { id: "home", href: ACADEMY_BASE },
  { id: "sources", href: `${ACADEMY_BASE}/sources` },
  { id: "contribute", href: `${ACADEMY_BASE}/contribute` },
] as const;

export function isAcademyPath(pathname: string): boolean {
  return pathname === ACADEMY_BASE || pathname.startsWith(`${ACADEMY_BASE}/`);
}

export function isAcademySubNavItemActive(pathname: string, item: AcademySubNavItem): boolean {
  if (item.id === "home") {
    if (pathname === item.href) {
      return true;
    }

    if (pathname.startsWith(`${item.href}/`)) {
      return !academySubNavItems.some(
        (other) => other.id !== "home" && (pathname === other.href || pathname.startsWith(`${other.href}/`)),
      );
    }

    return false;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
