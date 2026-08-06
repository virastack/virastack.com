"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

import {
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileCodeIcon,
  XIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Reveal } from "@/components/shared/Reveal";
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from "@/components/tabs";
import { Button } from "@/components/ui/button";

type Phase = "typing" | "thinking" | "ready";

type ScenarioId = "data" | "architecture" | "forms";

const SCENARIOS: ScenarioId[] = ["data", "architecture", "forms"];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const AUTO_ADVANCE_MS = 7000;
const DEMO_STAGE_CLASS = "md:h-[min(64svh,48rem)] md:overflow-hidden";

const SCENARIO_CODE: Record<
  ScenarioId,
  {
    rejectCode: string;
    acceptCode: string;
  }
> = {
  data: {
    rejectCode: `useEffect(() => {
  setLoading(true)
  fetch("/api/users")
    .then((r) => r.json())
    .then(setUsers)
    .finally(() => setLoading(false))
}, [])`,
    acceptCode: `const { data: users } = useQuery({
  queryKey: usersKeys.list(),
  queryFn: () => api.getUsers(),
})`,
  },
  architecture: {
    rejectCode: `import { UserCard } from
  "@/features/auth/components/UserCard"

// features/billing → features/auth`,
    acceptCode: `import { UserCard } from
  "@/components/shared/UserCard"

// shared UI, no cross-feature import`,
  },
  forms: {
    rejectCode: `const [email, setEmail] = useState("")
const [error, setError] = useState("")

function onSubmit() {
  if (!email.includes("@")) {
    setError("Invalid email")
  }
}`,
    acceptCode: `const form = useForm({
  resolver: zodResolver(userSchema),
})

<form onSubmit={form.handleSubmit(onSave)}>`,
  },
};

/**
 * Scripted Cursor-style demo: same chat chrome, multiple rule-pack scenarios.
 */
export function AiDialogDemo() {
  const t = useTranslations("Ai");
  const [scenario, setScenario] = useState<ScenarioId>("data");

  const goNext = useCallback(() => {
    setScenario((current) => {
      const index = SCENARIOS.indexOf(current);
      return SCENARIOS[(index + 1) % SCENARIOS.length] ?? "data";
    });
  }, []);

  function selectScenario(value: string | number | null): void {
    if (isScenarioId(value)) {
      setScenario(value);
    }
  }

  return (
    <section id="demo" className="mx-auto max-w-3xl scroll-mt-4 px-6 py-16 md:scroll-mt-28">
      <Reveal className="mb-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("demoTitle")}</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("demoDesc")}
        </p>
      </Reveal>

      <Reveal delay={0.06} className="mx-auto mb-6 flex w-full max-w-xl justify-center">
        <Tabs value={scenario} onValueChange={selectScenario}>
          <TabsList className="h-9 w-full max-w-xl sm:w-fit">
            {SCENARIOS.map((id) => (
              <TabsTrigger key={id} value={id} className="flex-1 px-3 sm:flex-none">
                {t(`demoTab${capitalize(id)}`)}
              </TabsTrigger>
            ))}
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </Reveal>

      <div className={cn("relative mx-auto w-full max-w-xl", DEMO_STAGE_CLASS)}>
        <AnimatePresence mode="wait" initial={false}>
          <ScenarioDemo key={scenario} scenario={scenario} onRequestNext={goNext} />
        </AnimatePresence>
      </div>
    </section>
  );
}

type ScenarioDemoProps = {
  scenario: ScenarioId;
  onRequestNext: () => void;
};

