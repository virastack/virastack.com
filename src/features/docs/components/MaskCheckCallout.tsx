import { MaskCheckIcon } from "@/features/docs/components/MaskCheckIcon";

type MaskCheckCalloutProps = {
  /** "Built-in validation" */
  label: string;
  title: string;
  description: string;
};

/**
 * Highlights what a preset validates on its own (checksum or date rules) at the top of an example page.
 */
export function MaskCheckCallout({ label, title, description }: MaskCheckCalloutProps) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-xl border border-teal-600/25 bg-teal-50/60 p-4 dark:border-teal-400/25 dark:bg-teal-950/30">
      <MaskCheckIcon className="mt-0.5 size-5" />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          {label}: {title}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
