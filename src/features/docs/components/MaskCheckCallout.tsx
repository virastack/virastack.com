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
    <div className="not-prose my-6 flex gap-3 rounded-xl border border-brand-mask/25 bg-brand-mask/5 p-4">
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
