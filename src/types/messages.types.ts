import type { useTranslations } from "next-intl";

import type { EcosystemMessages } from "@/i18n/ecosystem-messages";
import type messages from "@/messages/en.json";

type BaseMessages = typeof messages;

/** `en.json` plus the descriptions `withEcosystemMessages` merges in at request time. */
export type AppMessages = Omit<BaseMessages, keyof EcosystemMessages> & {
  [Namespace in keyof EcosystemMessages]: (Namespace extends keyof BaseMessages
    ? BaseMessages[Namespace]
    : unknown) &
    EcosystemMessages[Namespace];
};

type MessageNamespace = NonNullable<Parameters<typeof useTranslations>[0]>;

/** The `t` function of one namespace, from `useTranslations` or `getTranslations`. */
export type Translator<Namespace extends MessageNamespace> = ReturnType<
  typeof useTranslations<Namespace>
>;
