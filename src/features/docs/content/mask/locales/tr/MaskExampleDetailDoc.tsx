import { getTranslations } from "next-intl/server";

import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCreditCardDemo } from "@/features/docs/components/MaskCreditCardDemo";
import { MaskCurrencyTrDemo } from "@/features/docs/components/MaskCurrencyTrDemo";
import { MaskDateFormatDemo } from "@/features/docs/components/MaskDateFormatDemo";
import { MaskPhoneTrDemo } from "@/features/docs/components/MaskPhoneTrDemo";
import { MaskPresetDemo } from "@/features/docs/components/MaskPresetDemo";
import { getMaskExample } from "@/features/docs/config/mask-docs.config";
import { Link } from "@/i18n/routing";

type MaskExampleDetailDocProps = {
  id: string;
};

const creditCardCode = `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function CreditCardForm() {
  const form = useForm({
    defaultValues: { card: "", expiry: "", cvv: "" },
  })

  const { card, expiry, cvv } = useViraMask({
    form,
    schema: {
      card: { preset: "card", errorMessage: "Geçersiz kart numarası" },
      expiry: { preset: "expiry", errorMessage: "Geçersiz veya geçmiş tarih" },
      cvv: "cvv",
    },
  })

  return (
    <>
      <input {...card} placeholder="0000 0000 0000 0000" />
      <input {...expiry} placeholder="12/28" />
      <input {...cvv} placeholder="123" />
    </>
  )
}`;

function buildExampleCode(preset: string, placeholder: string) {
  return `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Example() {
  const form = useForm<{ ${preset}: string }>()
  const { ${preset} } = useViraMask({
    form,
    schema: { ${preset}: "${preset}" },
  })

  const { rawValue, ...inputProps } = ${preset}

  return <input {...inputProps} placeholder="${placeholder}" />
}`;
}

function validatorErrorKey(validator?: string) {
  switch (validator) {
    case "tckn":
      return "demoInvalidTckn";
    case "luhn":
      return "demoInvalidCard";
    case "expiry":
      return "demoInvalidExpiry";
    case "date":
      return "demoInvalidDate";
    case "iban":
      return "demoInvalidIban";
    case "email":
      return "demoInvalidEmail";
    case "url":
      return "demoInvalidUrl";
    case "vkn":
      return "demoInvalidTaxNumber";
    default:
      return "demoInvalidValue";
  }
}

export async function MaskExampleDetailDoc({ id }: MaskExampleDetailDocProps) {
  const t = await getTranslations("DocsMask");
  const example = getMaskExample(id, t);
  if (!example) return null;

  const isCreditCard = example.id === "credit-card";
  const exampleCode = example.preset
    ? buildExampleCode(example.preset, example.placeholder ?? "")
    : creditCardCode;

  return (
    <>
      <DocsPageHeader title={example.title} description={example.description} />
      <DocsProse>
        <p>
          <Link href="/mask/docs/examples">{t("exampleDetailBackLink")}</Link>
          {example.preset ? (
            <>
              <span className="mx-2 text-border">·</span>
              <code>{example.preset}</code>
            </>
          ) : null}
        </p>

        <h2 id="onizleme">{t("exampleDetailHeadingPreview")}</h2>
        {isCreditCard ? (
          <ComponentPreview preview={<MaskCreditCardDemo />} code={creditCardCode}>
            <DocsCodeBlock code={creditCardCode} lang="tsx" />
          </ComponentPreview>
        ) : example.preset ? (
          <ComponentPreview
            preview={
              <MaskPresetDemo
                preset={example.preset}
                placeholder={example.placeholder}
                showError={Boolean(example.validator)}
                errorMessage={
                  example.validator ? t(validatorErrorKey(example.validator)) : undefined
                }
              />
            }
            code={exampleCode}
          >
            <DocsCodeBlock code={exampleCode} lang="tsx" />
          </ComponentPreview>
        ) : null}

        <h2 id="detaylar">{t("exampleDetailHeadingDetails")}</h2>
        <ul>
          {example.maskPattern ? (
            <li>
              {t("exampleDetailMaskLabel")} <code>{example.maskPattern}</code>
            </li>
          ) : null}
          {example.preset ? (
            <li>
              {t("exampleDetailPresetLabel")} <code>&quot;{example.preset}&quot;</code>
            </li>
          ) : null}
          {example.validator ? (
            <li>
              {t("exampleDetailValidatorLabel")} <code>&apos;{example.validator}&apos;</code>{" "}
              {t("exampleDetailValidatorDescription")}
            </li>
          ) : null}
          {example.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        {example.customizations.length > 0 ? (
          <>
            <h2 id="ozellestirme">{t("exampleDetailHeadingCustomization")}</h2>
            {example.customizations.map((item) => {
              const preview =
                example.id === "currency" ? (
                  <MaskCurrencyTrDemo />
                ) : example.id === "phone" ? (
                  <MaskPhoneTrDemo />
                ) : item.codeKey === "exampleDateCustomization0Code" ? (
                  <MaskDateFormatDemo dateFormat="MDY" placeholder="07/29/2026" />
                ) : item.codeKey === "exampleDateCustomization1Code" ? (
                  <MaskDateFormatDemo dateFormat="YMD" mask="9999/99/99" placeholder="2026/07/29" />
                ) : null;

              return (
                <div key={item.codeKey} className="space-y-2">
                  <h3 id={item.title.toLowerCase().replace(/\s+/g, "-")}>{item.title}</h3>
                  <p>{item.description}</p>
                  {preview ? (
                    <ComponentPreview preview={preview} code={item.code}>
                      <DocsCodeBlock
                        code={item.code}
                        lang={item.code.includes("import ") ? "tsx" : "ts"}
                      />
                    </ComponentPreview>
                  ) : (
                    <DocsCodeBlock
                      code={item.code}
                      lang={item.code.includes("import ") ? "tsx" : "ts"}
                    />
                  )}
                </div>
              );
            })}
          </>
        ) : null}

        <p>
          Hook API için <Link href="/mask/docs/use-vira-mask">useViraMask()</Link>, özel maske için{" "}
          <Link href="/mask/docs/custom-mask">custom mask</Link>.
        </p>
      </DocsProse>
    </>
  );
}
