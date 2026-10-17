import { convertNpmCommand } from "@/lib/convert-npm-command";
import { cn } from "@/lib/utils";

import { CodeBlockCommand } from "@/components/code-block-command";
import { highlightAcademyCode } from "@/features/academy/lib/highlight-academy-code";

type AcademyCodeBlockProps = {
  language: string;
  code: string;
  className?: string;
};

export async function AcademyCodeBlock({ language, code, className }: AcademyCodeBlockProps) {
  const trimmed = code.replace(/\n$/, "");

  if (language === "command") {
    return (
      <div className={cn("not-prose my-4", className)}>
        <CodeBlockCommand {...convertNpmCommand(trimmed)} />
      </div>
    );
  }

  if (language === "testing-playground") {
    let payload: { title?: string; src?: string; markup?: string; query?: string } = {};
    try {
      payload = JSON.parse(trimmed) as typeof payload;
    } catch {
      payload = { title: "Testing Playground", markup: trimmed };
    }

    return (
      <div
        className={cn(
          "academy-playground not-prose my-4 max-w-5xl overflow-hidden rounded-xl border border-border",
          className,
        )}
      >
        {payload.title ? (
          <p className="border-b border-border bg-muted/40 px-3 py-2 text-sm font-medium text-foreground">
            {payload.title}
          </p>
        ) : null}
        {payload.src ? (
          <iframe
            title={payload.title ?? "Testing Playground"}
            src={payload.src}
            className="h-[420px] w-full bg-background"
          />
        ) : (
          <pre className="overflow-x-auto p-4 text-xs text-muted-foreground">
            <code>{payload.markup ?? trimmed}</code>
          </pre>
        )}
      </div>
    );
  }

  const html = await highlightAcademyCode(trimmed, language);

  return (
    <div
      className={cn("academy-code not-prose my-4", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
