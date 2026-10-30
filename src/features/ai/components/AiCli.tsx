"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Link } from "@/i18n/routing";

const FLAGS = [
  { flag: "--agent", key: "cliAgent" as const },
  { flag: "--dry-run", key: "cliDryRun" as const },
  { flag: "--force, -f", key: "cliForce" as const },
  { flag: "--framework", key: "cliFramework" as const },
  { flag: "--tr", key: "cliTr" as const },
  { flag: "remove", key: "cliRemove" as const },
] as const;

const codeChunk = (chunks: ReactNode) => (
  <code className="font-mono text-xs text-foreground">{chunks}</code>
);

export function AiCli() {
  const t = useTranslations("Ai");

  return (
    <section
      id="install"
      className="mx-auto max-w-3xl scroll-mt-4 px-6 py-16 md:scroll-mt-14 xl:scroll-mt-28"
    >
      <RevealGroup className="mb-10 text-center">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("cliTitle")}</h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-balance text-muted-foreground">
            {t("cliDesc")}
          </p>
        </RevealItem>
      </RevealGroup>

      <Reveal className="mb-8 flex justify-center">
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init")} />
      </Reveal>

      <RevealGroup className="mx-auto max-w-xl space-y-2 text-sm leading-relaxed text-muted-foreground">
        {FLAGS.map((row) => (
          <RevealItem key={row.flag}>
            <p>
              <span className="font-mono text-xs text-brand-ai">{row.flag}</span>
              <span className="text-foreground/40"> — </span>
              {t.rich(row.key, { code: codeChunk })}
            </p>
          </RevealItem>
        ))}
        <RevealItem>
          <p className="pt-4">
            {t.rich("cliDocs", {
              docs: (chunks) => (
                <Link
                  href="/ai/docs/cli"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
