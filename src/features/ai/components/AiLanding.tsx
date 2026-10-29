import { AiCli } from "@/features/ai/components/AiCli";
import { AiDemoVideo } from "@/features/ai/components/AiDemoVideo";
import { AiEcosystemCta } from "@/features/ai/components/AiEcosystemCta";
import { AiHowItWorks } from "@/features/ai/components/AiHowItWorks";
import { AiInjectedRules } from "@/features/ai/components/AiInjectedRules";

export function AiLanding() {
  return (
    <>
      <AiDemoVideo />
      <AiInjectedRules />
      <AiHowItWorks />
      <AiCli />
      <AiEcosystemCta />
    </>
  );
}
