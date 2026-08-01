"use client";

import { useEffect, useState } from "react";

import { useHotkey } from "@tanstack/react-hotkeys";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Step0Content } from "@/features/guide/components/steps/Step0Content";
import { Step1Engine } from "@/features/guide/components/steps/Step1Engine";
import { Step2Foundation } from "@/features/guide/components/steps/Step2Foundation";
import { Step3Typography } from "@/features/guide/components/steps/Step3Typography";
import { Step4UIComponents } from "@/features/guide/components/steps/Step4UIComponents";
import { Step5Atmosphere } from "@/features/guide/components/steps/Step5Atmosphere";
import { Step6AI } from "@/features/guide/components/steps/Step6AI";
import { Step7Final } from "@/features/guide/components/steps/Step7Final";
import type { GuideFont } from "@/features/guide/types/guide.types";
import { Button } from "@/ui/button";
import { Link, useRouter } from "@/i18n/routing";

const LAST_STEP = 7;

export function GuidePlayPage() {
  const t = useTranslations("Guide");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [font, setFont] = useState<GuideFont>("sans");
  const isStyled = maxStep >= 2;

  const goNext = () => {
    setCurrentStep((step) => {
      const next = Math.min(step + 1, LAST_STEP);
      setMaxStep((max) => Math.max(max, next));
      return next;
    });
  };

  const goPrev = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  useHotkey("Escape", () => {
    router.push("/guide");
  });

  useHotkey(
    "ArrowRight",
    () => {
      goNext();
    },
    { preventDefault: true },
  );

  useHotkey(
    "ArrowLeft",
    () => {
      goPrev();
    },
    { preventDefault: true },
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      const element = document.getElementById(`guide-step-${currentStep}`);
      // Final step: center the congratulations block in the viewport.
      element?.scrollIntoView({
        behavior: "smooth",
        block: currentStep === LAST_STEP ? "center" : "start",
      });
    }, 80);
    return () => window.clearTimeout(id);
  }, [currentStep]);

  const steps = [
    <Step0Content key="0" onNext={goNext} isCompleted={maxStep > 0} isStyled={isStyled} />,
    <Step1Engine key="1" onNext={goNext} isCompleted={maxStep > 1} isStyled={isStyled} />,
    <Step2Foundation key="2" onNext={goNext} isCompleted={maxStep > 2} isStyled={isStyled} />,
    <Step3Typography
      key="3"
      onNext={goNext}
      isCompleted={maxStep > 3}
      isStyled={isStyled}
      font={font}
      onFontChange={setFont}
    />,
    <Step4UIComponents key="4" onNext={goNext} isCompleted={maxStep > 4} isStyled={isStyled} />,
    <Step5Atmosphere key="5" onNext={goNext} isCompleted={maxStep > 5} isStyled={isStyled} />,
    <Step6AI key="6" onNext={goNext} isCompleted={maxStep > 6} isStyled={isStyled} />,
    <Step7Final key="7" />,
  ];

  return (
    <main
      className={cn(
        "relative min-h-dvh transition-all duration-500",
        isStyled ? "mx-auto max-w-3xl px-4 py-10 sm:px-6" : "p-4",
        font === "serif" && "font-serif",
        font === "sans" && "font-sans",
        font === "mono" && "font-mono",
        !isStyled && "bg-white text-black",
      )}
      style={!isStyled ? { fontFamily: '"Times New Roman", Times, serif' } : undefined}
    >
      <div className="fixed top-3 right-3 z-50">
        <Button
          type="button"
          variant={isStyled ? "outline" : "ghost"}
          size="icon"
          nativeButton={false}
          render={<Link href="/guide" />}
          aria-label={t("close")}
          className={cn(!isStyled && "border border-neutral-300 bg-white text-black")}
        >
          <XIcon className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col sm:pb-24">
        <AnimatePresence>
          {steps.slice(0, maxStep + 1).map((step, index) => (
            <motion.div
              key={index}
              id={`guide-step-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={cn(
                index === LAST_STEP
                  ? "flex flex-col justify-center py-10 sm:min-h-[30vh]"
                  : "py-14 sm:py-20",
              )}
            >
              {step}
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Desktop: room so the final step can scroll to true vertical center */}
        {maxStep >= LAST_STEP ? <div className="hidden h-[30vh] sm:block" aria-hidden /> : null}
      </div>
    </main>
  );
}
