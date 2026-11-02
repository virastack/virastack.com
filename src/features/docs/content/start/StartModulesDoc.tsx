import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { featureCatalog } from "@/features/start/data/feature-catalog";
import { Link } from "@/i18n/routing";

const CHECKOUT_NEXT = `import { CheckoutAddress } from "@/features/checkout-address/components/CheckoutAddress"
import { CheckoutPayment } from "@/features/checkout-payment/components/CheckoutPayment"

export default function CheckoutPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-12">
      <CheckoutAddress />
      <CheckoutPayment />
    </main>
  )
}`;

const CHECKOUT_TANSTACK = `import { createFileRoute } from "@tanstack/react-router"

import { CheckoutAddress } from "@/features/checkout-address/components/CheckoutAddress"
import { CheckoutPayment } from "@/features/checkout-payment/components/CheckoutPayment"

export const Route = createFileRoute("/checkout")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-12">
      <CheckoutAddress />
      <CheckoutPayment />
    </main>
  )
}`;

const CHECKOUT_HOOKS = `const { shipping, billing } = useCheckoutAddress()
const { card } = useCheckoutPayment()`;

const code = (chunks: ReactNode) => <code>{chunks}</code>;

export function StartModulesDoc() {
  const t = useTranslations("DocsStart");
  const tCatalog = useTranslations("StartFeatureCatalog");
  const readyModules = featureCatalog.filter(({ status }) => status === "ready");

  return (
    <>
      <DocsPageHeader title={t("modulesTitle")} description={t("modulesHeaderDesc")} />
      <DocsProse>
        <h2 id="nedir">{t("modulesHeadingWhat")}</h2>
        <p>
          {t.rich("modulesWhatP1", {
            code,
            ai: (chunks) => (
              <GuideProductMark id="ai" linked={false}>
                {chunks}
              </GuideProductMark>
            ),
          })}
        </p>
        <p>{t("modulesWhatP2")}</p>

        <h2 id="hazir">{t("modulesHeadingList")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("modulesColName")}</th>
                <th>{t("modulesColDesc")}</th>
              </tr>
            </thead>
            <tbody>
              {readyModules.map(({ id }) => (
                <tr key={id}>
                  <td>
                    <Link href={`/start/features/${id}`}>
                      <code>{id}</code>
                    </Link>
                  </td>
                  <td>{tCatalog(`items.${id}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          {t.rich("modulesListNote", {
            catalog: (chunks) => <Link href="/start/features">{chunks}</Link>,
          })}
        </p>

        <h2 id="ekle">{t("modulesHeadingAdd")}</h2>
        <p>{t("modulesAddP")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add users")} />
        <ul>
          <li>{t.rich("modulesAddFiles", { code })}</li>
          <li>{t.rich("modulesAddDeps", { code })}</li>
          <li>{t.rich("modulesAddMessages", { code })}</li>
          <li>{t("modulesAddConflict")}</li>
          <li>{t.rich("modulesAddNoPage", { bold: (chunks) => <strong>{chunks}</strong> })}</li>
        </ul>

        <h2 id="sayfa">{t("modulesHeadingPage")}</h2>
        <p>{t("modulesPageP")}</p>

        <h2 id="checkout">{t("modulesHeadingCheckout")}</h2>
        <p>{t.rich("modulesCheckoutP1", { code })}</p>
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add checkout-address")} />
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add checkout-payment")} />
        <p>{t.rich("modulesCheckoutNext", { code })}</p>
        <pre>
          <code>{CHECKOUT_NEXT}</code>
        </pre>
        <p>{t.rich("modulesCheckoutTanstack", { code })}</p>
        <pre>
          <code>{CHECKOUT_TANSTACK}</code>
        </pre>
        <p>{t.rich("modulesCheckoutI18n", { code })}</p>
        <p>{t("modulesCheckoutP2")}</p>
        <pre>
          <code>{CHECKOUT_HOOKS}</code>
        </pre>
        <p>{t.rich("modulesCheckoutP3", { code })}</p>

        <h2 id="kaldir">{t("modulesHeadingRemove")}</h2>
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest remove users")} />
        <p>{t("modulesRemoveP")}</p>
        <p>{t.rich("modulesRemoveChanged", { code })}</p>
        <p>{t("modulesRemovePage")}</p>
      </DocsProse>
    </>
  );
}
