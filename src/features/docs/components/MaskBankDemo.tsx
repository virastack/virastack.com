"use client";

import { useEffect, useRef } from "react";

import {
  createMask,
  getTurkishBank,
  isValidIBAN,
  turkishBanks,
  useViraMask,
} from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";

import { MaskDemoField } from "@/features/docs/components/MaskDemoField";

const masks = { iban: { preset: "iban", country: "TR" } } as const;
const ibanMask = createMask({ preset: "iban", country: "TR" });

/** Valid IBANs (check digits worked out) for the try-it buttons. */
const SAMPLES = [
  "TR630006200000000000123456",
  "TR650001000000000000123456",
  "TR820015000000000000123456",
];

/**
 * A TR IBAN field that names the bank as the digits arrive, above the full
 * TCMB list with the detected row highlighted.
 */
export function MaskBankDemo() {
  const t = useTranslations("DocsMask");
  const form = useForm<{ iban: string }>({ defaultValues: { iban: "" }, mode: "onTouched" });
  const { iban } = useViraMask(form, masks);
  const value = useWatch({ control: form.control, name: "iban" });
  const bank = getTurkishBank(value);
  // TR + 2 check digits + the 5-digit bank code.
  const bankDigitsTyped = value.replace(/\s/g, "").length >= 9;

  // Bring the detected row into the table's own scroll area, not the page's.
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = tableRef.current;
    const row = box?.querySelector<HTMLElement>("tr[aria-current]");
    if (!box || !row) return;
    const header = box.querySelector("thead")?.offsetHeight ?? 0;
    const top = row.offsetTop - header;
    if (
      top < box.scrollTop ||
      row.offsetTop + row.offsetHeight > box.scrollTop + box.clientHeight
    ) {
      box.scrollTo({ top: top - box.clientHeight / 3, behavior: "smooth" });
    }
  }, [bank?.code]);

  let status: string;
  if (bank) status = `${bank.name} · ${bank.code}`;
  else if (bankDigitsTyped) status = t("banksDemoUnknown");
  else status = t("banksDemoWaiting");

  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
        <MaskDemoField
          id="mask-bank-iban"
          label="IBAN"
          {...iban}
          placeholder="TR00 0000 0000 0000 0000 0000 00"
          error={form.formState.errors.iban}
          formValue={value}
          display={ibanMask.format(value)}
        />
        <p className="text-sm" aria-live="polite">
          <span className="text-muted-foreground">{t("banksDemoBank")}: </span>
          <span className={cn("font-medium", bank ? "text-foreground" : "text-muted-foreground")}>
            {status}
          </span>
          {bank && value.length === 26 ? (
            <span className="text-muted-foreground">
              {" "}
              · {isValidIBAN(value) ? t("banksDemoValid") : t("banksDemoInvalid")}
            </span>
          ) : null}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{t("banksDemoTry")}</span>
          {SAMPLES.map((sample) => (
            <button
              key={sample}
              type="button"
              className="rounded border border-border px-1.5 py-0.5 font-mono transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => form.setValue("iban", sample, { shouldValidate: true })}
            >
              {ibanMask.format(sample)}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={tableRef}
        className="relative max-h-[32rem] overflow-auto rounded-lg border border-border"
      >
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-background">
            <tr>
              <th className="text-left">{t("banksTableCode")}</th>
              <th className="text-left">{t("banksTableIban")}</th>
              <th className="text-left">{t("banksTableName")}</th>
            </tr>
          </thead>
          <tbody>
            {turkishBanks.map((entry) => (
              <tr
                key={entry.code}
                aria-current={entry.code === bank?.code ? "true" : undefined}
                className={cn(entry.code === bank?.code && "bg-brand-mask/10 font-medium")}
              >
                <td>
                  <code>{entry.code}</code>
                </td>
                <td>
                  <code className="whitespace-nowrap">
                    TR·· 0{entry.code.slice(0, 3)} {entry.code.slice(3)}…
                  </code>
                </td>
                <td>{entry.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
