export const filterPillClassName =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function filterPillStateClassName(active: boolean) {
  return active ? "border-foreground/40 bg-muted" : "border-border hover:bg-muted/60";
}
