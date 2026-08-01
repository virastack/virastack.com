import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { Reveal } from "@/components/shared/Reveal";

type SiteSectionHeroProps = {
  title: string;
  description: string;
  githubHref: string;
  githubLabel: string;
};

export function SiteSectionHero({
  title,
  description,
  githubHref,
  githubLabel,
}: SiteSectionHeroProps) {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-36 pb-28 text-center">
      <h1 className="mb-2 text-center text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-6xl">
        {title}
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
        {description}
      </p>

      <Reveal
        mode="mount"
        delay={0.1}
        className="mt-2 flex flex-wrap items-center justify-center gap-2"
      >
        <GithubRepoButton href={githubHref} label={githubLabel} />
      </Reveal>
    </section>
  );
}
