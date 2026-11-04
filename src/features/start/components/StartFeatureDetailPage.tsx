import type { ReactNode } from "react";

import { ArrowLeftIcon, SparklesIcon, SquareTerminalIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { CopyButton } from "@/components/shared/CopyButton";
import { AcademyBadge } from "@/features/academy/components/AcademyBadge";
import { guideCardTags, GuideProductMark } from "@/features/guide/components/GuideRichText";
import { FeaturePreviewTabs } from "@/features/start/components/FeaturePreviewTabs";
import { featureCatalog, visibleFeatures } from "@/features/start/data/feature-catalog";
import { INSTALL_ROUTE as CHECKOUT_ADDRESS_ROUTE } from "@/features/start/demos/checkout-address/install-files";
import { INSTALL_ROUTE as CHECKOUT_CARD_ROUTE } from "@/features/start/demos/checkout-card/install-files";
import { INSTALL_ROUTE as USERS_ROUTE } from "@/features/start/demos/users/install-files";
import { Link } from "@/i18n/routing";

const DUMMY_JSON_URL = "https://github.com/Ovi/DummyJSON";

/** What the page an agent adds needs, from the module's `INSTALL_ROUTE`. */
type InstallRoute = {
  component: string;
  fallback?: string;
  routeSearch?: { name: string; file: string };
};

type ReadyContent = {
  route: InstallRoute;
  rows: readonly string[];
  previewNote: string;
  apiKey: string;
  hasMoreNote: boolean;
};

/** What each ready module shows. A module missing here renders as an empty template. */
const READY_CONTENT: Record<string, ReadyContent> = {
  users: {
    route: USERS_ROUTE,
    rows: ["list", "search", "form", "tests"],
    previewNote: "previewNote",
    apiKey: "api",
    hasMoreNote: true,
  },
  "checkout-address": {
    route: CHECKOUT_ADDRESS_ROUTE,
    rows: ["addressList", "addressForm", "addressData", "addressSelection", "addressTests"],
    previewNote: "addressPreviewNote",
    apiKey: "addressApi",
    hasMoreNote: false,
  },
  "checkout-card": {
    route: CHECKOUT_CARD_ROUTE,
    rows: ["paymentList", "paymentForm", "paymentSafety", "paymentTests"],
    previewNote: "paymentPreviewNote",
    apiKey: "paymentApi",
    hasMoreNote: false,
  },
};

const USE_ITEMS = ["api", "own"] as const;

const TEST_CARD_NUMBER = "5400360000000003";

const previewClassName = "rounded-2xl border border-border bg-muted/30 px-4 py-10 sm:px-6 sm:py-16";

export function StartFeatureDetailPage({ feature }: { feature: string }) {
  const t = useTranslations("StartFeatureCatalog");
  const command = `npx virastack add ${feature}`;
  const isReady = featureCatalog.some((item) => item.id === feature && item.status === "ready");
  const content = isReady ? (READY_CONTENT[feature] ?? null) : null;
  const tags = {
    ...guideCardTags(),
    testinglibrary: () => <AcademyBadge kind="testing-library" />,
    msw: () => <AcademyBadge kind="msw" />,
    nuqs: () => <AcademyBadge kind="nuqs" />,
    address: (chunks: ReactNode) => (
      <GuideProductMark id="address" linked={false}>
        {chunks}
      </GuideProductMark>
    ),
    mask: (chunks: ReactNode) => (
      <GuideProductMark id="mask" linked={false}>
        {chunks}
      </GuideProductMark>
    ),
    start: (chunks: ReactNode) => (
      <GuideProductMark id="start" linked={false}>
        {chunks}
      </GuideProductMark>
    ),
    code: (chunks: ReactNode) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap text-foreground">
        {chunks}
      </code>
    ),
  };

  // One prompt for both frameworks: the agent reads the project and writes the page itself.
  const prompt = content
    ? t("detail.readyPrompt", {
        feature,
        component: content.route.component,
        notes: [
          content.route.fallback
            ? t("detail.readyPromptFallback", {
                component: content.route.component,
                fallback: content.route.fallback,
              })
            : "",
          content.route.routeSearch
            ? t("detail.readyPromptSearch", { feature, ...content.route.routeSearch })
            : "",
        ].join(""),
      })
    : t("detail.prompt", { feature });

  // Both copy actions look alike: the icon names what is copied and turns into a check.
  const actions = (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <CopyButton
        text={prompt}
        variant="outline"
        size="lg"
        idleIcon={<SparklesIcon />}
        aria-label={t("detail.copyPrompt")}
        title={t("detail.copyPrompt")}
      >
        {t("detail.promptButton")}
      </CopyButton>
      <CopyButton
        text={command}
        variant="outline"
        size="lg"
        idleIcon={<SquareTerminalIcon />}
        aria-label={t("detail.copyCommand")}
        title={t("detail.copyCommand")}
        className="min-w-0 font-mono text-xs font-normal"
      >
        <span className="truncate">
          <span className="text-muted-foreground">npx virastack add</span> {feature}
        </span>
      </CopyButton>
    </div>
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-6 px-6 pt-28 pb-24">
      <Link
        href="/start/features"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        {t("detail.back")}
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground">
            {t(`names.${feature}`)}
          </h1>
          <p className="max-w-2xl text-pretty text-muted-foreground">{t(`items.${feature}`)}</p>
        </div>
        {content ? null : actions}
      </header>

      {content ? (
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          {t.rich(`detail.${content.previewNote}`, {
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
            card: (chunks) => (
              <span className="inline-flex items-center gap-0.5 align-middle whitespace-nowrap">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                  {chunks}
                </code>
                <CopyButton
                  text={TEST_CARD_NUMBER}
                  variant="ghost"
                  size="icon-sm"
                  aria-label={t("detail.copyTestCard")}
                />
              </span>
            ),
          })}
        </p>
      ) : null}

      {content ? (
        <FeaturePreviewTabs feature={feature} actions={actions} />
      ) : (
        <section aria-label={t("detail.preview")} className={previewClassName}>
          <div className="m-auto max-w-sm space-y-1 text-center">
            <p className="font-medium text-foreground">{t("detail.underConstructionTitle")}</p>
            <p className="text-sm text-pretty text-muted-foreground">
              {t("detail.underConstructionDesc")}
            </p>
          </div>
        </section>
      )}

      {content ? (
        <>
          <section aria-labelledby="feature-includes" className="mt-6 space-y-4">
            <h2 id="feature-includes" className="text-xl font-semibold text-foreground">
              {t("detail.includesTitle")}
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-pretty text-muted-foreground marker:text-muted-foreground/60">
              {content.rows.map((id) => (
                <li key={id}>{t.rich(`detail.${id}Desc`, tags)}</li>
              ))}
            </ul>
            {content.hasMoreNote && visibleFeatures.some(({ id }) => id === "admin-customers") ? (
              <p className="text-sm text-pretty text-muted-foreground">
                {t.rich("detail.moreNote", {
                  link: (chunks) => (
                    <Link
                      href="/start/features#admin-customers"
                      className="font-medium text-foreground underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            ) : null}
          </section>

          <section aria-labelledby="feature-use" className="mt-6 space-y-4">
            <h2 id="feature-use" className="text-xl font-semibold text-foreground">
              {t("detail.useTitle")}
            </h2>
            <dl className="grid gap-6 md:grid-cols-2">
              {USE_ITEMS.map((item) => {
                const key = item === "api" ? content.apiKey : item;

                return (
                  <div key={item} className="min-w-0 space-y-1">
                    <dt className="font-medium text-foreground">{t(`detail.${key}Title`)}</dt>
                    <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {t.rich(`detail.${key}Desc`, { ...tags, feature })}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        </>
      ) : null}
    </div>
  );
}
