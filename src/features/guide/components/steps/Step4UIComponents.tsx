"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

import { useViraMask, type MaskField } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";

import { GuideProductMark, guideStackTags } from "@/features/guide/components/GuideRichText";
import { GuideStepCta } from "@/features/guide/components/GuideStepCta";
import type { GuideStepProps } from "@/features/guide/types/guide.types";
import { Label } from "@/ui/label";

type CardForm = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const MESSY = {
  cardNumber: "45AB!!32-12xx78#9012",
  expiry: "1a/2b!!",
  cvv: "1x9#",
} as const;

const CLEAN = {
  cardNumber: "4532123456789012",
  expiry: "1226",
  cvv: "123",
} as const;

const CHAR_MS = 38;
const FIELD_PAUSE_MS = 180;
const SECTION_PAUSE_MS = 700;
const START_DELAY_MS = 350;

const fieldClassName = cn(
  "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none",
  "placeholder:text-muted-foreground",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
);

const plainClassName = "h-9 w-full border border-neutral-400 bg-white px-2 text-sm text-black";

function typeIntoMask(field: MaskField, input: HTMLInputElement | null, nextValue: string) {
  if (!input) return;

  const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  valueSetter?.call(input, nextValue);

  field.onChange({
    target: input,
    currentTarget: input,
  } as ChangeEvent<HTMLInputElement>);
}

function wait(ms: number, timers: number[]) {
  return new Promise<void>((resolve) => {
    timers.push(window.setTimeout(resolve, ms));
  });
}

async function typePlainField(
  text: string,
  setValue: Dispatch<SetStateAction<string>>,
  timers: number[],
  cancelled: () => boolean,
) {
  for (let i = 1; i <= text.length; i += 1) {
    if (cancelled()) return;
    setValue(text.slice(0, i));
    await wait(CHAR_MS, timers);
  }
}

async function typeMaskField(
  text: string,
  getField: () => MaskField | undefined,
  getInput: () => HTMLInputElement | null,
  timers: number[],
  cancelled: () => boolean,
) {
  for (let i = 1; i <= text.length; i += 1) {
    if (cancelled()) return;
    const field = getField();
    if (!field) return;
    typeIntoMask(field, getInput(), text.slice(0, i));
    await wait(CHAR_MS, timers);
  }
}

export function Step4UIComponents({ onNext, isCompleted, isStyled }: GuideStepProps) {
  const t = useTranslations("Guide");
  const tNav = useTranslations("Navigation");
  const [plainCard, setPlainCard] = useState("");
  const [plainExpiry, setPlainExpiry] = useState("");
  const [plainCvv, setPlainCvv] = useState("");

  const maskCardRef = useRef<HTMLInputElement | null>(null);
  const maskExpiryRef = useRef<HTMLInputElement | null>(null);
  const maskCvvRef = useRef<HTMLInputElement | null>(null);
  const fieldsRef = useRef<{
    cardNumber: MaskField;
    expiry: MaskField;
    cvv: MaskField;
  } | null>(null);

  const form = useForm<CardForm>({
    defaultValues: { cardNumber: "", expiry: "", cvv: "" },
  });

  // Subscribe so masked display values re-render while we type programmatically.
  useWatch({ control: form.control });

  const { cardNumber, expiry, cvv } = useViraMask({
    form,
    schema: {
      cardNumber: "card",
      expiry: "expiry",
      cvv: "cvv",
    },
  });

  useEffect(() => {
    fieldsRef.current = { cardNumber, expiry, cvv };
  }, [cardNumber, expiry, cvv]);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const isCancelled = () => cancelled;

    void (async () => {
      await wait(START_DELAY_MS, timers);
      if (cancelled) return;

      // Plain HTML: one field at a time; parallel typing looked stuttery.
      await typePlainField(MESSY.cardNumber, setPlainCard, timers, isCancelled);
      if (cancelled) return;
      await wait(FIELD_PAUSE_MS, timers);
      await typePlainField(MESSY.expiry, setPlainExpiry, timers, isCancelled);
      if (cancelled) return;
      await wait(FIELD_PAUSE_MS, timers);
      await typePlainField(MESSY.cvv, setPlainCvv, timers, isCancelled);
      if (cancelled) return;

      await wait(SECTION_PAUSE_MS, timers);
      if (cancelled) return;

      // Masked: same sequential rhythm so formatting can settle per keystroke.
      await typeMaskField(
        CLEAN.cardNumber,
        () => fieldsRef.current?.cardNumber,
        () => maskCardRef.current,
        timers,
        isCancelled,
      );
      if (cancelled) return;
      await wait(FIELD_PAUSE_MS, timers);
      await typeMaskField(
        CLEAN.expiry,
        () => fieldsRef.current?.expiry,
        () => maskExpiryRef.current,
        timers,
        isCancelled,
      );
      if (cancelled) return;
      await wait(FIELD_PAUSE_MS, timers);
      await typeMaskField(
        CLEAN.cvv,
        () => fieldsRef.current?.cvv,
        () => maskCvvRef.current,
        timers,
        isCancelled,
      );
    })();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{t("step4Title")}</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {t.rich("step4Body", {
            shadcn: guideStackTags({ linked: true }).shadcn,
          })}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl bg-muted/20 p-4">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground">{t("before")}</p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="plain-card">{t("cardNumberLabel")}</Label>
              <input
                id="plain-card"
                type="text"
                readOnly
                value={plainCard}
                placeholder="4532123456789012"
                className={plainClassName}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="plain-expiry">{t("expiryLabel")}</Label>
                <input
                  id="plain-expiry"
                  type="text"
                  readOnly
                  value={plainExpiry}
                  placeholder="1226"
                  className={plainClassName}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="plain-cvv">{t("cvvLabel")}</Label>
                <input
                  id="plain-cvv"
                  type="text"
                  readOnly
                  value={plainCvv}
                  placeholder="123"
                  className={plainClassName}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-border bg-card p-4 ring-1 ring-border ring-offset-4 ring-offset-background">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 align-baseline">
              <img src="/logo-icon.webp" alt="" className="size-[1em] shrink-0" aria-hidden />
              {t.rich("after", {
                mask: () => (
                  <GuideProductMark id="mask" linked={false}>
                    {tNav("maskName")}
                  </GuideProductMark>
                ),
              })}
            </span>
          </p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="mask-card">{t("cardNumberLabel")}</Label>
              <input
                id="mask-card"
                {...cardNumber}
                ref={(element) => {
                  cardNumber.ref(element);
                  maskCardRef.current = element;
                }}
                readOnly
                className={fieldClassName}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="mask-expiry">{t("expiryLabel")}</Label>
                <input
                  id="mask-expiry"
                  {...expiry}
                  ref={(element) => {
                    expiry.ref(element);
                    maskExpiryRef.current = element;
                  }}
                  readOnly
                  className={fieldClassName}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mask-cvv">{t("cvvLabel")}</Label>
                <input
                  id="mask-cvv"
                  {...cvv}
                  ref={(element) => {
                    cvv.ref(element);
                    maskCvvRef.current = element;
                  }}
                  readOnly
                  className={fieldClassName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-muted-foreground">
        <GuideStepCta
          label={t("step4Cta")}
          onClick={onNext}
          disabled={isCompleted}
          isStyled={isStyled}
        />
      </p>
    </section>
  );
}
