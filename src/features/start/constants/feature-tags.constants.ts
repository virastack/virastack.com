import {
  BeakerIcon,
  ClipboardListIcon,
  CodeIcon,
  DatabaseIcon,
  LayoutGridIcon,
  LinkIcon,
  PackageIcon,
  type LucideIcon,
} from "lucide-react";

import type { FeatureTag } from "@/features/start/data/feature-catalog";

type FeatureMark = { icon: LucideIcon; textClass: string };

/** Hues stay clear of the product colors, so a tag never reads as a product. */
export const featureMarks: Record<FeatureTag | "ui" | "tests" | "packages" | "own", FeatureMark> = {
  ui: { icon: LayoutGridIcon, textClass: "text-cyan-600 dark:text-cyan-400" },
  uiOnly: { icon: LayoutGridIcon, textClass: "text-cyan-600 dark:text-cyan-400" },
  mockApi: { icon: DatabaseIcon, textClass: "text-violet-600 dark:text-violet-400" },
  urlState: { icon: LinkIcon, textClass: "text-lime-600 dark:text-lime-400" },
  form: { icon: ClipboardListIcon, textClass: "text-teal-600 dark:text-teal-400" },
  tests: { icon: BeakerIcon, textClass: "text-orange-600 dark:text-orange-400" },
  packages: { icon: PackageIcon, textClass: "text-slate-500 dark:text-slate-400" },
  own: { icon: CodeIcon, textClass: "text-brand-start" },
};
