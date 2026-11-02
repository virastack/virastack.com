import type { ReactNode } from "react";

import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { CopyButton } from "@/components/copy-button";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { guideCardTags, GuideProductMark } from "@/features/guide/components/GuideRichText";
import { FeatureFileTree } from "@/features/start/components/FeatureFileTree";
import { FeatureInstall } from "@/features/start/components/FeatureInstall";
import { featureCatalog } from "@/features/start/data/feature-catalog";
import { CheckoutAddressDemo } from "@/features/start/demos/checkout-address/CheckoutAddressDemo";
import {
  INSTALL_FILES as CHECKOUT_ADDRESS_FILES,
  INSTALL_ROUTE as CHECKOUT_ADDRESS_ROUTE,
} from "@/features/start/demos/checkout-address/install-files";
import { CheckoutPaymentDemo } from "@/features/start/demos/checkout-payment/CheckoutPaymentDemo";
import {
  INSTALL_FILES as CHECKOUT_PAYMENT_FILES,
  INSTALL_ROUTE as CHECKOUT_PAYMENT_ROUTE,
} from "@/features/start/demos/checkout-payment/install-files";
import {
  INSTALL_FILES as USERS_FILES,
  INSTALL_ROUTE as USERS_ROUTE,
} from "@/features/start/demos/users/install-files";
import { UsersDemo } from "@/features/start/demos/users/UsersDemo";
import { Link } from "@/i18n/routing";

const DUMMY_JSON_URL = "https://github.com/Ovi/DummyJSON";

/** What each ready module shows. A module missing here renders as an empty template. */
const READY_CONTENT = {
  users: {
    Demo: UsersDemo,
    files: USERS_FILES,
    route: USERS_ROUTE,
    rows: ["list", "search", "form", "favorites", "states", "tests"],
    previewNote: "previewNote",
    apiKey: "api",
    hasMoreNote: true,
  },
  "checkout-address": {
    Demo: CheckoutAddressDemo,
    files: CHECKOUT_ADDRESS_FILES,
    route: CHECKOUT_ADDRESS_ROUTE,
    rows: [
      "addressList",
      "addressForm",
      "addressData",
      "addressBilling",
      "addressSelection",
      "addressTests",
    ],
    previewNote: "addressPreviewNote",
    apiKey: "addressApi",
    hasMoreNote: false,
  },
  "checkout-payment": {
    Demo: CheckoutPaymentDemo,
    files: CHECKOUT_PAYMENT_FILES,
    route: CHECKOUT_PAYMENT_ROUTE,
    rows: ["paymentList", "paymentForm", "paymentSafety", "paymentTests"],
    previewNote: "paymentPreviewNote",
    apiKey: "paymentApi",
    hasMoreNote: false,
  },
} as const;

const USE_ITEMS = ["page", "api", "own"] as const;

function getReadyContent(feature: string) {
  return feature in READY_CONTENT ? READY_CONTENT[feature as keyof typeof READY_CONTENT] : null;
}

export function StartFeatureDetailPage({ feature }: { feature: string }) {
  const t = useTranslations("StartFeatureCatalog");
  const command = `npx virastack add ${feature}`;
  const isReady = featureCatalog.some((item) => item.id === feature && item.status === "ready");
  const content = isReady ? getReadyContent(feature) : null;
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
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {content ? null : (
            <CopyButton
              text={t("detail.prompt", { feature })}
              variant="outline"
              size="sm"
              className="h-auto"
              aria-label={t("detail.copyPrompt")}
            >
              {t("detail.copyPrompt")}
            </CopyButton>
          )}
          <div className="flex min-w-0 items-center gap-2 rounded-md border border-border py-1 pr-1 pl-3">
            <code className="truncate font-mono text-xs text-foreground">{command}</code>
            <CopyButton text={command} variant="ghost" size="icon-sm" className="shrink-0" />
          </div>
        </div>
      </header>

      <section
        aria-label={t("detail.preview")}
        className="min-h-64 rounded-2xl border border-border p-4 sm:p-6"
      >
        {content ? (
          <div className="mx-auto w-full max-w-xl">
            <content.Demo />
          </div>
        ) : null}
      </section>

      {content ? (
        <p className="text-sm text-muted-foreground">
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
          })}
        </p>
      ) : null}

      {content ? <FeatureInstall route={content.route} /> : null}

      <section aria-labelledby="feature-includes" className="mt-6 space-y-4">
        <h2 id="feature-includes" className="text-xl font-semibold text-foreground">
          {t("detail.includesTitle")}
        </h2>
        {content ? (
          <>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-pretty text-muted-foreground marker:text-muted-foreground/60">
              {content.rows.map((id) => (
                <li key={id}>{t.rich(`detail.${id}Desc`, tags)}</li>
              ))}
            </ul>
            {content.hasMoreNote ? (
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
          </>
        ) : null}
      </section>

      <section aria-labelledby="feature-files" className="mt-6 space-y-4">
        <h2 id="feature-files" className="text-xl font-semibold text-foreground">
          {t("detail.filesTitle")}
        </h2>
        {content ? (
          <>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {t.rich("detail.filesIntro", { ...tags, feature })}
            </p>
            <FeatureFileTree files={[...content.files]} />
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {t.rich("detail.filesNote", tags)}
            </p>
          </>
        ) : null}
      </section>

      <section aria-labelledby="feature-use" className="mt-6 space-y-4">
        <h2 id="feature-use" className="text-xl font-semibold text-foreground">
          {t("detail.useTitle")}
        </h2>
        <dl className="grid gap-6 md:grid-cols-3">
          {USE_ITEMS.map((item) => {
            const key = item === "api" && content ? content.apiKey : item;

            return (
              <div key={item} className="min-w-0 space-y-1">
                <dt className="font-medium text-foreground">{t(`detail.${key}Title`)}</dt>
                <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {content ? t.rich(`detail.${key}Desc`, { ...tags, feature }) : null}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>
    </div>
  );
}
