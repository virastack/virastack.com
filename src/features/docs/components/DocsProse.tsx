import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DocsProseProps = {
  children: ReactNode;
  className?: string;
};

export function DocsProse({ children, className }: DocsProseProps) {
  return (
    <div
      className={cn(
        "space-y-6 text-base leading-relaxed text-muted-foreground",
        "[&_h2]:scroll-mt-24 [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:scroll-mt-24 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground",
        "[&_p]:text-pretty",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
        "[&_li]:text-pretty",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em] [&_code]:text-foreground",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-code [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:text-foreground",
        "[&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[inherit]",
        "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary",
        "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:border-b [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground",
        "[&_td]:border-b [&_td]:border-border/70 [&_td]:px-3 [&_td]:py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

type DocsPageHeaderProps = {
  title: string;
  description: ReactNode;
};

export function DocsPageHeader({ title, description }: DocsPageHeaderProps) {
  return (
    <header className="mb-10 space-y-3 border-b border-border pb-8">
      <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
        {description}
      </p>
    </header>
  );
}
