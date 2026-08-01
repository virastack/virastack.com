import type { ReactNode } from "react";

import { featureCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";

export type FeatureItem = {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  tone: string;
};

type FeaturesSectionProps = {
  title: string;
  features: FeatureItem[];
};

export function FeaturesSection({ title, features }: FeaturesSectionProps) {
  return (
    <section id="features" className="mx-auto max-w-5xl px-6 py-16">
      <RevealGroup className="mb-16 text-center">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">{title}</h2>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <RevealItem key={feature.title} className={featureCardClassName}>
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 ease-out group-hover:scale-105",
                  feature.tone,
                )}
              >
                {feature.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-balance text-foreground md:text-lg">
                  {feature.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">{feature.subtitle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {feature.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
