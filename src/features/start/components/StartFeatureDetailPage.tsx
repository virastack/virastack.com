import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { CopyButton } from "@/components/copy-button";
import { guideCardTags, GuideProductMark } from "@/features/guide/components/GuideRichText";
import { UsersDemo } from "@/features/start/demos/users/UsersDemo";
import { Link } from "@/i18n/routing";

const DUMMY_JSON_URL = "https://github.com/Ovi/DummyJSON";
const ABOUT_ITEMS = ["page", "done", "api", "own"] as const;

export function StartFeatureDetailPage({ feature }: { feature: string }) {
  const t = useTranslations("StartFeatureCatalog");
  const command = `npx virastack add ${feature}`;

  return (
    <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-6 px-6 pt-28 pb-24">
      <Link
        href="/start/features"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        {t("detail.back")}
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <h1 className="font-mono text-3xl font-semibold text-foreground">{feature}</h1>
          <p className="max-w-2xl text-pretty text-muted-foreground">{t(`items.${feature}`)}</p>
        </div>
        <div className="flex min-w-0 items-center gap-2 rounded-md border border-border py-1 pr-1 pl-3">
          <code className="truncate font-mono text-xs text-foreground">{command}</code>
          <CopyButton text={command} variant="ghost" size="icon-sm" className="shrink-0" />
        </div>
      </header>

      <section
        aria-label={t("detail.preview")}
        className="rounded-2xl border border-border p-4 sm:p-6"
      >
        <div className="mx-auto w-full max-w-2xl">
          <UsersDemo />
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        {t.rich("detail.previewNote", {
          link: (chunks) => (
            <a
              href={DUMMY_JSON_URL}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      <section aria-labelledby="feature-about" className="mt-6 space-y-5">
        <h2 id="feature-about" className="text-xl font-semibold text-foreground">
          {t("detail.aboutTitle")}
        </h2>
        <dl className="grid gap-6 sm:grid-cols-2">
          {ABOUT_ITEMS.map((item) => (
            <div key={item} className="min-w-0 space-y-1">
              <dt className="font-medium text-foreground">{t(`detail.${item}Title`)}</dt>
              <dd className="text-sm text-pretty text-muted-foreground">
                {t.rich(`detail.${item}Desc`, {
                  ...guideCardTags(),
                  start: (chunks) => (
                    <GuideProductMark id="start" linked={false}>
                      {chunks}
                    </GuideProductMark>
                  ),
                  code: (chunks) => (
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap text-foreground">
                      {chunks}
                    </code>
                  ),
                })}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
