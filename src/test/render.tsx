import type { ReactElement, ReactNode } from "react";

import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { withEcosystemMessages } from "@/i18n/ecosystem-messages";
import en from "@/messages/en.json";

// The same messages the app serves (see `src/i18n/request.ts`).
const messages = withEcosystemMessages(en, "en");

/** Renders a component with English messages, the provider every client component expects. */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale="en" messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
