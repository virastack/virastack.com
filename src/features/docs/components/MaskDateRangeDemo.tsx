"use client";

import { createMask, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { MaskDemoField } from "@/features/docs/components/MaskDemoField";

type DateRangeForm = {
  startDate: string;
  endDate: string;
};

const dateMask = createMask("date");

/**
 * End date linked to the start date: it can't be before it.
 */
export function MaskDateRangeDemo() {
  const t = useTranslations("DocsMask");
  const form = useForm<DateRangeForm>({
    defaultValues: { startDate: "2026-07-10", endDate: "" },
    mode: "onTouched",
  });
  const { startDate, endDate } = useViraMask(form, {
    startDate: "date",
    endDate: { preset: "date", from: "startDate" },
  });
  const watched = useWatch({ control: form.control, name: ["startDate", "endDate"] });
  const values = { startDate: watched[0], endDate: watched[1] };
  const errors = form.formState.errors;

  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <MaskDemoField
        id="mask-date-start"
        label={t("demoStartLabel")}
        {...startDate}
        placeholder="10/07/2026"
        error={errors.startDate}
        formValue={values.startDate}
        display={dateMask.format(values.startDate)}
      />
      <MaskDemoField
        id="mask-date-end"
        label={t("demoEndLabel")}
        {...endDate}
        placeholder="20/07/2026"
        error={errors.endDate}
        formValue={values.endDate}
        display={dateMask.format(values.endDate)}
      />
    </div>
  );
}
