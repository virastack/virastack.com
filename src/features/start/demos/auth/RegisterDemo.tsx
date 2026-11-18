import { getTranslations } from "next-intl/server";

import { AuthDemoPage } from "@/features/start/demos/auth/AuthDemoPage";
import { RegisterForm } from "@/features/start/demos/auth/components/RegisterForm";

/** The auth module's sign-up page, opened from the sign-in demo's link. */
export async function RegisterDemo() {
  const t = await getTranslations("Auth");

  return (
    <AuthDemoPage title={t("register_title")} description={t("register_description")}>
      <RegisterForm />
    </AuthDemoPage>
  );
}
