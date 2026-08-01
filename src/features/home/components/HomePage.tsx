import { About } from "@/features/home/components/About";
import { Community } from "@/features/home/components/Community";
import { Ecosystem } from "@/features/home/components/Ecosystem";
import { Hero } from "@/features/home/components/Hero";
import { Maintainer } from "@/features/home/components/Maintainer";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Ecosystem />
      <Maintainer />
      <Community />
    </>
  );
}