function ScenarioDemo({ scenario, onRequestNext }: ScenarioDemoProps) {
  const t = useTranslations("Ai");
  const reduceMotion = useReducedMotion();
  const prefix = `demo${capitalize(scenario)}` as const;
  const prompt = t(`${prefix}Prompt`);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const code = SCENARIO_CODE[scenario];

  const isTyping = phase === "typing" && typed.length < prompt.length;
  const canSend = typed.length === prompt.length && phase === "typing";

  useEffect(() => {
    let index = 0;
    let thinkTimer = 0;
    let readyTimer = 0;

    if (reduceMotion) {
      const skipTimer = window.setTimeout(() => {
        setTyped(prompt);
        setPhase("ready");
      }, 0);
      return () => {
        window.clearTimeout(skipTimer);
      };
    }

    const interval = window.setInterval(() => {
      index += 1;
      setTyped(prompt.slice(0, index));
      if (index < prompt.length) return;

      window.clearInterval(interval);
      thinkTimer = window.setTimeout(() => {
        setPhase("thinking");
        readyTimer = window.setTimeout(() => {
          setPhase("ready");
        }, 1100);
      }, 320);
    }, 22);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(thinkTimer);
      window.clearTimeout(readyTimer);
    };
  }, [prompt, reduceMotion]);

  const enterHidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" };
  const enterVisible = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" };
  const enterExit = reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(4px)" };

  return (
    <motion.div
      className="relative flex flex-col md:absolute md:inset-0"
      initial={enterHidden}
      animate={enterVisible}
      exit={enterExit}
      transition={{
        duration: reduceMotion ? 0.12 : 0.28,
        ease: EASE_OUT,
      }}
    >
      <div
        className={cn(
          "w-full shrink-0 rounded-lg border border-border bg-background",
          "ring-1 ring-border ring-offset-4 ring-offset-background",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]",
        )}
      >
        <div
          className="min-h-[5.5rem] px-3.5 pt-3 pb-2 text-[13px] leading-relaxed text-foreground/90 sm:text-sm"
          aria-live="polite"
        >
          {typed ? (
            <span className="whitespace-pre-wrap">{typed}</span>
          ) : (
            <span className="text-muted-foreground/70">{t("demoPlaceholder")}</span>
          )}
          {isTyping ? (
            <span
              className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-pulse bg-foreground align-text-bottom"
              aria-hidden
            />
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-2 px-2.5 pb-2.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-border/80",
              "bg-muted/50 px-2 py-1 text-[11px] text-muted-foreground",
            )}
          >
            {t("demoModel")}
            <ChevronDownIcon className="size-3 opacity-70" aria-hidden />
          </span>
          <span
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-full transition-[scale,background-color,color] duration-300 ease-out",
              canSend || phase !== "typing"
                ? "scale-100 bg-foreground text-background"
                : "scale-95 bg-muted text-muted-foreground/50",
              phase === "thinking" && "animate-pulse",
            )}
            aria-hidden
          >
            <ArrowUpIcon className="size-3.5" strokeWidth={2.5} />
          </span>
        </div>
      </div>

      <div className="relative mt-6 md:min-h-0 md:flex-1 md:overflow-hidden">
        <AnimatePresence mode="wait">
          {phase === "thinking" ? (
            <motion.div
              key="thinking"
              initial={enterHidden}
              animate={enterVisible}
              exit={enterExit}
              transition={{
                duration: reduceMotion ? 0.1 : 0.3,
                ease: EASE_OUT,
              }}
              className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground md:absolute md:inset-x-0 md:top-0"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-fuchsia-500" aria-hidden />
              {t(`${prefix}Thinking`)}
            </motion.div>
          ) : null}

          {phase === "ready" ? (
            <motion.div
              key="ready"
              className="flex w-full flex-col gap-3 md:absolute md:inset-x-0 md:top-0"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.1,
                    delayChildren: reduceMotion ? 0 : 0.04,
                  },
                },
                exit: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: enterHidden,
                  visible: {
                    ...enterVisible,
                    transition: {
                      duration: reduceMotion ? 0.12 : 0.35,
                      ease: EASE_OUT,
                    },
                  },
                  exit: {
                    ...enterExit,
                    transition: { duration: 0.15, ease: "easeOut" },
                  },
                }}
              >
                <OutcomeCard
                  tone="reject"
                  title={t(`${prefix}RejectTitle`)}
                  body={t(`${prefix}RejectBody`)}
                >
                  <CodeSnippet code={code.rejectCode} tone="reject" />
                </OutcomeCard>
              </motion.div>

              <motion.div
                variants={{
                  hidden: enterHidden,
                  visible: {
                    ...enterVisible,
                    transition: {
                      duration: reduceMotion ? 0.12 : 0.35,
                      ease: EASE_OUT,
                    },
                  },
                  exit: {
                    ...enterExit,
                    transition: { duration: 0.15, ease: "easeOut" },
                  },
                }}
              >
                <OutcomeCard
                  tone="accept"
                  title={t(`${prefix}AcceptTitle`)}
                  body={t(`${prefix}AcceptBody`)}
                >
                  <CodeSnippet code={code.acceptCode} tone="accept" />
                  <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-emerald-700/80 dark:text-emerald-300/80">
                    <FileCodeIcon className="size-3.5 shrink-0" aria-hidden />
                    {t(`${prefix}AcceptPath`)}
                  </p>
                </OutcomeCard>
              </motion.div>

              <motion.div
                className="flex justify-end pt-1"
                variants={{
                  hidden: enterHidden,
                  visible: {
                    ...enterVisible,
                    transition: {
                      duration: reduceMotion ? 0.12 : 0.35,
                      ease: EASE_OUT,
                    },
                  },
                  exit: {
                    ...enterExit,
                    transition: { duration: 0.15, ease: "easeOut" },
                  },
                }}
              >
                <AutoNextButton
                  label={t("demoNext")}
                  durationMs={AUTO_ADVANCE_MS}
                  onNext={onRequestNext}
                />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

