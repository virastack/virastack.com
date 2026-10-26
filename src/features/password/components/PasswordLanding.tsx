import { PasswordDemo } from "@/features/password/components/PasswordDemo";
import { PasswordDemoVideo } from "@/features/password/components/PasswordDemoVideo";
import { PasswordFeatures } from "@/features/password/components/PasswordFeatures";

export function PasswordLanding() {
  return (
    <>
      <PasswordDemoVideo />
      <PasswordDemo />
      <PasswordFeatures />
    </>
  );
}
