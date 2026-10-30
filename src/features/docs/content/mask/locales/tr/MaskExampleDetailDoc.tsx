import { getTranslations } from "next-intl/server";

import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCardNetworksTable } from "@/features/docs/components/MaskCardNetworksTable";
import { MaskCheckCallout } from "@/features/docs/components/MaskCheckCallout";
import { MaskCreditCardDemo } from "@/features/docs/components/MaskCreditCardDemo";
import { MaskCurrencyFromDemo } from "@/features/docs/components/MaskCurrencyFromDemo";
import { MaskDateRangeDemo } from "@/features/docs/components/MaskDateRangeDemo";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";
import {
  getMaskExample,
  getMaskExampleLabel,
  getMaskExampleSpec,
  type MaskCustomizationPreview,
} from "@/features/docs/config/mask-docs.config";
import {
  buildCreditCardCode,
  buildExampleCode,
  buildPasswordCode,
} from "@/features/docs/content/mask/mask-example-code";
import { CUSTOM_EXAMPLE_CONFIG } from "@/features/docs/content/mask/mask-example-configs";
import { MaskPasswordExample } from "@/features/docs/content/mask/MaskPasswordExample";
import { Link } from "@/i18n/routing";

type MaskExampleDetailDocProps = {
  id: string;
};

function CustomizationPreview({ preview }: { preview: MaskCustomizationPreview }) {
  switch (preview) {
    case "currencyFrom":
      return <MaskCurrencyFromDemo />;
    case "dateRange":
      return <MaskDateRangeDemo />;
    case "dateUs":
      return <MaskFieldDemo config={{ date: { format: "MM/DD/YYYY" } }} placeholder="07/29/2026" />;
    case "numberRange":
      return <MaskFieldDemo config={{ number: { min: 1, max: 99 } }} placeholder="1–99" />;
    case "phoneTR":
      return (
        <MaskFieldDemo
          config={{ preset: "phone", country: "TR" as const }}
          placeholder="0555 123 45 67"
        />
      );
    case "ibanTR":
      return (
        <MaskFieldDemo
          config={{ preset: "iban", country: "TR" as const }}
          placeholder="TR00 0000 0000 0000 0000 0000 00"
        />
      );
    case "currencyTR":
      return (
        <MaskFieldDemo
          config={{ preset: "currency", country: "TR" as const }}
          placeholder="₺1.234,56"
        />
      );
    case "numberTR":
      return (
        <MaskFieldDemo
          config={{ preset: "number", country: "TR" as const, number: { scale: 2 } }}
          placeholder="1.234,56"
        />
      );
  }
}

export async function MaskExampleDetailDoc({ id }: MaskExampleDetailDocProps) {
  const t = await getTranslations("DocsMask");
  const example = getMaskExample(id, t);
  if (!example) return null;

  const isCreditCard = example.id === "credit-card";
  const isPassword = example.id === "password";
  const code = isCreditCard
    ? buildCreditCardCode()
    : isPassword
      ? buildPasswordCode()
      : buildExampleCode(example.preset ?? "plate", example.placeholder ?? "", example.country);

  return (
    <>
      <DocsPageHeader title={example.title} description={example.description} />
      <DocsProse>
        <p>
          <Link href="/mask/examples">{t("exampleDetailBackLink")}</Link>
          {example.preset ? (
            <>
              <span className="mx-2 text-border">·</span>
              <code>{getMaskExampleLabel(example)}</code>
            </>
          ) : null}
        </p>

        {example.check ? (
          <MaskCheckCallout
            label={t("exampleDetailCheckLabel")}
            title={example.check.title}
            description={example.check.description}
          />
        ) : null}

        <h2 id="onizleme">{t("exampleDetailHeadingPreview")}</h2>
        <ComponentPreview
          preview={
            isCreditCard ? (
              <MaskCreditCardDemo />
            ) : isPassword ? (
              <MaskPasswordExample />
            ) : (
              <MaskFieldDemo
                config={getMaskExampleSpec(example) ?? CUSTOM_EXAMPLE_CONFIG}
                placeholder={example.placeholder}
              />
            )
          }
          code={code}
        >
          <DocsCodeBlock code={code} lang="tsx" />
        </ComponentPreview>

        <h2 id="detaylar">{t("exampleDetailHeadingDetails")}</h2>
        <ul>
          {example.maskPattern ? (
            <li>
              {t("exampleDetailMaskLabel")} <code>{example.maskPattern}</code>
            </li>
          ) : null}
          {example.preset ? (
            <li>
              {t("exampleDetailPresetLabel")}{" "}
              <code>
                {example.country
                  ? `{ preset: "${example.preset}", country: "${example.country}" }`
                  : `"${example.preset}"`}
              </code>
            </li>
          ) : null}
          {example.formValue ? (
            <li>
              {t("exampleDetailFormValueLabel")} <code>&quot;{example.formValue}&quot;</code>
            </li>
          ) : null}
          {example.errorKeys.length > 0 ? (
            <li>
              {t("exampleDetailErrorKeysLabel")}{" "}
              {example.errorKeys.map((key, index) => (
                <span key={key}>
                  {index > 0 ? ", " : null}
                  <code>{key}</code>
                </span>
              ))}
            </li>
          ) : null}
          {example.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        {example.id === "card" || example.id === "credit-card" ? (
          <>
            <h2 id="kart-aglari">{t("cardNetworksHeading")}</h2>
            <p>{t("cardNetworksIntro")}</p>
            <MaskCardNetworksTable />
          </>
        ) : null}

        {example.customizations.length > 0 ? (
          <>
            <h2 id="ozellestirme">{t("exampleDetailHeadingCustomization")}</h2>
            {example.customizations.map((item) => (
              <div key={item.codeKey} className="space-y-2">
                <h3 id={item.codeKey}>{item.title}</h3>
                <p>{item.description}</p>
                {item.preview ? (
                  <ComponentPreview
                    preview={<CustomizationPreview preview={item.preview} />}
                    code={item.code}
                  >
                    <DocsCodeBlock code={item.code} lang="tsx" />
                  </ComponentPreview>
                ) : (
                  <DocsCodeBlock code={item.code} lang="tsx" />
                )}
              </div>
            ))}
          </>
        ) : null}

        <p>
          Hook API için <Link href="/mask/docs/use-vira-mask">useViraMask()</Link>, kendi desenin
          için <Link href="/mask/docs/custom-mask">özel maske</Link>.
        </p>
      </DocsProse>
    </>
  );
}