type AutoNextButtonProps = {
  label: string;
  durationMs: number;
  onNext: () => void;
};

function AutoNextButton({ label, durationMs, onNext }: AutoNextButtonProps) {
  const reduceMotion = useReducedMotion();
  const [fillActive, setFillActive] = useState(false);

  useEffect(() => {
    const startId = window.requestAnimationFrame(() => {
      setFillActive(true);
    });
    const timer = window.setTimeout(() => {
      onNext();
    }, durationMs);

    return () => {
      window.cancelAnimationFrame(startId);
      window.clearTimeout(timer);
    };
  }, [durationMs, onNext]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onNext}
      className="relative overflow-hidden"
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-left bg-foreground/10",
          reduceMotion ? "transition-none" : "transition-transform ease-linear",
        )}
        style={{
          transform: fillActive ? "scaleX(1)" : "scaleX(0)",
          transitionDuration: reduceMotion ? "0ms" : `${durationMs}ms`,
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-1">
        {label}
        <ChevronRightIcon data-icon="inline-end" className="opacity-80" aria-hidden />
      </span>
    </Button>
  );
}

type OutcomeCardProps = {
  tone: "reject" | "accept";
  title: string;
  body: string;
  children: ReactNode;
};

function OutcomeCard({ tone, title, body, children }: OutcomeCardProps) {
  const isReject = tone === "reject";

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3",
        isReject
          ? "border-rose-500/20 bg-rose-50/80 dark:bg-rose-950/30"
          : "border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/30",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
          isReject
            ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        )}
      >
        {isReject ? (
          <XIcon className="size-3.5" strokeWidth={2.5} aria-hidden />
        ) : (
          <CheckIcon className="size-3.5" strokeWidth={2.5} aria-hidden />
        )}
      </span>
      <div className="min-w-0 space-y-2">
        <div className="space-y-1">
          <p
            className={cn(
              "text-sm font-medium",
              isReject
                ? "text-rose-700 dark:text-rose-300"
                : "text-emerald-800 dark:text-emerald-300",
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "text-sm leading-relaxed",
              isReject
                ? "text-rose-700/90 dark:text-rose-300/90"
                : "text-emerald-800/90 dark:text-emerald-300/90",
            )}
          >
            {body}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

type CodeSnippetProps = {
  code: string;
  tone: "reject" | "accept";
};

function CodeSnippet({ code, tone }: CodeSnippetProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border px-3 py-2.5 font-mono text-[11px] leading-relaxed sm:text-xs",
        tone === "reject"
          ? "border-rose-500/15 bg-rose-950/[0.04] text-rose-800/90 dark:bg-black/20 dark:text-rose-200/85"
          : "border-emerald-500/15 bg-emerald-950/[0.04] text-emerald-900/90 dark:bg-black/20 dark:text-emerald-100/85",
      )}
    >
      <code>{code}</code>
    </pre>
  );
}

function capitalize(value: ScenarioId): "Data" | "Architecture" | "Forms" {
  switch (value) {
    case "data":
      return "Data";
    case "architecture":
      return "Architecture";
    case "forms":
      return "Forms";
  }
}

function isScenarioId(value: string | number | null): value is ScenarioId {
  return value === "data" || value === "architecture" || value === "forms";
}
