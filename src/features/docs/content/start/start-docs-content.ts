import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

import CliEn from "./en/cli.mdx";
import I18nEn from "./en/i18n.mdx";
import InstallationEn from "./en/installation.mdx";
import IntroductionEn from "./en/introduction.mdx";
import ModulesEn from "./en/modules.mdx";
import ScriptsEn from "./en/scripts.mdx";
import TemplatesEn from "./en/templates.mdx";
import CliTr from "./tr/cli.mdx";
import I18nTr from "./tr/i18n.mdx";
import InstallationTr from "./tr/installation.mdx";
import IntroductionTr from "./tr/introduction.mdx";
import ModulesTr from "./tr/modules.mdx";
import ScriptsTr from "./tr/scripts.mdx";
import TemplatesTr from "./tr/templates.mdx";

export const startDocsContent: Record<string, LocalizedDocsContent> = {
  cli: { en: CliEn, tr: CliTr },
  i18n: { en: I18nEn, tr: I18nTr },
  installation: { en: InstallationEn, tr: InstallationTr },
  introduction: { en: IntroductionEn, tr: IntroductionTr },
  modules: { en: ModulesEn, tr: ModulesTr },
  scripts: { en: ScriptsEn, tr: ScriptsTr },
  templates: { en: TemplatesEn, tr: TemplatesTr },
};
