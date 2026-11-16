import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

import AccessibilityEn from "./en/accessibility.mdx";
import ConfirmEn from "./en/confirm.mdx";
import CustomizationEn from "./en/customization.mdx";
import HelpersEn from "./en/helpers.mdx";
import IntroductionEn from "./en/introduction.mdx";
import PwnedEn from "./en/pwned.mdx";
import ReactHookFormEn from "./en/react-hook-form.mdx";
import ServerEn from "./en/server.mdx";
import StrengthEn from "./en/strength.mdx";
import TypesEn from "./en/types.mdx";
import UiLibrariesEn from "./en/ui-libraries.mdx";
import UseViraPasswordEn from "./en/use-vira-password.mdx";
import AccessibilityTr from "./tr/accessibility.mdx";
import ConfirmTr from "./tr/confirm.mdx";
import CustomizationTr from "./tr/customization.mdx";
import HelpersTr from "./tr/helpers.mdx";
import IntroductionTr from "./tr/introduction.mdx";
import PwnedTr from "./tr/pwned.mdx";
import ReactHookFormTr from "./tr/react-hook-form.mdx";
import ServerTr from "./tr/server.mdx";
import StrengthTr from "./tr/strength.mdx";
import TypesTr from "./tr/types.mdx";
import UiLibrariesTr from "./tr/ui-libraries.mdx";
import UseViraPasswordTr from "./tr/use-vira-password.mdx";

export const passwordDocsContent: Record<string, LocalizedDocsContent> = {
  accessibility: { en: AccessibilityEn, tr: AccessibilityTr },
  confirm: { en: ConfirmEn, tr: ConfirmTr },
  customization: { en: CustomizationEn, tr: CustomizationTr },
  helpers: { en: HelpersEn, tr: HelpersTr },
  introduction: { en: IntroductionEn, tr: IntroductionTr },
  pwned: { en: PwnedEn, tr: PwnedTr },
  "react-hook-form": { en: ReactHookFormEn, tr: ReactHookFormTr },
  server: { en: ServerEn, tr: ServerTr },
  strength: { en: StrengthEn, tr: StrengthTr },
  types: { en: TypesEn, tr: TypesTr },
  "ui-libraries": { en: UiLibrariesEn, tr: UiLibrariesTr },
  "use-vira-password": { en: UseViraPasswordEn, tr: UseViraPasswordTr },
};
