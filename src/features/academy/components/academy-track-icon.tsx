import type { ComponentType, SVGProps } from "react";

import { BookOpen, Bot, Gauge, GraduationCap, Layers, Rocket, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

import { Chromium } from "@/components/ui/svgs/chromium";
import { Css } from "@/components/ui/svgs/css";
import { Git } from "@/components/ui/svgs/git";
import { Html5 } from "@/components/ui/svgs/html5";
import { Javascript } from "@/components/ui/svgs/javascript";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Npm } from "@/components/ui/svgs/npm";
import { Playwright } from "@/components/ui/svgs/playwright";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { ReactHookForm } from "@/components/ui/svgs/reactHookForm";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { Tanstack } from "@/components/ui/svgs/tanstack";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Vitest } from "@/components/ui/svgs/vitest";
import { Webdev } from "@/components/ui/svgs/webdev";
import { Zod } from "@/components/ui/svgs/zod";
import { Zustand } from "@/components/ui/svgs/zustand";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

type AcademyTrackIconEntry =
  | { kind: "svg"; icon: SvgIcon; className?: string }
  | { kind: "theme"; light: SvgIcon; dark: SvgIcon }
  | {
      kind: "lucide";
      icon: ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;
      className?: string;
    };

const TRACK_TAG_ICONS: Record<string, AcademyTrackIconEntry> = {
  HTML: { kind: "svg", icon: Html5 },
  CSS: { kind: "svg", icon: Css },
  Tailwind: { kind: "svg", icon: Tailwindcss },
  "shadcn/ui": { kind: "svg", icon: ShadcnUi },
  JavaScript: { kind: "svg", icon: Javascript },
  TypeScript: { kind: "svg", icon: Typescript },
  Git: { kind: "svg", icon: Git },
  Chromium: { kind: "svg", icon: Chromium },
  npm: { kind: "svg", icon: Npm },
  React: { kind: "theme", light: ReactLight, dark: ReactDark },
  "Next.js": { kind: "svg", icon: NextjsIconDark, className: "dark:invert" },
  "TanStack Query": { kind: "svg", icon: Tanstack },
  Zustand: { kind: "svg", icon: Zustand },
  "React Hook Form": { kind: "svg", icon: ReactHookForm },
  Zod: { kind: "svg", icon: Zod },
  Vitest: { kind: "svg", icon: Vitest },
  Playwright: { kind: "svg", icon: Playwright, className: "dark:brightness-200" },
  "Web Temelleri": { kind: "svg", icon: Webdev },
  "Web Performansı": {
    kind: "lucide",
    icon: Gauge,
    className: "text-orange-500 dark:text-orange-400",
  },
  Mimari: {
    kind: "lucide",
    icon: Layers,
    className: "text-sky-600 dark:text-sky-400",
  },
  "Auth ve Güvenlik": {
    kind: "lucide",
    icon: ShieldCheck,
    className: "text-emerald-600 dark:text-emerald-400",
  },
  Production: {
    kind: "lucide",
    icon: Rocket,
    className: "text-blue-600 dark:text-blue-400",
  },
  Sözlük: {
    kind: "lucide",
    icon: BookOpen,
    className: "text-rose-600 dark:text-rose-400",
  },
  "Yapay Zekâ": {
    kind: "lucide",
    icon: Bot,
    className: "text-violet-500 dark:text-violet-400",
  },
};

type AcademyTrackIconProps = {
  tag: string;
  className?: string;
};

export function AcademyTrackIcon({ tag, className }: AcademyTrackIconProps) {
  const entry = TRACK_TAG_ICONS[tag];

  if (!entry) {
    return (
      <GraduationCap
        className={cn(className, "text-muted-foreground")}
        strokeWidth={1.75}
        aria-hidden
      />
    );
  }

  if (entry.kind === "theme") {
    const Light = entry.light;
    const Dark = entry.dark;
    return (
      <span className={cn("inline-flex", className)} aria-hidden>
        <Light className="size-full dark:hidden" />
        <Dark className="hidden size-full dark:block" />
      </span>
    );
  }

  if (entry.kind === "lucide") {
    const Icon = entry.icon;
    return <Icon className={cn(className, entry.className)} strokeWidth={1.5} aria-hidden />;
  }

  const Icon = entry.icon;
  return <Icon className={cn(className, entry.className)} aria-hidden />;
}
