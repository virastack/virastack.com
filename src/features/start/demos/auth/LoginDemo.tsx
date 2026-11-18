import { getTranslations } from "next-intl/server";

import { AuthDemoPage } from "@/features/start/demos/auth/AuthDemoPage";
import { LoginForm } from "@/features/start/demos/auth/components/LoginForm";

/**
 * The auth module's sign-in page: a copy of `start/registry/auth`. Its link opens the sign-up
 * demo, and both share the preview layout's providers, so the session stays between them.
 */
export async function LoginDemo() {
  const t = await getTranslations("Auth");

  return (
    <AuthDemoPage title={t("login_title")} description={t("login_description")}>
      <LoginForm />
    </AuthDemoPage>
  );
}
