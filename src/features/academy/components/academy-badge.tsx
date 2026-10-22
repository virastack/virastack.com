import type { ComponentType, ReactNode, SVGProps } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { AnthropicBlack } from "@/components/ui/svgs/anthropicBlack";
import { AnthropicWhite } from "@/components/ui/svgs/anthropicWhite";
import { Atlassian } from "@/components/ui/svgs/atlassian";
import { Azure } from "@/components/ui/svgs/azure";
import { Biomejs } from "@/components/ui/svgs/biomejs";
import { ClaudeAiIcon } from "@/components/ui/svgs/claudeAiIcon";
import { CodexDark } from "@/components/ui/svgs/codexDark";
import { CodexLight } from "@/components/ui/svgs/codexLight";
import { Copilot } from "@/components/ui/svgs/copilot";
import { CopilotDark } from "@/components/ui/svgs/copilotDark";
import { Css } from "@/components/ui/svgs/css";
import { CursorDark } from "@/components/ui/svgs/cursorDark";
import { CursorLight } from "@/components/ui/svgs/cursorLight";
import { Docker } from "@/components/ui/svgs/docker";
import { EslintIconDark } from "@/components/ui/svgs/eslintIconDark";
import { EslintIconLight } from "@/components/ui/svgs/eslintIconLight";
import { Figma } from "@/components/ui/svgs/figma";
import { Gemini } from "@/components/ui/svgs/gemini";
import { GithubDark } from "@/components/ui/svgs/githubDark";
import { GithubLight } from "@/components/ui/svgs/githubLight";
import { Google } from "@/components/ui/svgs/google";
import { Html5 } from "@/components/ui/svgs/html5";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Linear } from "@/components/ui/svgs/linear";
import { Meta } from "@/components/ui/svgs/meta";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Npm } from "@/components/ui/svgs/npm";
import { Nuxt } from "@/components/ui/svgs/nuxt";
import { Openai } from "@/components/ui/svgs/openai";
import { OpenaiDark } from "@/components/ui/svgs/openaiDark";
import { Playwright } from "@/components/ui/svgs/playwright";
import { Pnpm } from "@/components/ui/svgs/pnpm";
import { PnpmDark } from "@/components/ui/svgs/pnpmDark";
import { PrettierIconDark } from "@/components/ui/svgs/prettierIconDark";
import { PrettierIconLight } from "@/components/ui/svgs/prettierIconLight";
import { QwenDark } from "@/components/ui/svgs/qwenDark";
import { QwenLight } from "@/components/ui/svgs/qwenLight";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { ReactHookForm } from "@/components/ui/svgs/reactHookForm";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Reactrouter } from "@/components/ui/svgs/reactrouter";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { ShadcnUiDark } from "@/components/ui/svgs/shadcnUiDark";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { Tanstack } from "@/components/ui/svgs/tanstack";
import { TanstackDark } from "@/components/ui/svgs/tanstackDark";
import { TanstackLight } from "@/components/ui/svgs/tanstackLight";
import { TurborepoIconDark } from "@/components/ui/svgs/turborepoIconDark";
import { TurborepoIconLight } from "@/components/ui/svgs/turborepoIconLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Vercel } from "@/components/ui/svgs/vercel";
import { VercelDark } from "@/components/ui/svgs/vercelDark";
import { Vite } from "@/components/ui/svgs/vite";
import { Vitest } from "@/components/ui/svgs/vitest";
import { Vscode } from "@/components/ui/svgs/vscode";
import { WindsurfDark } from "@/components/ui/svgs/windsurfDark";
import { WindsurfLight } from "@/components/ui/svgs/windsurfLight";
import { ZedLogo } from "@/components/ui/svgs/zedLogo";
import { ZedLogoDark } from "@/components/ui/svgs/zedLogoDark";
import { Zod } from "@/components/ui/svgs/zod";
import { Zustand } from "@/components/ui/svgs/zustand";
import {
  ACADEMY_BADGE_LABELS,
  ACADEMY_COMPANY_BADGES,
  ACADEMY_QUERY_BADGES,
  type AcademyBadgeKind,
} from "@/features/academy/constants/badge.constants";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const queryClass: Record<string, string> = {
  getBy:
    "border-rose-600/30 bg-rose-500/15 text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-100",
  queryBy:
    "border-amber-600/30 bg-amber-500/15 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-100",
  findBy:
    "border-sky-600/30 bg-sky-500/15 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-100",
};

