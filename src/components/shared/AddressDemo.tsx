"use client";

import { useState } from "react";

import {
  formatAddress,
  useViraAddress,
  type AddressOption,
  type GetSelectPropsOptions,
} from "@virastack/address";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { CopyStateIcon } from "@/components/copy-button";
import { Reveal } from "@/components/shared/Reveal";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AddressDemoProps = {
  /** Rendered beside the hero copy: padded, animates on mount. */
  inHero?: boolean;
  /** Shows the hook's `value` beside the fields, updating with every pick. */
  showValue?: boolean;
};

type Level = {
  id: string;
  label: string;
  options: readonly AddressOption[];
  getProps: (options?: GetSelectPropsOptions) => Record<string, unknown>;
  placeholder?: string;
};

const POSTAL_CODE_ID = "address-demo-postal-code";
const POSTAL_CODE_HINT_ID = "address-demo-postal-code-hint";

/**
 * Province, district and neighbourhood chained by `useViraAddress` on shadcn/ui
 * selects. The postal code works both ways: derived from a pick, or typed to
 * fill the selects. `formatAddress` puts the result on one line.
 */
export function AddressDemo({ inHero = false, showValue = false }: AddressDemoProps) {
  const t = useTranslations("Address");
  const address = useViraAddress();
  const [withPostalCode, setWithPostalCode] = useState(false);
  const { state: copyState, copy } = useCopyToClipboard();

  const levels: Level[] = [
    {
      id: "address-demo-province",
      label: t("demoProvince"),
      options: address.provinces,
      getProps: address.getProvinceProps,
      placeholder: t("demoProvincePlaceholder"),
    },
    {
      id: "address-demo-district",
      label: t("demoDistrict"),
      options: address.districts,
      getProps: address.getDistrictProps,
      placeholder: t("demoDistrictPlaceholder"),
    },
    {
      id: "address-demo-neighbourhood",
      label: t("demoNeighbourhood"),
      options: address.neighbourhoods,
      getProps: address.getNeighbourhoodProps,
      placeholder: address.loading.neighbourhoods
        ? t("demoLoading")
        : t("demoNeighbourhoodPlaceholder"),
    },
  ];

  const status = address.postalCodeStatus;
  const postalCodeHint =
    status === "loading"
      ? t("demoPostalCodeLoading")
      : status === "unknown"
        ? t("demoPostalCodeUnknown")
        : status === "exact"
          ? t("demoPostalCodeExact")
          : status === "partial" && address.value.neighbourhood === null
            ? t("demoPostalCodePartial", { count: address.neighbourhoods.length })
            : null;

  const addressLine = formatAddress(address.value, { postalCode: withPostalCode });

  const fields = (
    <div className="flex w-full flex-col gap-3">
      {levels.map((level) => {
        const {
          id: _id,
          placeholder,
          ...selectProps
        } = level.getProps({ as: "shadcn", placeholder: level.placeholder });

        return (
          <div key={level.id} className="space-y-1.5">
            <Label htmlFor={level.id}>{level.label}</Label>
            <Select {...selectProps} items={level.options}>
              <SelectTrigger id={level.id} className="w-full">
                <SelectValue placeholder={String(placeholder)} />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {level.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      })}
      <div className="space-y-1.5">
        <Label htmlFor={POSTAL_CODE_ID}>{t("demoPostalCode")}</Label>
        <Input
          {...address.getPostalCodeInputProps({
            id: POSTAL_CODE_ID,
            placeholder: t("demoPostalCodeHint"),
          })}
          aria-describedby={postalCodeHint ? POSTAL_CODE_HINT_ID : undefined}
          className="h-8 font-mono"
        />
        {postalCodeHint ? (
          <p
            id={POSTAL_CODE_HINT_ID}
            aria-live="polite"
            className={cn(
              "text-xs",
              status === "unknown" ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {postalCodeHint}
          </p>
        ) : null}
      </div>
      <div className="space-y-1.5 border-t border-border pt-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">{t("demoAddressLine")}</p>
          <Label className="text-xs font-normal text-muted-foreground">
            <Checkbox
              checked={withPostalCode}
              onCheckedChange={(checked) => setWithPostalCode(checked)}
            />
            {t("demoAddressLineWithPostalCode")}
          </Label>
        </div>
        {addressLine ? (
          <button
            type="button"
            onClick={() => copy(addressLine)}
            aria-label={t("demoAddressLineCopy", { address: addressLine })}
            className="group/line relative inline-flex max-w-full !cursor-copy items-center text-left text-sm text-foreground"
          >
            <span aria-live="polite">{addressLine}</span>
            <span
              className={cn(
                "ml-2 inline-flex size-6 shrink-0 items-center justify-center text-muted-foreground opacity-0 transition-opacity group-hover/line:opacity-100 group-focus-visible/line:opacity-100 [&_svg]:size-3.5",
                copyState !== "idle" && "opacity-100",
              )}
              aria-hidden
            >
              <CopyStateIcon state={copyState} />
            </span>
          </button>
        ) : (
          <p className="text-sm text-muted-foreground">{t("demoAddressLineEmpty")}</p>
        )}
      </div>
    </div>
  );

  if (showValue) {
    return (
      <div className="grid w-full items-start gap-6 sm:grid-cols-2">
        {fields}
        <div className="space-y-1.5">
          <p className="text-sm font-medium">
            <code className="font-mono">value</code>
          </p>
          <pre
            aria-live="polite"
            className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs leading-relaxed"
          >
            {JSON.stringify(address.value, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (!inHero) return fields;

  return (
    <Reveal className="mx-auto w-full max-w-md p-5 sm:p-6" mode="mount" delay={0.15}>
      {fields}
    </Reveal>
  );
}
