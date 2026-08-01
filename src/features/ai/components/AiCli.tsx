"use client";

import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";

const FLAGS = [
  { flag: "--force, -f", key: "cliForce" as const },
  { flag: "--framework", key: "cliFramework" as const },
  { flag: "--tr", key: "cliTr" as const },
] as const;

export function AiCli() {
  const t = useTranslations("Ai");

  return (
    <section id="install" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
      <RevealGroup className="mb-10 text-center">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("cliTitle")}</h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("cliDesc")}
          </p>
        </RevealItem>
      </RevealGroup>

      <Reveal className="mb-10 flex justify-center">
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init")} />
      </Reveal>

      <Reveal>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium text-foreground">{t("cliFlagCol")}</th>
                <th className="px-4 py-3 font-medium text-foreground">{t("cliDescCol")}</th>
              </tr>
            </thead>
            <tbody>
              {FLAGS.map((row) => (
                <tr key={row.flag} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 align-top font-mono text-xs text-fuchsia-600 dark:text-fuchsia-400">
                    {row.flag}
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {row.key === "cliFramework"
                      ? t.rich(row.key, {
                          italic: (chunks) => <em className="italic">{chunks}</em>,
                        })
                      : t(row.key)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