const iconFillClassName = "size-full max-h-full max-w-full object-contain";

function ThemeIcon({
  light: Light,
  dark: Dark,
  className,
}: {
  light: SvgIcon;
  dark: SvgIcon;
  className?: string;
}): ReactNode {
  return (
    <span className={cn("inline-flex size-full", className)} aria-hidden>
      <Light className={cn(iconFillClassName, "dark:hidden")} />
      <Dark className={cn(iconFillClassName, "hidden dark:block")} />
    </span>
  );
}

function AcademyBadgeIcon({ kind, className }: { kind: string; className?: string }): ReactNode {
  const iconClassName = cn(iconFillClassName, className);

  switch (kind) {
    case "claude":
    case "claudeCode":
      return <ClaudeAiIcon className={iconClassName} aria-hidden />;
    case "gpt":
    case "chatGpt":
    case "openai":
      return <ThemeIcon light={Openai} dark={OpenaiDark} className={className} />;
    case "gemini":
    case "geminiCli":
      return <Gemini className={iconClassName} aria-hidden />;
    case "cursor":
      return <ThemeIcon light={CursorLight} dark={CursorDark} className={className} />;
    case "copilot":
      return <ThemeIcon light={Copilot} dark={CopilotDark} className={className} />;
    case "codex":
      return <ThemeIcon light={CodexLight} dark={CodexDark} className={className} />;
    case "vscode":
      return <Vscode className={iconClassName} aria-hidden />;
    case "windsurf":
      return <ThemeIcon light={WindsurfLight} dark={WindsurfDark} className={className} />;
    case "zed":
      return <ThemeIcon light={ZedLogo} dark={ZedLogoDark} className={className} />;
    case "anthropic":
      return <ThemeIcon light={AnthropicBlack} dark={AnthropicWhite} className={className} />;
    case "google":
      return <Google className={iconClassName} aria-hidden />;
    case "qwen":
      return <ThemeIcon light={QwenLight} dark={QwenDark} className={className} />;
    case "meta":
      return <Meta className={iconClassName} aria-hidden />;
    case "atlassian":
    case "jira":
      return <Atlassian className={iconClassName} aria-hidden />;
    case "linear":
      return <Linear className={iconClassName} aria-hidden />;
    case "azuredevops":
      return <Azure className={iconClassName} aria-hidden />;
    case "react":
      return <ThemeIcon light={ReactLight} dark={ReactDark} className={className} />;
    case "nextjs":
      return <NextjsIconDark className={cn(iconClassName, "dark:invert")} aria-hidden />;
    case "tanstack-start":
      return <ThemeIcon light={TanstackLight} dark={TanstackDark} className={className} />;
    case "nuxt":
      return <Nuxt className={iconClassName} aria-hidden />;
    case "vitest":
      return <Vitest className={iconClassName} aria-hidden />;
    case "playwright":
      return <Playwright className={cn(iconClassName, "dark:brightness-200")} aria-hidden />;
    case "vite":
      return <Vite className={iconClassName} aria-hidden />;
    case "eslint":
      return <ThemeIcon light={EslintIconLight} dark={EslintIconDark} className={className} />;
    case "prettier":
      return <ThemeIcon light={PrettierIconLight} dark={PrettierIconDark} className={className} />;
    case "biome":
      return <Biomejs className={iconClassName} aria-hidden />;
    case "turborepo":
      return (
        <ThemeIcon light={TurborepoIconLight} dark={TurborepoIconDark} className={className} />
      );
    case "pnpm":
      return <ThemeIcon light={Pnpm} dark={PnpmDark} className={className} />;
    case "npm":
      return <Npm className={iconClassName} aria-hidden />;
    case "typescript":
      return <Typescript className={iconClassName} aria-hidden />;
    case "tailwind":
      return <Tailwindcss className={iconClassName} aria-hidden />;
    case "zod":
      return <Zod className={iconClassName} aria-hidden />;
    case "zustand":
      return <Zustand className={iconClassName} aria-hidden />;
    case "react-hook-form":
      return <ReactHookForm className={iconClassName} aria-hidden />;
    case "virastack":
      return (
        <Image
          src="/logo-icon.webp"
          alt=""
          width={16}
          height={16}
          unoptimized
          className={iconClassName}
          aria-hidden
        />
      );
    case "nodejs":
      return <Nodejs className={iconClassName} aria-hidden />;
    case "tanstack-query":
      return <Tanstack className={iconClassName} aria-hidden />;
    case "react-router":
      return <Reactrouter className={iconClassName} aria-hidden />;
    case "shadcn":
      return <ThemeIcon light={ShadcnUi} dark={ShadcnUiDark} className={className} />;
    case "figma":
      return <Figma className={iconClassName} aria-hidden />;
    case "docker":
      return <Docker className={iconClassName} aria-hidden />;
    case "vercel":
      return <ThemeIcon light={Vercel} dark={VercelDark} className={className} />;
    case "github":
      return <ThemeIcon light={GithubLight} dark={GithubDark} className={className} />;
    case "html":
      return <Html5 className={iconClassName} aria-hidden />;
    case "css":
      return <Css className={iconClassName} aria-hidden />;
    case "javascript":
      return <Javascript className={iconClassName} aria-hidden />;
    default:
      return null;
  }
}

