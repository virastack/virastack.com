import type { LocalizedDocsContent } from "@/features/docs/types/docs.types";

import IntroductionEn from "./en/introduction.mdx";
import IntroductionTr from "./tr/introduction.mdx";

export const aiDocsV1Content: Record<string, LocalizedDocsContent> = {
  introduction: { en: IntroductionEn, tr: IntroductionTr },
};
