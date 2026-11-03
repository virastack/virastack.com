import {
  ClipboardListIcon,
  DatabaseIcon,
  LinkIcon,
  PackageIcon,
  type LucideIcon,
} from "lucide-react";

import type { FeatureTag } from "@/features/start/data/feature-catalog";

type FeatureMark = { icon: LucideIcon; textClass: string };

/** Hues stay clear of the product colors, so a tag never reads as a product. */
export const featureMarks: Record<FeatureTag | "packages", FeatureMark> = {
  mockApi: { icon: DatabaseIcon, textClass: "text-violet-600 dark:text-violet-400" },
  urlState: { icon: LinkIcon, textClass: "text-lime-600 dark:text-lime-400" },
  form: { icon: ClipboardListIcon, textClass: "text-teal-600 dark:text-teal-400" },
  packages: { icon: PackageIcon, textClass: "text-slate-500 dark:text-slate-400" },
};
