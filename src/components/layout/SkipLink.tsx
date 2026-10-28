import { useTranslations } from "next-intl";

/**
 * First focusable element on the page, so keyboard and screen reader users can
 * jump past the header and sub-navigation. Hidden until it takes focus.
 */
export function SkipLink() {
  const t = useTranslations("Common");

  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-md focus-visible:border focus-visible:border-border focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground focus-visible:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {t("skipToContent")}
    </a>
  );
}
