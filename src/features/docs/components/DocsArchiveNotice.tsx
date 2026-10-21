import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

type DocsArchiveNoticeProps = {
  versionLabel: string;
  latestLabel: string;
  upgradeHref: string;
};

/** Warning shown above the title of archived (non-latest) docs pages. */
export function DocsArchiveNotice({
  versionLabel,
  latestLabel,
  upgradeHref,
}: DocsArchiveNoticeProps) {
  const t = useTranslations("Docs");

  return (
    <div
      role="note"
      className="mb-6 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground"
    >
      <p>
        {t("archiveNotice", { version: versionLabel, latest: latestLabel })}{" "}
        <Link
          href={upgradeHref}
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          {t("archiveNoticeLink")}
        </Link>
      </p>
    </div>
  );
}
