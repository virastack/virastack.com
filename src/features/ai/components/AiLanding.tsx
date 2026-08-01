import { AiCli } from "@/features/ai/components/AiCli";
import { AiDialogDemo } from "@/features/ai/components/AiDialogDemo";
import { AiEcosystemCta } from "@/features/ai/components/AiEcosystemCta";
import { AiHowItWorks } from "@/features/ai/components/AiHowItWorks";
import { AiInjectedRules } from "@/features/ai/components/AiInjectedRules";

export function AiLanding() {
  return (
    <>
      <AiInjectedRules />
      <AiDialogDemo />
      <AiHowItWorks />
      <AiCli />
      <AiEcosystemCta />
    </>
  );
}