function isCompanyBadge(kind: string): boolean {
  return (ACADEMY_COMPANY_BADGES as readonly string[]).includes(kind);
}

type AcademyBadgeProps = {
  kind: string;
  label?: string;
  className?: string;
};

export function AcademyBadge({ kind, label: labelProp, className }: AcademyBadgeProps) {
  const label = labelProp ?? ACADEMY_BADGE_LABELS[kind] ?? kind;
  const isQuery = (ACADEMY_QUERY_BADGES as readonly string[]).includes(kind);
  const company = isCompanyBadge(kind);
  const icon = isQuery ? null : <AcademyBadgeIcon kind={kind} />;
  const iconSize = company ? "size-3.5" : "size-3";

  return (
    <span
      className={cn(
        "pointer-events-none inline-flex items-center gap-1 align-middle not-italic",
        isQuery
          ? cn("rounded-full border px-2 py-0.5 font-mono text-xs font-medium", queryClass[kind])
          : "h-6 w-max shrink-0 rounded-md border border-border bg-background px-1.5 text-xs leading-none font-medium whitespace-nowrap shadow-xs",
        className,
      )}
      data-academy-badge={kind}
    >
      {icon ? (
        <span
          aria-hidden
          className={cn(
            "inline-flex shrink-0 items-center justify-center text-foreground",
            iconSize,
          )}
        >
          {icon}
        </span>
      ) : null}
      {label}
    </span>
  );
}

type AcademyBadgeLogoProps = {
  kind: string;
  className?: string;
};

export function AcademyBadgeLogo({ kind, className }: AcademyBadgeLogoProps) {
  return (
    <span aria-hidden className={cn("inline-flex shrink-0 text-foreground", className ?? "size-4")}>
      <AcademyBadgeIcon kind={kind} />
    </span>
  );
}

export function AcademyBadgeFromKind({ kind }: { kind: AcademyBadgeKind }) {
  return <AcademyBadge kind={kind} />;
}
