"use client";

import { useState, type ReactNode } from "react";

import {
  createMask,
  getTurkishBank,
  isValidIBAN,
  isValidTCKN,
  turkishBanks,
} from "@virastack/mask";
import { generateIBAN, generateTCKN } from "@virastack/mask/testing";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { CopyStateIcon } from "@/components/shared/CopyButton";
import { MaskCheckIcon } from "@/components/shared/MaskCheckIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRIES = ["TR", "DE", "GB", "FR", "NL", "AZ"] as const;
const COUNTRY_ITEMS = COUNTRIES.map((code) => ({ value: code, label: code }));
const ANY_BANK = "any";
const ibanMask = createMask("iban");

type Generated = { value: string; call: string };

/** An empty or non-integer seed means no seed: a new value every time. */
function parseSeed(text: string) {
  const seed = Number(text);
  return text.trim() !== "" && Number.isSafeInteger(seed) ? seed : undefined;
}

function callArgs(entries: [string, string | number | undefined][]) {
  const set = entries.filter(([, value]) => value !== undefined);
  if (set.length === 0) return "";
  return `{ ${set.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(", ")} }`;
}

/**
 * Generate buttons for `generateTCKN` and `generateIBAN`. Each result row shows
 * the call on the left and its value on the right; a click copies the value.
 */
export function MaskTestingDemo() {
  return (
    <div className="not-prose flex flex-col gap-4">
      <TcknPanel />
      <IbanPanel />
    </div>
  );
}

function TcknPanel() {
  const t = useTranslations("DocsMask");
  const [seedText, setSeedText] = useState("");
  const [tckn, setTckn] = useState<Generated | null>(null);
  const seed = parseSeed(seedText);

  function onGenerate() {
    setTckn({
      value: generateTCKN({ seed }),
      call: `generateTCKN(${callArgs([["seed", seed]])})`,
    });
  }

  return (
    <Panel title="TCKN">
      <SeedField
        id="mask-testing-tckn-seed"
        value={seedText}
        onChange={setSeedText}
        hint={seed === undefined ? t("testingDemoSeedOffTckn") : t("testingDemoSeedOnTckn")}
      />
      <Results empty={t("testingDemoEmpty")}>
        {tckn ? (
          <>
            <ResultRow label={tckn.call}>
              <CopyValue value={tckn.value} />
            </ResultRow>
            <ResultRow label="isValidTCKN">
              <ValidResult valid={isValidTCKN(tckn.value)} />
            </ResultRow>
          </>
        ) : null}
      </Results>
      <Button type="button" className="self-start" onClick={onGenerate}>
        {t("testingDemoGenerateTckn")}
      </Button>
    </Panel>
  );
}

function IbanPanel() {
  const t = useTranslations("DocsMask");
  const [seedText, setSeedText] = useState("");
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>("TR");
  const [bank, setBank] = useState(ANY_BANK);
  const [iban, setIban] = useState<Generated | null>(null);

  const seed = parseSeed(seedText);
  const bankCode = country === "TR" && bank !== ANY_BANK ? bank : undefined;
  const ibanBank = iban ? getTurkishBank(iban.value) : null;
  const bankItems = [
    { value: ANY_BANK, label: t("testingDemoAnyBank") },
    ...turkishBanks.map((entry) => ({ value: entry.code, label: `${entry.code} · ${entry.name}` })),
  ];

  function onGenerate() {
    const args = callArgs([
      ["bank", bankCode],
      ["seed", seed],
    ]);
    setIban({
      value: generateIBAN(country, { bank: bankCode, seed }),
      call: `generateIBAN(${JSON.stringify(country)}${args ? `, ${args}` : ""})`,
    });
  }

  return (
    <Panel title="IBAN">
      <div className="grid gap-3 sm:grid-cols-[6rem_1fr]">
        <div className="space-y-1.5">
          <Label htmlFor="mask-testing-country">{t("testingDemoCountry")}</Label>
          <Select
            items={COUNTRY_ITEMS}
            value={country}
            onValueChange={(value) => {
              const next = COUNTRIES.find((code) => code === value);
              if (next) setCountry(next);
            }}
          >
            <SelectTrigger id="mask-testing-country" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="mask-testing-bank">{t("testingDemoBank")}</Label>
          <Select
            items={bankItems}
            value={country === "TR" ? bank : ANY_BANK}
            disabled={country !== "TR"}
            onValueChange={(value) => setBank(value ?? ANY_BANK)}
          >
            <SelectTrigger id="mask-testing-bank" className="w-full min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="max-h-72">
              {bankItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <SeedField
        id="mask-testing-iban-seed"
        value={seedText}
        onChange={setSeedText}
        hint={seed === undefined ? t("testingDemoSeedOffIban") : t("testingDemoSeedOnIban")}
      />
      <Results empty={t("testingDemoEmpty")}>
        {iban ? (
          <>
            <ResultRow label={iban.call}>
              <CopyValue value={iban.value} display={ibanMask.format(iban.value)} />
            </ResultRow>
            <ResultRow label="isValidIBAN">
              <ValidResult valid={isValidIBAN(iban.value)} />
            </ResultRow>
            {ibanBank ? (
              <ResultRow label="getTurkishBank">
                <span className="text-right text-sm">{ibanBank.name}</span>
              </ResultRow>
            ) : null}
          </>
        ) : null}
      </Results>
      <Button type="button" className="self-start" onClick={onGenerate}>
        {t("testingDemoGenerateIban")}
      </Button>
    </Panel>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      {children}
    </section>
  );
}

type SeedFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  hint: string;
};

function SeedField({ id, value, onChange, hint }: SeedFieldProps) {
  const t = useTranslations("DocsMask");

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{t("testingDemoSeed")}</Label>
      <Input
        id={id}
        inputMode="numeric"
        className="max-w-40 font-mono"
        placeholder="1"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function Results({ empty, children }: { empty: string; children: ReactNode }) {
  return (
    <div className="divide-y divide-border rounded-md bg-muted/40 px-3" aria-live="polite">
      {children ?? <p className="py-3 text-sm text-muted-foreground">{empty}</p>}
    </div>
  );
}

function ResultRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
      <code className="min-w-0 text-xs wrap-break-word text-muted-foreground">{label}</code>
      {children}
    </div>
  );
}

function CopyValue({ value, display = value }: { value: string; display?: string }) {
  const t = useTranslations("DocsMask");
  const { state, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className="group/copy inline-flex !cursor-copy items-center gap-1.5 font-mono text-sm font-medium transition-colors hover:text-foreground"
      aria-label={t("testingDemoCopy", { value })}
    >
      <span
        className={cn(
          "inline-flex size-4 items-center justify-center text-muted-foreground opacity-0 transition-opacity group-hover/copy:opacity-100 group-focus-visible/copy:opacity-100 [&_svg]:size-3.5",
          state !== "idle" && "opacity-100",
        )}
        aria-hidden
      >
        <CopyStateIcon state={state} />
      </span>
      {display}
    </button>
  );
}

function ValidResult({ valid }: { valid: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-sm">
      {String(valid)}
      {valid ? <MaskCheckIcon /> : null}
    </span>
  );
}
