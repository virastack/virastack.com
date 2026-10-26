import { CopyButton } from "@/components/copy-button";

type DocsPromptBlockProps = {
  /** Prompt text for an AI coding agent. */
  prompt: string;
  /** Visible label above the prompt. */
  label: string;
  /** Accessible label for the copy button. */
  copyLabel: string;
};

/**
 * A long prompt in a scrollable block with a copy button, for "paste this into your agent" sections.
 */
export function DocsPromptBlock({ prompt, label, copyLabel }: DocsPromptBlockProps) {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-border bg-code">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <CopyButton text={prompt} variant="outline" size="sm" aria-label={copyLabel}>
          {copyLabel}
        </CopyButton>
      </div>
      <pre className="max-h-80 overflow-auto px-4 py-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
        {prompt}
      </pre>
    </div>
  );
}
