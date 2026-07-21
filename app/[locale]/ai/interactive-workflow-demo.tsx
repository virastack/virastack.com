"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Bot,
  FileCode2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
} from "@/components/modern-web/ui/prompt-input";
import { MicIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type WorkflowState = "idle" | "prompting" | "planning" | "coding" | "completed";

export function InteractiveWorkflowDemo() {
  const [state, setState] = useState<WorkflowState>("idle");
  const [promptText, setPromptText] = useState("");
  const [planSteps, setPlanSteps] = useState<number>(0);
  const [codeLines, setCodeLines] = useState<number>(0);
  const t = useTranslations("AIRules.interactive");

  const fullPrompt = t("prompt");

  // State Machine Logic
  useEffect(() => {
    if (state === "idle") {
      const timer = setTimeout(() => setState("prompting"), 1000);
      return () => clearTimeout(timer);
    }

    if (state === "prompting") {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullPrompt.length) {
          setPromptText(fullPrompt.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setState("planning"), 800);
        }
      }, 40); // Typing speed
      return () => clearInterval(interval);
    }

    if (state === "planning") {
      const interval = setInterval(() => {
        setPlanSteps((prev) => {
          if (prev < 4) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setState("coding"), 1500);
          return prev;
        });
      }, 600);
      return () => clearInterval(interval);
    }

    if (state === "coding") {
      const interval = setInterval(() => {
        setCodeLines((prev) => {
          if (prev < 18) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setState("completed"), 1000);
          return prev;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handleReplay = () => {
    setState("idle");
    setPromptText("");
    setPlanSteps(0);
    setCodeLines(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col">
      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Prompting State */}
          {(state === "idle" || state === "prompting") && (
            <motion.div
              key="prompting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl"
            >
              <div className="p-1 border border-border rounded-lg overflow-hidden relative bg-background shadow-sm">
                <PromptInput
                  onSubmit={() => {}}
                  className="relative"
                  disableResetOnSubmit
                >
                  <PromptInputBody>
                    <PromptInputTextarea
                      value={promptText}
                      readOnly
                      placeholder={t("placeholder")}
                      className="min-h-[104px] border-none focus-visible:ring-0 shadow-none resize-none"
                    />
                  </PromptInputBody>
                  <PromptInputFooter>
                    <PromptInputTools>
                      <PromptInputButton
                        type="button"
                        className="cursor-default hover:bg-transparent hover:text-inherit"
                      >
                        <MicIcon className="size-4" />
                      </PromptInputButton>
                    </PromptInputTools>
                    <PromptInputSubmit
                      className={
                        state === "prompting" &&
                        promptText.length === fullPrompt.length
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                      isDisabled={!promptText}
                      status={"ready"}
                    />
                  </PromptInputFooter>
                </PromptInput>
              </div>
            </motion.div>
          )}

          {/* Planning State */}
          {state === "planning" && (
            <motion.div
              key="planning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
                <span className="text-sm font-medium">
                  {t("generating")}
                </span>
              </div>

              <div className="space-y-1">
                {[
                  t("steps.step1"),
                  t("steps.step2"),
                  t("steps.step3"),
                  t("steps.step4"),
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: planSteps > index ? 1 : 0,
                      x: planSteps > index ? 0 : -10,
                    }}
                    className="flex items-start gap-2 py-1.5 px-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <span className="text-sm text-foreground/90">{step}</span>
                  </motion.div>
                ))}
              </div>

              {planSteps >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex justify-end"
                >
                  <Button
                    size="xs"
                    className="bg-orange-400 hover:bg-orange-500 text-white rounded-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t("approve")}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Coding State */}
          {state === "coding" && (
            <motion.div
              key="coding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl h-full flex flex-col border border-border rounded-xl overflow-hidden bg-[#0d1117] min-h-[300px]"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <FileCode2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">
                  users-table.tsx
                </span>
              </div>
              <div className="p-4 font-mono text-sm text-zinc-300 flex-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1117] z-10 pointer-events-none" />
                <div className="space-y-1">
                  {Array.from({ length: codeLines }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="whitespace-pre"
                    >
                      {i === 0 && <span className="text-purple-400">import</span>} {i === 0 && "{ useQuery }"} {i === 0 && <span className="text-purple-400">from</span>} {i === 0 && <span className="text-green-300">'@tanstack/react-query'</span>}{i === 0 && ";"}
                      {i === 1 && <span className="text-purple-400">import</span>} {i === 1 && "{ useQueryStates }"} {i === 1 && <span className="text-purple-400">from</span>} {i === 1 && <span className="text-green-300">'nuqs'</span>}{i === 1 && ";"}
                      {i === 2 && ""}
                      {i === 3 && <span className="text-purple-400">export function</span>} {i === 3 && <span className="text-blue-400">UsersTable</span>}{i === 3 && "() {"}
                      {i === 4 && "  "} {i === 4 && <span className="text-purple-400">const</span>} {i === 4 && "[params] = "} {i === 4 && <span className="text-blue-400">useQueryStates</span>}{i === 4 && "(searchParams);"}
                      {i === 5 && "  "} {i === 5 && <span className="text-purple-400">const</span>} {i === 5 && "{ data, isLoading } = "} {i === 5 && <span className="text-blue-400">useQuery</span>}{i === 5 && "({"}
                      {i === 6 && "    queryKey: ["} {i === 6 && <span className="text-green-300">'users'</span>}{i === 6 && ", params],"}
                      {i === 7 && "    queryFn: () => "} {i === 7 && <span className="text-blue-400">fetchUsers</span>}{i === 7 && "(params),"}
                      {i === 8 && "  });"}
                      {i === 9 && ""}
                      {i === 10 && "  "} {i === 10 && <span className="text-purple-400">if</span>} {i === 10 && "(isLoading) "} {i === 10 && <span className="text-purple-400">return</span>} {i === 10 && "<TableSkeleton />;"}
                      {i === 11 && ""}
                      {i === 12 && "  "} {i === 12 && <span className="text-purple-400">return</span>} {i === 12 && "("}
                      {i === 13 && "    <div className="} {i === 13 && <span className="text-green-300">\"rounded-md border\"</span>}{i === 13 && ">"}
                      {i === 14 && "      <Table data={data} />"}
                      {i === 15 && "    </div>"}
                      {i === 16 && "  );"}
                      {i === 17 && "}"}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Completed State */}
          {state === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl flex flex-col items-center gap-6"
            >
              <div className="w-full p-6 border border-border rounded-xl bg-card shadow-lg relative overflow-hidden">
                {/* Skeleton State */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-9 w-64 bg-muted rounded animate-pulse" />
                    <div className="h-9 w-32 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="h-10 border-b border-border bg-muted/50 animate-pulse" />
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 border-b border-border bg-muted/20 animate-pulse flex items-center px-4 gap-4">
                         <div className="h-4 w-1/4 bg-muted rounded" />
                         <div className="h-4 w-1/4 bg-muted rounded" />
                         <div className="h-4 w-1/4 bg-muted rounded" />
                         <div className="h-4 w-1/4 bg-muted rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                      <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                      <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Simulated loaded state after a brief delay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute inset-0 p-6 bg-card flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="relative w-64">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                      <input type="text" className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm shadow-sm focus:outline-none" placeholder={t("searchPlaceholder")} defaultValue="john" readOnly />
                    </div>
                    <div className="h-9 px-3 border border-input rounded-md flex items-center gap-2 text-sm font-medium shadow-sm bg-background">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                      {t("role")}
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg overflow-hidden flex-1">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted/50 text-muted-foreground border-b border-border">
                        <tr>
                          <th className="h-10 px-4 font-medium">{t("table.name")}</th>
                          <th className="h-10 px-4 font-medium">{t("table.email")}</th>
                          <th className="h-10 px-4 font-medium">{t("table.role")}</th>
                          <th className="h-10 px-4 font-medium">{t("table.status")}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/50 transition-colors">
                          <td className="p-4 font-medium">John Doe</td>
                          <td className="p-4 text-muted-foreground">john@example.com</td>
                          <td className="p-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">{t("table.admin")}</span></td>
                          <td className="p-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">{t("table.active")}</span></td>
                        </tr>
                        <tr className="hover:bg-muted/50 transition-colors">
                          <td className="p-4 font-medium">John Smith</td>
                          <td className="p-4 text-muted-foreground">smith@example.com</td>
                          <td className="p-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">{t("table.admin")}</span></td>
                          <td className="p-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">{t("table.offline")}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                    <div>{t("showing")}</div>
                    <div className="flex gap-1">
                      <button className="h-8 px-3 border border-border rounded-md opacity-50 cursor-not-allowed">{t("previous")}</button>
                      <button className="h-8 px-3 border border-border rounded-md opacity-50 cursor-not-allowed">{t("next")}</button>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-green-500 font-medium bg-green-500/10 px-3 py-1.5 rounded-full">
                  <Sparkles className="w-4 h-4" />
                  {t("generatedBy")}
                </div>

                <button
                  onClick={handleReplay}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t("replay")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
