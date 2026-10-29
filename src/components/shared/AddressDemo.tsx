"use client";

import { useViraAddress, type AddressOption, type GetSelectPropsOptions } from "@virastack/address";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/Reveal";
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

/**
 * Province, district and neighbourhood chained by `useViraAddress` on shadcn/ui
 * selects, with the postal code derived from the pick. Each province's
 * neighbourhoods load on demand from the bundled dataset.
 */
export function AddressDemo({ inHero = false, showValue = false }: AddressDemoProps) {
  const t = useTranslations("Address");
  const address = useViraAddress();

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
        <Label htmlFor="address-demo-postal-code">{t("demoPostalCode")}</Label>
        <Input
          id="address-demo-postal-code"
          readOnly
          value={address.value.postalCode ?? ""}
          placeholder={t("demoPostalCodeHint")}
          className="h-8 font-mono"
        />
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
