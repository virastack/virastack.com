import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

import BanksEn from "./en/banks.mdx";
import CustomMaskEn from "./en/custom-mask.mdx";
import HelpersEn from "./en/helpers.mdx";
import IntroductionEn from "./en/introduction.mdx";
import ServerEn from "./en/server.mdx";
import TestingEn from "./en/testing.mdx";
import TypesEn from "./en/types.mdx";
import UiLibrariesEn from "./en/ui-libraries.mdx";
import UpgradeEn from "./en/upgrade.mdx";
import UseViraMaskEn from "./en/use-vira-mask.mdx";
import ValidationEn from "./en/validation.mdx";
import BanksTr from "./tr/banks.mdx";
import CustomMaskTr from "./tr/custom-mask.mdx";
import HelpersTr from "./tr/helpers.mdx";
import IntroductionTr from "./tr/introduction.mdx";
import ServerTr from "./tr/server.mdx";
import TestingTr from "./tr/testing.mdx";
import TypesTr from "./tr/types.mdx";
import UiLibrariesTr from "./tr/ui-libraries.mdx";
import UpgradeTr from "./tr/upgrade.mdx";
import UseViraMaskTr from "./tr/use-vira-mask.mdx";
import ValidationTr from "./tr/validation.mdx";

export const maskDocsContent: Record<string, LocalizedDocsContent> = {
  banks: { en: BanksEn, tr: BanksTr },
  "custom-mask": { en: CustomMaskEn, tr: CustomMaskTr },
  helpers: { en: HelpersEn, tr: HelpersTr },
  introduction: { en: IntroductionEn, tr: IntroductionTr },
  server: { en: ServerEn, tr: ServerTr },
  testing: { en: TestingEn, tr: TestingTr },
  types: { en: TypesEn, tr: TypesTr },
  "ui-libraries": { en: UiLibrariesEn, tr: UiLibrariesTr },
  upgrade: { en: UpgradeEn, tr: UpgradeTr },
  "use-vira-mask": { en: UseViraMaskEn, tr: UseViraMaskTr },
  validation: { en: ValidationEn, tr: ValidationTr },
};
