import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

import CustomMaskEn from "./en/custom-mask.mdx";
import HelpersEn from "./en/helpers.mdx";
import IntroductionEn from "./en/introduction.mdx";
import TypesEn from "./en/types.mdx";
import UiLibrariesEn from "./en/ui-libraries.mdx";
import UseViraMaskEn from "./en/use-vira-mask.mdx";
import ValidationEn from "./en/validation.mdx";
import CustomMaskTr from "./tr/custom-mask.mdx";
import HelpersTr from "./tr/helpers.mdx";
import IntroductionTr from "./tr/introduction.mdx";
import TypesTr from "./tr/types.mdx";
import UiLibrariesTr from "./tr/ui-libraries.mdx";
import UseViraMaskTr from "./tr/use-vira-mask.mdx";
import ValidationTr from "./tr/validation.mdx";

export const maskDocsV1Content: Record<string, LocalizedDocsContent> = {
  "custom-mask": { en: CustomMaskEn, tr: CustomMaskTr },
  helpers: { en: HelpersEn, tr: HelpersTr },
  introduction: { en: IntroductionEn, tr: IntroductionTr },
  types: { en: TypesEn, tr: TypesTr },
  "ui-libraries": { en: UiLibrariesEn, tr: UiLibrariesTr },
  "use-vira-mask": { en: UseViraMaskEn, tr: UseViraMaskTr },
  validation: { en: ValidationEn, tr: ValidationTr },
};
