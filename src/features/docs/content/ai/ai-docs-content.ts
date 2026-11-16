import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

import ChangelogEn from "./en/changelog.mdx";
import CliEn from "./en/cli.mdx";
import CustomizationEn from "./en/customization.mdx";
import InstallationEn from "./en/installation.mdx";
import InstalledFilesEn from "./en/installed-files.mdx";
import IntroductionEn from "./en/introduction.mdx";
import RulesEn from "./en/rules.mdx";
import SupportedToolsEn from "./en/supported-tools.mdx";
import UpgradeEn from "./en/upgrade.mdx";
import ChangelogTr from "./tr/changelog.mdx";
import CliTr from "./tr/cli.mdx";
import CustomizationTr from "./tr/customization.mdx";
import InstallationTr from "./tr/installation.mdx";
import InstalledFilesTr from "./tr/installed-files.mdx";
import IntroductionTr from "./tr/introduction.mdx";
import RulesTr from "./tr/rules.mdx";
import SupportedToolsTr from "./tr/supported-tools.mdx";
import UpgradeTr from "./tr/upgrade.mdx";

export const aiDocsContent: Record<string, LocalizedDocsContent> = {
  changelog: { en: ChangelogEn, tr: ChangelogTr },
  cli: { en: CliEn, tr: CliTr },
  customization: { en: CustomizationEn, tr: CustomizationTr },
  installation: { en: InstallationEn, tr: InstallationTr },
  "installed-files": { en: InstalledFilesEn, tr: InstalledFilesTr },
  introduction: { en: IntroductionEn, tr: IntroductionTr },
  rules: { en: RulesEn, tr: RulesTr },
  "supported-tools": { en: SupportedToolsEn, tr: SupportedToolsTr },
  upgrade: { en: UpgradeEn, tr: UpgradeTr },
};
