import type { ComponentType, ReactNode, SVGProps } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  ACADEMY_BADGE_LABELS,
  ACADEMY_COMPANY_BADGES,
  ACADEMY_QUERY_BADGES,
  type AcademyBadgeKind,
} from "@/features/academy/constants/badge.constants";

/**
 * Brand logos load on demand: a page ships only the SVGs of the badges it renders,
 * not all ~70 (a static import of every logo cost ~107 KB gzip on client pages).
 */
const AntDesignDarkTheme = dynamic(() =>
  import("@/components/ui/svgs/antDesignDarkTheme").then((m) => m.AntDesignDarkTheme),
);
const AnthropicBlack = dynamic(() =>
  import("@/components/ui/svgs/anthropicBlack").then((m) => m.AnthropicBlack),
);
const AnthropicWhite = dynamic(() =>
  import("@/components/ui/svgs/anthropicWhite").then((m) => m.AnthropicWhite),
);
const Atlassian = dynamic(() => import("@/components/ui/svgs/atlassian").then((m) => m.Atlassian));
const Azure = dynamic(() => import("@/components/ui/svgs/azure").then((m) => m.Azure));
const Biomejs = dynamic(() => import("@/components/ui/svgs/biomejs").then((m) => m.Biomejs));
const ClaudeAiIcon = dynamic(() =>
  import("@/components/ui/svgs/claudeAiIcon").then((m) => m.ClaudeAiIcon),
);
const CodexDark = dynamic(() => import("@/components/ui/svgs/codexDark").then((m) => m.CodexDark));
const CodexLight = dynamic(() =>
  import("@/components/ui/svgs/codexLight").then((m) => m.CodexLight),
);
const Copilot = dynamic(() => import("@/components/ui/svgs/copilot").then((m) => m.Copilot));
const CopilotDark = dynamic(() =>
  import("@/components/ui/svgs/copilotDark").then((m) => m.CopilotDark),
);
const Css = dynamic(() => import("@/components/ui/svgs/css").then((m) => m.Css));
const CursorDark = dynamic(() =>
  import("@/components/ui/svgs/cursorDark").then((m) => m.CursorDark),
);
const CursorLight = dynamic(() =>
  import("@/components/ui/svgs/cursorLight").then((m) => m.CursorLight),
);
const Docker = dynamic(() => import("@/components/ui/svgs/docker").then((m) => m.Docker));
const EslintIconDark = dynamic(() =>
  import("@/components/ui/svgs/eslintIconDark").then((m) => m.EslintIconDark),
);
const EslintIconLight = dynamic(() =>
  import("@/components/ui/svgs/eslintIconLight").then((m) => m.EslintIconLight),
);
const Figma = dynamic(() => import("@/components/ui/svgs/figma").then((m) => m.Figma));
const Formik = dynamic(() => import("@/components/ui/svgs/formik").then((m) => m.Formik));
const FormikDark = dynamic(() =>
  import("@/components/ui/svgs/formikDark").then((m) => m.FormikDark),
);
const Gemini = dynamic(() => import("@/components/ui/svgs/gemini").then((m) => m.Gemini));
const GithubDark = dynamic(() =>
  import("@/components/ui/svgs/githubDark").then((m) => m.GithubDark),
);
const GithubLight = dynamic(() =>
  import("@/components/ui/svgs/githubLight").then((m) => m.GithubLight),
);
const Google = dynamic(() => import("@/components/ui/svgs/google").then((m) => m.Google));
const Html5 = dynamic(() => import("@/components/ui/svgs/html5").then((m) => m.Html5));
const Javascript = dynamic(() =>
  import("@/components/ui/svgs/javascript").then((m) => m.Javascript),
);
const Linear = dynamic(() => import("@/components/ui/svgs/linear").then((m) => m.Linear));
const Materialui = dynamic(() =>
  import("@/components/ui/svgs/materialui").then((m) => m.Materialui),
);
const Mdn = dynamic(() => import("@/components/ui/svgs/mdn").then((m) => m.Mdn));
const Meta = dynamic(() => import("@/components/ui/svgs/meta").then((m) => m.Meta));
const NextjsIconDark = dynamic(() =>
  import("@/components/ui/svgs/nextjsIconDark").then((m) => m.NextjsIconDark),
);
const Nodejs = dynamic(() => import("@/components/ui/svgs/nodejs").then((m) => m.Nodejs));
const Npm = dynamic(() => import("@/components/ui/svgs/npm").then((m) => m.Npm));
const Nuxt = dynamic(() => import("@/components/ui/svgs/nuxt").then((m) => m.Nuxt));
const Openai = dynamic(() => import("@/components/ui/svgs/openai").then((m) => m.Openai));
const OpenaiDark = dynamic(() =>
  import("@/components/ui/svgs/openaiDark").then((m) => m.OpenaiDark),
);
const Owasp = dynamic(() => import("@/components/ui/svgs/owasp").then((m) => m.Owasp));
const Playwright = dynamic(() =>
  import("@/components/ui/svgs/playwright").then((m) => m.Playwright),
);
const Pnpm = dynamic(() => import("@/components/ui/svgs/pnpm").then((m) => m.Pnpm));
const PnpmDark = dynamic(() => import("@/components/ui/svgs/pnpmDark").then((m) => m.PnpmDark));
const PrettierIconDark = dynamic(() =>
  import("@/components/ui/svgs/prettierIconDark").then((m) => m.PrettierIconDark),
);
const PrettierIconLight = dynamic(() =>
  import("@/components/ui/svgs/prettierIconLight").then((m) => m.PrettierIconLight),
);
const QwenDark = dynamic(() => import("@/components/ui/svgs/qwenDark").then((m) => m.QwenDark));
const QwenLight = dynamic(() => import("@/components/ui/svgs/qwenLight").then((m) => m.QwenLight));
const ReactDark = dynamic(() => import("@/components/ui/svgs/reactDark").then((m) => m.ReactDark));
const ReactHookForm = dynamic(() =>
  import("@/components/ui/svgs/reactHookForm").then((m) => m.ReactHookForm),
);
const ReactLight = dynamic(() =>
  import("@/components/ui/svgs/reactLight").then((m) => m.ReactLight),
);
const Reactrouter = dynamic(() =>
  import("@/components/ui/svgs/reactrouter").then((m) => m.Reactrouter),
);
const ShadcnUi = dynamic(() => import("@/components/ui/svgs/shadcnUi").then((m) => m.ShadcnUi));
const ShadcnUiDark = dynamic(() =>
  import("@/components/ui/svgs/shadcnUiDark").then((m) => m.ShadcnUiDark),
);
const Tailwindcss = dynamic(() =>
  import("@/components/ui/svgs/tailwindcss").then((m) => m.Tailwindcss),
);
const TanstackDark = dynamic(() =>
  import("@/components/ui/svgs/tanstackDark").then((m) => m.TanstackDark),
);
const TanstackLight = dynamic(() =>
  import("@/components/ui/svgs/tanstackLight").then((m) => m.TanstackLight),
);
const TestingLibrary = dynamic(() =>
  import("@/components/ui/svgs/testingLibrary").then((m) => m.TestingLibrary),
);
const TurborepoIconDark = dynamic(() =>
  import("@/components/ui/svgs/turborepoIconDark").then((m) => m.TurborepoIconDark),
);
const TurborepoIconLight = dynamic(() =>
  import("@/components/ui/svgs/turborepoIconLight").then((m) => m.TurborepoIconLight),
);
const Typescript = dynamic(() =>
  import("@/components/ui/svgs/typescript").then((m) => m.Typescript),
);
const Vercel = dynamic(() => import("@/components/ui/svgs/vercel").then((m) => m.Vercel));
const VercelDark = dynamic(() =>
  import("@/components/ui/svgs/vercelDark").then((m) => m.VercelDark),
);
const Vite = dynamic(() => import("@/components/ui/svgs/vite").then((m) => m.Vite));
const Vitest = dynamic(() => import("@/components/ui/svgs/vitest").then((m) => m.Vitest));
const Vscode = dynamic(() => import("@/components/ui/svgs/vscode").then((m) => m.Vscode));
const WindsurfDark = dynamic(() =>
  import("@/components/ui/svgs/windsurfDark").then((m) => m.WindsurfDark),
);
const WindsurfLight = dynamic(() =>
  import("@/components/ui/svgs/windsurfLight").then((m) => m.WindsurfLight),
);
const ZedLogo = dynamic(() => import("@/components/ui/svgs/zedLogo").then((m) => m.ZedLogo));
const ZedLogoDark = dynamic(() =>
  import("@/components/ui/svgs/zedLogoDark").then((m) => m.ZedLogoDark),
);
const Zod = dynamic(() => import("@/components/ui/svgs/zod").then((m) => m.Zod));
const Zustand = dynamic(() => import("@/components/ui/svgs/zustand").then((m) => m.Zustand));

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
    case "formik":
      return <ThemeIcon light={Formik} dark={FormikDark} className={className} />;
    case "tanstack-form":
      return <ThemeIcon light={TanstackLight} dark={TanstackDark} className={className} />;
    case "ant-design":
      return <AntDesignDarkTheme className={iconClassName} aria-hidden />;
    case "mui":
      return <Materialui className={iconClassName} aria-hidden />;
    case "virastack":
      // logo-icon.webp has ~24% transparent padding per side; scale to match other icons.
      return (
        <Image
          src="/logo-icon.webp"
          alt=""
          width={16}
          height={16}
          unoptimized
          className={cn(iconClassName, "scale-[1.9]")}
          aria-hidden
        />
      );
    case "nodejs":
      return <Nodejs className={iconClassName} aria-hidden />;
    case "tanstack-query":
      return <ThemeIcon light={TanstackLight} dark={TanstackDark} className={className} />;
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
    case "mdn":
      return <Mdn className={iconClassName} aria-hidden />;
    case "owasp":
      return <Owasp viewBox="0 0 40 40" className={iconClassName} aria-hidden />;
    case "testing-library":
      return <TestingLibrary className={iconClassName} aria-hidden />;
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
