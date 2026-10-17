import type { ReactNode } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui";

type AcademyDetailsItemView = {
  id: string;
  summary: ReactNode;
  body: ReactNode;
};

type AcademyDetailsProps = {
  items: readonly AcademyDetailsItemView[];
};

export function AcademyDetails({ items }: AcademyDetailsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion multiple hiddenUntilFound className="rounded-xl border border-border">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <span className="min-w-0 text-pretty">{item.summary}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
