import { GithubIcon } from "@/components/shared/icons/GithubIcon";
import { buttonVariants } from "@/components/ui/button";

type GithubRepoButtonProps = {
  href: string;
  /** Short label, e.g. `virastack/start` or `virastack`. */
  label: string;
};

export function GithubRepoButton({ href, label }: GithubRepoButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={buttonVariants({ variant: "outline", size: "lg" })}
    >
      <GithubIcon data-icon="inline-start" className="size-3.5" />
      <span>{label}</span>
    </a>
  );
}
