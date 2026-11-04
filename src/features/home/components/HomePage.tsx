import type { ReactNode } from "react";

import { About } from "@/features/home/components/About";
import { Community } from "@/features/home/components/Community";
import { Ecosystem } from "@/features/home/components/Ecosystem";
import { Hero } from "@/features/home/components/Hero";
import { Maintainer } from "@/features/home/components/Maintainer";

type HomePageProps = {
  /** The Academy section, composed by the route since it belongs to the Academy feature. */
  academy: ReactNode;
};

export function HomePage({ academy }: HomePageProps) {
  return (
    <>
      <Hero />
      <About />
      <Ecosystem />
      {academy}
      <Maintainer />
      <Community />
    </>
  );
}
