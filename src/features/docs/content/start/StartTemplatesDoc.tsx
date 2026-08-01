import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { BaseUiIcon } from "@/components/icons/base-ui";
import { FramerIcon } from "@/components/icons/framer";
import { NuqsIcon } from "@/components/icons/nuqs";
import { Lucide } from "@/components/ui/svgs/lucide";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { ReactHookForm } from "@/components/ui/svgs/reactHookForm";
import { Tanstack } from "@/components/ui/svgs/tanstack";
import { Zod } from "@/components/ui/svgs/zod";
import { Zustand } from "@/components/ui/svgs/zustand";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { GuideProductMark, GuideStackIcon } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

function stackMark(icon?: ReactNode) {
  function StackMark(chunks: ReactNode) {
    return <GuideStackIcon icon={icon}>{chunks}</GuideStackIcon>;
  }

  return StackMark;
}

export function StartTemplatesDoc() {
  const t = useTranslations("DocsStart");

  const stackTags = {
    query: stackMark(<Tanstack aria-hidden />),
    zustand: stackMark(<Zustand aria-hidden />),
    nuqs: stackMark(<NuqsIcon className="size-full" />),
    rhf: stackMark(<ReactHookForm aria-hidden />),
    zod: stackMark(<Zod aria-hidden />),
    usehooks: (chunks: ReactNode) => <code>{chunks}</code>,
    baseui: stackMark(<BaseUiIcon className="size-full" />),
    motion: stackMark(<FramerIcon className="size-full" />),
    lucide: stackMark(<Lucide aria-hidden />),
  };

  const tree = `src/
├── app/ | routes/            # Next.js App Router | TanStack file-based routing
├── features/
│   └── landing/              # ${t("templatesTreeCommentFeature")}
│       ├── api/
│       ├── components/
│       ├── data/
│       ├── helpers/
│       ├── hooks/
│       ├── icons/
│       ├── schemas/
│       ├── stores/
│       ├── types/
│       └── index.ts
├── components/
│   ├── ui/
│   └── shared/
├── hooks/
├── stores/
├── schemas/
├── providers/
├── lib/
├── config/
├── constants/
├── helpers/
├── types/
├── styles/
└── env.ts

.agents/
└── skills/                   # ${t("templatesTreeCommentSkills")}
.cursor/
└── rules/                    # ${t("templatesTreeCommentRules")}
AGENTS.md
CLAUDE.md`;

  return (
    <>
      <DocsPageHeader title={t("templatesTitle")} description={t("templatesHeaderDesc")} />
      <DocsProse>
        <h2 id="framework">{t("templatesHeadingFramework")}</h2>
        <p>{t("templatesFrameworkP")}</p>
        <ul>
          <li>
            {t.rich("templatesNext", {
              bold: (chunks) => <strong>{chunks}</strong>,
              nextjs: (chunks) => (
                <GuideStackIcon icon={<NextjsIconDark className="dark:invert" aria-hidden />}>
                  {chunks}
                </GuideStackIcon>
              ),
            })}
          </li>
          <li>
            {t.rich("templatesTanstack", {
              bold: (chunks) => <strong>{chunks}</strong>,
              tanstack: (chunks) => (
                <GuideStackIcon icon={<Tanstack aria-hidden />}>{chunks}</GuideStackIcon>
              ),
            })}
          </li>
        </ul>

        <p>
          {t.rich("templatesI18nP", {
            bold: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <ul>
          <li>
            {t.rich("templatesPlain", {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </li>
          <li>
            {t.rich("templatesI18n", {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </li>
        </ul>

        <h2 id="stack">{t("templatesHeadingStack")}</h2>
        <p>{t("templatesStackP")}</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("templatesStackColArea")}</th>
                <th>{t("templatesStackColPackages")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>{t("templatesStackAreaState")}</strong>
                </td>
                <td>{t.rich("templatesStackPkgsState", stackTags)}</td>
              </tr>
              <tr>
                <td>
                  <strong>{t("templatesStackAreaForm")}</strong>
                </td>
                <td>{t.rich("templatesStackPkgsForm", stackTags)}</td>
              </tr>
              <tr>
                <td>
                  <strong>{t("templatesStackAreaHooks")}</strong>
                </td>
                <td>{t.rich("templatesStackPkgsHooks", stackTags)}</td>
              </tr>
              <tr>
                <td>
                  <strong>{t("templatesStackAreaUi")}</strong>
                </td>
                <td>{t.rich("templatesStackPkgsUi", stackTags)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{t("templatesStackExtra")}</p>
        <p>
          {t.rich("templatesStackAi", {
            ai: (chunks) => (
              <GuideProductMark id="ai" linked={false}>
                {chunks}
              </GuideProductMark>
            ),
            emil: (chunks) => <code>{chunks}</code>,
            feel: (chunks) => <code>{chunks}</code>,
          })}
        </p>

        <h2 id="klasor-yapisi">{t("templatesHeadingStructure")}</h2>
        <pre>
          <code>{tree}</code>
        </pre>
        <p>
          {t.rich("templatesFooter", {
            installation: (chunks) => <Link href="/start/docs/installation">{chunks}</Link>,
            cli: (chunks) => <Link href="/start/docs/cli">{chunks}</Link>,
          })}
        </p>
      </DocsProse>
    </>
  );
}
