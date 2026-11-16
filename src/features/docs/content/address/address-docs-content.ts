import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

import DataEn from "./en/data.mdx";
import HelpersEn from "./en/helpers.mdx";
import IntroductionEn from "./en/introduction.mdx";
import PostalCodeEn from "./en/postal-code.mdx";
import ReactHookFormEn from "./en/react-hook-form.mdx";
import ServerEn from "./en/server.mdx";
import TypesEn from "./en/types.mdx";
import UiLibrariesEn from "./en/ui-libraries.mdx";
import UseViraAddressEn from "./en/use-vira-address.mdx";
import DataTr from "./tr/data.mdx";
import HelpersTr from "./tr/helpers.mdx";
import IntroductionTr from "./tr/introduction.mdx";
import PostalCodeTr from "./tr/postal-code.mdx";
import ReactHookFormTr from "./tr/react-hook-form.mdx";
import ServerTr from "./tr/server.mdx";
import TypesTr from "./tr/types.mdx";
import UiLibrariesTr from "./tr/ui-libraries.mdx";
import UseViraAddressTr from "./tr/use-vira-address.mdx";

export const addressDocsContent: Record<string, LocalizedDocsContent> = {
  data: { en: DataEn, tr: DataTr },
  helpers: { en: HelpersEn, tr: HelpersTr },
  introduction: { en: IntroductionEn, tr: IntroductionTr },
  "postal-code": { en: PostalCodeEn, tr: PostalCodeTr },
  "react-hook-form": { en: ReactHookFormEn, tr: ReactHookFormTr },
  server: { en: ServerEn, tr: ServerTr },
  types: { en: TypesEn, tr: TypesTr },
  "ui-libraries": { en: UiLibrariesEn, tr: UiLibrariesTr },
  "use-vira-address": { en: UseViraAddressEn, tr: UseViraAddressTr },
};
